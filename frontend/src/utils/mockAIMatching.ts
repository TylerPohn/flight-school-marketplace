import type { MatchProfile, MockSchool, RankedSchool, Location } from '../types/matchProfile';

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(point1: Location, point2: Location): number {
  // If either point is missing coordinates, return a large distance
  if (!point1.lat || !point1.lon || !point2.lat || !point2.lon) {
    return 999999;
  }

  const R = 3959; // Earth radius in miles
  const lat1 = point1.lat;
  const lon1 = point1.lon;
  const lat2 = point2.lat;
  const lon2 = point2.lon;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculate match score for a school based on user profile
 * Returns score 0-100, realistically in 65-94 range
 */
export function calculateMatchScore(profile: MatchProfile, school: MockSchool): number {
  let score = 40; // Lower base score for more realistic range

  // Program Match (0-20 points)
  if (profile.trainingGoal === school.primaryProgram) {
    score += 20;
  } else if (school.programs.includes(profile.trainingGoal)) {
    score += 12;
  } else {
    score += 5; // Still offers some value
  }

  // Budget Match (0-20 points) - reduced from 25
  const studentBudget = profile.maxBudget;
  const schoolMinCost = school.costBand.min;
  const schoolMaxCost = school.costBand.max;

  if (studentBudget >= schoolMinCost) {
    if (studentBudget <= schoolMaxCost) {
      score += 20; // Perfect match
    } else {
      score += 16; // Within range, above minimum
    }
  } else if (studentBudget >= schoolMinCost * 0.9) {
    score += 10; // Close enough (90%)
  } else {
    score += 4; // Over budget penalty
  }

  // Location Match (0-18 points) - reduced from 20
  const distance = calculateDistance(profile.location, school.location);
  const maxRadius = profile.searchRadius;

  if (distance <= maxRadius * 0.25) {
    score += 18; // Very close
  } else if (distance <= maxRadius * 0.5) {
    score += 14; // Close
  } else if (distance <= maxRadius * 0.75) {
    score += 10; // Reasonably close
  } else if (distance <= maxRadius) {
    score += 6; // At edge of radius
  } else if (distance <= maxRadius * 1.5) {
    score += 3; // Slightly outside preferred radius
  } else {
    score += 1; // Too far but still listed
  }

  // Training Type Match (0-8 points) - reduced from 10
  if (profile.trainingTypePreference === 'No Preference') {
    score += 8;
  } else if (profile.trainingTypePreference === school.trainingType) {
    score += 8;
  } else {
    score += 4; // Partial credit
  }

  // Preference Bonus (0-8 points) - reduced from 10
  const matchingPreferences = profile.preferences.filter((pref) =>
    school.preferences.includes(pref)
  );

  if (matchingPreferences.length >= 3) {
    score += 8;
  } else if (matchingPreferences.length === 2) {
    score += 6;
  } else if (matchingPreferences.length === 1) {
    score += 3;
  }

  // Experience Adjustment (0-4 bonus) - reduced from 5
  if (school.trustTier === 'Verified FSP' &&
      (profile.priorExperience === '20+ hours' || profile.priorExperience === '10-20 hours')) {
    score += 4;
  } else if (school.intensityLevel === profile.intensityPreference) {
    score += 3;
  }

  // Financing bonus if needed (0-2 points)
  if (profile.financingInterest && school.hasFinancing) {
    score += 2;
  }

  // Housing bonus if needed (0-2 points)
  if (profile.housingNeeded && school.hasHousing) {
    score += 2;
  }

  // Add small random variation (-2 to +2) to prevent identical scores
  const variation = Math.floor(Math.random() * 5) - 2;
  score += variation;

  // Cap at 94 (never show 100% or above)
  return Math.min(94, Math.max(50, Math.round(score)));
}

/**
 * Rank all schools based on match score
 * Returns sorted array of RankedSchool objects
 * Filters out schools beyond 1.5x the search radius and limits to top 10
 */
export function rankSchools(profile: MatchProfile, schools: MockSchool[]): RankedSchool[] {
  const rankedSchools: RankedSchool[] = schools
    .map((school) => {
      const matchScore = calculateMatchScore(profile, school);
      const explanation = generateMatchExplanation(school, profile, matchScore);
      const distance = calculateDistance(profile.location, school.location);

      return {
        school,
        matchScore,
        explanation,
        ranking: 0, // Will be set after sorting
        distance, // Store for filtering
      };
    })
    // Filter out schools that are too far (beyond 1.5x search radius)
    .filter((rankedSchool) => {
      const maxDistance = profile.searchRadius * 1.5;
      return rankedSchool.distance <= maxDistance;
    });

  // Sort by score descending
  rankedSchools.sort((a, b) => b.matchScore - a.matchScore);

  // Limit to top 10 schools
  const topSchools = rankedSchools.slice(0, 10);

  // Assign rankings
  topSchools.forEach((rankedSchool, index) => {
    rankedSchool.ranking = index + 1;
  });

  return topSchools;
}

/**
 * Generate AI-like explanation using templates
 * No real AI calls - deterministic templating
 */
export function generateMatchExplanation(
  school: MockSchool,
  profile: MatchProfile,
  matchScore: number
): string {
  const distance = Math.round(calculateDistance(profile.location, school.location));
  const schoolLocation = `${school.location.city}, ${school.location.state}`;
  const budget = profile.maxBudget;
  const schoolMin = school.costBand.min;
  const schoolMax = school.costBand.max;
  const goal = profile.trainingGoal;

  // Determine primary match factors
  const isLocationMatch = distance <= profile.searchRadius;
  const isBudgetMatch = budget >= schoolMin && budget <= schoolMax;
  const isProgramMatch = profile.trainingGoal === school.primaryProgram;
  const isIntensityMatch = profile.intensityPreference === school.intensityLevel;

  // High score (90+) - Multi-factor match
  if (matchScore >= 90) {
    return `${school.name} is your top match. It checks all the boxes: located in ${schoolLocation} (${distance} miles away), priced at $${schoolMin.toLocaleString()}-$${schoolMax.toLocaleString()} (within your $${budget.toLocaleString()} budget), offers ${goal} training, and has a reputation for ${school.preferences[0].toLowerCase()}. This school is a standout fit.`;
  }

  // Good score (80-89) - Budget & Location focused
  if (matchScore >= 80 && isBudgetMatch && isLocationMatch) {
    return `${school.name} in ${schoolLocation} is an excellent fit—it's only ${distance} miles from your preferred area. With ${school.instructorCount} experienced instructors and a ${school.fleetTypes[0]} fleet, you'll get personalized attention close to home. Their ${schoolMin.toLocaleString()}-${schoolMax.toLocaleString()} pricing aligns with your $${budget.toLocaleString()} budget.`;
  }

  // Good score (80-89) - Program focused
  if (matchScore >= 80 && isProgramMatch) {
    return `For your ${goal} training, ${school.name} is a top choice. As a ${school.trustTier} school, it has proven success with ${school.averageHoursToPPL} hours to PPL. Plus, their instructors specialize in the ${school.fleetTypes[0]} aircraft, ensuring quality training at $${schoolMin.toLocaleString()}-${schoolMax.toLocaleString()}.`;
  }

  // Medium-high score (70-79) - Intensity match
  if (matchScore >= 70 && isIntensityMatch) {
    return `${school.name} offers ${school.intensityLevel.toLowerCase()} training to fit your timeline. Located in ${schoolLocation}, it's ${distance} miles away and priced at $${schoolMin.toLocaleString()}-${schoolMax.toLocaleString()}. Their flexible approach means you can train at your own pace while pursuing ${goal}.`;
  }

  // Medium score (60-69) - Budget focused
  if (matchScore >= 60 && isBudgetMatch) {
    return `Based on your budget of $${budget.toLocaleString()} and ${goal} training goal, we recommend ${school.name} because it offers competitive pricing ($${schoolMin.toLocaleString()}-${schoolMax.toLocaleString()}) without compromising quality. Located in ${schoolLocation}, it's a practical choice for cost-conscious students.`;
  }

  // Lower score - Recovery/transparency
  if (matchScore >= 50) {
    return `${school.name} may not be your absolute top choice, but it deserves consideration. While it's ${distance} miles from your location, it offers ${goal} training at $${schoolMin.toLocaleString()}-${schoolMax.toLocaleString()} and has a ${school.trustTier} status. With ${school.instructorCount} instructors, they can accommodate your needs. Reach out to discuss your specific requirements.`;
  }

  // Fallback for low scores
  return `${school.name} in ${schoolLocation} offers ${goal} training with a ${school.trainingType} program. While it may not perfectly match all your criteria (${distance} miles away, $${schoolMin.toLocaleString()}-${schoolMax.toLocaleString()} cost range), it has ${school.instructorCount} instructors and a solid reputation. Consider reaching out to learn more about how they can support your aviation goals.`;
}
