import { TrustTier } from '../types/trustTier';
import type { DetailedSchool } from './detailedSchools';

export const mediocreSchools: DetailedSchool[] = [
  // School 1: Detroit, MI - Low rating, Unverified, Part 61, older fleet
  {
    schoolId: 'school-028',
    name: 'Motor City Flight Center',
    location: {
      city: 'Detroit',
      state: 'MI',
      zipCode: '48242',
      coordinates: { lat: 42.4091, lng: -83.0094 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 8500, max: 12000 },
    trainingType: 'Part61',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: `Motor City Flight Center has been operating in Detroit since 2015. We offer basic flight training with affordable rates for students on a budget. Our Part 61 program provides flexibility for those who need to train around work schedules. While we may not have the newest aircraft or fanciest facilities, we focus on getting students through their ratings at reasonable costs.`,

    yearsInOperation: 9,
    facilities: [
      'Basic Ground School Room',
      'Small Student Lounge',
      'Outdoor Tie-Downs'
    ],
    instructorCount: 4,
    reviewCount: 31,
    avgRating: 3.2,
    heroImageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 150',
        count: 3,
        maxAltitude: 12650,
        cruiseSpeed: 100,
        equipment: ['Basic VOR', 'Transponder', 'Single Nav/Com'],
        availability: 'High'
      },
      {
        aircraftType: 'Cessna 172M',
        count: 2,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'GPS', 'Transponder'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-028-1',
        name: 'Dan Stevens',
        certificates: ['CFI'],
        yearsExperience: 3,
        bio: 'Building time toward airlines. Available evenings and weekends. Still learning the teaching process but eager to help.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-028-2',
        name: 'Rick Harrison',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 8,
        bio: 'Owner and chief instructor. Flies when not managing the business. Can be difficult to schedule.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 75,
        costMin: 8500,
        costMax: 11000,
        description: 'Basic Part 61 training in our older but serviceable fleet. Budget-friendly option for getting your license. Training timeline depends on weather and aircraft availability.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 52,
        costMin: 7500,
        costMax: 10000,
        description: 'Instrument training in steam gauge aircraft. Good for learning basics without glass cockpit distractions. May take longer than advertised.'
      }
    ],

    reviews: [
      {
        id: 'rev-028-1',
        reviewerName: 'Tom Brady',
        date: '2024-09-20',
        rating: 2,
        title: 'Frustrated with Aircraft Availability',
        body: 'Been trying to finish my PPL for over a year. Aircraft constantly down for maintenance. When they are available, scheduling is a nightmare. Cheap rates but you get what you pay for.',
        helpful: 18
      },
      {
        id: 'rev-028-2',
        reviewerName: 'Sarah Mitchell',
        date: '2024-07-15',
        rating: 3,
        title: 'Okay for Budget Training',
        body: 'If you just need cheap hours, this works. Do not expect modern equipment or stellar customer service. Rick is knowledgeable but very busy. Took me 85 hours to get PPL.',
        helpful: 14
      },
      {
        id: 'rev-028-3',
        reviewerName: 'Mike Johnson',
        date: '2024-05-10',
        rating: 4,
        title: 'Cheap Rates, Basic Training',
        body: 'Got my license here on a tight budget. Aircraft are old but they fly. Just manage expectations - this is not a premium school. Good enough if money is your main concern.',
        helpful: 11
      },
      {
        id: 'rev-028-4',
        reviewerName: 'Jennifer Adams',
        date: '2024-02-28',
        rating: 3,
        title: 'Mixed Experience',
        body: 'Instructors turnover frequently. Had 3 different CFIs during my training. Facilities need updating. But I saved money compared to other schools.',
        helpful: 9
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2024-08-15T10:00:00Z',
      dataSources: ['FAA Registry'],
      lastUpdated: '2024-10-10'
    },

    contactInfo: {
      email: 'info@motorcityflight.com',
      phone: '(313) 555-4721',
      website: 'https://motorcityflight.com'
    }
  },

  // School 2: Tampa, FL - Mediocre rating, Community-Verified, Part 141
  {
    schoolId: 'school-029',
    name: 'Sunshine State Aviation',
    location: {
      city: 'Tampa',
      state: 'FL',
      zipCode: '33607',
      coordinates: { lat: 27.9659, lng: -82.5332 }
    },
    programs: ['PPL', 'IR', 'CPL'],
    costBand: { min: 11000, max: 16000 },
    trainingType: 'Part141',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,

    description: `Sunshine State Aviation offers Part 141 training in the Tampa area. Established in 2012, we have trained hundreds of pilots. Our program follows FAA-approved syllabi but students should be prepared for Florida summer weather delays and occasional scheduling challenges. We are working to improve our processes and customer service based on feedback.`,

    yearsInOperation: 12,
    facilities: [
      'Ground School Classroom',
      'Basic Simulator',
      'Student Lounge',
      'Flight Planning Area',
      'Outdoor Parking'
    ],
    instructorCount: 8,
    reviewCount: 58,
    avgRating: 3.7,
    heroImageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172N',
        count: 5,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'GPS', 'Transponder'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Warrior',
        count: 3,
        maxAltitude: 14300,
        cruiseSpeed: 127,
        equipment: ['Garmin 430', 'IFR Certified', 'ADS-B'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Arrow',
        count: 1,
        maxAltitude: 16200,
        cruiseSpeed: 145,
        equipment: ['GPS', 'Complex', 'Retractable Gear'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-029-1',
        name: 'Brad Wilson',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 6,
        bio: 'Working toward airline career. Sometimes cancels last minute for airline interviews. Knows the material but can be rushed.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-029-2',
        name: 'Kelly Martinez',
        certificates: ['CFI'],
        yearsExperience: 4,
        bio: 'Part-time instructor with full-time job. Limited availability but patient when flying. Scheduling can be difficult.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-029-3',
        name: 'Steve Thompson',
        certificates: ['CFI', 'CFII', 'MEI'],
        yearsExperience: 10,
        bio: 'Chief instructor. Experienced but sometimes impatient with slower students. Knows shortcuts that may skip important fundamentals.',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 65,
        costMin: 11000,
        costMax: 14000,
        description: 'Part 141 program that can be rushed. Students report feeling unprepared for checkrides. Summer weather causes significant delays.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 45,
        costMin: 9000,
        costMax: 12000,
        description: 'IFR training that meets minimums but may lack depth. Pass rates are below industry average. Consider supplemental study.'
      },
      {
        name: 'Commercial Pilot License (CPL)',
        certification: 'CPL',
        durationHours: 55,
        costMin: 12000,
        costMax: 15000,
        description: 'Commercial training adequate for checkride but limited real-world preparation. Job placement assistance is minimal.'
      }
    ],

    reviews: [
      {
        id: 'rev-029-1',
        reviewerName: 'Chris Anderson',
        date: '2024-08-15',
        rating: 3,
        title: 'Passed But Felt Rushed',
        body: 'Got my PPL but honestly felt unprepared. Steve pushed me to checkride when I did not feel ready. Passed but barely. Wish I had gotten more thorough training.',
        helpful: 22
      },
      {
        id: 'rev-029-2',
        reviewerName: 'Amanda Lee',
        date: '2024-06-20',
        rating: 4,
        title: 'Okay Experience Overall',
        body: 'Training was fine, nothing special. Had to switch instructors twice due to them leaving for airlines. Aircraft maintenance could be better. Got the job done though.',
        helpful: 16
      },
      {
        id: 'rev-029-3',
        reviewerName: 'David Kim',
        date: '2024-04-10',
        rating: 3,
        title: 'Scheduling Nightmare',
        body: 'Constant cancellations and reschedules. Summer weather is brutal in Tampa and they overbook students. Took me way longer than estimated. Budget more time than they tell you.',
        helpful: 19
      },
      {
        id: 'rev-029-4',
        reviewerName: 'Rachel White',
        date: '2024-02-18',
        rating: 4,
        title: 'Gets You Through',
        body: 'Not the best but not the worst. If you are focused on just getting your ratings quickly and cheaply, it works. Just do not expect hand-holding or amazing facilities.',
        helpful: 13
      }
    ],

    verificationDetails: {
      trustTier: 'Community-Verified',
      verificationTimestamp: '2024-05-20T14:30:00Z',
      dataSources: ['FAA Registry', 'Student Reviews'],
      lastUpdated: '2024-10-22'
    },

    contactInfo: {
      email: 'fly@sunshinestateaviation.com',
      phone: '(813) 555-6293',
      website: 'https://sunshinestateaviation.com'
    }
  },

  // School 3: Pittsburgh, PA - Low rating, Unverified, Part 61
  {
    schoolId: 'school-030',
    name: 'Steel City Flight Training',
    location: {
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15108',
      coordinates: { lat: 40.4915, lng: -80.2329 }
    },
    programs: ['PPL'],
    costBand: { min: 9000, max: 13000 },
    trainingType: 'Part61',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: `Steel City Flight Training is a small, family-run operation serving the Pittsburgh area since 2018. We offer no-frills Part 61 training with older aircraft. Our focus is on affordability over amenities. Due to limited staff and aging fleet, students may experience delays. Best suited for patient, budget-conscious individuals who do not mind a less structured environment.`,

    yearsInOperation: 6,
    facilities: [
      'Small Office/Classroom',
      'Outdoor Tie-Downs',
      'Vending Machine'
    ],
    instructorCount: 3,
    reviewCount: 19,
    avgRating: 3.1,
    heroImageUrl: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 150',
        count: 2,
        maxAltitude: 12650,
        cruiseSpeed: 100,
        equipment: ['Basic VOR', 'Transponder'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Cherokee 140',
        count: 1,
        maxAltitude: 14000,
        cruiseSpeed: 115,
        equipment: ['VOR', 'Transponder', 'Old GPS'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-030-1',
        name: 'Joe Patterson',
        certificates: ['CFI'],
        yearsExperience: 12,
        bio: 'Owner. Former corporate pilot. Teaches when not handling business operations. Can be hard to reach and sometimes distracted.',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-030-2',
        name: 'Ryan Cooper',
        certificates: ['CFI'],
        yearsExperience: 2,
        bio: 'New instructor building hours. Enthusiastic but inexperienced. Still learning how to teach effectively.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 80,
        costMin: 9000,
        costMax: 13000,
        description: 'Very basic Part 61 training. Expect extended timeline due to aircraft maintenance issues and limited instructor availability. Rock-bottom pricing but buyer beware.'
      }
    ],

    reviews: [
      {
        id: 'rev-030-1',
        reviewerName: 'Mark Stevens',
        date: '2024-09-05',
        rating: 2,
        title: 'Frustrating Experience',
        body: 'Aircraft constantly broken. Took 2 years to finish PPL because of maintenance delays. Joe is knowledgeable but almost impossible to schedule. Only go here if you have unlimited time and patience.',
        helpful: 15
      },
      {
        id: 'rev-030-2',
        reviewerName: 'Linda Garcia',
        date: '2024-06-12',
        rating: 3,
        title: 'Cheap But You Pay in Time',
        body: 'Saved money on hourly rates but spent way more time than expected. Facilities are basically non-existent. Good if you just want bare minimum training.',
        helpful: 11
      },
      {
        id: 'rev-030-3',
        reviewerName: 'Paul Richardson',
        date: '2024-03-28',
        rating: 4,
        title: 'Got My License Eventually',
        body: 'It took forever but I got my license for less money than bigger schools. Set your expectations low for service and scheduling. The 150 is ancient but it flies.',
        helpful: 8
      },
      {
        id: 'rev-030-4',
        reviewerName: 'Susan Miller',
        date: '2024-01-15',
        rating: 3,
        title: 'Basic Training Only',
        body: 'This is bare bones flight training. No frills, no amenities, old planes. But Joe knows his stuff when you can actually fly with him. Budget friendly if you are patient.',
        helpful: 7
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2024-06-01T09:00:00Z',
      dataSources: ['FAA Registry'],
      lastUpdated: '2024-09-20'
    },

    contactInfo: {
      email: 'joe@steelcityflight.com',
      phone: '(412) 555-8347'
    }
  },

  // School 4: Tucson, AZ - Mediocre rating, Community-Verified, Part 61
  {
    schoolId: 'school-031',
    name: 'Desert Wings Flight Academy',
    location: {
      city: 'Tucson',
      state: 'AZ',
      zipCode: '85756',
      coordinates: { lat: 32.1161, lng: -110.9410 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 10000, max: 14500 },
    trainingType: 'Part61',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,

    description: `Desert Wings Flight Academy opened in 2016 offering Part 61 training in the Arizona desert. While we benefit from excellent weather, our school has struggled with instructor retention and organizational consistency. Recent management changes aim to improve operations, but we are still working through growing pains. Students seeking highly structured training may want to look elsewhere.`,

    yearsInOperation: 8,
    facilities: [
      'Classroom',
      'Small Simulator',
      'Student Break Room',
      'Outdoor Parking',
      'Wi-Fi'
    ],
    instructorCount: 5,
    reviewCount: 42,
    avgRating: 3.6,
    heroImageUrl: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172M',
        count: 4,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'GPS', 'Transponder'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Cherokee 180',
        count: 2,
        maxAltitude: 14300,
        cruiseSpeed: 125,
        equipment: ['Nav/Com', 'GPS', 'Basic Autopilot'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-031-1',
        name: 'Alex Turner',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 5,
        bio: 'Interim chief instructor. Trying to stabilize operations after previous management left. Competent but overwhelmed with administrative duties.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-031-2',
        name: 'Monica Sanchez',
        certificates: ['CFI'],
        yearsExperience: 3,
        bio: 'Newer instructor with good intentions but limited experience. Still developing teaching techniques. Can be inconsistent with scheduling.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-031-3',
        name: 'Derek Phillips',
        certificates: ['CFI'],
        yearsExperience: 4,
        bio: 'Time-building toward regionals. Reliable but focused on building hours rather than teaching excellence.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 68,
        costMin: 10000,
        costMax: 13000,
        description: 'Part 61 training with flexible scheduling. Recent turnover means training consistency may vary. Weather is excellent but organization needs improvement.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 50,
        costMin: 8500,
        costMax: 11500,
        description: 'Basic IFR training. Limited actual IMC opportunities in Arizona. Syllabus is being revised under new management.'
      }
    ],

    reviews: [
      {
        id: 'rev-031-1',
        reviewerName: 'Tyler Brooks',
        date: '2024-08-22',
        rating: 3,
        title: 'In Transition',
        body: 'School is going through changes. Had 3 different instructors during my PPL. New management seems to care but jury still out. Weather is great though.',
        helpful: 16
      },
      {
        id: 'rev-031-2',
        reviewerName: 'Jessica Palmer',
        date: '2024-06-30',
        rating: 4,
        title: 'Improving But Not There Yet',
        body: 'Can see they are trying to get better. Alex is working hard to turn things around. Aircraft are okay, prices are fair. Just needs more consistency.',
        helpful: 13
      },
      {
        id: 'rev-031-3',
        reviewerName: 'Brian Foster',
        date: '2024-04-18',
        rating: 3,
        title: 'Mixed Bag',
        body: 'Some good days, some frustrating days. Communication could be much better. Scheduling system is disorganized. But the flying weather cannot be beat.',
        helpful: 10
      },
      {
        id: 'rev-031-4',
        reviewerName: 'Nicole Chen',
        date: '2024-02-08',
        rating: 4,
        title: 'Decent Value',
        body: 'Not perfect but getting my instrument rating here for reasonable cost. Monica is still learning to instruct but she tries hard. Facilities are basic.',
        helpful: 9
      }
    ],

    verificationDetails: {
      trustTier: 'Community-Verified',
      verificationTimestamp: '2024-07-10T13:00:00Z',
      dataSources: ['FAA Registry', 'Student Reviews'],
      lastUpdated: '2024-10-05'
    },

    contactInfo: {
      email: 'info@desertwingsflight.com',
      phone: '(520) 555-7429',
      website: 'https://desertwingsflight.com'
    }
  },

  // School 5: Omaha, NE - Low rating, Unverified, Part 61
  {
    schoolId: 'school-032',
    name: 'Cornhusker Aviation',
    location: {
      city: 'Omaha',
      state: 'NE',
      zipCode: '68137',
      coordinates: { lat: 41.1960, lng: -96.1519 }
    },
    programs: ['PPL'],
    costBand: { min: 8000, max: 11500 },
    trainingType: 'Part61',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: `Cornhusker Aviation is Omaha budget flight school option, operating since 2017. We provide basic Part 61 training with minimal overhead to keep costs low. Our aging fleet and limited staff mean this is not a full-service operation. Students willing to be flexible and patient can save money, but those seeking modern amenities should look elsewhere.`,

    yearsInOperation: 7,
    facilities: [
      'Small Office',
      'Outdoor Tie-Downs',
      'Portable Restroom'
    ],
    instructorCount: 3,
    reviewCount: 24,
    avgRating: 3.0,
    heroImageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 150',
        count: 3,
        maxAltitude: 12650,
        cruiseSpeed: 100,
        equipment: ['Basic Nav/Com', 'Transponder'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-032-1',
        name: 'Gary Henderson',
        certificates: ['CFI'],
        yearsExperience: 15,
        bio: 'Semi-retired airline pilot. Teaches occasionally as a hobby. Very limited availability. Old-school methods that may not suit all learning styles.',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-032-2',
        name: 'Tim Walsh',
        certificates: ['CFI'],
        yearsExperience: 2,
        bio: 'Recent CFI graduate. Eager but still finding his teaching style. Sometimes unprepared for lessons.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 85,
        costMin: 8000,
        costMax: 11500,
        description: 'Bare-bones Part 61 training. Lowest prices in Omaha but expect minimal support and long timeline. Only suitable for extremely self-motivated students.'
      }
    ],

    reviews: [
      {
        id: 'rev-032-1',
        reviewerName: 'Robert Johnson',
        date: '2024-07-25',
        rating: 2,
        title: 'Save Your Money, Go Elsewhere',
        body: 'Cheap rates but terrible experience. Aircraft unreliable, instructors hard to schedule, no real facilities. Ended up transferring to another school and redoing much of my training.',
        helpful: 14
      },
      {
        id: 'rev-032-2',
        reviewerName: 'Karen Smith',
        date: '2024-05-15',
        rating: 3,
        title: 'You Get What You Pay For',
        body: 'If you know what you are doing and just need cheap hours, fine. If you need actual instruction and support, go somewhere else. Very barebones operation.',
        helpful: 10
      },
      {
        id: 'rev-032-3',
        reviewerName: 'Dennis Brown',
        date: '2024-03-20',
        rating: 4,
        title: 'Not For Everyone',
        body: 'I am retired with lots of time and patience. Got my license cheap flying the old 150s. Gary knows his stuff when you can fly with him. Not recommended for those in a hurry.',
        helpful: 8
      },
      {
        id: 'rev-032-4',
        reviewerName: 'Michelle Davis',
        date: '2024-01-30',
        rating: 3,
        title: 'Budget Option Only',
        body: 'If budget is your only concern, this might work. Everything else about this place is below average. Prepare for frustration and delays.',
        helpful: 11
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2024-05-01T11:00:00Z',
      dataSources: ['FAA Registry'],
      lastUpdated: '2024-08-15'
    },

    contactInfo: {
      email: 'fly@cornhuskeraviation.com',
      phone: '(402) 555-9284'
    }
  },

  // School 6: Little Rock, AR - Mediocre rating, Community-Verified, Part 141
  {
    schoolId: 'school-033',
    name: 'Arkansas Flight Institute',
    location: {
      city: 'Little Rock',
      state: 'AR',
      zipCode: '72202',
      coordinates: { lat: 34.7299, lng: -92.2243 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 9500, max: 13500 },
    trainingType: 'Part141',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,

    description: `Arkansas Flight Institute has provided Part 141 training since 2013. While we maintain FAA approval, students report inconsistent quality and communication issues. Our Part 141 structure can feel rigid rather than structured. Currently working to address student feedback about instructor preparation and aircraft maintenance standards.`,

    yearsInOperation: 11,
    facilities: [
      'Ground School Room',
      'Outdated Simulator',
      'Student Area',
      'Outdoor Parking'
    ],
    instructorCount: 6,
    reviewCount: 47,
    avgRating: 3.5,
    heroImageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172M',
        count: 4,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'GPS', 'Transponder'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Warrior',
        count: 2,
        maxAltitude: 14300,
        cruiseSpeed: 127,
        equipment: ['Nav/Com', 'GPS', 'IFR'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-033-1',
        name: 'James Miller',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 7,
        bio: 'Chief instructor. Knows Part 141 requirements but can be inflexible. More focused on checking boxes than actual learning.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-033-2',
        name: 'Ashley Roberts',
        certificates: ['CFI'],
        yearsExperience: 3,
        bio: 'Friendly but sometimes underprepared for lessons. Still learning how to effectively use the Part 141 syllabus.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-033-3',
        name: 'Kevin Brown',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 5,
        bio: 'Competent instructor but frequently distracted by his charter pilot job. Cancellations are common.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 63,
        costMin: 9500,
        costMax: 12000,
        description: 'Part 141 program that feels bureaucratic rather than structured. Communication about progress can be poor. Budget extra time for delays.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 48,
        costMin: 8000,
        costMax: 11000,
        description: 'IFR training that meets minimums. Students report feeling under-prepared for checkrides. Consider self-study supplementation.'
      }
    ],

    reviews: [
      {
        id: 'rev-033-1',
        reviewerName: 'Matthew Wilson',
        date: '2024-08-10',
        rating: 3,
        title: 'Rigid and Impersonal',
        body: 'Part 141 structure feels like a burden rather than benefit here. Everything is about checking syllabus boxes. Not much attention to actual skill development. Average experience.',
        helpful: 17
      },
      {
        id: 'rev-033-2',
        reviewerName: 'Laura Anderson',
        date: '2024-06-05',
        rating: 4,
        title: 'Got Through It',
        body: 'Finished my PPL but it was not smooth. Had to push back on being rushed to checkride. James means well but the program feels cookie-cutter. Passed though.',
        helpful: 12
      },
      {
        id: 'rev-033-3',
        reviewerName: 'Jason Martinez',
        date: '2024-04-12',
        rating: 3,
        title: 'Communication Issues',
        body: 'Biggest problem is communication. Never clear on where you stand in the program. Instructors do not always know what previous instructor covered. Frustrating.',
        helpful: 15
      },
      {
        id: 'rev-033-4',
        reviewerName: 'Emily Thompson',
        date: '2024-02-20',
        rating: 4,
        title: 'Okay For The Money',
        body: 'Not fancy but prices are reasonable for Part 141. Ashley was nice but young. If you are self-motivated it is fine. Do not expect hand-holding.',
        helpful: 10
      }
    ],

    verificationDetails: {
      trustTier: 'Community-Verified',
      verificationTimestamp: '2024-06-20T10:30:00Z',
      dataSources: ['FAA Registry', 'Student Reviews'],
      lastUpdated: '2024-09-30'
    },

    contactInfo: {
      email: 'info@arkansasflightinstitute.com',
      phone: '(501) 555-3847',
      website: 'https://arkansasflightinstitute.com'
    }
  },

  // School 7: Boise, ID - Mediocre rating, Unverified, Part 61
  {
    schoolId: 'school-034',
    name: 'Treasure Valley Flight School',
    location: {
      city: 'Boise',
      state: 'ID',
      zipCode: '83705',
      coordinates: { lat: 43.5640, lng: -116.2229 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 10000, max: 14000 },
    trainingType: 'Part61',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: `Treasure Valley Flight School opened in 2019 with hopes of serving the Boise market. Despite beautiful mountain scenery, the school has struggled with management consistency and instructor retention. Recent ownership change brings uncertainty. Students seeking stability may want to wait and see how things develop under new ownership.`,

    yearsInOperation: 5,
    facilities: [
      'Small Classroom',
      'Basic Lounge',
      'Outdoor Parking',
      'Vending Machines'
    ],
    instructorCount: 4,
    reviewCount: 28,
    avgRating: 3.4,
    heroImageUrl: 'https://images.unsplash.com/photo-1583196123714-5c57c9dbbc1f?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172N',
        count: 3,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'GPS', 'Transponder'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Cherokee',
        count: 2,
        maxAltitude: 14300,
        cruiseSpeed: 125,
        equipment: ['Nav/Com', 'Old GPS'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-034-1',
        name: 'Craig Davidson',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 6,
        bio: 'New owner trying to turn school around. Means well but learning the business side. Overcommitted and sometimes overwhelmed.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-034-2',
        name: 'Megan Foster',
        certificates: ['CFI'],
        yearsExperience: 3,
        bio: 'Part-time instructor with limited availability. Solid when flying but scheduling is challenging. Considering leaving for full-time aviation job.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 70,
        costMin: 10000,
        costMax: 13000,
        description: 'Part 61 training with uncertain future under new ownership. Mountain flying opportunities are great but organizational issues persist.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 52,
        costMin: 9000,
        costMax: 12000,
        description: 'Basic IFR training. Limited actual IMC in Boise area. Program continuity uncertain with recent changes.'
      }
    ],

    reviews: [
      {
        id: 'rev-034-1',
        reviewerName: 'Nathan Clark',
        date: '2024-09-15',
        rating: 3,
        title: 'Uncertain Times',
        body: 'School changed hands recently. Craig is trying but seems in over his head. Aircraft maintenance has been spotty. Beautiful area to fly but school itself has issues.',
        helpful: 13
      },
      {
        id: 'rev-034-2',
        reviewerName: 'Samantha Lee',
        date: '2024-07-08',
        rating: 4,
        title: 'Potential If They Can Stabilize',
        body: 'Has potential with new ownership but still working through problems. Megan is a good instructor when available. Giving it 4 stars hoping they improve.',
        helpful: 9
      },
      {
        id: 'rev-034-3',
        reviewerName: 'Derek Wilson',
        date: '2024-04-20',
        rating: 3,
        title: 'Inconsistent Experience',
        body: 'Some good flights, some canceled last minute. Communication could be much better. Mountain scenery is awesome but school organization is lacking.',
        helpful: 11
      },
      {
        id: 'rev-034-4',
        reviewerName: 'Amy Rodriguez',
        date: '2024-02-14',
        rating: 3,
        title: 'Wait and See',
        body: 'Would recommend waiting to see if new owner can fix things. Right now too much uncertainty. If you have other options, explore them first.',
        helpful: 10
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2024-08-05T14:00:00Z',
      dataSources: ['FAA Registry'],
      lastUpdated: '2024-10-01'
    },

    contactInfo: {
      email: 'info@treasurevalleyflight.com',
      phone: '(208) 555-7392',
      website: 'https://treasurevalleyflight.com'
    }
  },

  // School 8: Memphis, TN - Low rating, Unverified, Part 61
  {
    schoolId: 'school-035',
    name: 'Delta Blues Aviation',
    location: {
      city: 'Memphis',
      state: 'TN',
      zipCode: '38118',
      coordinates: { lat: 35.0422, lng: -89.9760 }
    },
    programs: ['PPL'],
    costBand: { min: 8500, max: 12000 },
    trainingType: 'Part61',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: `Delta Blues Aviation is a small Part 61 operation that has been struggling since opening in 2020. Limited resources, aging aircraft, and staffing challenges have created a difficult environment for students. While prices are low, students should carefully consider whether the savings are worth the likely frustration and delays.`,

    yearsInOperation: 4,
    facilities: [
      'Tiny Office',
      'No Indoor Student Area',
      'Outdoor Tie-Downs'
    ],
    instructorCount: 2,
    reviewCount: 16,
    avgRating: 2.8,
    heroImageUrl: 'https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 150',
        count: 2,
        maxAltitude: 12650,
        cruiseSpeed: 100,
        equipment: ['Basic VOR', 'Old Transponder'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-035-1',
        name: 'Willie Jackson',
        certificates: ['CFI'],
        yearsExperience: 4,
        bio: 'Owner struggling to keep school afloat. Maintenance background but limited teaching experience. Frequently stressed and distracted.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-035-2',
        name: 'Brandon Moore',
        certificates: ['CFI'],
        yearsExperience: 1,
        bio: 'Brand new CFI. Enthusiastic but very inexperienced. Primarily building hours for other jobs. Unreliable schedule.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 90,
        costMin: 8500,
        costMax: 12000,
        description: 'Rock-bottom pricing but severely limited service. Aircraft frequently down. Instructor availability poor. Only consider if you have no other options.'
      }
    ],

    reviews: [
      {
        id: 'rev-035-1',
        reviewerName: 'James Parker',
        date: '2024-08-30',
        rating: 2,
        title: 'Do Not Recommend',
        body: 'Started training here, gave up after 6 months. Planes always broken, Willie too busy to fly consistently. Cheap for a reason. Going to another school to start over.',
        helpful: 12
      },
      {
        id: 'rev-035-2',
        reviewerName: 'Rebecca Turner',
        date: '2024-06-18',
        rating: 2,
        title: 'Waste of Time and Money',
        body: 'Terrible experience. No organization, unreliable aircraft, inexperienced instructors. Saved a few bucks but lost months of my life. Not worth it.',
        helpful: 15
      },
      {
        id: 'rev-035-3',
        reviewerName: 'Carlos Ramirez',
        date: '2024-04-05',
        rating: 4,
        title: 'If You Are Super Patient...',
        body: 'Managed to get my license but took way longer than it should have. Willie is a good guy trying hard but place is barely holding together. Only for extremely patient budget flyers.',
        helpful: 8
      },
      {
        id: 'rev-035-4',
        reviewerName: 'Lisa Henderson',
        date: '2024-01-25',
        rating: 3,
        title: 'Struggling School',
        body: 'Can see they are trying but just do not have resources. Aircraft are ancient and constantly broken. Would not recommend unless you are very desperate to save money.',
        helpful: 10
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2024-07-15T09:30:00Z',
      dataSources: ['FAA Registry'],
      lastUpdated: '2024-09-10'
    },

    contactInfo: {
      email: 'willie@deltabluesaviation.com',
      phone: '(901) 555-4163'
    }
  },

  // School 9: Wichita, KS - Mediocre rating, Community-Verified, Part 61
  {
    schoolId: 'school-036',
    name: 'Plainsman Flight Training',
    location: {
      city: 'Wichita',
      state: 'KS',
      zipCode: '67209',
      coordinates: { lat: 37.6499, lng: -97.4327 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 9500, max: 13000 },
    trainingType: 'Part61',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,

    description: `Plainsman Flight Training has served Wichita since 2014. While we have longevity, student feedback indicates need for improvement in communication, aircraft maintenance, and instructor consistency. We are working to address these concerns but acknowledge we have work to do to meet modern student expectations.`,

    yearsInOperation: 10,
    facilities: [
      'Classroom',
      'Small Student Lounge',
      'Outdoor Parking',
      'Restrooms'
    ],
    instructorCount: 5,
    reviewCount: 39,
    avgRating: 3.6,
    heroImageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172M',
        count: 3,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'GPS', 'Transponder'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Piper Warrior',
        count: 2,
        maxAltitude: 14300,
        cruiseSpeed: 127,
        equipment: ['Garmin 430', 'IFR'],
        availability: 'Medium'
      }
    ],

    instructors: [
      {
        id: 'instr-036-1',
        name: 'Roger Bennett',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 12,
        bio: 'Old-school instructor. Knows material but teaching style may not suit modern learners. Can be impatient with students who ask many questions.',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-036-2',
        name: 'Tiffany Morgan',
        certificates: ['CFI'],
        yearsExperience: 4,
        bio: 'Friendly but sometimes unprepared for lessons. Still developing consistency. Scheduling can be problematic.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-036-3',
        name: 'Sean Carter',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 6,
        bio: 'Part-time instructor with corporate pilot job. Limited availability. Competent when flying but hard to schedule consistently.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 68,
        costMin: 9500,
        costMax: 12000,
        description: 'Part 61 training with mixed reviews. Aircraft maintenance could be better. Communication about training progress often unclear.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 50,
        costMin: 8500,
        costMax: 11000,
        description: 'IFR training that covers basics. Students report feeling under-prepared for checkrides. Supplemental study recommended.'
      }
    ],

    reviews: [
      {
        id: 'rev-036-1',
        reviewerName: 'Andrew Phillips',
        date: '2024-08-05',
        rating: 3,
        title: 'Adequate But Not Great',
        body: 'Got my PPL but it was not smooth. Roger knows his stuff but not great at explaining. Had maintenance delays. Middle of the road experience.',
        helpful: 14
      },
      {
        id: 'rev-036-2',
        reviewerName: 'Christina Lee',
        date: '2024-06-12',
        rating: 4,
        title: 'Decent For The Price',
        body: 'Tiffany was nice and patient. Prices are fair for Wichita. Facilities are dated and aircraft could use work but training itself was okay. Passed on first try.',
        helpful: 11
      },
      {
        id: 'rev-036-3',
        reviewerName: 'Marcus Johnson',
        date: '2024-04-22',
        rating: 3,
        title: 'Communication Issues',
        body: 'Biggest problem is knowing where you stand. Never clear on progress. Had to ask repeatedly about stage checks. Organization needs improvement.',
        helpful: 13
      },
      {
        id: 'rev-036-4',
        reviewerName: 'Patricia Davis',
        date: '2024-02-15',
        rating: 4,
        title: 'Gets The Job Done',
        body: 'Not fancy but functional. Sean was good when I could fly with him. Scheduling is hit or miss. If you are patient and self-motivated, it works.',
        helpful: 9
      }
    ],

    verificationDetails: {
      trustTier: 'Community-Verified',
      verificationTimestamp: '2024-06-30T12:00:00Z',
      dataSources: ['FAA Registry', 'Student Reviews'],
      lastUpdated: '2024-09-25'
    },

    contactInfo: {
      email: 'info@plainsmanflight.com',
      phone: '(316) 555-8294',
      website: 'https://plainsmanflight.com'
    }
  },

  // School 10: Reno, NV - Mediocre rating, Unverified, Part 61
  {
    schoolId: 'school-037',
    name: 'High Sierra Flight Academy',
    location: {
      city: 'Reno',
      state: 'NV',
      zipCode: '89502',
      coordinates: { lat: 39.4991, lng: -119.7679 }
    },
    programs: ['PPL', 'IR'],
    costBand: { min: 10500, max: 14500 },
    trainingType: 'Part61',
    trustTier: TrustTier.UNVERIFIED as TrustTier,

    description: `High Sierra Flight Academy started in 2018 with ambitions of being Reno premier flight school. However, high instructor turnover and maintenance issues have held us back. Mountain flying opportunities are excellent, but organizational challenges and communication problems have frustrated many students. Currently reassessing operations to improve quality.`,

    yearsInOperation: 6,
    facilities: [
      'Classroom',
      'Old Simulator',
      'Student Lounge',
      'Outdoor Parking',
      'Small Maintenance Area'
    ],
    instructorCount: 4,
    reviewCount: 33,
    avgRating: 3.4,
    heroImageUrl: 'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=1200&h=400&fit=crop',

    fleetDetails: [
      {
        aircraftType: 'Cessna 172N',
        count: 3,
        maxAltitude: 13500,
        cruiseSpeed: 120,
        equipment: ['Dual Nav/Com', 'GPS', 'Transponder'],
        availability: 'Medium'
      },
      {
        aircraftType: 'Cessna 182',
        count: 1,
        maxAltitude: 18100,
        cruiseSpeed: 145,
        equipment: ['GPS', 'High Performance'],
        availability: 'Low'
      }
    ],

    instructors: [
      {
        id: 'instr-037-1',
        name: 'Jake Morrison',
        certificates: ['CFI', 'CFII'],
        yearsExperience: 5,
        bio: 'Interim chief trying to stabilize operations. Competent but spread thin between flying and administration. Overworked.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-037-2',
        name: 'Brittany Wells',
        certificates: ['CFI'],
        yearsExperience: 2,
        bio: 'New instructor still finding her way. Enthusiastic but inexperienced. Lesson quality can be inconsistent.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
      },
      {
        id: 'instr-037-3',
        name: 'Tony Reeves',
        certificates: ['CFI'],
        yearsExperience: 3,
        bio: 'Time-building toward regionals. More focused on hours than quality instruction. Scheduling often changes last minute.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      }
    ],

    programDetails: [
      {
        name: 'Private Pilot License (PPL)',
        certification: 'PPL',
        durationHours: 70,
        costMin: 10500,
        costMax: 13500,
        description: 'Part 61 training with mountain flying opportunities. High instructor turnover affects continuity. Aircraft reliability issues cause delays.'
      },
      {
        name: 'Instrument Rating (IR)',
        certification: 'IR',
        durationHours: 52,
        costMin: 9500,
        costMax: 12500,
        description: 'Basic IFR training. Limited IMC opportunities in Reno. Program consistency affected by staffing changes.'
      }
    ],

    reviews: [
      {
        id: 'rev-037-1',
        reviewerName: 'Ryan Cooper',
        date: '2024-07-28',
        rating: 3,
        title: 'High Turnover Problem',
        body: 'Had 4 different instructors during my PPL. Each one taught differently. Mountain flying is great but school organization is terrible. Frustrating experience overall.',
        helpful: 16
      },
      {
        id: 'rev-037-2',
        reviewerName: 'Michelle Roberts',
        date: '2024-05-30',
        rating: 3,
        title: 'Beautiful Location, Messy Operations',
        body: 'Reno scenery is amazing but that is about the only thing going for this school. Communication is poor, scheduling is chaotic. Jake is trying but seems overwhelmed.',
        helpful: 14
      },
      {
        id: 'rev-037-3',
        reviewerName: 'David Chen',
        date: '2024-04-15',
        rating: 4,
        title: 'Worth It For Mountain Experience',
        body: 'If you specifically want mountain training, worth considering. Everything else about the school is mediocre to poor. I valued the mountain flying enough to stick it out.',
        helpful: 12
      },
      {
        id: 'rev-037-4',
        reviewerName: 'Stephanie Garcia',
        date: '2024-02-20',
        rating: 4,
        title: 'Improving But Still Issues',
        body: 'Can see they are trying to fix problems. Jake is working hard. Aircraft maintenance has gotten better. Still has a ways to go but moving in right direction.',
        helpful: 10
      }
    ],

    verificationDetails: {
      trustTier: 'Unverified',
      verificationTimestamp: '2024-07-20T11:30:00Z',
      dataSources: ['FAA Registry'],
      lastUpdated: '2024-09-15'
    },

    contactInfo: {
      email: 'info@highsierraflight.com',
      phone: '(775) 555-6182',
      website: 'https://highsierraflight.com'
    }
  }
];
