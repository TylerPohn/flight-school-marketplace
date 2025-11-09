const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/mock/detailedSchools.ts');

// Read the current file
let content = fs.readFileSync(filePath, 'utf8');

// Find the position to insert (before the closing bracket and export)
const insertPosition = content.lastIndexOf('];\n\nexport function getDetailedSchoolById');

// All remaining schools data
const remainingSchools = `,

  {
    schoolId: 'school-009',
    name: 'Las Vegas Flight Center',
    location: {
      city: 'Las Vegas',
      state: 'NV',
      zipCode: '89101',
      coordinates: { lat: 36.1699, lng: -115.1398 }
    },
    programs: ['PPL', 'IR', 'CPL', 'ATPL'],
    costBand: { min: 13900, max: 75000 },
    trainingType: 'Part141',
    trustTier: TrustTier.VERIFIED_FSP as TrustTier,

    description: \`Las Vegas Flight Center has been Nevada's premier flight training academy since 2007, combining world-class facilities with exceptional instruction to create professional pilots. Located in the entertainment capital of the world, we offer more than just great training - we provide 330+ days of perfect VFR weather annually, diverse training environments from desert valleys to high-altitude mountain operations, and proximity to some of the nation's most interesting airspace. Our comprehensive Part 141 programs range from private pilot through ATP, with accelerated tracks for career-focused students. With an outstanding safety record, modern fleet of 18 aircraft, and experienced instructor team averaging 12+ years of professional flying, we're the complete solution for your aviation career. Our graduates fly for every major U.S. airline, and our career placement program has a 94% success rate within six months of completion.\`,

    yearsInOperation: 17,
    facilities: [
      'Advanced Flight Simulators (Redbird FMX)',
      'Three Modern Ground School Classrooms',
      'Flight Planning & Weather Center',
      'Student Lounge with Flight Planning Stations',
      'Full-Service Maintenance Hangar',
      'Pilot Shop & Supplies',
      'Career Services & Placement Office',
      'Video Debriefing Suites'
    ],
    instructorCount: 24,
    reviewCount: 32,
    avgRating: 4.5,
    heroImageUrl: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S',
        count: 10,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Glass Cockpit (G1000)', 'Autopilot', 'ADS-B Out/In', 'Intercom'],
        availability: 'High'
      },
      {
        aircraftType: 'Cirrus SR22',
        count: 3,
        maxAltitude: 17500,
        cruiseSpeed: 183,
        equipment: ['Glass Cockpit (Perspective+)', 'CAPS Parachute', 'High Performance', 'Autopilot'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper PA-44 Seminole',
        count: 4,
        maxAltitude: 20000,
        cruiseSpeed: 150,
        equipment: ['Multi-Engine', 'IFR Certified', 'Autopilot', 'G430W GPS'],
        availability: 'High'
      },
      {
        aircraftType: 'Beechcraft Baron 58',
        count: 1,
        maxAltitude: 20000,
        cruiseSpeed: 200,
        equipment: ['High Performance Multi', 'G1000', 'FIKI', 'Advanced Systems'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-091',
        name: 'Captain Richard Sullivan',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 24,
        bio: 'Chief flight instructor and director of training. Former Boeing 757/767 captain with major airline. Over 15,000 flight hours and 20+ years of instruction experience. Specializes in airline preparation and professional development. Passionate about mentoring the next generation of professional pilots.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-092',
        name: 'Nicole Anderson',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 14,
        bio: 'Senior flight instructor specializing in multi-engine and instrument training. Former corporate pilot with extensive international experience. Known for systematic, thorough instruction and excellent checkride preparation. Focuses on scenario-based training and real-world decision making.',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-093',
        name: 'David Chen',
        certificates: ['CFI', 'CFII', 'ATP'],
        yearsExperience: 10,
        bio: 'Commercial and instrument specialist with diverse flying background. Excellent at teaching complex aircraft systems and advanced aerodynamics. Former test pilot who brings unique analytical perspective to instruction. Great mentor for students pursuing aviation careers.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-094',
        name: 'Sarah Mitchell',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 9,
        bio: 'Primary and instrument flight instructor with exceptional student success rate. Specializes in building strong fundamental skills and confidence. Known for patience, clear communication, and ability to adapt teaching style to individual learning needs. High first-time checkride pass rate.',
        photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 61,
        costMin: 13900,
        costMax: 17500,
        description: 'Accelerated Part 141 private pilot training in modern glass cockpit aircraft. Learn in ideal weather conditions with experienced instructors. Structured curriculum ensures efficient, effective training. Average completion 8-12 weeks for full-time students. Perfect Las Vegas weather means minimal cancellations.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 45,
        costMin: 10500,
        costMax: 13000,
        description: 'Comprehensive instrument training combining simulator and aircraft time. Master precision flying, approaches, and IFR procedures. Train in actual IFR when available or in our advanced simulators. Complex Vegas airspace provides excellent real-world training environment.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 60,
        costMin: 15000,
        costMax: 19000,
        description: 'Professional pilot training to commercial standards. Advanced maneuvers, complex aircraft operations, and airline-oriented procedures. Includes high-performance and complex endorsements. Build the skills and professionalism needed for aviation careers.'
      },
      {
        name: 'Airline Transport Pilot (ATPL)',
        certification: 'ATPL',
        durationHours: 280,
        costMin: 55000,
        costMax: 75000,
        description: 'Complete zero-to-airline career program. Includes all ratings from private through ATP, multi-engine time, and CTP course. Structured curriculum designed for career-focused students. Career placement assistance with partner airlines. Most comprehensive training program available - your complete path to the airlines.'
      }
    ],

    reviews: [
      {
        id: 'review-091',
        reviewerName: 'Michael Torres',
        date: '2025-10-25',
        rating: 5,
        title: 'World-Class Training Facility',
        body: 'Completed my zero-to-airline program here and just accepted a position with a regional airline. Captain Sullivan and the entire team are phenomenal. The aircraft are immaculate, facilities are top-notch, and the instruction is outstanding. Best investment I ever made in my future!',
        helpful: 28
      },
      {
        id: 'review-092',
        reviewerName: 'Jennifer Park',
        date: '2025-10-08',
        rating: 5,
        title: 'Exceeded All Expectations',
        body: 'Nicole was my primary instructor through CPL and she is absolutely incredible. Thorough, professional, and genuinely invested in student success. The Cirrus training was amazing and the multi-engine program is second to none. Career services helped me land my first flying job within a month of finishing!',
        helpful: 34
      },
      {
        id: 'review-093',
        reviewerName: 'Brandon Lee',
        date: '2025-09-20',
        rating: 4,
        title: 'Excellent Training, Premium Cost',
        body: 'The quality of training here is exceptional - modern fleet, experienced instructors, great facilities. The cost is definitely on the higher end, but the accelerated timeline and career placement support make it worthwhile. Vegas weather is perfect for flying nearly every day.',
        helpful: 21
      },
      {
        id: 'review-094',
        reviewerName: 'Amanda Rodriguez',
        date: '2025-08-15',
        rating: 5,
        title: 'Professional and Comprehensive',
        body: 'Sarah was my CFI and made learning to fly enjoyable and confidence-building. The Part 141 structure kept me on track and accountable. Simulators are incredibly realistic and saved money while building skills. Passed all checkrides first time. Highly recommend!',
        helpful: 19
      },
      {
        id: 'review-095',
        reviewerName: 'Christopher Walsh',
        date: '2025-07-22',
        rating: 4,
        title: 'Great School for Career Pilots',
        body: 'If you\\'re serious about an aviation career, this is the place. The training is rigorous and professional. David pushed me to be better and prepared me well for commercial operations. Schedule can get tight during busy season but overall excellent experience. Now building multi time and grateful for the foundation LVFC gave me.',
        helpful: 25
      }
    ],

    verificationDetails: {
      trustTier: 'Verified FSP',
      verificationTimestamp: '2025-09-20T00:00:00Z',
      dataSources: ['FSP Integration', 'Claimed Profile', 'Student Reviews', 'FAA Records', 'Industry Partnerships'],
      lastUpdated: '2025-11-02T00:00:00Z',
      fspSignals: {
        avgHoursToPPL: 61.4,
        scheduleConsistency: 89,
        instructorReliability: 93
      }
    },

    contactInfo: {
      email: 'info@lasvegasflightcenter.com',
      phone: '(702) 555-0201',
      website: 'https://lasvegasflightcenter.com'
    }
  },

  {
    schoolId: 'school-010',
    name: 'Portland Aviation School',
    location: {
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      coordinates: { lat: 45.5152, lng: -122.6784 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 10800, max: 15300 },
    trainingType: 'Part61',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: \`Portland Aviation School has been serving the Pacific Northwest aviation community since 2018. Nestled in the beautiful Columbia River Gorge region, we offer personalized flight training in one of the most scenic flying environments in the United States. Our Part 61 approach emphasizes flexibility and individualized instruction, perfect for working professionals and students who value quality over speed. With mild year-round weather and diverse terrain including coastal, mountain, and urban environments, Portland provides exceptional learning opportunities. Our close-knit team of instructors focuses on building confident, safe pilots through traditional stick-and-rudder skills combined with modern technology.\`,

    yearsInOperation: 7,
    facilities: [
      'Ground School Room',
      'Flight Planning Station',
      'Student Lounge with Coffee Bar',
      'Weather Briefing Area',
      'Pilot Supply Corner'
    ],
    instructorCount: 7,
    reviewCount: 8,
    avgRating: 4.0,
    heroImageUrl: 'https://images.unsplash.com/photo-1498496294664-d9372eb521f3?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172M',
        count: 3,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Standard Six Pack', 'Dual Nav/Com', 'Transponder', 'VOR'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Cherokee 180',
        count: 2,
        maxAltitude: 14300,
        cruiseSpeed: 115,
        equipment: ['Steam Gauges', 'Nav/Com', 'IFR Capable', 'Intercom'],
        availability: 'High'
      }
    ],

    instructors: [
      {
        id: 'instr-101',
        name: 'Greg Thompson',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 14,
        bio: 'Owner and chief instructor. Former bush pilot with extensive Pacific Northwest flying experience. Passionate about teaching weather decision-making and mountain flying. Known for calm demeanor and thorough pre-flight briefings.',
        photoUrl: 'https://images.unsplash.com/photo-1558531304-a4773b7e3a9c?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-102',
        name: 'Nicole Harper',
        certificates: ['CFI'],
        yearsExperience: 6,
        bio: 'Specializes in primary flight training with focus on building solid fundamentals. Patient and encouraging teaching style. Great at working with nervous students and making learning enjoyable.',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-103',
        name: 'Dan Olson',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 9,
        bio: 'Instrument specialist with strong background in cross-country flying. Focuses on practical IFR skills and real-world weather operations. Known for thorough systems knowledge and attention to detail.',
        photoUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 74,
        costMin: 10800,
        costMax: 13500,
        description: 'Flexible Part 61 private pilot training tailored to your schedule and learning pace. Learn to fly in the diverse Pacific Northwest environment with mountains, coast, and varied weather. Traditional training approach with modern safety standards.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 48,
        costMin: 4500,
        costMax: 6000,
        description: 'Practical instrument training in actual IFR conditions. Portland weather provides excellent real-world learning opportunities. Focus on safety, decision-making, and proficiency in low-visibility operations.'
      }
    ],

    reviews: [
      {
        id: 'review-101',
        reviewerName: 'Brian Foster',
        date: '2025-10-12',
        rating: 5,
        title: 'Great Small School Experience',
        body: 'Greg and his team provided excellent personalized training. The flexibility of Part 61 worked perfectly with my work schedule. Aircraft are older but very well maintained. Completed my PPL in 9 months training weekends only.',
        helpful: 5
      },
      {
        id: 'review-102',
        reviewerName: 'Amanda Collins',
        date: '2025-09-05',
        rating: 4,
        title: 'Good Training, Beautiful Location',
        body: 'Nicole was a wonderful instructor who helped me overcome my nervousness. Training in the Columbia Gorge is absolutely gorgeous. Wish they had more modern avionics, but the fundamentals training is solid.',
        helpful: 4
      },
      {
        id: 'review-103',
        reviewerName: 'Jason Lee',
        date: '2025-07-28',
        rating: 3,
        title: 'Decent Option for Portland Area',
        body: 'Got my instrument rating here. Dan knows his stuff and the weather provides great IFR practice. Communication could be better and scheduling can be tricky with limited aircraft. Overall okay experience.',
        helpful: 2
      },
      {
        id: 'review-104',
        reviewerName: 'Rachel Bennett',
        date: '2025-06-14',
        rating: 4,
        title: 'Personal Attention',
        body: 'Small school means you really get to know your instructors. Greg has amazing stories and teaches practical flying skills. The relaxed atmosphere makes learning less stressful. Good value for the price.',
        helpful: 3
      },
      {
        id: 'review-105',
        reviewerName: 'Mike Stevens',
        date: '2025-05-22',
        rating: 4,
        title: 'Solid Fundamentals Training',
        body: 'Appreciated the focus on stick-and-rudder skills with traditional instruments. Real-world weather flying prepared me well. Limited hours of operation on weekdays was inconvenient, but weekend availability was good.',
        helpful: 4
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2025-09-10T00:00:00Z',
      dataSources: ['Claimed Profile', 'Student Reviews'],
      lastUpdated: '2025-10-18T00:00:00Z'
    },

    contactInfo: {
      email: 'fly@portlandaviation.com',
      phone: '(503) 555-0142',
      website: 'https://portlandaviationschool.com'
    }
  },

  {
    schoolId: 'school-011',
    name: 'Dallas Wings Academy',
    location: {
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      coordinates: { lat: 32.7767, lng: -96.7970 }
    },
    programs: ['PPL', 'IR', 'CPL', 'CFII'],
    costBand: { min: 12900, max: 26600 },
    trainingType: 'Part141',
    trustTier: TrustTier.PREMIER as TrustTier,

    description: \`Dallas Wings Academy stands as one of Texas's most respected flight training institutions, founded in 2007. With over 2,000 successful graduates, we've built a reputation for excellence in professional pilot development and comprehensive training programs. Our state-of-the-art facility at Dallas Executive Airport combines modern technology, a diverse fleet, and highly experienced instructors to create an optimal learning environment. As a Part 141 school, we offer structured, accelerated programs designed to efficiently prepare students for successful aviation careers. The Dallas-Fort Worth metroplex provides access to diverse airspace including Class B, ideal weather for year-round training, and excellent career opportunities with nearby airlines and corporate aviation operations.\`,

    yearsInOperation: 17,
    facilities: [
      'Redbird Flight Simulator (FMX)',
      'Three Ground School Classrooms',
      'Advanced Aviation Training Devices',
      'Student Resource Center',
      'Modern Maintenance Hangar',
      'Pilot Shop and Supplies',
      'Student Lounge with Study Areas',
      'Career Counseling Office'
    ],
    instructorCount: 20,
    reviewCount: 41,
    avgRating: 4.8,
    heroImageUrl: 'https://images.unsplash.com/photo-1583792606458-c6e8a31e2854?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172S',
        count: 8,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['G1000 NXi Glass Cockpit', 'Autopilot', 'ADS-B', 'Intercom', 'GFC700'],
        availability: 'High'
      },
      {
        aircraftType: 'Diamond DA40 NG',
        count: 4,
        maxAltitude: 16400,
        cruiseSpeed: 135,
        equipment: ['Garmin G1000 NXi', 'Autopilot', 'Excellent Visibility', 'Modern Avionics'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper PA-44 Seminole',
        count: 3,
        maxAltitude: 20000,
        cruiseSpeed: 150,
        equipment: ['Multi-Engine', 'Garmin G500', 'IFR Certified', 'Autopilot', 'FIKI'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper PA-28R Arrow',
        count: 1,
        maxAltitude: 16000,
        cruiseSpeed: 130,
        equipment: ['Complex Aircraft', 'Retractable Gear', 'Constant Speed Prop', 'IFR'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-111',
        name: 'Captain Richard Blackwell',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 24,
        bio: 'Chief Flight Instructor with 15,000+ hours. Former major airline captain and check airman. Specializes in professional development and airline preparation. Known for high standards and producing career-ready pilots.',
        photoUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-112',
        name: 'Jessica Ramirez',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 11,
        bio: 'Multi-engine and instrument specialist. Former corporate pilot with extensive glass cockpit experience. Excellent at teaching advanced avionics and automation management. Patient and detail-oriented.',
        photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-113',
        name: 'Brandon Mitchell',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 8,
        bio: 'Specializes in primary and instrument training with modern glass cockpit systems. Recent airline pilot bringing current industry knowledge. Great at scenario-based training and decision-making development.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-114',
        name: 'Sarah Kim',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 13,
        bio: 'Flight instructor specializing in CFI training and advanced ratings. Known for exceptional teaching ability and producing high-quality instructors. Strong background in aviation education and learning psychology.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 64,
        costMin: 12900,
        costMax: 15800,
        description: 'Accelerated Part 141 private pilot program in modern glass cockpit aircraft. Structured curriculum designed for efficient, professional training. Average completion 10-14 weeks. Includes comprehensive ground school and checkride preparation.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 42,
        costMin: 5600,
        costMax: 7200,
        description: 'Professional instrument rating training with advanced simulators and modern aircraft. Train in complex DFW airspace for real-world IFR experience. Emphasis on precision flying and professional standards.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 52,
        costMin: 8100,
        costMax: 10500,
        description: 'Advanced commercial pilot training meeting airline standards. Complex aircraft operations, precision maneuvers, and professional procedures. Career-focused training with airline pathway opportunities.'
      },
      {
        name: 'Certified Flight Instructor',
        certification: 'IR',
        durationHours: 35,
        costMin: 4200,
        costMax: 5600,
        description: 'Flight instructor training focusing on teaching techniques, lesson planning, and instructional methodology. Both initial CFI and CFII add-ons available. High-quality preparation for aviation education careers.'
      }
    ],

    reviews: [
      {
        id: 'review-111',
        reviewerName: 'Matthew Johnson',
        date: '2025-10-18',
        rating: 5,
        title: 'Outstanding Professional Training',
        body: 'Completed PPL through CFI at Dallas Wings. Captain Blackwell and his team are world-class. The structured program, modern fleet, and professional environment prepared me perfectly for my airline career. Now flying for a regional carrier!',
        helpful: 34
      },
      {
        id: 'review-112',
        reviewerName: 'Lauren Davis',
        date: '2025-09-28',
        rating: 5,
        title: 'Best Decision for Flight Training',
        body: 'Jessica was an incredible instructor who made complex concepts easy to understand. The G1000 aircraft are fantastic and the simulator training was invaluable. Worth every penny for the quality of instruction and facilities.',
        helpful: 28
      },
      {
        id: 'review-113',
        reviewerName: 'David Park',
        date: '2025-08-22',
        rating: 5,
        title: 'Premier Training Institution',
        body: 'From day one, Dallas Wings demonstrated professionalism and excellence. The structured Part 141 program kept me on track, instructors were always prepared, and aircraft availability was excellent. Highly recommend!',
        helpful: 31
      },
      {
        id: 'review-114',
        reviewerName: 'Ashley Martinez',
        date: '2025-07-16',
        rating: 4,
        title: 'Excellent Training, Premium Price',
        body: 'Top-tier instruction and facilities. Brandon helped me ace my instrument checkride on the first try. Cost is higher than some competitors, but the quality and efficiency make it worthwhile. Great career services too.',
        helpful: 22
      },
      {
        id: 'review-115',
        reviewerName: 'Christopher Lee',
        date: '2025-06-09',
        rating: 5,
        title: 'Professional Environment',
        body: 'Training here feels like being at a real airline training center. Everything is professional, organized, and efficient. Sarah Kim is an exceptional CFI instructor. The multi-engine training exceeded my expectations completely.',
        helpful: 26
      }
    ],

    verificationDetails: {
      trustTier: 'Premier',
      verificationTimestamp: '2025-08-12T00:00:00Z',
      dataSources: ['FSP Integration', 'Claimed Profile', 'Student Reviews', 'FAA Records', 'Industry Partnerships'],
      lastUpdated: '2025-11-02T00:00:00Z',
      fspSignals: {
        avgHoursToPPL: 64.2,
        scheduleConsistency: 92,
        instructorReliability: 95
      }
    },

    contactInfo: {
      email: 'info@dallaswings.com',
      phone: '(214) 555-0293',
      website: 'https://dallaswingsacademy.com'
    }
  }`;

// Insert the schools before the closing bracket
const before = content.substring(0, insertPosition);
const after = content.substring(insertPosition);

const newContent = before + remainingSchools + '\n' + after;

// Write back to file
fs.writeFileSync(filePath, newContent, 'utf8');

console.log('✅ Successfully added schools 009-011 to detailedSchools.ts');
console.log('   - school-009: Las Vegas Flight Center');
console.log('   - school-010: Portland Aviation School');
console.log('   - school-011: Dallas Wings Academy');
