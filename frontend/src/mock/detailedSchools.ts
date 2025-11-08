import { TrustTier } from '../types/trustTier';

// Extended School interface with all profile page fields
export interface DetailedSchool {
  schoolId: string;
  name: string;
  location: {
    city: string;
    state: string;
    zipCode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  programs: string[];
  costBand: {
    min: number;
    max: number;
  };
  trainingType: 'Part61' | 'Part141' | 'Both';
  trustTier: TrustTier;

  // Profile page fields
  description: string;
  yearsInOperation: number;
  facilities: string[];
  instructorCount: number;
  reviewCount: number;
  avgRating: number;
  heroImageUrl: string;

  // Detailed info
  fleetDetails: {
    aircraftType: string;
    count: number;
    maxAltitude: number;
    cruiseSpeed: number;
    equipment: string[];
    availability: 'High' | 'Medium' | 'Low';
  }[];

  instructors: {
    id: string;
    name: string;
    certificates: ('CFI' | 'CFII' | 'MEI' | 'ATP')[];
    yearsExperience: number;
    bio: string;
    photoUrl?: string;
  }[];

  programDetails: {
    name: string;
    certification: 'PPL' | 'IR' | 'CPL' | 'ATPL';
    durationHours: number;
    costMin: number;
    costMax: number;
    description: string;
  }[];

  reviews: {
    id: string;
    reviewerName: string;
    date: string;
    rating: number;
    title: string;
    body: string;
    helpful: number;
  }[];

  verificationDetails: {
    trustTier: string;
    verificationTimestamp: string;
    dataSources: string[];
    lastUpdated: string;
    fspSignals?: {
      avgHoursToPPL: number;
      scheduleConsistency: number;
      instructorReliability: number;
    };
  };

  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
}

export const detailedMockSchools: DetailedSchool[] = [
  {
    schoolId: 'school-001',
    name: 'SkyHigh Academy',
    location: {
      city: 'San Diego',
      state: 'CA',
      zipCode: '92108',
      coordinates: { lat: 32.7157, lng: -117.1611 }
    },
    programs: ['PPL', 'IR', 'CPL'],
    costBand: { min: 12000, max: 16000 },
    trainingType: 'Part141',
    trustTier: TrustTier.VERIFIED_FSP as TrustTier,

    description: `SkyHigh Academy has been a leader in pilot training since 2005. Located in sunny San Diego with ideal flying weather year-round, we pride ourselves on personalized instruction, modern aircraft, and an unwavering commitment to safety. With over 600 successful PPL completions, SkyHigh provides the ideal training environment for aspiring pilots. Our experienced instructors use proven teaching methodologies combined with state-of-the-art technology to accelerate your learning while maintaining the highest safety standards.`,

    yearsInOperation: 19,
    facilities: [
      'Flight Simulator (X-Plane 12)',
      'Ground School Classroom',
      'Maintenance Hangar',
      'Student Lounge',
      'Pilot Shop',
      'Weather Briefing Room'
    ],
    instructorCount: 12,
    reviewCount: 48,
    avgRating: 4.6,
    heroImageUrl: 'https://images.unsplash.com/photo-1552821881-721bb62b942f?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S',
        count: 6,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'GNS430', 'Intercom'],
        availability: 'High'
      },
      {
        aircraftType: 'Diamond DA40',
        count: 3,
        maxAltitude: 16400,
        cruiseSpeed: 135,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'Known-Ice'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper PA-44 Seminole',
        count: 2,
        maxAltitude: 20000,
        cruiseSpeed: 150,
        equipment: ['IFR', 'Autopilot', 'FIKI', 'Multi-Engine'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-001',
        name: 'Captain James Mitchell',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 15,
        bio: 'Former regional airline captain with 12,000+ flight hours. Specializes in IFR and complex aircraft training. Known for patience and clear communication.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-002',
        name: 'Sarah Chen',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 8,
        bio: 'Known for exceptional patience and clear explanations. Excellent with nervous students. Specializes in primary flight training and instrument instruction.',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-003',
        name: 'Michael Rodriguez',
        certificates: ['CFI', 'ATP'],
        yearsExperience: 10,
        bio: 'Recently transitioned from commercial aviation. Great mentor for students pursuing airline careers. Focuses on real-world scenarios and decision making.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 60,
        costMin: 12000,
        costMax: 15000,
        description: 'Learn to fly single-engine aircraft. Includes 40 flight hours, 20 ground instruction hours, and comprehensive exam preparation. Get your wings and explore the freedom of flight!'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 40,
        costMin: 8000,
        costMax: 10000,
        description: 'Master flight by instruments alone. 35 flight hours plus simulator time. Learn to fly in low visibility conditions and expand your capabilities as a pilot.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 50,
        costMin: 10000,
        costMax: 12000,
        description: 'Prepare to fly for compensation. Advanced maneuvers, commercial standards, and procedures. Your pathway to a professional flying career.'
      }
    ],

