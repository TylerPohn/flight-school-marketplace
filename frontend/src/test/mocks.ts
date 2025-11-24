import { vi } from 'vitest';
import type { School } from '../types/school';

// Mock school data for testing
export const mockSchool: School = {
  id: 'test-school-1',
  name: 'Test Flight School',
  location: {
    city: 'Test City',
    state: 'TS',
    address: '123 Test St',
    zipCode: '12345',
  },
  contact: {
    phone: '555-0123',
    email: 'test@flightschool.com',
    website: 'https://testflightschool.com',
  },
  pricing: {
    hourlyRate: 150,
    programCost: 75000,
  },
  programs: ['Private Pilot', 'Instrument Rating'],
  features: ['Simulator Training', 'Career Services'],
  description: 'A test flight school for unit testing',
};

export const mockSchools: School[] = [
  mockSchool,
  {
    ...mockSchool,
    id: 'test-school-2',
    name: 'Another Test School',
    location: {
      city: 'Another City',
      state: 'AC',
      address: '456 Another St',
      zipCode: '67890',
    },
  },
];

// Mock functions for schoolsApi
export const mockGetSchoolsByIds = vi.fn().mockResolvedValue(mockSchools);
export const mockConvertToSimpleSchool = vi.fn((school: School) => school);

// Mock the entire schoolsApi module
vi.mock('../services/schoolsApi', () => ({
  getSchoolsByIds: mockGetSchoolsByIds,
  convertToSimpleSchool: mockConvertToSimpleSchool,
}));
