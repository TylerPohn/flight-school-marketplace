import type { School } from '../types/school';

export const mockSchools: School[] = [
  {
    id: 'school-001',
    name: 'AeroFlight Academy',
    location: {
      city: 'San Diego',
      state: 'CA',
      zip: '92101'
    },
    programs: ['PPL', 'IR', 'CPL', 'CFII'],
    trainingType: 'Part141',
    fleetSize: 12,
    primaryAircraft: ['Cessna 172', 'Piper Archer', 'Diamond DA40'],
    costBand: {
      ppl: 12500,
      ir: 5500,
      cpl: 8200
    },
    estimatedHoursToPPL: 65,
    instructorCount: 18,
    financingAvailable: true,
    trustTier: 'VERIFIED_FSP',
    rating: {
      score: 4.5,
      reviewCount: 23
    }
  },
  {
    id: 'school-002',
    name: 'Phoenix Sky Training',
    location: {
      city: 'Phoenix',
      state: 'AZ',
      zip: '85001'
    },
    programs: ['PPL', 'IR'],
    trainingType: 'Part61',
    fleetSize: 8,
    primaryAircraft: ['Cessna 172', 'Piper Cherokee'],
    costBand: {
      ppl: 11800,
      ir: 6200
    },
    estimatedHoursToPPL: 72,
    instructorCount: 10,
    financingAvailable: true,
    trustTier: 'UNVERIFIED',
    rating: {
      score: 4.2,
      reviewCount: 18
    }
  },
  {
    id: 'school-003',
    name: 'Austin Flight Center',
    location: {
      city: 'Austin',
      state: 'TX',
      zip: '78701'
    },
    programs: ['PPL', 'IR', 'CPL'],
    trainingType: 'Part141',
    fleetSize: 15,
    primaryAircraft: ['Cessna 172', 'Cirrus SR22'],
    costBand: {
      ppl: 13200,
      ir: 5200,
      cpl: 7800
    },
    estimatedHoursToPPL: 60,
    instructorCount: 22,
    financingAvailable: false,
    trustTier: 'COMMUNITY_VERIFIED',
    rating: {
      score: 4.7,
      reviewCount: 31
    }
  },
  {
    id: 'school-004',
    name: 'Miami Aviation Institute',
    location: {
      city: 'Miami',
      state: 'FL',
      zip: '33101'
    },
    programs: ['PPL', 'IR', 'CPL', 'ATPL'],
    trainingType: 'Part141',
    fleetSize: 20,
    primaryAircraft: ['Cessna 172', 'Piper Seminole', 'Diamond DA42'],
    costBand: {
      ppl: 14500,
      ir: 6800,
      cpl: 9200
    },
    estimatedHoursToPPL: 58,
    instructorCount: 28,
    financingAvailable: true,
    trustTier: 'PREMIER',
    rating: {
      score: 4.8,
      reviewCount: 45
    }
  },
  {
    id: 'school-005',
    name: 'Rocky Mountain Flight School',
    location: {
      city: 'Denver',
      state: 'CO',
      zip: '80201'
    },
    programs: ['PPL', 'IR'],
    trainingType: 'Part61',
    fleetSize: 6,
    primaryAircraft: ['Cessna 172', 'Cessna 182'],
    costBand: {
      ppl: 10500,
      ir: 4800
    },
    estimatedHoursToPPL: 68,
    instructorCount: 8,
    financingAvailable: false,
    trustTier: 'COMMUNITY_VERIFIED',
    rating: {
      score: 4.4,
      reviewCount: 12
    }
  },
  {
    id: 'school-006',
    name: 'Northwest Aviation Academy',
    location: {
      city: 'Seattle',
      state: 'WA',
      zip: '98101'
    },
    programs: ['PPL', 'IR', 'CPL', 'CFII'],
    trainingType: 'Part141',
    fleetSize: 14,
    primaryAircraft: ['Cessna 172', 'Diamond DA40', 'Piper Arrow'],
    costBand: {
      ppl: 13800,
      ir: 5900,
      cpl: 8500
    },
    estimatedHoursToPPL: 62,
    instructorCount: 16,
    financingAvailable: true,
    trustTier: 'VERIFIED_FSP',
    rating: {
      score: 4.6,
      reviewCount: 28
    }
  },
  {
    id: 'school-007',
    name: 'Boston Flight Academy',
    location: {
      city: 'Boston',
      state: 'MA',
      zip: '02101'
    },
    programs: ['PPL', 'IR', 'CPL'],
    trainingType: 'Part141',
    fleetSize: 10,
    primaryAircraft: ['Cessna 172', 'Piper Warrior'],
    costBand: {
      ppl: 15200,
      ir: 6500,
      cpl: 9000
    },
    estimatedHoursToPPL: 63,
    instructorCount: 14,
    financingAvailable: true,
    trustTier: 'PREMIER',
    rating: {
      score: 4.7,
      reviewCount: 36
    }
  },
  {
    id: 'school-008',
    name: 'Chicago Sky Institute',
    location: {
      city: 'Chicago',
      state: 'IL',
      zip: '60601'
    },
    programs: ['PPL', 'IR'],
    trainingType: 'Part61',
    fleetSize: 7,
    primaryAircraft: ['Cessna 172', 'Cessna 152'],
    costBand: {
      ppl: 11500,
      ir: 5000
    },
    estimatedHoursToPPL: 70,
    instructorCount: 9,
    financingAvailable: false,
    trustTier: 'COMMUNITY_VERIFIED',
    rating: {
      score: 4.3,
      reviewCount: 15
    }
  },
  {
    id: 'school-009',
    name: 'Las Vegas Flight Center',
    location: {
      city: 'Las Vegas',
      state: 'NV',
      zip: '89101'
    },
    programs: ['PPL', 'IR', 'CPL', 'ATPL'],
    trainingType: 'Part141',
    fleetSize: 18,
    primaryAircraft: ['Cessna 172', 'Piper Seminole', 'Cirrus SR22'],
    costBand: {
      ppl: 13900,
      ir: 6100,
      cpl: 8800
    },
    estimatedHoursToPPL: 61,
    instructorCount: 24,
    financingAvailable: true,
    trustTier: 'VERIFIED_FSP',
    rating: {
      score: 4.5,
      reviewCount: 32
    }
  },
  {
    id: 'school-010',
    name: 'Portland Aviation School',
    location: {
      city: 'Portland',
      state: 'OR',
      zip: '97201'
    },
    programs: ['PPL', 'IR'],
    trainingType: 'Part61',
    fleetSize: 5,
    primaryAircraft: ['Cessna 172', 'Piper Cherokee'],
    costBand: {
      ppl: 10800,
      ir: 4500
    },
    estimatedHoursToPPL: 74,
    instructorCount: 7,
    financingAvailable: false,
    trustTier: 'UNVERIFIED',
    rating: {
      score: 4.0,
      reviewCount: 8
    }
  },
  {
    id: 'school-011',
    name: 'Dallas Wings Academy',
    location: {
      city: 'Dallas',
      state: 'TX',
      zip: '75201'
    },
    programs: ['PPL', 'IR', 'CPL', 'CFII'],
    trainingType: 'Part141',
    fleetSize: 16,
    primaryAircraft: ['Cessna 172', 'Diamond DA40', 'Piper Seminole'],
    costBand: {
      ppl: 12900,
      ir: 5600,
      cpl: 8100
    },
    estimatedHoursToPPL: 64,
    instructorCount: 20,
    financingAvailable: true,
    trustTier: 'PREMIER',
    rating: {
      score: 4.8,
      reviewCount: 41
    }
  },
  {
    id: 'school-012',
    name: 'Atlanta Flight Training',
    location: {
      city: 'Atlanta',
      state: 'GA',
      zip: '30301'
    },
    programs: ['PPL', 'IR', 'CPL'],
    trainingType: 'Part61',
    fleetSize: 9,
    primaryAircraft: ['Cessna 172', 'Piper Archer'],
    costBand: {
      ppl: 11200,
      ir: 4900,
      cpl: 7500
    },
    estimatedHoursToPPL: 69,
    instructorCount: 11,
    financingAvailable: true,
    trustTier: 'COMMUNITY_VERIFIED',
    rating: {
      score: 4.4,
      reviewCount: 19
    }
  },
  {
    id: 'school-013',
    name: 'New York Aviation Center',
    location: {
      city: 'New York',
      state: 'NY',
      zip: '10001'
    },
    programs: ['PPL', 'IR', 'CPL', 'CFII', 'ATPL'],
    trainingType: 'Part141',
    fleetSize: 22,
    primaryAircraft: ['Cessna 172', 'Diamond DA40', 'Cirrus SR22', 'Piper Seminole'],
    costBand: {
      ppl: 16500,
      ir: 7200,
      cpl: 9800
    },
    estimatedHoursToPPL: 59,
    instructorCount: 32,
    financingAvailable: true,
    trustTier: 'PREMIER',
    rating: {
      score: 4.9,
      reviewCount: 52
    }
  },
  {
    id: 'school-014',
    name: 'Kansas City Flight School',
    location: {
      city: 'Kansas City',
      state: 'MO',
      zip: '64101'
    },
    programs: ['PPL', 'IR'],
    trainingType: 'Part61',
    fleetSize: 6,
    primaryAircraft: ['Cessna 172', 'Cessna 152'],
    costBand: {
      ppl: 10200,
      ir: 4300
    },
    estimatedHoursToPPL: 71,
    instructorCount: 8,
    financingAvailable: false,
    trustTier: 'COMMUNITY_VERIFIED',
    rating: {
      score: 4.2,
      reviewCount: 11
    }
  },
  {
    id: 'school-015',
    name: 'San Francisco Sky Academy',
    location: {
      city: 'San Francisco',
      state: 'CA',
      zip: '94101'
    },
    programs: ['PPL', 'IR', 'CPL', 'ATPL'],
    trainingType: 'Part141',
    fleetSize: 19,
    primaryAircraft: ['Cessna 172', 'Diamond DA40', 'Cirrus SR22', 'Diamond DA42'],
    costBand: {
      ppl: 17200,
      ir: 7500,
      cpl: 10200
    },
    estimatedHoursToPPL: 57,
    instructorCount: 26,
    financingAvailable: true,
    trustTier: 'PREMIER',
    rating: {
      score: 4.9,
      reviewCount: 48
    }
  }
];

export function getSchoolById(id: string): School | undefined {
  return mockSchools.find(school => school.id === id);
}

export function getSchoolsByIds(ids: string[]): School[] {
  return ids
    .map(id => getSchoolById(id))
    .filter((school): school is School => school !== undefined);
}
