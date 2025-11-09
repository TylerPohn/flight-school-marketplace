const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/mock/detailedSchools.ts');

// Read the current file
let content = fs.readFileSync(filePath, 'utf8');

// Find the position to insert (before the closing bracket and export)
const insertPosition = content.lastIndexOf('];\n\nexport function getDetailedSchoolById');

// Final 4 schools data (012-015)
const finalSchools = `  ,

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
    description: \`Atlanta Flight Training offers personalized flight instruction in the heart of Georgia's aviation community. Operating from DeKalb-Peachtree Airport, we specialize in Part 61 training that adapts to your schedule and learning style. Our experienced instructors bring real-world airline and corporate aviation backgrounds to every lesson.

With a modern fleet of well-maintained aircraft and a flexible training approach, we've helped hundreds of students achieve their aviation goals since 2012. Whether you're starting your private pilot journey or building commercial hours, our program balances thorough ground instruction with hands-on flight experience.

Our location provides ideal training conditions year-round, with diverse airspace including Class B operations at Hartsfield-Jackson, busy Class C airports, and quiet rural practice areas. Students gain confidence navigating one of the nation's most dynamic aviation environments while building the skills needed for a professional career.\`,
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
        description: 'Master instrument flying in Atlanta\'s complex airspace. Program includes 40 hours instrument instruction, advanced simulator training, and real-world IFR operations into busy airports. Perfect preparation for professional flying.'
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
    description: \`New York Aviation Center stands as one of the Northeast's premier flight training academies, offering FAA Part 141 approved programs designed to the highest standards. Based at LaGuardia Airport, we provide students with unparalleled exposure to professional aviation operations in the world's busiest airspace. Our structured curriculum and modern fleet ensure efficient, high-quality training that meets airline hiring standards.

Since 2005, we've graduated over 2,000 pilots who now fly for major airlines, corporate operators, and charter companies worldwide. Our Part 141 certification means every aspect of our training is FAA-approved and continuously monitored for quality. With a 98% first-time checkride pass rate and direct partnerships with regional airlines, we offer the fastest path from zero time to airline cockpit.

Our 35,000 square foot training facility features state-of-the-art simulators, dedicated classrooms, and comprehensive career services. From private pilot through ATP certification, our experienced instructors - many of whom are current or former airline captains - provide mentorship alongside world-class training. We don't just teach you to fly; we prepare you for a lifetime career in aviation.\`,
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
        description: 'FAA Part 141 approved private pilot course with reduced minimums. Structured syllabus ensures efficient training in New York\'s challenging airspace. Includes 35 hours dual instruction, 10 hours solo, comprehensive ground school, and FAA knowledge test prep.'
      },
      {
        name: 'Instrument Rating',
        certification: 'IR',
        durationHours: 40,
        costMin: 18500,
        costMax: 20800,
        description: 'Part 141 instrument rating with reduced hour requirements. Master IFR operations in the Northeast corridor\'s complex airspace system. Advanced simulator training and real-world IFR flights prepare you for professional aviation.'
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
        body: 'Completed the zero-to-hero program here and just got hired by a regional airline. The Part 141 structure kept me on track and the quality of instruction was exceptional. Captain Harrison\'s mentorship was invaluable. The location at LGA gives you experience you can\'t get anywhere else.',
        helpful: 28
      },
      {
        id: 'review-127',
        reviewerName: 'Jessica Martinez',
        date: '2025-09-25',
        rating: 5,
        title: 'Professional training environment',
        body: 'Everything about this school screams professionalism. The aircraft are impeccably maintained, the instructors are top-notch, and the facilities rival what you\'d find at major airline training centers. Yes, it\'s expensive, but you get what you pay for. Worth every penny.',
        helpful: 22
      },
      {
        id: 'review-128',
        reviewerName: 'David O\'Connor',
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
    description: 'Kansas City Flight School has been a cornerstone of aviation training in the Kansas City metro area for over two decades. Operating under Part 61 regulations, we provide personalized, flexible flight training that adapts to your schedule and learning pace. Our approach emphasizes one-on-one instruction with experienced CFIs who are dedicated to helping you achieve your aviation goals efficiently and safely.\\n\\nLocated at Charles B. Wheeler Downtown Airport, our facility offers convenient access to both controlled and uncontrolled airspace, providing diverse training environments. Our students benefit from the moderate weather conditions of the Midwest, allowing for consistent year-round training. We pride ourselves on maintaining a well-equipped fleet and fostering a tight-knit community of pilots who support each other throughout their aviation journey.\\n\\nWhether you\\'re pursuing your private pilot certificate or advancing to commercial privileges, Kansas City Flight School combines affordability with quality instruction. Our community-verified status reflects our commitment to transparency and student success, with graduates consistently praising our practical, no-nonsense approach to flight training.',
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
        bio: 'Rebecca specializes in instrument training and is known for her methodical approach to IFR procedures. She holds a Master\\'s degree in Aviation Safety and incorporates human factors principles into every lesson. Students appreciate her ability to build confidence while maintaining high standards of precision and professionalism.',
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
        description: 'Master IFR flying with our intensive instrument rating course. Combining simulator training with actual IMC experience, you\\'ll develop the precision and decision-making skills needed for professional-level flying. Our program exceeds FAA minimums to ensure complete competency.'
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
        body: 'Got my instrument rating here after doing PPL elsewhere. Rebecca is an outstanding instrument instructor - very detail-oriented. The only reason I didn\\'t give 5 stars is that one of their 172s was down for maintenance for about 3 weeks during my training, but they worked around it.',
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
        body: 'The Part 61 approach really worked well for me. Sarah was my instructor and she tailored each lesson to my learning style. The school has a friendly, community feel that you don\\'t get at larger operations. Working on my commercial now.',
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
    description: 'San Francisco Sky Academy stands as one of the Bay Area\\'s premier flight training institutions, holding FAA Part 141 certification and maintaining the highest standards in aviation education. With state-of-the-art facilities at San Francisco International Airport, we offer a comprehensive training environment that prepares students for professional aviation careers. Our structured curriculum and rigorous standards have produced hundreds of airline and corporate pilots who fly worldwide.\\n\\nAs a Premier-tier institution, we undergo continuous third-party auditing and maintain transparent operations verified by independent aviation safety organizations. Our fleet of 22 modern aircraft represents one of the largest and most diverse training fleets on the West Coast, featuring advanced avionics and impeccably maintained airframes. Students benefit from training in the challenging San Francisco Bay Area airspace, gaining experience with complex weather patterns, busy Class B operations, and sophisticated air traffic procedures.\\n\\nOur distinguished faculty includes former airline captains, military aviators, and career flight instructors who bring decades of combined experience. We offer accelerated training programs, veteran benefits, and pathway programs with regional airlines. From your first discovery flight through ATP certification, San Francisco Sky Academy provides the professional training environment and career support needed to succeed in competitive aviation markets.',
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
        description: 'Master instrument flying in the challenging Bay Area airspace with approaches to SFO, OAK, and SJC. Our Part 141 program combines sophisticated simulator training with real-world IFR operations. You\\'ll gain experience with marine layer departures, coastal weather patterns, and busy terminal environments that prepare you for professional operations.'
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
        body: 'Just got hired by SkyWest after completing my training from PPL through CFI at SFSA. The structured Part 141 program and professional environment prepared me perfectly for airline interviews. Captain Yamamoto\\'s mentorship was invaluable. Yes, it\\'s expensive, but the quality and career outcomes justify every dollar.',
        helpful: 18
      },
      {
        id: 'review-147',
        reviewerName: 'Lisa M.',
        date: '2025-09-18',
        rating: 5,
        title: 'World-class facilities and instruction',
        body: 'Training at SFO gives you experience you can\\'t get anywhere else. The Cirrus fleet is immaculate and the instructors are true professionals. Dr. Rodriguez taught me to think like a pilot, not just fly like one. The Premier tier verification gave me confidence this was the right choice.',
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
        body: 'The training quality is absolutely top-tier and the fleet is beautiful, but be prepared for Bay Area pricing. Everything costs more here than other parts of the country. That said, the airline connections and training environment are worth it if you\\'re serious about an aviation career. Commander Johnson is an exceptional instructor.',
        helpful: 9
      },
      {
        id: 'review-150',
        reviewerName: 'Andrew P.',
        date: '2025-06-22',
        rating: 5,
        title: 'From zero to commercial in 14 months',
        body: 'SFSA\\'s integrated program took me from zero time to commercial multi-engine in just over a year. The Part 141 structure kept me on track and the quality never wavered. Now flying for a Part 135 operator and my training here made the transition seamless. The investment in quality instruction pays dividends throughout your career.',
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
`;

// Insert the new schools
const updatedContent = content.slice(0, insertPosition) + finalSchools + '\n' + content.slice(insertPosition);

// Write back to file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('✅ Successfully added schools 012-015 to detailedSchools.ts');
console.log('   - school-012: Atlanta Flight Training');
console.log('   - school-013: New York Aviation Center');
console.log('   - school-014: Kansas City Flight School');
console.log('   - school-015: San Francisco Sky Academy');
