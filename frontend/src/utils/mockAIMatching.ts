import type { MatchProfile, MockSchool, RankedSchool, Location } from '../types/matchProfile';
import { getAIExplanation } from '../services/matchApi';

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(point1: Location, point2: Location): number {
  // If either point is missing coordinates, return 0 (treat as "anywhere")
  // This allows "Open to relocating" to match all schools
  if (!point1.lat || !point1.lon || !point2.lat || !point2.lon) {
    return 0;
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
  let score = 30; // Base score - allows for wider spread in results

  // Program Match (0-15 points)
  if (profile.trainingGoal === school.primaryProgram) {
    score += 15;
  } else if (school.programs.includes(profile.trainingGoal)) {
    score += 9;
  } else {
    score += 3; // Still offers some value
  }

  // Budget Match (0-15 points) - continuous scoring based on budget fit
  const studentBudget = profile.maxBudget;
  const schoolMinCost = school.costBand.min;
  const schoolMaxCost = school.costBand.max;
  const schoolMidCost = (schoolMinCost + schoolMaxCost) / 2;

  let budgetScore = 0;
  if (studentBudget >= schoolMinCost && studentBudget <= schoolMaxCost) {
    // Perfect fit: budget is within cost band
    // Best fit is at midpoint (15 points), slightly lower at edges (13 points)
    const distanceFromMid = Math.abs(studentBudget - schoolMidCost);
    const bandWidth = (schoolMaxCost - schoolMinCost) / 2;
    budgetScore = 15 - ((distanceFromMid / bandWidth) * 2);
  } else if (studentBudget > schoolMaxCost) {
    // Budget exceeds cost band - still good, but preference for schools that use more budget
    // Decays from 13 to 8 as budget gets much higher than max cost
    const excess = studentBudget - schoolMaxCost;
    const excessRatio = excess / schoolMaxCost;
    budgetScore = Math.max(8, 13 - (excessRatio * 5));
  } else if (studentBudget >= schoolMinCost * 0.85) {
    // Slightly under minimum (85-100%) - graduated penalty
    const shortfall = schoolMinCost - studentBudget;
    const shortfallRatio = shortfall / schoolMinCost;
    budgetScore = 8 - (shortfallRatio * 30); // Decays from 8 to 3
  } else {
    // Significantly over budget - larger penalty
    const shortfall = schoolMinCost - studentBudget;
    const shortfallRatio = shortfall / schoolMinCost;
    budgetScore = Math.max(1, 4 - (shortfallRatio * 8));
  }
  score += budgetScore;

  // Location Match (0-12 points) - continuous scoring based on distance
  const distance = calculateDistance(profile.location, school.location);
  const maxRadius = profile.searchRadius;

  // Continuous decay function: closer is better
  // Schools within radius get 12 points, decaying smoothly to 1 point at 2x radius
  let locationScore = 0;
  if (distance === 0) {
    locationScore = 12; // Perfect location match or "open to relocating"
  } else if (distance <= maxRadius) {
    // Linear decay from 12 to 4 within preferred radius
    locationScore = 12 - ((distance / maxRadius) * 8);
  } else if (distance <= maxRadius * 2) {
    // Steeper decay from 4 to 1 beyond preferred radius
    const excessDistance = distance - maxRadius;
    locationScore = 4 - ((excessDistance / maxRadius) * 3);
  } else {
    locationScore = 1; // Minimum for very distant schools
  }
  score += locationScore;

  // Training Type Match (0-6 points)
  if (profile.trainingTypePreference === 'No Preference') {
    score += 6;
  } else if (profile.trainingTypePreference === school.trainingType) {
    score += 6;
  } else {
    score += 3; // Partial credit
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

  // Quality Metrics (0-8 points) - rewards objectively high-quality schools
  let qualityScore = 0;

  // Rating quality (0-3 points)
  if (school.avgRating) {
    qualityScore += (school.avgRating / 5) * 3;
  }

  // Review volume credibility (0-2 points) - more reviews = more reliable rating
  if (school.reviewCount) {
    if (school.reviewCount > 100) qualityScore += 2;
    else if (school.reviewCount > 50) qualityScore += 1.5;
    else if (school.reviewCount > 20) qualityScore += 1;
    else qualityScore += school.reviewCount / 40; // Graduated for < 20 reviews
  }

  // Instructor-to-aircraft ratio (0-1.5 points) - better ratios = more personalized training
  if (school.instructorCount && school.fleetSize) {
    const aircraftPerInstructor = school.fleetSize / school.instructorCount;
    if (aircraftPerInstructor < 3) qualityScore += 1.5; // Excellent ratio
    else if (aircraftPerInstructor < 5) qualityScore += 1;
    else if (aircraftPerInstructor < 8) qualityScore += 0.5;
  }

  // Experience/longevity (0-1.5 points) - established schools
  if (school.yearsInOperation) {
    if (school.yearsInOperation > 20) qualityScore += 1.5;
    else if (school.yearsInOperation > 10) qualityScore += 1;
    else if (school.yearsInOperation > 5) qualityScore += 0.5;
    else qualityScore += school.yearsInOperation / 20; // Graduated for newer schools
  }

  score += qualityScore;

  // Efficiency Scoring (0-4 points) - rewards demonstrably efficient training
  let efficiencyScore = 0;

  // Hours to PPL efficiency (0-2 points) - fewer hours = more efficient
  if (school.averageHoursToPPL) {
    if (school.averageHoursToPPL <= 50) efficiencyScore += 2;
    else if (school.averageHoursToPPL <= 60) efficiencyScore += 1.5;
    else if (school.averageHoursToPPL <= 70) efficiencyScore += 1;
    else if (school.averageHoursToPPL <= 80) efficiencyScore += 0.5;
  }

  // FSP signals if verified (0-2 points) - data-driven quality indicators
  if (school.fspSignals) {
    const signals = school.fspSignals;
    efficiencyScore += (signals.scheduleConsistency / 100) * 1;
    efficiencyScore += (signals.instructorReliability / 100) * 1;
  }

  score += efficiencyScore;

  // Aircraft Preference Matching (0-3 points) - rewards schools with preferred aircraft
  if (profile.aircraftPreference && profile.aircraftPreference !== 'No Preference') {
    const preferenceLC = profile.aircraftPreference.toLowerCase();
    const hasPreferredAircraft = school.fleetTypes.some(aircraft =>
      aircraft.toLowerCase().includes(preferenceLC)
    );

    if (hasPreferredAircraft && school.fleetDetails) {
      // Check fleet availability for preferred aircraft
      const preferredFleet = school.fleetDetails.find(fd =>
        fd.aircraftType.toLowerCase().includes(preferenceLC)
      );

      if (preferredFleet) {
        // Base points for having the aircraft
        let aircraftScore = 1;

        // Bonus for availability
        if (preferredFleet.availability === 'High') aircraftScore += 2;
        else if (preferredFleet.availability === 'Medium') aircraftScore += 1;
        else aircraftScore += 0.5; // Low availability

        score += aircraftScore;
      } else {
        // Has the aircraft type but no detailed availability info
        score += 2;
      }
    } else if (hasPreferredAircraft) {
      // Has the aircraft type but no fleet details
      score += 2;
    }
  }

  // Add random variation (-1.5 to +1.5) to prevent identical scores
  const variation = (Math.random() * 3) - 1.5;
  score += variation;

  // Tie-breaking micro-adjustments (0-1 point) - ensures no duplicate scores
  let tieBreaker = 0;

  // Quality signals (0-0.5 total)
  if (school.avgRating) tieBreaker += (school.avgRating / 100); // Max 0.05
  if (school.reviewCount) tieBreaker += Math.min(0.15, school.reviewCount / 1000); // Max 0.15
  if (school.yearsInOperation) tieBreaker += Math.min(0.15, school.yearsInOperation / 200); // Max 0.15
  if (school.instructorCount) tieBreaker += Math.min(0.15, school.instructorCount / 500); // Max ~0.15

  // Verification trust tier (0-0.3)
  if (school.trustTier === 'Premier' || school.trustTier === 'Verified FSP') tieBreaker += 0.3;
  else if (school.trustTier === 'Community-Verified') tieBreaker += 0.2;
  else tieBreaker += 0.1;

  // Fleet size (0-0.2)
  if (school.fleetSize) tieBreaker += Math.min(0.2, school.fleetSize / 100);

  score += tieBreaker;

  // Cap scores at 95 (never show 100%), minimum of 60 for schools that pass basic filters
  // Keep 2 decimal places for differentiation
  return Number(Math.min(95, Math.max(60, score)).toFixed(2));
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

  // Limit to top 5 schools (all will get AI explanations)
  const topSchools = rankedSchools.slice(0, 5);

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

/**
 * Enhanced async version of rankSchools that uses AI explanations for all results
 * Falls back to template explanations if API is unavailable
 */
export async function rankSchoolsWithAI(profile: MatchProfile, schools: MockSchool[]): Promise<RankedSchool[]> {
  // First, get all rankings with template explanations (synchronous)
  // This now returns top 5 only
  const rankedSchools = rankSchools(profile, schools);

  // Get AI explanations for all results (top 5)
  const aiExplanationPromises = rankedSchools.map(async (rankedSchool) => {
    try {
      const aiExplanation = await getAIExplanation({
        student: {
          trainingGoal: profile.trainingGoal,
          maxBudget: profile.maxBudget,
          location: {
            city: profile.location.city,
            state: profile.location.state,
            lat: profile.location.lat,
            lon: profile.location.lon,
          },
          trainingTypePreference: profile.trainingTypePreference,
          priorExperience: profile.priorExperience,
        },
        school: {
          name: rankedSchool.school.name,
          location: {
            city: rankedSchool.school.location.city,
            state: rankedSchool.school.location.state,
            lat: rankedSchool.school.location.lat,
            lon: rankedSchool.school.location.lon,
          },
          costBand: rankedSchool.school.costBand,
          primaryProgram: rankedSchool.school.primaryProgram,
          instructorCount: rankedSchool.school.instructorCount,
          trainingType: rankedSchool.school.trainingType,
        },
        matchScore: rankedSchool.matchScore,
      });

      // If AI explanation was retrieved, use it; otherwise keep template
      if (aiExplanation) {
        return { ...rankedSchool, explanation: aiExplanation };
      }
      return rankedSchool;
    } catch (error) {
      console.error('Error fetching AI explanation for', rankedSchool.school.name, error);
      return rankedSchool; // Keep template explanation on error
    }
  });

  // Wait for all AI explanations
  const enhancedResults = await Promise.all(aiExplanationPromises);

  // Return all results (top 5) with AI explanations
  return enhancedResults;
}
