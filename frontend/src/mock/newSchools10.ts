import { TrustTier } from '../types/trustTier';
import type { DetailedSchool } from './detailedSchools';

export const newSchools: DetailedSchool[] = [
  // School 1: Boston, MA - Verified FSP, Part 141, Full Stack
  {
    schoolId: 'school-018',
    name: 'New England Aviation Institute',
    location: {
      city: 'Boston',
      state: 'MA',
      zipCode: '02128',
      coordinates: { lat: 42.3656, lng: -71.0096 }
    },
    programs: ['PPL', 'IR', 'CPL', 'ATPL'],
    costBand: { min: 15000, max: 22000 },
    trainingType: 'Part141',
    trustTier: TrustTier.VERIFIED_FSP as TrustTier,

    description: `New England Aviation Institute, established in 1998, is Boston's premier flight training facility. Located at Boston Logan International Airport, we offer students unparalleled exposure to complex airspace operations and real-world IFR training. Our comprehensive programs prepare pilots for professional aviation careers with a focus on precision, safety, and decision-making in challenging Northeast weather conditions.`,

    yearsInOperation: 26,
    facilities: [
      'Redbird FMX Full Motion Simulator',
      'Glass Cockpit Training Center',
      'Ground School Classrooms (4)',
      'Weather Briefing Room',
      'Student Lounge with Flight Planning Stations',
      'Maintenance Facility',
      'Pilot Supply Shop',
      'Career Placement Center'
    ],
    instructorCount: 14,
    reviewCount: 89,
    avgRating: 4.7,
    heroImageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S (G1000)',
        count: 8,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'WAAS GPS', 'ADS-B Out'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Archer III',
        count: 4,
        maxAltitude: 14250,
        cruiseSpeed: 128,
        equipment: ['Garmin G500 TXi', 'GNS430W', 'Autopilot', 'ADS-B'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Arrow (Complex)',
        count: 3,
        maxAltitude: 16200,
        cruiseSpeed: 145,
        equipment: ['Garmin GTN 650', 'Autopilot', 'Retractable Gear', 'Constant Speed Prop'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Seminole (Multi)',
        count: 2,
        maxAltitude: 17200,
        cruiseSpeed: 160,
        equipment: ['Garmin G500 TXi', 'Dual G5s', 'Multi-Engine', 'IFR Certified'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-018-1',
        name: 'Captain Jennifer Walsh',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 18,
        bio: 'Former JetBlue captain with 15,000+ hours. Specializes in airline preparation and CRM training. Known for systematic approach to instrument flying.',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-018-2',
        name: 'David Kowalski',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 12,
        bio: 'Corporate aviation background with extensive glass cockpit experience. Excellent at teaching complex airspace operations and weather decision-making.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-018-3',
        name: 'Maria Santos',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 7,
        bio: 'Patient instructor with a talent for breaking down complex concepts. Specializes in primary training and building solid fundamentals.',
        photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-018-4',
        name: 'Thomas Chen',
        certificates: ['CFI', 'ATP'],
        yearsExperience: 15,
        bio: 'Former military instructor pilot transitioning to commercial aviation. Brings disciplined approach and scenario-based training methodology.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 55,
        costMin: 15000,
        costMax: 18000,
        description: 'FAA Part 141 structured program with accelerated timeline. Includes 45 flight hours in modern glass cockpit aircraft, comprehensive ground school, and exam preparation. Experience Boston Class B operations from day one.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 40,
        costMin: 10000,
        costMax: 12000,
        description: 'Master IFR operations in real-world challenging weather. Train in actual IMC conditions with experienced CFII instructors. Includes simulator time and extensive cross-country IFR experience.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 50,
        costMin: 12000,
        costMax: 15000,
        description: 'Professional pilot training with emphasis on precision and commercial standards. Complex aircraft training, advanced maneuvers, and career preparation included.'
      },
      {
        name: 'Airline Transport Pilot (ATPL)',
        certification: 'ATPL',
        durationHours: 80,
        costMin: 18000,
        costMax: 22000,
        description: 'Complete airline preparation program. Multi-engine training, CRM, high-altitude operations, and type-specific systems training. Career placement assistance included.'
      }
    ],

    reviews: [
      {
        id: 'rev-018-1',
        reviewerName: 'Michael Thompson',
        date: '2024-08-15',
        rating: 5,
        title: 'Best Decision I Ever Made',
        body: 'The quality of instruction at NEAI is unmatched. Training at Logan gave me incredible experience with busy airspace that prepared me perfectly for my airline career. The glass cockpit fleet is well-maintained and the instructors genuinely care about your success.',
        helpful: 23
      },
      {
        id: 'rev-018-2',
        reviewerName: 'Sarah Kim',
        date: '2024-06-22',
        rating: 5,
        title: 'Excellent Instrument Training',
        body: 'Got my IR here and the quality was exceptional. Flying in actual IMC with experienced instructors built my confidence tremendously. The simulator training was also incredibly valuable for procedures practice.',
        helpful: 18
      },
      {
        id: 'rev-018-3',
        reviewerName: 'James Rodriguez',
        date: '2024-04-10',
        rating: 4,
        title: 'Great Program, Pricey but Worth It',
        body: 'Not going to lie, training in Boston is expensive. But you get what you pay for - modern aircraft, excellent instructors, and real-world experience you cannot get at a small airport. Highly recommend if you are serious about aviation career.',
        helpful: 15
      },
      {
        id: 'rev-018-4',
        reviewerName: 'Emily Foster',
        date: '2024-01-30',
        rating: 5,
        title: 'Professional and Thorough',
        body: 'The Part 141 structure kept me on track and moving efficiently through my training. Instructors are professional and the scheduling system works well. Already miss flying the Archer!',
        helpful: 12
      }
    ],

    verificationDetails: {
      trustTier: 'Verified FSP',
      verificationTimestamp: '2024-01-15T10:00:00Z',
      dataSources: ['FAA Registry', 'Flight School Profiles', 'Student Reviews', 'AOPA Database'],
      lastUpdated: '2024-11-01',
      fspSignals: {
        avgHoursToPPL: 52,
        scheduleConsistency: 94,
        instructorReliability: 96
      }
    },

    contactInfo: {
      email: 'info@neai-aviation.com',
      phone: '(617) 555-2840',
      website: 'https://neai-aviation.com'
    }
  },

  // School 2: Atlanta, GA - Community-Verified, Both, PPL+IR+CPL
  {
    schoolId: 'school-019',
    name: 'Peachtree Flight Academy',
    location: {
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30341',
      coordinates: { lat: 33.8792, lng: -84.3020 }
    },
    programs: ['PPL', 'IR', 'CPL'],
    costBand: { min: 10000, max: 16000 },
    trainingType: 'Both',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,

    description: `Peachtree Flight Academy brings Southern hospitality to pilot training. Located at DeKalb-Peachtree Airport, we offer both Part 61 and Part 141 training with flexible scheduling for working professionals. Our year-round VFR weather and experienced instructors create the perfect environment for efficient, enjoyable flight training. Family-owned since 2008, we treat every student like part of the Peachtree family.`,

    yearsInOperation: 16,
    facilities: [
      'Frasca Flight Simulator',
      'Ground School Classroom',
      'Student Lounge with Coffee Bar',
      'Flight Planning Room',
      'Pilot Shop',
      'Covered Aircraft Parking'
    ],
    instructorCount: 9,
    reviewCount: 62,
    avgRating: 4.5,
    heroImageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172N',
        count: 5,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'Transponder', 'ADS-B Out', 'GPS'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 172SP (G1000)',
        count: 3,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'WAAS GPS'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Cherokee 180',
        count: 2,
        maxAltitude: 14300,
        cruiseSpeed: 125,
        equipment: ['Dual Nav/Com', 'IFR Certified', 'GPS', 'Intercom'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-019-1',
        name: 'Robert "Bobby" Williams',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 20,
        bio: 'Chief flight instructor and owner. Retired Delta pilot with a passion for teaching. Known for making complex topics simple and fun.',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-019-2',
        name: 'Lisa Anderson',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 8,
        bio: 'Excellent with nervous students and building confidence. Specializes in tailored instruction based on individual learning styles.',
        photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-019-3',
        name: 'Marcus Johnson',
        certificates: ['CFI', 'ATP'],
        yearsExperience: 11,
        bio: 'Former cargo pilot bringing real-world experience to training. Great at teaching weather decision-making and risk management.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 65,
        costMin: 10000,
        costMax: 13000,
        description: 'Flexible Part 61 or structured Part 141 training. Train at your own pace with Atlanta perfect flying weather year-round. Includes ground school, flight training, and checkride preparation.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 45,
        costMin: 8500,
        costMax: 11000,
        description: 'Master instrument flight in Atlanta busy airspace. Comprehensive training with both traditional and glass cockpit aircraft options. Simulator time included.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 55,
        costMin: 11000,
        costMax: 14000,
        description: 'Professional pilot certification with emphasis on commercial maneuvers and standards. Career counseling and job placement assistance available.'
      }
    ],

    reviews: [
      {
        id: 'rev-019-1',
        reviewerName: 'Tyler Jackson',
        date: '2024-09-05',
        rating: 5,
        title: 'Friendly Atmosphere, Quality Training',
        body: 'Bobby and the team made my PPL journey enjoyable from start to finish. The flexibility to schedule around my work was crucial. Aircraft are older but very well maintained. Would absolutely recommend!',
        helpful: 19
      },
      {
        id: 'rev-019-2',
        reviewerName: 'Amanda White',
        date: '2024-07-12',
        rating: 4,
        title: 'Great Value',
        body: 'Completed my instrument rating here. Pricing was very fair compared to other Atlanta schools. Lisa was an excellent instructor - patient and thorough. Only wish they had more complex aircraft.',
        helpful: 14
      },
      {
        id: 'rev-019-3',
        reviewerName: 'Chris Martinez',
        date: '2024-05-20',
        rating: 5,
        title: 'Like Family',
        body: 'This is not a big corporate flight school - it is a family business and you can tell they care. Every instructor I flew with was knowledgeable and friendly. Great experience overall.',
        helpful: 16
      },
      {
        id: 'rev-019-4',
        reviewerName: 'Jennifer Brown',
        date: '2024-03-15',
        rating: 4,
        title: 'Solid Training Program',
        body: 'Good school with experienced instructors. The Part 141 program kept me on schedule. Facilities are not fancy but everything you need is there. Would train here again.',
        helpful: 11
      }
    ],

    verificationDetails: {
      trustTier: 'Community-Verified',
      verificationTimestamp: '2024-03-20T14:30:00Z',
      dataSources: ['FAA Registry', 'Student Reviews', 'Google Reviews'],
      lastUpdated: '2024-10-28'
    },

    contactInfo: {
      email: 'fly@peachtreeflight.com',
      phone: '(404) 555-7291',
      website: 'https://peachtreeflightacademy.com'
    }
  },

  // School 3: Minneapolis, MN - Verified FSP, Part 141, PPL+IR+CPL
  {
    schoolId: 'school-020',
    name: 'North Star Aviation Training',
    location: {
      city: 'Minneapolis',
      state: 'MN',
      zipCode: '55450',
      coordinates: { lat: 44.8848, lng: -93.2223 }
    },
    programs: ['PPL', 'IR', 'CPL'],
    costBand: { min: 11000, max: 17000 },
    trainingType: 'Part141',
    trustTier: TrustTier.VERIFIED_FSP as TrustTier,

    description: `North Star Aviation Training has been preparing Minnesota pilots since 2001. Our Part 141 programs emphasize safety, precision, and real-world scenario training in all four seasons. Located at Flying Cloud Airport, we provide students with diverse weather experience - from perfect VFR days to challenging winter operations. Our modern fleet and experienced instructors ensure you are prepared for any conditions you will encounter as a pilot.`,

    yearsInOperation: 23,
    facilities: [
      'Redbird TD2 Simulator',
      'Heated Hangars',
      'Ground School Classrooms (3)',
      'Weather Briefing Station',
      'Student Lounge',
      'Maintenance Shop',
      'Pilot Supply Store'
    ],
    instructorCount: 11,
    reviewCount: 74,
    avgRating: 4.6,
    heroImageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S (G1000)',
        count: 6,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'WAAS GPS', 'Heated Pitot'],
        availability: 'High'
      },
      {
        aircraftType: 'Diamond DA40',
        count: 4,
        maxAltitude: 16400,
        cruiseSpeed: 135,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'Fuel Efficient', 'Modern Avionics'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Arrow (Complex)',
        count: 2,
        maxAltitude: 16200,
        cruiseSpeed: 145,
        equipment: ['Garmin GTN 650', 'Autopilot', 'Retractable Gear', 'Constant Speed Prop'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-020-1',
        name: 'Captain Erik Larson',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 17,
        bio: 'Chief instructor with extensive airline and corporate experience. Expert in winter operations and weather systems. Passionate about building confident, competent pilots.',
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-020-2',
        name: 'Rachel Peterson',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 9,
        bio: 'Known for patient, methodical instruction. Specializes in helping students overcome learning plateaus. Excellent at teaching instrument approaches.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-020-3',
        name: 'David Nguyen',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 12,
        bio: 'Former military pilot with structured teaching approach. Emphasizes precision flying and emergency procedures. Great mentor for career-focused students.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-020-4',
        name: 'Sarah Johnson',
        certificates: ['CFI', 'ATP'],
        yearsExperience: 14,
        bio: 'Regional airline first officer who loves teaching. Brings current airline procedures and best practices to instruction. Excellent systems knowledge.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 58,
        costMin: 11000,
        costMax: 14000,
        description: 'Comprehensive Part 141 program with emphasis on all-weather operations. Learn to fly safely in Minnesota diverse weather conditions. Modern glass cockpit training included.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 42,
        costMin: 9000,
        costMax: 11500,
        description: 'Master IFR flight in real IMC conditions. Extensive actual instrument time with experienced CFII. Simulator training for procedures and emergency scenarios.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 52,
        costMin: 11500,
        costMax: 14500,
        description: 'Professional pilot training with complex aircraft. Advanced maneuvers, commercial cross-countries, and checkride preparation. Career planning guidance included.'
      }
    ],

    reviews: [
      {
        id: 'rev-020-1',
        reviewerName: 'Kevin Anderson',
        date: '2024-08-28',
        rating: 5,
        title: 'Excellent Winter Training Experience',
        body: 'Training here through a Minnesota winter was challenging but incredibly valuable. The instructors expertise in cold weather operations is unmatched. Now I can fly confidently in any weather.',
        helpful: 21
      },
      {
        id: 'rev-020-2',
        reviewerName: 'Michelle Roberts',
        date: '2024-06-15',
        rating: 5,
        title: 'Top-Notch Instruction',
        body: 'Erik and the team are professional and thorough. The Part 141 structure kept me on track and the modern fleet made learning enjoyable. Highly recommend for serious students.',
        helpful: 17
      },
      {
        id: 'rev-020-3',
        reviewerName: 'Brian Lee',
        date: '2024-04-22',
        rating: 4,
        title: 'Great School, Weather Can Be Challenging',
        body: 'Quality training and good aircraft. Winter did slow down my training pace due to weather, but that is Minnesota for you. The experience I gained in different conditions was worth it.',
        helpful: 13
      },
      {
        id: 'rev-020-4',
        reviewerName: 'Ashley Miller',
        date: '2024-02-10',
        rating: 5,
        title: 'Built My Confidence',
        body: 'Rachel was an amazing instructor who helped me overcome my fear of instrument flying. The simulator practice was incredibly helpful before flying actual approaches. Could not have asked for better training.',
        helpful: 19
      }
    ],

    verificationDetails: {
      trustTier: 'Verified FSP',
      verificationTimestamp: '2024-02-10T09:15:00Z',
      dataSources: ['FAA Registry', 'Flight School Profiles', 'Student Reviews', 'AOPA Database'],
      lastUpdated: '2024-11-02',
      fspSignals: {
        avgHoursToPPL: 56,
        scheduleConsistency: 88,
        instructorReliability: 93
      }
    },

    contactInfo: {
      email: 'info@northstaraviation.com',
      phone: '(612) 555-4892',
      website: 'https://northstaraviation.com'
    }
  },

  // School 4: Las Vegas, NV - Unverified, Part 61, PPL+IR
  {
    schoolId: 'school-021',
    name: 'Desert Sky Flight School',
    location: {
      city: 'Las Vegas',
      state: 'NV',
      zipCode: '89119',
      coordinates: { lat: 36.0801, lng: -115.1522 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 9500, max: 14000 },
    trainingType: 'Part61',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: `Desert Sky Flight School opened in 2020, bringing affordable, personalized flight training to Las Vegas. With 340+ days of sunshine per year and minimal weather delays, we offer one of the most efficient training environments in the country. Our small class sizes and Part 61 flexibility mean you get individualized attention and train at your own pace. Perfect for both recreational pilots and those building hours for career advancement.`,

    yearsInOperation: 4,
    facilities: [
      'Flight Simulator',
      'Ground School Room',
      'Student Lounge',
      'Flight Planning Station',
      'Maintenance Bay'
    ],
    instructorCount: 6,
    reviewCount: 28,
    avgRating: 4.3,
    heroImageUrl: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172M',
        count: 4,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'Transponder', 'GPS', 'Intercom'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Cherokee 140',
        count: 2,
        maxAltitude: 14000,
        cruiseSpeed: 115,
        equipment: ['VOR/ILS', 'Transponder', 'GPS', 'ADS-B'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 172S (G1000)',
        count: 1,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'WAAS GPS'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-021-1',
        name: 'Jake Morrison',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 6,
        bio: 'Owner and chief instructor. Passionate about making aviation accessible. Time-building toward airlines while helping students achieve their dreams.',
        photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-021-2',
        name: 'Nicole Garcia',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 4,
        bio: 'Recent commercial pilot graduate now teaching. Relates well to student struggles and learning process. Great at explaining complex topics simply.',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-021-3',
        name: 'Robert Chang',
        certificates: ['CFI'],
        yearsExperience: 3,
        bio: 'Career changer bringing fresh perspective to aviation. Patient instructor who enjoys working with adult learners. Specializes in primary training.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 70,
        costMin: 9500,
        costMax: 12000,
        description: 'Affordable Part 61 training with flexible scheduling. Train at your own pace in perfect weather conditions. Personalized instruction tailored to your learning style and schedule.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 48,
        costMin: 8500,
        costMax: 11000,
        description: 'IFR training in Las Vegas busy airspace. Learn hood work, approach procedures, and cross-country IFR. Simulator available for procedures practice.'
      }
    ],

    reviews: [
      {
        id: 'rev-021-1',
        reviewerName: 'Mark Stevens',
        date: '2024-09-18',
        rating: 5,
        title: 'Great Value, Friendly Staff',
        body: 'Best prices I found in Vegas. Jake is a great instructor and really cares about his students. The weather is amazing - barely any cancellations. Aircraft are older but well-maintained.',
        helpful: 12
      },
      {
        id: 'rev-021-2',
        reviewerName: 'Jessica Taylor',
        date: '2024-07-25',
        rating: 4,
        title: 'Good for Budget-Conscious Students',
        body: 'If you are looking for affordable training, this is your place. Not fancy but gets the job done. Instructors are young and enthusiastic. Scheduling can be tricky during busy times.',
        helpful: 8
      },
      {
        id: 'rev-021-3',
        reviewerName: 'Daniel Park',
        date: '2024-05-30',
        rating: 4,
        title: 'Solid Training Experience',
        body: 'Completed my PPL here. Nicole was patient and thorough. The flexibility of Part 61 worked well with my work schedule. Would recommend for recreational pilots.',
        helpful: 10
      },
      {
        id: 'rev-021-4',
        reviewerName: 'Lisa Rodriguez',
        date: '2024-03-12',
        rating: 4,
        title: 'Perfect Desert Flying',
        body: 'Amazing weather for training! Rarely had to cancel. The school is smaller and more personal than the big academies. Got my license in about 6 months training part-time.',
        helpful: 9
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2024-07-01T12:00:00Z',
      dataSources: ['FAA Registry', 'Google Reviews'],
      lastUpdated: '2024-10-15'
    },

    contactInfo: {
      email: 'fly@desertskyflight.com',
      phone: '(702) 555-3147',
      website: 'https://desertskyflight.com'
    }
  },

  // School 5: Portland, OR - Community-Verified, Part 141, PPL+IR+CPL
  {
    schoolId: 'school-022',
    name: 'Columbia River Aviation',
    location: {
      city: 'Portland',
      state: 'OR',
      zipCode: '97218',
      coordinates: { lat: 45.5872, lng: -122.5967 }
    },
    programs: ['PPL', 'IR', 'CPL'],
    costBand: { min: 12000, max: 18000 },
    trainingType: 'Part141',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,

    description: `Columbia River Aviation has been the Pacific Northwest premier flight school since 2006. Located at Troutdale Airport with stunning views of Mt. Hood, we combine professional Part 141 training with the beauty of Oregon aviation. Our emphasis on mountain flying, weather systems, and backcountry operations prepares you for the unique challenges of Pacific Northwest flying. Modern facilities and experienced instructors ensure your success.`,

    yearsInOperation: 18,
    facilities: [
      'Frasca Mentor Flight Simulator',
      'Ground School Classrooms (2)',
      'Weather Briefing Center',
      'Student Lounge with Mountain Views',
      'Maintenance Hangar',
      'Pilot Shop',
      'Aircraft Washing Station'
    ],
    instructorCount: 10,
    reviewCount: 56,
    avgRating: 4.5,
    heroImageUrl: 'https://images.unsplash.com/photo-1583196123714-5c57c9dbbc1f?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S (G1000)',
        count: 5,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'WAAS GPS', 'Storm Scope'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 182 Skylane',
        count: 2,
        maxAltitude: 18100,
        cruiseSpeed: 145,
        equipment: ['Garmin G500 TXi', 'Autopilot', 'High Performance', 'GPS'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Arrow III',
        count: 2,
        maxAltitude: 16200,
        cruiseSpeed: 143,
        equipment: ['Garmin GTN 650', 'Retractable Gear', 'Complex', 'Autopilot'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Cirrus SR20',
        count: 1,
        maxAltitude: 17500,
        cruiseSpeed: 155,
        equipment: ['Cirrus Perspective (G1000)', 'Autopilot', 'CAPS Parachute', 'Air Conditioning'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-022-1',
        name: 'Chris Anderson',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 16,
        bio: 'Chief instructor with extensive mountain flying experience. Former bush pilot in Alaska. Expert in weather decision-making and mountain operations.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-022-2',
        name: 'Emma Wilson',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 9,
        bio: 'Specializes in glass cockpit training and technology integration. Excellent at teaching modern avionics and automation management.',
        photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-022-3',
        name: 'Ryan Mitchell',
        certificates: ['CFI', 'ATP'],
        yearsExperience: 13,
        bio: 'Corporate pilot bringing professional standards to training. Great at teaching ADM and risk management. Patient and thorough instructor.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-022-4',
        name: 'Samantha Lee',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 7,
        bio: 'Known for building student confidence through systematic skill development. Specializes in instrument training and approaches.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 62,
        costMin: 12000,
        costMax: 15000,
        description: 'Part 141 training with emphasis on Pacific Northwest flying. Mountain flying training, weather systems, and scenic cross-countries included. Modern glass cockpit fleet.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 43,
        costMin: 9500,
        costMax: 12000,
        description: 'Comprehensive IFR training in challenging Pacific Northwest weather. Actual IMC experience with experienced CFIIs. Simulator and aircraft training combined.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 54,
        costMin: 12500,
        costMax: 15500,
        description: 'Professional pilot preparation with complex and high-performance aircraft. Advanced maneuvers, commercial cross-countries, and career counseling.'
      }
    ],

    reviews: [
      {
        id: 'rev-022-1',
        reviewerName: 'Alex Thompson',
        date: '2024-08-20',
        rating: 5,
        title: 'Mountain Flying Excellence',
        body: 'Chris mountain flying instruction was invaluable. The experience flying around Mt. Hood and learning density altitude operations prepared me for flying anywhere. Beautiful location too!',
        helpful: 20
      },
      {
        id: 'rev-022-2',
        reviewerName: 'Karen Martinez',
        date: '2024-06-28',
        rating: 4,
        title: 'Great School, Weather Can Slow Progress',
        body: 'Excellent instruction and modern aircraft. Portland weather did cause some delays but that is part of learning. The actual IMC time during instrument training was incredibly valuable.',
        helpful: 15
      },
      {
        id: 'rev-022-3',
        reviewerName: 'James Wilson',
        date: '2024-04-15',
        rating: 5,
        title: 'Professional Training Environment',
        body: 'The Part 141 structure and professional staff made my training efficient. The Cirrus SR20 is an amazing aircraft to train in. Highly recommend for serious students.',
        helpful: 18
      },
      {
        id: 'rev-022-4',
        reviewerName: 'Olivia Brown',
        date: '2024-02-05',
        rating: 5,
        title: 'Excellent Instructors',
        body: 'Emma was an outstanding instructor who made learning glass cockpit systems easy. The school is well-organized and the facilities are top-notch. Worth every penny.',
        helpful: 14
      }
    ],

    verificationDetails: {
      trustTier: 'Community-Verified',
      verificationTimestamp: '2024-04-15T11:20:00Z',
      dataSources: ['FAA Registry', 'Student Reviews', 'AOPA Database'],
      lastUpdated: '2024-10-30'
    },

    contactInfo: {
      email: 'info@columbiariveraviation.com',
      phone: '(503) 555-6829',
      website: 'https://columbiariveraviation.com'
    }
  },

  // School 6: Nashville, TN - Unverified, Part 61, PPL+IR
  {
    schoolId: 'school-023',
    name: 'Music City Flight Training',
    location: {
      city: 'Nashville',
      state: 'TN',
      zipCode: '37217',
      coordinates: { lat: 36.1247, lng: -86.6782 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 9000, max: 13500 },
    trainingType: 'Part61',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: `Music City Flight Training brings a personal touch to pilot training in Nashville. Founded in 2021 by experienced aviation professionals, we offer flexible Part 61 training that fits your schedule and budget. Our small size means you get personal attention and direct access to your instructor. Located at John C. Tune Airport, we provide a less congested training environment perfect for building fundamental skills before tackling busier airspace.`,

    yearsInOperation: 3,
    facilities: [
      'Ground School Room',
      'Student Lounge',
      'Flight Planning Area',
      'Covered Parking',
      'Coffee Bar'
    ],
    instructorCount: 5,
    reviewCount: 22,
    avgRating: 4.4,
    heroImageUrl: 'https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172N',
        count: 3,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'GPS', 'Transponder', 'Intercom'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Warrior',
        count: 2,
        maxAltitude: 14300,
        cruiseSpeed: 127,
        equipment: ['Garmin 430', 'IFR Certified', 'ADS-B', 'Autopilot'],
        availability: 'High'
      }
    ],

    instructors: [
      {
        id: 'instr-023-1',
        name: 'Tom Sanders',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 14,
        bio: 'Owner and chief instructor. Former corporate pilot with passion for teaching. Known for making students feel comfortable and confident.',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-023-2',
        name: 'Katie Morrison',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 5,
        bio: 'Energetic instructor who makes learning fun. Great with nervous students. Specializes in building solid fundamental skills.',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-023-3',
        name: 'Marcus Davis',
        certificates: ['CFI'],
        yearsExperience: 4,
        bio: 'Recent CFI graduate with fresh perspective. Patient and detail-oriented. Enjoys working with adult learners and career changers.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 68,
        costMin: 9000,
        costMax: 11500,
        description: 'Personalized Part 61 training at your own pace. Small class sizes mean more one-on-one attention. Flexible scheduling for working professionals and students.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 50,
        costMin: 8000,
        costMax: 10500,
        description: 'IFR training with emphasis on practical real-world skills. Learn to file, fly, and navigate the IFR system with confidence. Flexible scheduling available.'
      }
    ],

    reviews: [
      {
        id: 'rev-023-1',
        reviewerName: 'Sarah Jenkins',
        date: '2024-09-10',
        rating: 5,
        title: 'Personal Attention Made All the Difference',
        body: 'Tom and Katie are fantastic instructors. The small school atmosphere means you really get to know everyone. Pricing is very fair and the flexibility helped me train around my nursing schedule.',
        helpful: 11
      },
      {
        id: 'rev-023-2',
        reviewerName: 'Mike Patterson',
        date: '2024-07-05',
        rating: 4,
        title: 'Great for Weekend Warriors',
        body: 'Perfect for part-time training. Not a fancy school but that keeps costs down. Aircraft are older but maintained well. Got my license in about 8 months training weekends.',
        helpful: 8
      },
      {
        id: 'rev-023-3',
        reviewerName: 'Jennifer Lee',
        date: '2024-05-18',
        rating: 4,
        title: 'Good Value Training',
        body: 'Completed my instrument rating here. Katie was patient and thorough. Facilities are basic but everything you need is there. Would recommend for budget-conscious students.',
        helpful: 7
      },
      {
        id: 'rev-023-4',
        reviewerName: 'David Clark',
        date: '2024-03-22',
        rating: 5,
        title: 'Friendly and Professional',
        body: 'Newer school but Tom has decades of experience. The personal approach helped me overcome my initial nervousness about flying. Highly recommend!',
        helpful: 9
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2024-06-10T10:30:00Z',
      dataSources: ['FAA Registry', 'Student Reviews'],
      lastUpdated: '2024-10-20'
    },

    contactInfo: {
      email: 'fly@musiccityflight.com',
      phone: '(615) 555-2973',
      website: 'https://musiccityflight.com'
    }
  },

  // School 7: Charlotte, NC - Community-Verified, Both, PPL+IR+CPL
  {
    schoolId: 'school-024',
    name: 'Queen City Aviation Academy',
    location: {
      city: 'Charlotte',
      state: 'NC',
      zipCode: '28208',
      coordinates: { lat: 35.2144, lng: -80.9473 }
    },
    programs: ['PPL', 'IR', 'CPL'],
    costBand: { min: 10500, max: 16500 },
    trainingType: 'Both',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,

    description: `Queen City Aviation Academy has been Charlotte premier flight school since 2009. We offer both Part 61 flexibility and Part 141 structure to meet your training needs. Located at Charlotte Douglas International Airport, we provide students with Class B airspace experience and professional training environment. Our diverse fleet, experienced instructors, and strong safety culture have produced over 800 certificated pilots. Whether you are flying for fun or career, we will get you there.`,

    yearsInOperation: 15,
    facilities: [
      'Elite S923 Flight Simulator',
      'Ground School Classrooms (3)',
      'Computer Lab',
      'Weather Briefing Room',
      'Student Lounge',
      'Maintenance Hangar',
      'Pilot Shop'
    ],
    instructorCount: 12,
    reviewCount: 71,
    avgRating: 4.6,
    heroImageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S (G1000)',
        count: 7,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'WAAS GPS', 'ADS-B'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Archer TX',
        count: 4,
        maxAltitude: 14000,
        cruiseSpeed: 128,
        equipment: ['Garmin G1000 NXi', 'Autopilot', 'Synthetic Vision', 'ADS-B'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Arrow',
        count: 3,
        maxAltitude: 16200,
        cruiseSpeed: 145,
        equipment: ['Garmin GTN 650', 'Autopilot', 'Complex', 'Retractable Gear'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Diamond DA42 Twin',
        count: 1,
        maxAltitude: 18000,
        cruiseSpeed: 175,
        equipment: ['Glass Cockpit', 'Multi-Engine', 'Autopilot', 'FIKI'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-024-1',
        name: 'Captain William Harris',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 22,
        bio: 'Chief instructor and former American Airlines captain. 18,000+ hours. Expert in airline preparation and professional pilot development.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-024-2',
        name: 'Amanda Richardson',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 10,
        bio: 'Specializes in instrument training and glass cockpit systems. Known for clear explanations and systematic approach to instruction.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-024-3',
        name: 'Carlos Mendez',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 8,
        bio: 'Patient instructor with gift for teaching nervous students. Bilingual (English/Spanish). Great at building confidence through positive reinforcement.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-024-4',
        name: 'Rebecca Thompson',
        certificates: ['CFI', 'ATP'],
        yearsExperience: 13,
        bio: 'Regional airline first officer with current real-world experience. Excellent at teaching practical ADM and CRM skills.',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 60,
        costMin: 10500,
        costMax: 13500,
        description: 'Choose Part 61 or Part 141 based on your needs. Train in Charlotte Class B airspace for excellent traffic experience. Modern glass cockpit fleet and experienced instructors.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 42,
        costMin: 9000,
        costMax: 11500,
        description: 'Comprehensive IFR training in busy Charlotte airspace. Actual IMC experience, simulator training, and professional instruction prepare you for real-world instrument flying.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 53,
        costMin: 11500,
        costMax: 14500,
        description: 'Professional pilot training with complex aircraft. Career counseling, resume building, and interview preparation included. Strong airline placement record.'
      }
    ],

    reviews: [
      {
        id: 'rev-024-1',
        reviewerName: 'Justin Moore',
        date: '2024-09-01',
        rating: 5,
        title: 'Excellent Airline Preparation',
        body: 'Captain Harris and the team prepared me perfectly for my regional airline career. The Class B experience and professional training environment gave me confidence in my first airline interview. Highly recommend!',
        helpful: 22
      },
      {
        id: 'rev-024-2',
        reviewerName: 'Nicole Adams',
        date: '2024-07-15',
        rating: 5,
        title: 'Top-Notch Instruction and Aircraft',
        body: 'The modern fleet and experienced instructors make this school stand out. Amanda was an excellent CFII who helped me nail my instrument checkride on the first try. Worth the investment!',
        helpful: 18
      },
      {
        id: 'rev-024-3',
        reviewerName: 'Robert Chen',
        date: '2024-05-10',
        rating: 4,
        title: 'Great School, Busy Airspace',
        body: 'Quality training at Charlotte Douglas. The Class B experience is valuable but can be intimidating for new students. Instructors are patient and professional. Slightly pricey but you get what you pay for.',
        helpful: 14
      },
      {
        id: 'rev-024-4',
        reviewerName: 'Emily Watson',
        date: '2024-03-05',
        rating: 5,
        title: 'Professional Environment',
        body: 'Carlos helped me overcome my nervousness and build real confidence. The Part 141 structure kept me on track and the facilities are excellent. Could not have asked for a better experience.',
        helpful: 16
      }
    ],

    verificationDetails: {
      trustTier: 'Community-Verified',
      verificationTimestamp: '2024-05-01T13:45:00Z',
      dataSources: ['FAA Registry', 'Student Reviews', 'AOPA Database', 'Google Reviews'],
      lastUpdated: '2024-11-03'
    },

    contactInfo: {
      email: 'info@queencityaviation.com',
      phone: '(704) 555-8164',
      website: 'https://queencityaviation.com'
    }
  },

  // School 8: Salt Lake City, UT - Verified FSP, Part 141, PPL+IR+CPL
  {
    schoolId: 'school-025',
    name: 'Mountain West Flight Academy',
    location: {
      city: 'Salt Lake City',
      state: 'UT',
      zipCode: '84116',
      coordinates: { lat: 40.7883, lng: -111.9778 }
    },
    programs: ['PPL', 'IR', 'CPL'],
    costBand: { min: 11500, max: 17500 },
    trainingType: 'Part141',
    trustTier: TrustTier.VERIFIED_FSP as TrustTier,

    description: `Mountain West Flight Academy is Utah premier Part 141 flight school, established in 2004. Located in Salt Lake City with easy access to mountain training areas, we specialize in high-altitude operations and mountain flying. Our comprehensive programs combine professional instruction with the unique challenges of Rocky Mountain aviation. With over 900 successful graduates and a 95% first-time checkride pass rate, we are committed to producing safe, competent pilots ready for any flying environment.`,

    yearsInOperation: 20,
    facilities: [
      'Redbird MCX Flight Simulator',
      'Ground School Classrooms (4)',
      'High-Altitude Training Lab',
      'Weather Briefing Center',
      'Student Lounge',
      'Maintenance Facility',
      'Pilot Shop',
      'Conference Rooms'
    ],
    instructorCount: 13,
    reviewCount: 93,
    avgRating: 4.7,
    heroImageUrl: 'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S (G1000)',
        count: 8,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'WAAS GPS', 'Oxygen System'],
        availability: 'High'
      },
      {
        aircraftType: 'Diamond DA40 NG',
        count: 4,
        maxAltitude: 16400,
        cruiseSpeed: 135,
        equipment: ['Garmin G1000 NXi', 'Autopilot', 'Modern Avionics', 'Fuel Efficient'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 182 Turbo',
        count: 2,
        maxAltitude: 20000,
        cruiseSpeed: 150,
        equipment: ['Garmin G1000', 'Turbocharged', 'Oxygen', 'High Performance'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Arrow',
        count: 3,
        maxAltitude: 16200,
        cruiseSpeed: 145,
        equipment: ['Garmin GTN 750', 'Autopilot', 'Complex', 'Retractable Gear'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-025-1',
        name: 'Captain Scott Hansen',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 19,
        bio: 'Chief instructor and mountain flying specialist. Former SkyWest captain. Expert in high-altitude operations, weather systems, and density altitude training.',
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-025-2',
        name: 'Jessica Morgan',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 11,
        bio: 'Specializes in glass cockpit systems and advanced avionics. Known for thorough ground instruction and systematic approach to teaching.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-025-3',
        name: 'Michael Torres',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 9,
        bio: 'Patient instructor with talent for teaching instrument procedures. Excellent at breaking down complex concepts into understandable pieces.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-025-4',
        name: 'Lauren Williams',
        certificates: ['CFI', 'ATP'],
        yearsExperience: 14,
        bio: 'Regional airline pilot bringing current industry knowledge. Excellent mentor for career-focused students. Strong systems knowledge and professionalism.',
        photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 57,
        costMin: 11500,
        costMax: 14500,
        description: 'Comprehensive Part 141 program with mountain flying emphasis. Learn density altitude operations, high-altitude weather, and mountain navigation. Modern glass cockpit training.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 41,
        costMin: 9500,
        costMax: 12000,
        description: 'Advanced IFR training in complex mountain environment. Actual IMC experience, mountain wave operations, and high-altitude IFR procedures. Simulator and aircraft training.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 51,
        costMin: 12000,
        costMax: 15000,
        description: 'Professional pilot training with mountain operations specialty. Complex and high-performance aircraft training. Career preparation and placement assistance.'
      }
    ],

    reviews: [
      {
        id: 'rev-025-1',
        reviewerName: 'Brandon Taylor',
        date: '2024-08-25',
        rating: 5,
        title: 'Best Mountain Flying Training',
        body: 'Scott mountain flying instruction is legendary. Learning density altitude ops in the Wasatch Range prepared me for flying anywhere. First-class instruction and modern aircraft. Highly recommend!',
        helpful: 24
      },
      {
        id: 'rev-025-2',
        reviewerName: 'Megan Phillips',
        date: '2024-06-30',
        rating: 5,
        title: 'Excellent Part 141 Program',
        body: 'The structured program kept me on track and I passed my checkride first try. Jessica is an outstanding instructor with incredible patience. The mountain scenery is a bonus!',
        helpful: 19
      },
      {
        id: 'rev-025-3',
        reviewerName: 'Daniel Kim',
        date: '2024-04-18',
        rating: 5,
        title: 'Professional and Thorough',
        body: 'Top-tier instruction and well-maintained aircraft. The high-altitude training is unique and incredibly valuable. Worth every penny if you are serious about becoming a competent pilot.',
        helpful: 17
      },
      {
        id: 'rev-025-4',
        reviewerName: 'Sarah Mitchell',
        date: '2024-02-12',
        rating: 4,
        title: 'Great School, Winter Can Be Challenging',
        body: 'Excellent training quality and professional staff. Winter weather did slow my progress some but that is Utah. The mountain flying experience is second to none. Definitely recommend.',
        helpful: 15
      }
    ],

    verificationDetails: {
      trustTier: 'Verified FSP',
      verificationTimestamp: '2024-03-01T10:15:00Z',
      dataSources: ['FAA Registry', 'Flight School Profiles', 'Student Reviews', 'AOPA Database'],
      lastUpdated: '2024-11-04',
      fspSignals: {
        avgHoursToPPL: 54,
        scheduleConsistency: 91,
        instructorReliability: 95
      }
    },

    contactInfo: {
      email: 'info@mountainwestflight.com',
      phone: '(801) 555-7342',
      website: 'https://mountainwestflight.com'
    }
  },

  // School 9: Kansas City, MO - Community-Verified, Part 61, PPL+IR
  {
    schoolId: 'school-026',
    name: 'Heartland Aviation School',
    location: {
      city: 'Kansas City',
      state: 'MO',
      zipCode: '64153',
      coordinates: { lat: 39.1239, lng: -94.5963 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 9000, max: 13000 },
    trainingType: 'Part61',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,

    description: `Heartland Aviation School has been serving the Kansas City community since 2010. We pride ourselves on affordable, quality Part 61 training with a personal touch. Located at Charles B. Wheeler Downtown Airport, we offer convenient access and a friendly learning environment. Our experienced instructors focus on building solid fundamentals and confident pilots. Whether you are pursuing flying as a hobby or career, we make aviation accessible and enjoyable.`,

    yearsInOperation: 14,
    facilities: [
      'Flight Simulator',
      'Ground School Classroom',
      'Student Lounge',
      'Flight Planning Room',
      'Maintenance Bay',
      'Covered Tie-Downs'
    ],
    instructorCount: 7,
    reviewCount: 45,
    avgRating: 4.4,
    heroImageUrl: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172M',
        count: 4,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'GPS', 'Transponder', 'Intercom'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Cherokee 180',
        count: 3,
        maxAltitude: 14300,
        cruiseSpeed: 125,
        equipment: ['Garmin 430', 'IFR Certified', 'ADS-B', 'Autopilot'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 172SP (G1000)',
        count: 1,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'WAAS GPS'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-026-1',
        name: 'Frank Miller',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 18,
        bio: 'Owner and chief instructor. Retired corporate pilot with passion for teaching. Known for patience and making complex topics accessible.',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-026-2',
        name: 'Angela Davis',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 9,
        bio: 'Excellent with adult learners and career changers. Brings systematic approach to instruction. Great at building student confidence.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-026-3',
        name: 'Jason Wright',
        certificates: ['CFI'],
        yearsExperience: 6,
        bio: 'Energetic instructor who makes learning enjoyable. Good at explaining weather systems and ADM. Time-building toward regional airlines.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 67,
        costMin: 9000,
        costMax: 11500,
        description: 'Affordable Part 61 training with flexible scheduling. Learn fundamentals at your own pace in a supportive environment. Perfect for recreational pilots and career starters alike.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 47,
        costMin: 8000,
        costMax: 10500,
        description: 'Practical IFR training focused on real-world flying. Learn to navigate the IFR system with confidence. Simulator time included for procedures practice.'
      }
    ],

    reviews: [
      {
        id: 'rev-026-1',
        reviewerName: 'Greg Anderson',
        date: '2024-09-12',
        rating: 5,
        title: 'Excellent Value and Instruction',
        body: 'Frank is an outstanding instructor with decades of experience. The pricing is very fair and the personal attention you get at a smaller school is invaluable. Highly recommend!',
        helpful: 16
      },
      {
        id: 'rev-026-2',
        reviewerName: 'Lisa Thompson',
        date: '2024-07-20',
        rating: 4,
        title: 'Great for Part-Time Students',
        body: 'The flexibility of Part 61 worked perfectly with my schedule. Angela was patient and thorough. Aircraft are older but well-maintained. Good school for the money.',
        helpful: 12
      },
      {
        id: 'rev-026-3',
        reviewerName: 'Kevin Brown',
        date: '2024-05-08',
        rating: 4,
        title: 'Friendly Atmosphere',
        body: 'Everyone at Heartland is welcoming and helpful. Jason made my instrument training engaging and practical. Not fancy but solid instruction at fair prices.',
        helpful: 10
      },
      {
        id: 'rev-026-4',
        reviewerName: 'Rachel Martinez',
        date: '2024-03-14',
        rating: 5,
        title: 'Personal Touch Makes a Difference',
        body: 'Small school feel where everyone knows your name. Frank really cares about his students success. Got my PPL here and now working on instrument. Would not train anywhere else!',
        helpful: 14
      }
    ],

    verificationDetails: {
      trustTier: 'Community-Verified',
      verificationTimestamp: '2024-06-15T11:00:00Z',
      dataSources: ['FAA Registry', 'Student Reviews', 'Google Reviews'],
      lastUpdated: '2024-10-25'
    },

    contactInfo: {
      email: 'info@heartlandaviation.com',
      phone: '(816) 555-3928',
      website: 'https://heartlandaviation.com'
    }
  },

  // School 10: Albuquerque, NM - Unverified, Both, PPL+IR+CPL+ATPL
  {
    schoolId: 'school-027',
    name: 'Southwest Professional Pilot Academy',
    location: {
      city: 'Albuquerque',
      state: 'NM',
      zipCode: '87106',
      coordinates: { lat: 35.0402, lng: -106.6090 }
    },
    programs: ['PPL', 'IR', 'CPL', 'ATPL'],
    costBand: { min: 13000, max: 24000 },
    trainingType: 'Both',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: `Southwest Professional Pilot Academy opened in 2019 with a mission to provide accelerated career pilot training in the Southwest. Located in Albuquerque with 310+ sunny days per year, we minimize weather delays and maximize training efficiency. Our comprehensive programs take students from zero time to airline-ready, with both Part 61 and Part 141 options. Modern fleet, experienced instructors, and career placement assistance make SPPA your launchpad to a professional flying career.`,

    yearsInOperation: 5,
    facilities: [
      'Full Motion Flight Simulator',
      'Ground School Classrooms (3)',
      'Computer Lab',
      'Weather Briefing Center',
      'Student Lounge with Study Areas',
      'Career Counseling Center',
      'Maintenance Hangar',
      'Pilot Shop'
    ],
    instructorCount: 15,
    reviewCount: 38,
    avgRating: 4.3,
    heroImageUrl: 'https://images.unsplash.com/photo-1583196123714-5c57c9dbbc1f?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S (G1000)',
        count: 10,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'WAAS GPS', 'ADS-B'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Archer TX',
        count: 5,
        maxAltitude: 14000,
        cruiseSpeed: 128,
        equipment: ['Garmin G1000 NXi', 'Autopilot', 'Modern Avionics'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Arrow',
        count: 4,
        maxAltitude: 16200,
        cruiseSpeed: 145,
        equipment: ['Garmin GTN 750', 'Autopilot', 'Complex', 'Retractable Gear'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Seminole',
        count: 3,
        maxAltitude: 17200,
        cruiseSpeed: 160,
        equipment: ['Garmin G500 TXi', 'Multi-Engine', 'IFR Certified', 'Autopilot'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Cirrus SR20',
        count: 2,
        maxAltitude: 17500,
        cruiseSpeed: 155,
        equipment: ['Cirrus Perspective (G1000)', 'Autopilot', 'CAPS Parachute', 'A/C'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-027-1',
        name: 'Captain Ryan Foster',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 16,
        bio: 'Chief instructor and airline career specialist. Former Southwest Airlines captain. Expert in airline interview preparation and career planning.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-027-2',
        name: 'Maria Gonzales',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 8,
        bio: 'Accelerated program specialist. Excellent at keeping students on fast-track timelines. Bilingual instruction available.',
        photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-027-3',
        name: 'Tyler Anderson',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 5,
        bio: 'Young, energetic instructor who recently completed the program himself. Relates well to students going through accelerated training.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-027-4',
        name: 'Jennifer Cole',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 10,
        bio: 'Multi-engine specialist and complex aircraft expert. Known for thorough systems instruction and professional approach.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-027-5',
        name: 'Marcus Johnson',
        certificates: ['CFI', 'ATP'],
        yearsExperience: 12,
        bio: 'Regional airline first officer bringing current airline perspective. Excellent mentor for career-focused students.',
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 60,
        costMin: 13000,
        costMax: 16000,
        description: 'Accelerated or traditional pacing available. Modern glass cockpit training in excellent weather. Choose Part 61 flexibility or Part 141 structure based on your goals.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 40,
        costMin: 10000,
        costMax: 13000,
        description: 'Comprehensive IFR training with simulator and aircraft time. Accelerated programs available for career track students. High first-time pass rate.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 50,
        costMin: 12000,
        costMax: 15000,
        description: 'Professional pilot certification with complex aircraft training. Career preparation, resume building, and interview coaching included.'
      },
      {
        name: 'Airline Transport Pilot (ATPL)',
        certification: 'ATPL',
        durationHours: 75,
        costMin: 18000,
        costMax: 24000,
        description: 'Complete airline preparation program. Multi-engine training, CRM, high-altitude operations, and jet transition orientation. Strong airline placement record with regional carriers.'
      }
    ],

    reviews: [
      {
        id: 'rev-027-1',
        reviewerName: 'Chris Palmer',
        date: '2024-08-30',
        rating: 5,
        title: 'Zero to Hero in 12 Months',
        body: 'Completed the full career track from zero time to CPL/MEI in one year. Ryan and the team are professional and the aircraft fleet is excellent. Now flying for a regional - SPPA prepared me well!',
        helpful: 18
      },
      {
        id: 'rev-027-2',
        reviewerName: 'Ashley Turner',
        date: '2024-06-18',
        rating: 4,
        title: 'Good Accelerated Program',
        body: 'The pace is intense but that is what I wanted. Weather is amazing - barely any delays. Aircraft scheduling can be tight during busy times. Overall solid program for career students.',
        helpful: 13
      },
      {
        id: 'rev-027-3',
        reviewerName: 'Jordan Lee',
        date: '2024-04-25',
        rating: 4,
        title: 'Professional Training Environment',
        body: 'Maria was an excellent instructor who kept me on schedule. Facilities are modern and the fleet is well-maintained. A bit pricey but you are paying for quality and speed.',
        helpful: 11
      },
      {
        id: 'rev-027-4',
        reviewerName: 'Brian Scott',
        date: '2024-02-28',
        rating: 5,
        title: 'Great Career Preparation',
        body: 'The career counseling and interview prep were incredibly valuable. Got hired by regional airline within 2 months of graduating. If you are serious about airline career, highly recommend SPPA.',
        helpful: 16
      },
      {
        id: 'rev-027-5',
        reviewerName: 'Nicole Martinez',
        date: '2024-01-15',
        rating: 4,
        title: 'Solid Training, Growing Pains',
        body: 'Good instruction and nice aircraft. As a newer school, they are still working out some organizational issues. But the quality of training is there and the weather is unbeatable.',
        helpful: 9
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2024-08-01T14:30:00Z',
      dataSources: ['FAA Registry', 'Student Reviews'],
      lastUpdated: '2024-10-18'
    },

    contactInfo: {
      email: 'admissions@swppa.com',
      phone: '(505) 555-7614',
      website: 'https://southwestppa.com'
    }
  }
];