    reviews: [
      {
        id: 'review-001',
        reviewerName: 'Alex Thompson',
        date: '2025-10-15',
        rating: 5,
        title: 'Excellent PPL Training',
        body: 'SkyHigh provided me with top-notch instruction. Captain Mitchell was incredibly patient and knowledgeable. The fleet is well-maintained and modern. I felt safe and confident throughout my training and passed my checkride on the first attempt!',
        helpful: 23
      },
      {
        id: 'review-002',
        reviewerName: 'Jessica Lee',
        date: '2025-09-22',
        rating: 4,
        title: 'Great School, Minor Scheduling Issues',
        body: 'The instructors are fantastic and the curriculum is solid. Only issue was occasional difficulty getting consistent flight times during peak season. Overall, highly recommend for quality training!',
        helpful: 18
      },
      {
        id: 'review-003',
        reviewerName: 'David Martinez',
        date: '2025-08-10',
        rating: 5,
        title: 'Exceeded My Expectations',
        body: 'From my first discovery flight to my checkride, every step was professional and thorough. The simulator training was incredibly realistic and helped me master IFR procedures quickly.',
        helpful: 15
      },
      {
        id: 'review-004',
        reviewerName: 'Emma Wilson',
        date: '2025-07-05',
        rating: 4,
        title: 'Professional and Supportive',
        body: 'Great instructors who really cared about my progress. The only downside was the cost was slightly higher than some competitors, but absolutely worth it for the quality of instruction and aircraft.',
        helpful: 12
      },
      {
        id: 'review-005',
        reviewerName: 'Chris Anderson',
        date: '2025-06-18',
        rating: 5,
        title: 'Best Decision I Made',
        body: 'SkyHigh changed my life. Not just teaching flying, but building a community of pilots. Sarah was an amazing CFI and mentor who believed in me even when I doubted myself.',
        helpful: 28
      }
    ],

    verificationDetails: {
      trustTier: 'Verified FSP',
      verificationTimestamp: '2025-10-01T00:00:00Z',
      dataSources: ['FSP Integration', 'Claimed Profile', 'Student Reviews', 'FAA Records'],
      lastUpdated: '2025-11-01T00:00:00Z',
      fspSignals: {
        avgHoursToPPL: 62.3,
        scheduleConsistency: 87,
        instructorReliability: 91
      }
    },

