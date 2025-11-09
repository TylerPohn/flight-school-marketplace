

// Extended School interface with all profile page fields


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
,

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

    description: `Las Vegas Flight Center has been Nevada's premier flight training academy since 2007, combining world-class facilities with exceptional instruction to create professional pilots. Located in the entertainment capital of the world, we offer more than just great training - we provide 330+ days of perfect VFR weather annually, diverse training environments from desert valleys to high-altitude mountain operations, and proximity to some of the nation's most interesting airspace. Our comprehensive Part 141 programs range from private pilot through ATP, with accelerated tracks for career-focused students. With an outstanding safety record, modern fleet of 18 aircraft, and experienced instructor team averaging 12+ years of professional flying, we're the complete solution for your aviation career. Our graduates fly for every major U.S. airline, and our career placement program has a 94% success rate within six months of completion.`,

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
        body: `If you're serious about an aviation career, this is the place. The training is rigorous and professional. David pushed me to be better and prepared me well for commercial operations. Schedule can get tight during busy season but overall excellent experience. Now building multi time and grateful for the foundation LVFC gave me.`,
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

    description: `Portland Aviation School has been serving the Pacific Northwest aviation community since 2018. Nestled in the beautiful Columbia River Gorge region, we offer personalized flight training in one of the most scenic flying environments in the United States. Our Part 61 approach emphasizes flexibility and individualized instruction, perfect for working professionals and students who value quality over speed. With mild year-round weather and diverse terrain including coastal, mountain, and urban environments, Portland provides exceptional learning opportunities. Our close-knit team of instructors focuses on building confident, safe pilots through traditional stick-and-rudder skills combined with modern technology.`,

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

    description: `Dallas Wings Academy stands as one of Texas's most respected flight training institutions, founded in 2007. With over 2,000 successful graduates, we've built a reputation for excellence in professional pilot development and comprehensive training programs. Our state-of-the-art facility at Dallas Executive Airport combines modern technology, a diverse fleet, and highly experienced instructors to create an optimal learning environment. As a Part 141 school, we offer structured, accelerated programs designed to efficiently prepare students for successful aviation careers. The Dallas-Fort Worth metroplex provides access to diverse airspace including Class B, ideal weather for year-round training, and excellent career opportunities with nearby airlines and corporate aviation operations.`,

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
  }
  ,

  {
    schoolId: 'school-012',
    name: 'Atlanta Flight Training',
    location: {
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30341',
      coordinates: { lat: 33.8781, lng: -84.5190 }
    },
    programs: ['PPL', 'IR', 'CPL'],
    costBand: { min: 13200, max: 49000 },
    trainingType: 'Part61',
    trustTier: TrustTier.COMMUNITY_VERIFIED,
    description: `Atlanta Flight Training offers personalized flight instruction in the heart of Georgia's aviation community. Operating from DeKalb-Peachtree Airport, we specialize in Part 61 training that adapts to your schedule and learning style. Our experienced instructors bring real-world airline and corporate aviation backgrounds to every lesson.

With a modern fleet of well-maintained aircraft and a flexible training approach, we've helped hundreds of students achieve their aviation goals since 2012. Whether you're starting your private pilot journey or building commercial hours, our program balances thorough ground instruction with hands-on flight experience.

Our location provides ideal training conditions year-round, with diverse airspace including Class B operations at Hartsfield-Jackson, busy Class C airports, and quiet rural practice areas. Students gain confidence navigating one of the nation's most dynamic aviation environments while building the skills needed for a professional career.`,
    yearsInOperation: 13,
    facilities: [
      'Modern flight planning room with ForeFlight integration',
      'Advanced aviation training devices (AATDs)',
      'Dedicated ground school classroom',
      'Pilot lounge with flight planning computers',
      'On-site aircraft maintenance facility',
      'Student briefing rooms',
      'Weather briefing station'
    ],
    instructorCount: 6,
    reviewCount: 18,
    avgRating: 4.3,
    heroImageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop',
    fleetDetails: [
      {
        aircraftType: 'Cessna 172S Skyhawk',
        count: 4,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Garmin G1000', 'ADS-B Out', 'Autopilot', 'IFR Certified'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Archer III',
        count: 2,
        maxAltitude: 13500,
        cruiseSpeed: 128,
        equipment: ['Garmin GNS 430W', 'ADS-B Out', 'IFR Certified'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Cessna 152',
        count: 2,
        maxAltitude: 12100,
        cruiseSpeed: 107,
        equipment: ['Dual Nav/Com', 'Transponder', 'ADS-B Out'],
        availability: 'High'
      }
    ],
    instructors: [
      {
        id: 'instr-121',
        name: 'Marcus Thompson',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 12,
        bio: 'Marcus flew regional jets for 8 years before transitioning to full-time instruction. He specializes in instrument training and helping students develop professional-level decision-making skills. His patient teaching style and systematic approach have helped over 200 students earn their certificates.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      },
      {
        id: 'instr-122',
        name: 'Jennifer Wu',
        certificates: ['CFI', 'CFII', 'AGI'],
        yearsExperience: 7,
        bio: 'Jennifer brings a background in aerospace engineering to her instruction, helping students understand the "why" behind every maneuver. She excels at teaching complex airspace operations and is known for her thorough ground instruction. Her students consistently pass checkrides on the first attempt.',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
      },
      {
        id: 'instr-123',
        name: 'David Patterson',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 5,
        bio: 'David earned all his ratings at Atlanta Flight Training and now shares his passion for aviation with new students. He specializes in primary training and creates a relaxed learning environment that helps nervous students build confidence. His enthusiasm for flying is contagious.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
      },
      {
        id: 'instr-124',
        name: 'Sarah Mitchell',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 9,
        bio: 'Sarah combines corporate flight experience with a talent for instruction, helping students develop professional habits from day one. She specializes in commercial training and advanced maneuvers, with a focus on precision flying. Students appreciate her high standards and constructive feedback.',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
      }
    ],
    programDetails: [
      {
        name: 'Private Pilot License',
        certification: 'PPL',
        durationHours: 55,
        costMin: 12800,
        costMax: 13800,
        description: 'Complete private pilot training from first flight to checkride. Includes 45 hours dual instruction, 10 hours solo flight time, comprehensive ground school, and all FAA knowledge test prep. Flexible scheduling available.'
      },
      {
        name: 'Instrument Rating',
        certification: 'IR',
        durationHours: 45,
        costMin: 14500,
        costMax: 16200,
        description: `Master instrument flying in Atlanta's complex airspace. Program includes 40 hours instrument instruction, advanced simulator training, and real-world IFR operations into busy airports. Perfect preparation for professional flying.`
      },
      {
        name: 'Commercial Pilot License',
        certification: 'CPL',
        durationHours: 120,
        costMin: 47000,
        costMax: 51000,
        description: 'Professional pilot training from instrument rating through commercial checkride. Includes advanced maneuvers, commercial cross-countries, complex aircraft training, and comprehensive commercial ground school. Build the precision flying skills airlines demand.'
      }
    ],
    reviews: [
      {
        id: 'review-121',
        reviewerName: 'Michael Chen',
        date: '2025-09-15',
        rating: 5,
        title: 'Excellent Part 61 Program',
        body: 'The flexibility of Part 61 training was perfect for my work schedule. Marcus was an outstanding instructor who really focused on making me a safe, competent pilot rather than just checking boxes. The fleet is well-maintained and the location at PDK gives you amazing experience in complex airspace.',
        helpful: 12
      },
      {
        id: 'review-122',
        reviewerName: 'Amanda Rodriguez',
        date: '2025-08-22',
        rating: 4,
        title: 'Great instruction, scheduling can be tight',
        body: 'Jennifer was fantastic - really thorough and patient. The aircraft are in good condition and the ground school material is comprehensive. Only downside is that popular time slots fill up quickly, so plan ahead. Overall very happy with my training here.',
        helpful: 8
      },
      {
        id: 'review-123',
        reviewerName: 'James Wilson',
        date: '2025-07-10',
        rating: 5,
        title: 'Passed PPL checkride first try!',
        body: 'David prepared me incredibly well for every aspect of the checkride. His teaching style made complex concepts easy to understand, and he was always available to answer questions. The G1000 aircraft are modern and fun to fly. Highly recommend this school.',
        helpful: 15
      },
      {
        id: 'review-124',
        reviewerName: 'Lisa Thompson',
        date: '2025-06-03',
        rating: 4,
        title: 'Solid commercial training',
        body: 'Sarah pushed me to fly precisely and professionally, which really paid off during my commercial checkride. The program is well-structured and the facilities are good. Pricing was as advertised with no surprise fees, which I appreciated.',
        helpful: 9
      },
      {
        id: 'review-125',
        reviewerName: 'Robert Kim',
        date: '2025-05-18',
        rating: 4,
        title: 'Good value for Part 61',
        body: 'Completed my instrument rating here and had a great experience. The instructors are knowledgeable and the aircraft availability is generally good. The location provides excellent real-world IFR training opportunities. Would definitely recommend to friends.',
        helpful: 11
      }
    ],
    verificationDetails: {
      trustTier: 'Community Verified',
      verificationTimestamp: '2025-08-15T14:30:00Z',
      dataSources: ['Student Reviews', 'FAA Registry', 'Better Business Bureau'],
      lastUpdated: '2025-10-20T09:15:00Z'
    },
    contactInfo: {
      email: 'info@atlantaflighttraining.com',
      phone: '(770) 555-0142',
      website: 'https://www.atlantaflighttraining.com'
    }
  },

  {
    schoolId: 'school-013',
    name: 'New York Aviation Center',
    location: {
      city: 'New York',
      state: 'NY',
      zipCode: '11371',
      coordinates: { lat: 40.7769, lng: -73.8740 }
    },
    programs: ['PPL', 'IR', 'CPL', 'ATPL'],
    costBand: { min: 16500, max: 62000 },
    trainingType: 'Part141',
    trustTier: TrustTier.PREMIER,
    description: `New York Aviation Center stands as one of the Northeast's premier flight training academies, offering FAA Part 141 approved programs designed to the highest standards. Based at LaGuardia Airport, we provide students with unparalleled exposure to professional aviation operations in the world's busiest airspace. Our structured curriculum and modern fleet ensure efficient, high-quality training that meets airline hiring standards.

Since 2005, we've graduated over 2,000 pilots who now fly for major airlines, corporate operators, and charter companies worldwide. Our Part 141 certification means every aspect of our training is FAA-approved and continuously monitored for quality. With a 98% first-time checkride pass rate and direct partnerships with regional airlines, we offer the fastest path from zero time to airline cockpit.

Our 35,000 square foot training facility features state-of-the-art simulators, dedicated classrooms, and comprehensive career services. From private pilot through ATP certification, our experienced instructors - many of whom are current or former airline captains - provide mentorship alongside world-class training. We don't just teach you to fly; we prepare you for a lifetime career in aviation.`,
    yearsInOperation: 20,
    facilities: [
      'Full-motion Level 5 flight training devices',
      'Six dedicated ground school classrooms',
      'Advanced weather briefing center',
      'Professional pilot resource library',
      'Student lounge with flight planning stations',
      'On-site FAA testing center',
      'Career placement office',
      'Aircraft maintenance hangar'
    ],
    instructorCount: 18,
    reviewCount: 45,
    avgRating: 4.7,
    heroImageUrl: 'https://images.unsplash.com/photo-1415226581130-91cb7f52f078?w=800&h=600&fit=crop',
    fleetDetails: [
      {
        aircraftType: 'Cirrus SR20',
        count: 8,
        maxAltitude: 17500,
        cruiseSpeed: 155,
        equipment: ['Garmin Perspective+', 'ADS-B In/Out', 'Autopilot', 'Air Conditioning', 'CAPS'],
        availability: 'High'
      },
      {
        aircraftType: 'Diamond DA42',
        count: 4,
        maxAltitude: 18000,
        cruiseSpeed: 190,
        equipment: ['Garmin G1000 NXi', 'ADS-B In/Out', 'Autopilot', 'FIKI', 'Multi-Engine'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Cessna 172S Skyhawk',
        count: 6,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Garmin G1000 NXi', 'ADS-B In/Out', 'Autopilot', 'IFR Certified'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Seminole',
        count: 2,
        maxAltitude: 17200,
        cruiseSpeed: 160,
        equipment: ['Garmin GNS 430W', 'ADS-B Out', 'Autopilot', 'Multi-Engine', 'IFR Certified'],
        availability: 'Medium'
      }
    ],
    instructors: [
      {
        id: 'instr-125',
        name: 'Captain Robert Harrison',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 22,
        bio: 'Captain Harrison flew Boeing 777s internationally for United Airlines before joining our team as Chief Flight Instructor. He brings real airline procedures and decision-making to every lesson, preparing students for professional aviation careers. His extensive experience in complex operations and crew resource management provides invaluable insights for aspiring airline pilots.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
      },
      {
        id: 'instr-126',
        name: 'Emily Nakamura',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 15,
        bio: 'Emily transitioned from corporate aviation to instruction, bringing a wealth of experience flying Citations and Learjets. She specializes in instrument and multi-engine training, with a focus on precision flying and professional communication. Her students consistently praise her systematic approach and ability to break down complex procedures into manageable steps.',
        photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop'
      },
      {
        id: 'instr-127',
        name: 'Michael Torres',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 8,
        bio: 'Michael graduated from our program in 2017 and now serves as a senior flight instructor and check airman. He specializes in preparing students for airline interviews and checkrides, drawing from his extensive knowledge of Part 141 standards. His energetic teaching style and attention to detail have helped hundreds of students achieve their aviation goals.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'
      }
    ],
    programDetails: [
      {
        name: 'Private Pilot License',
        certification: 'PPL',
        durationHours: 45,
        costMin: 16000,
        costMax: 17500,
        description: `FAA Part 141 approved private pilot course with reduced minimums. Structured syllabus ensures efficient training in New York's challenging airspace. Includes 35 hours dual instruction, 10 hours solo, comprehensive ground school, and FAA knowledge test prep.`
      },
      {
        name: 'Instrument Rating',
        certification: 'IR',
        durationHours: 40,
        costMin: 18500,
        costMax: 20800,
        description: `Part 141 instrument rating with reduced hour requirements. Master IFR operations in the Northeast corridor's complex airspace system. Advanced simulator training and real-world IFR flights prepare you for professional aviation.`
      },
      {
        name: 'Commercial Pilot License',
        certification: 'CPL',
        durationHours: 130,
        costMin: 58000,
        costMax: 64000,
        description: 'Complete commercial pilot program from private through commercial checkride. Part 141 approved course includes advanced maneuvers, complex aircraft training, multi-engine rating, and professional flight operations. Meets all airline hiring minimums.'
      },
      {
        name: 'Airline Transport Pilot',
        certification: 'ATPL',
        durationHours: 45,
        costMin: 8500,
        costMax: 10500,
        description: 'ATP Certification Training Program (CTP) required for ATP certificate. Includes 30 hours of ground training covering advanced aerodynamics, weather, operations, and transport category aircraft systems. Full-motion simulator training in jet aircraft prepares you for airline operations.'
      }
    ],
    reviews: [
      {
        id: 'review-126',
        reviewerName: 'Christopher Yang',
        date: '2025-10-08',
        rating: 5,
        title: 'Best investment I ever made',
        body: `Completed the zero-to-hero program here and just got hired by a regional airline. The Part 141 structure kept me on track and the quality of instruction was exceptional. Captain Harrison's mentorship was invaluable. The location at LGA gives you experience you can't get anywhere else.`,
        helpful: 28
      },
      {
        id: 'review-127',
        reviewerName: 'Jessica Martinez',
        date: '2025-09-25',
        rating: 5,
        title: 'Professional training environment',
        body: `Everything about this school screams professionalism. The aircraft are impeccably maintained, the instructors are top-notch, and the facilities rival what you'd find at major airline training centers. Yes, it's expensive, but you get what you pay for. Worth every penny.`,
        helpful: 22
      },
      {
        id: 'review-128',
        reviewerName: `David O'Connor`,
        date: '2025-08-14',
        rating: 5,
        title: 'Excellent instrument training',
        body: 'Emily was my CFII and she was absolutely outstanding. The Part 141 curriculum is well-organized and efficient. Flying actual IFR in New York airspace was challenging but incredibly valuable experience. Passed my checkride on the first attempt thanks to their thorough preparation.',
        helpful: 19
      },
      {
        id: 'review-129',
        reviewerName: 'Rachel Goldstein',
        date: '2025-07-30',
        rating: 4,
        title: 'Great program, premium pricing',
        body: 'The training quality here is undeniably excellent and the fleet is modern. My only complaint is the cost - definitely on the higher end even for New York. That said, the structured Part 141 program and career services helped me get hired quickly, so the ROI worked out.',
        helpful: 16
      },
      {
        id: 'review-130',
        reviewerName: 'Brandon Lewis',
        date: '2025-06-12',
        rating: 5,
        title: 'From zero to commercial in 14 months',
        body: 'Came in with no experience and earned my commercial multi in just over a year. The accelerated Part 141 program is intense but incredibly efficient. Michael was my primary instructor and pushed me to airline standards from day one. Now building time as a CFI here before moving to the regionals.',
        helpful: 31
      }
    ],
    verificationDetails: {
      trustTier: 'Premier',
      verificationTimestamp: '2025-09-01T10:00:00Z',
      dataSources: ['FAA Part 141 Certification', 'Direct School Verification', 'AOPA Flight Training Magazine', 'Better Business Bureau A+ Rating'],
      lastUpdated: '2025-11-01T08:00:00Z'
    },
    contactInfo: {
      email: 'admissions@nyaviationcenter.com',
      phone: '(718) 555-0198',
      website: 'https://www.nyaviationcenter.com'
    }
  },

  {
    schoolId: 'school-014',
    name: 'Kansas City Flight School',
    location: {
      city: 'Kansas City',
      state: 'MO',
      zipCode: '64153',
      coordinates: { lat: 39.2754, lng: -94.4944 }
    },
    programs: ['PPL', 'IR', 'CPL'],
    costBand: { min: 12800, max: 47500 },
    trainingType: 'Part61',
    trustTier: TrustTier.COMMUNITY_VERIFIED,
    description: `Kansas City Flight School has been a cornerstone of aviation training in the Kansas City metro area for over two decades. Operating under Part 61 regulations, we provide personalized, flexible flight training that adapts to your schedule and learning pace. Our approach emphasizes one-on-one instruction with experienced CFIs who are dedicated to helping you achieve your aviation goals efficiently and safely.\n\nLocated at Charles B. Wheeler Downtown Airport, our facility offers convenient access to both controlled and uncontrolled airspace, providing diverse training environments. Our students benefit from the moderate weather conditions of the Midwest, allowing for consistent year-round training. We pride ourselves on maintaining a well-equipped fleet and fostering a tight-knit community of pilots who support each other throughout their aviation journey.\n\nWhether you're pursuing your private pilot certificate or advancing to commercial privileges, Kansas City Flight School combines affordability with quality instruction. Our community-verified status reflects our commitment to transparency and student success, with graduates consistently praising our practical, no-nonsense approach to flight training.`,
    yearsInOperation: 23,
    facilities: [
      'Flight planning and briefing room',
      'Redbird FMX full-motion simulator',
      'Student lounge with aviation library',
      'Maintenance hangar on-site',
      'Tie-down and hangar storage',
      'Weather briefing station',
      'Ground school classroom'
    ],
    instructorCount: 6,
    reviewCount: 12,
    avgRating: 4.4,
    heroImageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop',
    fleetDetails: [
      {
        aircraftType: 'Cessna 172S Skyhawk',
        count: 4,
        maxAltitude: 14000,
        cruiseSpeed: 122,
        equipment: ['Garmin G1000', 'Autopilot', 'ADS-B Out'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Warrior PA-28-161',
        count: 2,
        maxAltitude: 12500,
        cruiseSpeed: 115,
        equipment: ['Garmin GTN 650', 'ADS-B Out', 'DualNav/Com'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 152',
        count: 1,
        maxAltitude: 12100,
        cruiseSpeed: 107,
        equipment: ['Garmin GNS 430', 'Mode C Transponder'],
        availability: 'Medium'
      }
    ],
    instructors: [
      {
        id: 'instr-141',
        name: 'David Martinez',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 18,
        bio: 'David brings nearly two decades of flight instruction experience to KCFS, having trained over 200 pilots from zero time through commercial certificates. A former corporate pilot, he emphasizes real-world decision-making and scenario-based training. His patient teaching style and attention to detail make complex concepts accessible to students of all backgrounds.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      },
      {
        id: 'instr-142',
        name: 'Rebecca Thompson',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 11,
        bio: `Rebecca specializes in instrument training and is known for her methodical approach to IFR procedures. She holds a Master's degree in Aviation Safety and incorporates human factors principles into every lesson. Students appreciate her ability to build confidence while maintaining high standards of precision and professionalism.`,
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
      },
      {
        id: 'instr-143',
        name: 'James Chen',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 7,
        bio: 'James is a career aviation educator who found his passion for teaching after a successful career in aerospace engineering. His technical background allows him to explain aerodynamic concepts with exceptional clarity. He excels at helping nervous students overcome their fears and build solid foundational skills.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'
      },
      {
        id: 'instr-144',
        name: 'Sarah Wilson',
        certificates: ['CFI', 'CFI-Sport'],
        yearsExperience: 5,
        bio: 'Sarah is one of our newest instructors but brings tremendous enthusiasm and modern teaching techniques to the team. As a recent commercial pilot graduate herself, she understands the challenges students face and provides relatable, practical advice. Her specialty is primary training and she has a 98% first-time checkride pass rate.',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
      }
    ],
    programDetails: [
      {
        name: 'Private Pilot Certificate',
        certification: 'PPL',
        durationHours: 65,
        costMin: 11500,
        costMax: 14200,
        description: 'Our PPL program provides comprehensive training from first flight through checkride. With flexible scheduling and personalized instruction, most students complete their certificate in 6-9 months. Training includes 45+ hours of flight time, ground school, and comprehensive test preparation.'
      },
      {
        name: 'Instrument Rating',
        certification: 'IR',
        durationHours: 50,
        costMin: 10800,
        costMax: 13500,
        description: `Master IFR flying with our intensive instrument rating course. Combining simulator training with actual IMC experience, you'll develop the precision and decision-making skills needed for professional-level flying. Our program exceeds FAA minimums to ensure complete competency.`
      },
      {
        name: 'Commercial Pilot Certificate',
        certification: 'CPL',
        durationHours: 120,
        costMin: 44000,
        costMax: 51000,
        description: 'Build the 250 total hours required for commercial privileges while refining your skills to professional standards. Our CPL program includes advanced maneuvers, complex aircraft training, and commercial cross-country requirements. We prepare you not just for the checkride, but for a career in aviation.'
      }
    ],
    reviews: [
      {
        id: 'review-141',
        reviewerName: 'Michael B.',
        date: '2025-09-15',
        rating: 5,
        title: 'Great school for working professionals',
        body: 'KCFS was perfect for my schedule as I work full-time. The instructors were flexible and the aircraft availability was excellent. David Martinez was my primary CFI and his real-world experience really showed in the training. Passed my PPL checkride first try!',
        helpful: 8
      },
      {
        id: 'review-142',
        reviewerName: 'Amanda K.',
        date: '2025-08-22',
        rating: 4,
        title: 'Solid training, fair prices',
        body: `Got my instrument rating here after doing PPL elsewhere. Rebecca is an outstanding instrument instructor - very detail-oriented. The only reason I didn't give 5 stars is that one of their 172s was down for maintenance for about 3 weeks during my training, but they worked around it.`,
        helpful: 5
      },
      {
        id: 'review-143',
        reviewerName: 'Tyler R.',
        date: '2025-07-10',
        rating: 5,
        title: 'Best decision I made',
        body: 'I was nervous about learning to fly but James made it so approachable. The Part 61 flexibility meant I could go at my own pace without feeling rushed. The simulator was great for practicing approaches before doing them in the plane.',
        helpful: 6
      },
      {
        id: 'review-144',
        reviewerName: 'Jennifer L.',
        date: '2025-05-28',
        rating: 4,
        title: 'Good value for money',
        body: 'Completed PPL and IR here. Costs came in right around their estimates which I appreciated. The fleet is well-maintained and the location at Wheeler is convenient. Sometimes scheduling gets tight on weekends but weekday availability is great.',
        helpful: 4
      },
      {
        id: 'review-145',
        reviewerName: 'Robert H.',
        date: '2025-04-03',
        rating: 4,
        title: 'Personalized instruction',
        body: `The Part 61 approach really worked well for me. Sarah was my instructor and she tailored each lesson to my learning style. The school has a friendly, community feel that you don't get at larger operations. Working on my commercial now.`,
        helpful: 7
      }
    ],
    verificationDetails: {
      trustTier: 'Community Verified',
      verificationTimestamp: '2025-03-15T14:22:00Z',
      dataSources: ['Student Reviews', 'Public Records', 'Insurance Verification'],
      lastUpdated: '2025-10-12T09:15:00Z'
    },
    contactInfo: {
      email: 'info@kcflightschool.com',
      phone: '(816) 555-0142',
      website: 'https://kcflightschool.com'
    }
  },

  {
    schoolId: 'school-015',
    name: 'San Francisco Sky Academy',
    location: {
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94128',
      coordinates: { lat: 37.6213, lng: -122.3790 }
    },
    programs: ['PPL', 'IR', 'CPL', 'ATPL'],
    costBand: { min: 17200, max: 68000 },
    trainingType: 'Part141',
    trustTier: TrustTier.PREMIER,
    description: `San Francisco Sky Academy stands as one of the Bay Area's premier flight training institutions, holding FAA Part 141 certification and maintaining the highest standards in aviation education. With state-of-the-art facilities at San Francisco International Airport, we offer a comprehensive training environment that prepares students for professional aviation careers. Our structured curriculum and rigorous standards have produced hundreds of airline and corporate pilots who fly worldwide.\n\nAs a Premier-tier institution, we undergo continuous third-party auditing and maintain transparent operations verified by independent aviation safety organizations. Our fleet of 22 modern aircraft represents one of the largest and most diverse training fleets on the West Coast, featuring advanced avionics and impeccably maintained airframes. Students benefit from training in the challenging San Francisco Bay Area airspace, gaining experience with complex weather patterns, busy Class B operations, and sophisticated air traffic procedures.\n\nOur distinguished faculty includes former airline captains, military aviators, and career flight instructors who bring decades of combined experience. We offer accelerated training programs, veteran benefits, and pathway programs with regional airlines. From your first discovery flight through ATP certification, San Francisco Sky Academy provides the professional training environment and career support needed to succeed in competitive aviation markets.`,
    yearsInOperation: 31,
    facilities: [
      'FAA-approved Part 141 training center',
      'Four Redbird full-motion simulators (including multi-engine)',
      'Dedicated ground school classrooms with multimedia systems',
      'Aviation resource library and study areas',
      'Flight planning room with ForeFlight station',
      'On-site maintenance facility',
      'Climate-controlled hangar space',
      'Student pilot lounge with flight tracking'
    ],
    instructorCount: 18,
    reviewCount: 52,
    avgRating: 4.8,
    heroImageUrl: 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=800&h=600&fit=crop',
    fleetDetails: [
      {
        aircraftType: 'Cirrus SR20 G6',
        count: 8,
        maxAltitude: 17500,
        cruiseSpeed: 155,
        equipment: ['Garmin Perspective+', 'CAPS', 'ADS-B In/Out', 'Air Conditioning'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 172S Skyhawk (G1000 NXi)',
        count: 10,
        maxAltitude: 14000,
        cruiseSpeed: 124,
        equipment: ['Garmin G1000 NXi', 'GFC 700 Autopilot', 'ADS-B In/Out', 'Synthetic Vision'],
        availability: 'High'
      },
      {
        aircraftType: 'Piper Seminole PA-44-180',
        count: 3,
        maxAltitude: 17000,
        cruiseSpeed: 160,
        equipment: ['Garmin G500 TXi', 'Dual Garmin GTN 750', 'ADS-B In/Out', 'Autopilot'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Diamond DA42 Twin Star',
        count: 1,
        maxAltitude: 18000,
        cruiseSpeed: 165,
        equipment: ['Garmin G1000', 'Integrated autopilot', 'ADS-B In/Out', 'FIKI certified'],
        availability: 'Medium'
      }
    ],
    instructors: [
      {
        id: 'instr-145',
        name: 'Captain Robert Yamamoto',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 28,
        bio: 'Captain Yamamoto retired from United Airlines after 22 years flying wide-body international routes and now serves as our Chief Flight Instructor. His airline experience brings unparalleled professionalism and real-world perspective to training. He specializes in multi-engine and ATP preparation, with a perfect record of students passing airline interviews.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
      },
      {
        id: 'instr-146',
        name: 'Dr. Elena Rodriguez',
        certificates: ['CFI', 'CFII', 'MEI', 'Gold Seal Instructor'],
        yearsExperience: 15,
        bio: 'Dr. Rodriguez holds a Ph.D. in Aviation Education and has been recognized as a Master Flight Instructor by the National Association of Flight Instructors. She designed our Part 141 curriculum and leads our ground school program. Her systematic teaching methodology and emphasis on aeronautical decision-making have set new standards for flight training excellence.',
        photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop'
      },
      {
        id: 'instr-147',
        name: 'Commander Marcus Johnson',
        certificates: ['CFI', 'CFII', 'MEI', 'ATP'],
        yearsExperience: 24,
        bio: 'Commander Johnson brings military precision to civilian flight training after retiring from the U.S. Navy where he flew F/A-18 Super Hornets and instructed at NAS Lemoore. His expertise in high-performance aircraft operations and crew resource management provides students with advanced skills and situational awareness that exceed typical training standards.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
      }
    ],
    programDetails: [
      {
        name: 'Private Pilot Certificate - Accelerated',
        certification: 'PPL',
        durationHours: 55,
        costMin: 16500,
        costMax: 18900,
        description: 'Our Part 141 accelerated PPL program provides structured training that meets FAA reduced-hour requirements. Train in modern Cirrus SR20 or Cessna 172 aircraft with advanced avionics. Most dedicated students complete in 45-60 days with our intensive scheduling options. Includes all ground school, materials, and checkride prep.'
      },
      {
        name: 'Instrument Rating - Professional Track',
        certification: 'IR',
        durationHours: 45,
        costMin: 14800,
        costMax: 17200,
        description: `Master instrument flying in the challenging Bay Area airspace with approaches to SFO, OAK, and SJC. Our Part 141 program combines sophisticated simulator training with real-world IFR operations. You'll gain experience with marine layer departures, coastal weather patterns, and busy terminal environments that prepare you for professional operations.`
      },
      {
        name: 'Commercial Pilot Certificate - Career Prep',
        certification: 'CPL',
        durationHours: 140,
        costMin: 52000,
        costMax: 62000,
        description: 'Build professional-level skills while accumulating the flight hours needed for commercial privileges. Train in high-performance aircraft and develop the precision required for airline operations. Our program includes time-building cross-countries, advanced maneuvers, and career mentorship. Graduates are eligible for our airline pathway programs.'
      },
      {
        name: 'Airline Transport Pilot Certification',
        certification: 'ATPL',
        durationHours: 80,
        costMin: 24000,
        costMax: 28500,
        description: 'Our ATP certification course represents the pinnacle of pilot training, preparing you for airline captain responsibilities. Training includes multi-engine operations, advanced crew resource management, high-altitude operations, and sophisticated weather analysis. We provide comprehensive preparation for the ATP written exam and practical test in partnership with regional airline check airmen.'
      }
    ],
    reviews: [
      {
        id: 'review-146',
        reviewerName: 'Christopher T.',
        date: '2025-10-05',
        rating: 5,
        title: 'Best training investment I ever made',
        body: `Just got hired by SkyWest after completing my training from PPL through CFI at SFSA. The structured Part 141 program and professional environment prepared me perfectly for airline interviews. Captain Yamamoto's mentorship was invaluable. Yes, it's expensive, but the quality and career outcomes justify every dollar.`,
        helpful: 18
      },
      {
        id: 'review-147',
        reviewerName: 'Lisa M.',
        date: '2025-09-18',
        rating: 5,
        title: 'World-class facilities and instruction',
        body: `Training at SFO gives you experience you can't get anywhere else. The Cirrus fleet is immaculate and the instructors are true professionals. Dr. Rodriguez taught me to think like a pilot, not just fly like one. The Premier tier verification gave me confidence this was the right choice.`,
        helpful: 15
      },
      {
        id: 'review-148',
        reviewerName: 'David K.',
        date: '2025-08-30',
        rating: 5,
        title: 'Accelerated program exceeded expectations',
        body: 'Completed PPL in 52 days through their accelerated program. The scheduling coordination was flawless and the curriculum was perfectly paced. Flying in Bay Area weather taught me more about real-world decision-making than I ever expected. Already enrolled in their instrument program.',
        helpful: 12
      },
      {
        id: 'review-149',
        reviewerName: 'Rachel S.',
        date: '2025-07-14',
        rating: 4,
        title: 'Professional training, premium price',
        body: `The training quality is absolutely top-tier and the fleet is beautiful, but be prepared for Bay Area pricing. Everything costs more here than other parts of the country. That said, the airline connections and training environment are worth it if you're serious about an aviation career. Commander Johnson is an exceptional instructor.`,
        helpful: 9
      },
      {
        id: 'review-150',
        reviewerName: 'Andrew P.',
        date: '2025-06-22',
        rating: 5,
        title: 'From zero to commercial in 14 months',
        body: `SFSA's integrated program took me from zero time to commercial multi-engine in just over a year. The Part 141 structure kept me on track and the quality never wavered. Now flying for a Part 135 operator and my training here made the transition seamless. The investment in quality instruction pays dividends throughout your career.`,
        helpful: 21
      }
    ],
    verificationDetails: {
      trustTier: 'Premier',
      verificationTimestamp: '2025-02-20T10:30:00Z',
      dataSources: ['FAA Part 141 Certification', 'Third-Party Safety Audit', 'Financial Verification', 'Student Outcome Tracking'],
      lastUpdated: '2025-10-28T16:45:00Z'
    },
    contactInfo: {
      email: 'admissions@sfskyacademy.com',
      phone: '(650) 555-0198',
      website: 'https://sfskyacademy.com'
    }
  }

];

export function getDetailedSchoolById(schoolId: string): DetailedSchool | undefined {
  return detailedMockSchools.find(school => school.schoolId === schoolId);
}
