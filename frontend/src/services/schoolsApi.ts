/**
 * API Service for School Data
 * Fetches school information from AWS DynamoDB via API Gateway
 */

import type { DetailedSchool } from '../mock/detailedSchools';

const API_BASE_URL = import.meta.env.VITE_MATCH_API_URL || '';

export interface SchoolsApiResponse {
  schools: DetailedSchool[];
  count: number;
}

/**
 * Fetch all schools from the API
 */
export async function getAllSchools(): Promise<DetailedSchool[]> {
  if (!API_BASE_URL) {
    console.warn('VITE_MATCH_API_URL not configured - cannot fetch schools');
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/schools`);

    if (!response.ok) {
      console.error('Schools API error:', response.status, response.statusText);
      return [];
    }

    const data: SchoolsApiResponse = await response.json();
    return data.schools || [];
  } catch (error) {
    console.error('Failed to fetch schools:', error);
    return [];
  }
}

/**
 * Fetch a single school by ID from the API
 */
export async function getSchoolById(schoolId: string): Promise<DetailedSchool | null> {
  if (!API_BASE_URL) {
    console.warn('VITE_MATCH_API_URL not configured - cannot fetch school');
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/schools/${schoolId}`);

    if (!response.ok) {
      console.error('School API error:', response.status, response.statusText);
      return null;
    }

    const school: DetailedSchool = await response.json();
    return school;
  } catch (error) {
    console.error('Failed to fetch school:', error);
    return null;
  }
}

/**
 * Fetch multiple schools by their IDs
 */
export async function getSchoolsByIds(ids: string[]): Promise<DetailedSchool[]> {
  if (!API_BASE_URL || ids.length === 0) {
    return [];
  }

  try {
    // Fetch all schools and filter by IDs
    // Note: This could be optimized with a batch endpoint in the future
    const allSchools = await getAllSchools();
    return allSchools.filter(school => ids.includes(school.schoolId));
  } catch (error) {
    console.error('Failed to fetch schools by IDs:', error);
    return [];
  }
}

/**
 * Transform DetailedSchool to the simpler School format used in some components
 * This maintains backward compatibility with existing code
 */
export function convertToSimpleSchool(detailedSchool: any): any {
  // Calculate fleet size from fleetDetails
  const fleetSize = detailedSchool.fleetDetails?.reduce((sum: number, fleet: any) => sum + fleet.count, 0) || 0;

  // Handle both nested location object and flat structure from API
  const city = detailedSchool.location?.city || detailedSchool.city || '';
  const state = detailedSchool.location?.state || detailedSchool.state || '';
  const zipCode = detailedSchool.location?.zipCode || detailedSchool.zipCode || '';

  return {
    id: detailedSchool.schoolId,
    name: detailedSchool.name,
    location: {
      city,
      state,
      zip: zipCode
    },
    programs: detailedSchool.programs || [],
    trainingType: detailedSchool.trainingType,
    fleetSize: fleetSize,
    primaryAircraft: detailedSchool.fleetDetails?.map((f: any) => f.aircraftType) || [],
    costBand: {
      ppl: detailedSchool.costBand?.min || 0,
      ir: detailedSchool.costBand?.min || 0,
      cpl: detailedSchool.costBand?.min || 0
    },
    instructorCount: detailedSchool.instructorCount || 0,
    trustTier: detailedSchool.trustTier || detailedSchool.verificationDetails?.trustTier,
    rating: {
      score: detailedSchool.avgRating || 0,
      reviewCount: detailedSchool.reviewCount || 0
    }
  };
}