    contactInfo: {
      email: 'info@skyhighacademy.com',
      phone: '(619) 555-0123',
      website: 'https://skyhighacademy.com'
    }
  },

  {
    schoolId: 'school-004',
    name: 'Sunshine Aviation Academy',
    location: {
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    programs: ['PPL', 'IR', 'CPL', 'ATPL'],
    costBand: { min: 45000, max: 65000 },
    trainingType: 'Part141',
    trustTier: TrustTier.PREMIER as TrustTier,

    description: `Sunshine Aviation Academy is South Florida's premier flight training institution, established in 2001. We specialize in accelerated training programs that take students from zero experience to airline-ready in as little as 12 months. Our state-of-the-art facility, diverse fleet, and experienced instructor team have produced over 1,200 professional pilots now flying for major airlines worldwide. With year-round VFR weather and proximity to complex airspace, Miami offers an ideal training environment for serious aviation students.`,

    yearsInOperation: 23,
    facilities: [
      'Advanced Flight Simulators (Level 5 FTD)',
      '5 Ground School Classrooms',
      'On-Site Maintenance Facility',
      'Student Housing (80 rooms)',
      'Fitness Center',
      'Cafeteria',
      'Career Services Office',
      'Alumni Network Hub'
    ],
    instructorCount: 28,
    reviewCount: 95,
    avgRating: 4.8,
    heroImageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S',
        count: 12,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'ADS-B', 'Intercom'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper PA-44 Seminole',
        count: 6,
        maxAltitude: 20000,
        cruiseSpeed: 150,
        equipment: ['IFR', 'Autopilot', 'Multi-Engine', 'G430'],
        availability: 'High'
      },
      {
        aircraftType: 'Diamond DA42',
        count: 4,
        maxAltitude: 18000,
        cruiseSpeed: 165,
        equipment: ['Glass Cockpit', 'FIKI', 'Multi-Engine', 'G1000'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper PA-28 Arrow',
        count: 3,
        maxAltitude: 16000,
        cruiseSpeed: 130,
        equipment: ['Complex', 'IFR', 'Retractable Gear', 'Constant Speed Prop'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-011',
        name: 'Captain Robert Hayes',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 22,
        bio: 'Former Boeing 737 captain with 18,000 flight hours. Chief flight instructor specializing in airline preparation and professional development. Mentored over 300 students to airline careers.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-012',
        name: 'Jennifer Park',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 12,
        bio: 'Specializes in multi-engine and instrument training. Former corporate pilot with extensive experience in high-performance aircraft. Known for thorough preparation and attention to detail.',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-013',
        name: 'Marcus Williams',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 7,
        bio: 'Recently transitioned from military aviation. Brings structured, disciplined approach to training. Excellent at building confidence in new pilots and teaching emergency procedures.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-014',
        name: 'Amanda Foster',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 9,
        bio: 'Specializes in primary flight training and building strong fundamental skills. Patient, encouraging teaching style perfect for nervous or anxious students. High first-time checkride pass rate.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 55,
        costMin: 13000,
        costMax: 16000,
        description: 'Accelerated PPL program with modern aircraft and experienced instructors. Includes ground school, flight training, and checkride preparation. Average completion: 8-10 weeks.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 40,
        costMin: 9000,
        costMax: 11000,
        description: 'Comprehensive instrument training with advanced simulators and real-world IFR flying in complex Miami airspace. Master precision flying in all weather conditions.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 55,
        costMin: 12000,
        costMax: 15000,
        description: 'Professional pilot training meeting commercial standards. Advanced maneuvers, complex aircraft operations, and airline-oriented procedures. Your gateway to professional aviation.'
      },
      {
        name: 'Airline Transport Pilot (ATPL)',
        certification: 'ATPL',
        durationHours: 250,
        costMin: 45000,
        costMax: 65000,
        description: 'Complete zero-to-airline program. Includes all ratings, multi-engine time, and CTP course. Career placement assistance with partner airlines. Most comprehensive program available.'
      }
    ],

    reviews: [
      {
        id: 'review-021',
        reviewerName: 'Ryan Cooper',
        date: '2025-10-20',
        rating: 5,
        title: 'World-Class Training Facility',
        body: 'Sunshine Aviation exceeded every expectation. The instructors are professional, the aircraft are immaculate, and the facilities rival major airlines. I completed my PPL through ATPL here and now fly for a regional carrier. Worth every penny!',
        helpful: 45
      },
      {
        id: 'review-022',
        reviewerName: 'Maria Santos',
        date: '2025-09-15',
        rating: 5,
        title: 'From Zero to Airline Pilot',
        body: 'Completed the full ATPL program in 13 months. The structured curriculum, experienced instructors, and career services made all the difference. Just accepted a position with a major airline. Dreams do come true!',
        helpful: 38
      },
      {
        id: 'review-023',
        reviewerName: 'Kevin Nguyen',
        date: '2025-08-28',
        rating: 4,
        title: 'Excellent Training, Premium Price',
        body: 'Outstanding quality training with top-notch instructors and equipment. The cost is significantly higher than other schools, but the accelerated timeline and job placement support justify the investment.',
        helpful: 31
      },
      {
        id: 'review-024',
        reviewerName: 'Lisa Johnson',
        date: '2025-07-19',
        rating: 5,
        title: 'Best Investment in My Future',
        body: 'Captain Hayes and the entire team were incredible. The multi-engine training was thorough, the simulators are amazing, and the alumni network helped me land my first flying job within weeks of completing my ratings.',
        helpful: 27
      },
      {
        id: 'review-025',
        reviewerName: 'Daniel Kim',
        date: '2025-06-10',
        rating: 5,
        title: 'Premier Training Institution',
        body: 'Everything about Sunshine Aviation screams professionalism. From the immaculate facilities to the experienced instructors, this school prepares you for a real aviation career, not just to pass a checkride.',
        helpful: 42
      }
    ],

    verificationDetails: {
      trustTier: 'Premier',
      verificationTimestamp: '2025-09-15T00:00:00Z',
      dataSources: ['FSP Integration', 'Claimed Profile', 'Student Reviews', 'FAA Records', 'Airline Partnerships'],
      lastUpdated: '2025-11-01T00:00:00Z',
      fspSignals: {
        avgHoursToPPL: 55.8,
        scheduleConsistency: 94,
        instructorReliability: 96
      }
    },

    contactInfo: {
      email: 'admissions@sunshineaviation.com',
      phone: '(305) 555-0198',
      website: 'https://sunshineaviation.com'
    }
  },

  {
    schoolId: 'school-002',
    name: 'AeroFlight Training',
    location: {
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      coordinates: { lat: 32.8975, lng: -97.0382 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 14000, max: 18000 },
    trainingType: 'Part61',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,

    description: `AeroFlight Training has served the Dallas-Fort Worth metroplex since 2012. We offer flexible, personalized flight training for recreational pilots and career-oriented students alike. Our Part 61 approach allows for customized training schedules perfect for working professionals and students. With a focus on small class sizes and individual attention, our experienced instructors ensure each student receives the guidance they need to succeed. Located at a non-towered airport, students gain valuable experience in both controlled and uncontrolled airspace.`,

    yearsInOperation: 12,
    facilities: [
      'Ground School Classroom',
      'Flight Planning Room',
      'Student Lounge',
      'Weather Station',
      'Maintenance Shop'
    ],
    instructorCount: 8,
    reviewCount: 34,
    avgRating: 4.3,
    heroImageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Piper Cherokee 140',
        count: 3,
        maxAltitude: 12000,
        cruiseSpeed: 108,
        equipment: ['Standard Six Pack', 'Nav/Com', 'Transponder'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 172N',
        count: 4,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Standard Avionics', 'Nav/Com', 'VOR', 'ADF'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 172SP',
        count: 2,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['GPS (GNS430)', 'IFR Certified', 'Autopilot'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-021',
        name: 'John Stevens',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 18,
        bio: 'Owner and chief instructor. Former corporate pilot with diverse flying experience. Emphasizes stick and rudder skills and real-world decision making. Makes learning fun and practical.',
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-022',
        name: 'Rachel Turner',
        certificates: ['CFI'],
        yearsExperience: 5,
        bio: 'Specializes in primary flight training and building student confidence. Patient teaching style with focus on fundamentals. Excellent at explaining complex concepts in simple terms.',
        photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-023',
        name: 'Tom Bradley',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 11,
        bio: 'Instrument specialist with extensive cross-country experience. Focuses on practical IFR flying and real-world weather decision making. Known for thorough pre-flight briefings.',
        photoUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 70,
        costMin: 14000,
        costMax: 17000,
        description: 'Flexible Part 61 training customized to your schedule and learning pace. Includes comprehensive ground school, flight training, and checkride prep. Train at your own pace with experienced instructors.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 45,
        costMin: 9500,
        costMax: 11500,
        description: 'Practical instrument training focused on real-world flying. Learn to safely navigate through clouds and low visibility. Extensive practice in actual IFR conditions when available.'
      }
    ],

    reviews: [
      {
        id: 'review-031',
        reviewerName: 'Mike Patterson',
        date: '2025-10-08',
        rating: 5,
        title: 'Perfect for Working Professionals',
        body: 'John and his team were incredibly flexible with my work schedule. The Part 61 approach let me train at my own pace without pressure. Earned my PPL in 6 months while working full-time. Highly recommended!',
        helpful: 19
      },
      {
        id: 'review-032',
        reviewerName: 'Susan Clark',
        date: '2025-09-02',
        rating: 4,
        title: 'Great Small School Atmosphere',
        body: 'Really enjoyed the personal attention and small school feel. The older aircraft are well-maintained and perfect for learning fundamentals. Would prefer newer avionics but cant beat the friendly atmosphere.',
        helpful: 14
      },
      {
        id: 'review-033',
        reviewerName: 'James Rodriguez',
        date: '2025-07-21',
        rating: 4,
        title: 'Solid Training, Fair Prices',
        body: 'Got my instrument rating here after getting my PPL elsewhere. Tom is an excellent IFR instructor who focuses on practical skills. Prices are reasonable for the DFW area. Good value for the money.',
        helpful: 11
      },
      {
        id: 'review-034',
        reviewerName: 'Emily White',
        date: '2025-06-15',
        rating: 5,
        title: 'Felt Like Family',
        body: 'As a nervous student, Rachel made me feel comfortable from day one. The whole team is supportive and encouraging. Small school means you get to know everyone. Made lifelong friends here!',
        helpful: 16
      },
      {
        id: 'review-035',
        reviewerName: 'Robert Chen',
        date: '2025-05-28',
        rating: 4,
        title: 'Good Experience Overall',
        body: 'Completed my private pilot training here over 8 months. Instructors are knowledgeable and patient. Aircraft are older but reliable. Great place to learn without the pressure of a big school.',
        helpful: 9
      }
    ],

    verificationDetails: {
      trustTier: 'Community-Verified',
      verificationTimestamp: '2025-08-20T00:00:00Z',
      dataSources: ['Claimed Profile', 'Student Reviews', 'Community Feedback'],
      lastUpdated: '2025-10-28T00:00:00Z'
    },

    contactInfo: {
      email: 'info@aeroflightdfw.com',
      phone: '(214) 555-0145',
      website: 'https://aeroflightdfw.com'
    }
  },

  {
    schoolId: 'school-003',
    name: 'Cloudchaser Flight Center',
    location: {
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      coordinates: { lat: 33.4484, lng: -112.0742 }
    },
    programs: ['PPL', 'CPL'],
    costBand: { min: 11000, max: 14000 },
    trainingType: 'Part141',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: `Cloudchaser Flight Center is Phoenix's newest flight school, established in 2023. We bring fresh energy and modern training techniques to the Valley of the Sun. Our accelerated Part 141 programs utilize the latest technology and teaching methods to help you achieve your aviation goals efficiently and affordably. With 300+ days of VFR weather annually, Phoenix offers ideal conditions for intensive training. Our young, energetic instructor team is building a reputation for excellence and innovation in flight training.`,

    yearsInOperation: 2,
    facilities: [
      'Modern Ground School Room',
      'Flight Planning Station',
      'Student Break Room',
      'Video Debriefing Suite'
    ],
    instructorCount: 6,
    reviewCount: 12,
    avgRating: 4.1,
    heroImageUrl: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S',
        count: 4,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['G1000 Glass Cockpit', 'Autopilot', 'ADS-B Out', 'Intercom'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 152',
        count: 2,
        maxAltitude: 12000,
        cruiseSpeed: 95,
        equipment: ['Standard Avionics', 'Nav/Com', 'Economical'],
        availability: 'High'
      }
    ],

    instructors: [
      {
        id: 'instr-031',
        name: 'Kyle Morrison',
        certificates: ['CFI'],
        yearsExperience: 4,
        bio: 'Owner and lead instructor. Recent professional pilot building modern flight school. Enthusiastic about aviation and dedicated to student success. Focuses on scenario-based training.',
        photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-032',
        name: 'Ashley Davis',
        certificates: ['CFI'],
        yearsExperience: 3,
        bio: 'Young instructor passionate about teaching fundamentals. Uses modern technology and apps to enhance learning. Great at connecting with younger students and building confidence.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-033',
        name: 'Brian Hughes',
        certificates: ['CFI'],
        yearsExperience: 6,
        bio: 'Experienced instructor bringing expertise from previous schools. Focuses on efficient, effective training. Known for clear explanations and structured lesson plans.',
        photoUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 65,
        costMin: 11000,
        costMax: 13500,
        description: 'Affordable accelerated PPL training in modern aircraft. Structured Part 141 curriculum with flexible scheduling. Perfect Arizona weather means fewer cancelled lessons and faster completion.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 55,
        costMin: 12000,
        costMax: 14000,
        description: 'Professional pilot training at competitive prices. Build commercial skills and requirements efficiently. Designed for students serious about an aviation career.'
      }
    ],

    reviews: [
      {
        id: 'review-041',
        reviewerName: 'Tyler Anderson',
        date: '2025-10-01',
        rating: 5,
        title: 'Great New School!',
        body: 'Took a chance on this new school and so glad I did! Kyle is an excellent instructor who really cares about his students. Modern aircraft and fair prices. Excited to see this school grow!',
        helpful: 8
      },
      {
        id: 'review-042',
        reviewerName: 'Jennifer Brown',
        date: '2025-09-10',
        rating: 4,
        title: 'Good Value Training',
        body: 'Good training at reasonable prices. Aircraft are newer than many schools. Being new, they are still working out some operational kinks, but the instruction quality is solid. Would recommend.',
        helpful: 6
      },
      {
        id: 'review-043',
        reviewerName: 'Mark Wilson',
        date: '2025-08-15',
        rating: 4,
        title: 'Modern Approach to Training',
        body: 'Appreciate the use of technology and modern teaching methods. The G1000 aircraft are great for learning glass cockpit from the start. Wish they had more aircraft to reduce scheduling conflicts.',
        helpful: 5
      },
      {
        id: 'review-044',
        reviewerName: 'Sarah Martinez',
        date: '2025-07-20',
        rating: 4,
        title: 'Positive Experience',
        body: 'Ashley was my instructor and made learning to fly fun and engaging. The school is small but friendly. Good communication and professional operation. Happy with my training so far!',
        helpful: 4
      },
      {
        id: 'review-045',
        reviewerName: 'Chris Taylor',
        date: '2025-06-25',
        rating: 4,
        title: 'Solid Training Program',
        body: 'Completed my PPL here in 3 months. The structured Part 141 program kept me on track. Instructors are young but knowledgeable. Good option for budget-conscious students in Phoenix.',
        helpful: 7
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2025-10-15T00:00:00Z',
      dataSources: ['Claimed Profile', 'Student Reviews'],
      lastUpdated: '2025-10-25T00:00:00Z'
    },

    contactInfo: {
      email: 'fly@cloudchaserflight.com',
      phone: '(602) 555-0167',
      website: 'https://cloudchaserflight.com'
    }
  },

  {
    schoolId: 'school-005',
    name: 'Rocky Mountain Flight School',
    location: {
      city: 'Denver',
      state: 'CO',
      zipCode: '80201',
      coordinates: { lat: 39.7392, lng: -104.9903 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 13000, max: 17000 },
    trainingType: 'Part61',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,

    description: `Rocky Mountain Flight School has been training pilots in the Colorado high country since 2008. We specialize in mountain flying and high-altitude operations, providing unique training opportunities you won't find at sea-level schools. Our experienced instructors teach essential mountain flying techniques including density altitude operations, mountain wave awareness, and high-altitude airport procedures. Located at Centennial Airport, students gain valuable experience in high-density airspace while learning skills applicable anywhere in the world. Perfect for pilots who want comprehensive training in challenging environments.`,

    yearsInOperation: 16,
    facilities: [
      'Ground School Classroom',
      'Flight Planning Station',
      'Student Lounge with Mountain Views',
      'Weather Briefing Room',
      'Maintenance Facility'
    ],
    instructorCount: 10,
    reviewCount: 41,
    avgRating: 4.5,
    heroImageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S',
        count: 5,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['G1000 Glass Cockpit', 'Autopilot', 'High-Altitude Performance'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 182T',
        count: 2,
        maxAltitude: 18900,
        cruiseSpeed: 145,
        equipment: ['High Performance', 'G1000', 'Mountain Flying Capable'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Diamond DA40',
        count: 3,
        maxAltitude: 16400,
        cruiseSpeed: 135,
        equipment: ['Glass Cockpit', 'Excellent High-Altitude Performance'],
        availability: 'High'
      }
    ],

    instructors: [
      {
        id: 'instr-041',
        name: 'Dave Sullivan',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 20,
        bio: 'Mountain flying specialist with extensive backcountry experience. Former search and rescue pilot. Passionate about teaching high-altitude operations and mountain flying safety.',
        photoUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-042',
        name: 'Laura Bennett',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 12,
        bio: 'Specializes in instrument training in mountainous terrain. Excellent at teaching weather decision-making and risk management. Known for thorough, safety-focused instruction.',
        photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-043',
        name: 'Jack Morrison',
        certificates: ['CFI'],
        yearsExperience: 8,
        bio: 'Colorado native with deep knowledge of local flying conditions. Focuses on building strong fundamental skills and mountain flying competency. Patient and encouraging teaching style.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 68,
        costMin: 13000,
        costMax: 16000,
        description: 'Comprehensive PPL training with emphasis on high-altitude operations and mountain flying. Learn skills that will serve you anywhere. Includes mountain flying endorsement upon completion.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 42,
        costMin: 10000,
        costMax: 12000,
        description: 'IFR training in challenging mountain terrain and weather. Learn to safely navigate complex mountain meteorology and terrain. Real-world skills for serious pilots.'
      }
    ],

    reviews: [
      {
        id: 'review-051',
        reviewerName: 'Steve Johnson',
        date: '2025-09-25',
        rating: 5,
        title: 'Best Mountain Flying Training',
        body: 'Dave is an incredible instructor with vast mountain flying experience. The training here prepared me for flying anywhere in the country. The high-altitude skills are invaluable. Highly recommended!',
        helpful: 22
      },
      {
        id: 'review-052',
        reviewerName: 'Michelle Adams',
        date: '2025-08-30',
        rating: 4,
        title: 'Great Training, Weather Challenges',
        body: 'Excellent instruction and unique mountain flying focus. Be prepared for weather cancellations in winter - its part of mountain flying! Laura was thorough and professional. Glad I trained here.',
        helpful: 17
      },
      {
        id: 'review-053',
        reviewerName: 'Paul Davis',
        date: '2025-07-18',
        rating: 5,
        title: 'Comprehensive Training Program',
        body: 'Got my IR here and the mountain weather decision-making training was second to none. Learned practical skills I use on every flight. Worth the extra time dealing with altitude performance.',
        helpful: 19
      },
      {
        id: 'review-054',
        reviewerName: 'Karen White',
        date: '2025-06-20',
        rating: 5,
        title: 'Professional and Thorough',
        body: 'Jack was my instructor and made learning in the mountains feel safe and manageable. The fleet is well-maintained and perfectly suited for high-altitude training. Great school overall!',
        helpful: 14
      },
      {
        id: 'review-055',
        reviewerName: 'Tom Richards',
        date: '2025-05-15',
        rating: 4,
        title: 'Unique Training Environment',
        body: 'Training at 5,800 feet elevation teaches you skills flat-land schools cant. Density altitude awareness is second nature after training here. Would recommend for serious students.',
        helpful: 13
      }
    ],

    verificationDetails: {
      trustTier: 'Community-Verified',
      verificationTimestamp: '2025-09-01T00:00:00Z',
      dataSources: ['Claimed Profile', 'Student Reviews', 'Community Feedback'],
      lastUpdated: '2025-10-20T00:00:00Z'
    },

    contactInfo: {
      email: 'info@rockymountainflight.com',
      phone: '(303) 555-0189',
      website: 'https://rockymountainflight.com'
    }
  }
];

export function getDetailedSchoolById(schoolId: string): DetailedSchool | undefined {
  return detailedMockSchools.find(school => school.schoolId === schoolId);
}
