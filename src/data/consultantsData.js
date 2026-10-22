/**
 * Verified Agronomy Consultants & Extension Specialists Dataset
 * Clean, structured scientific advisory profiles for AgroGuide.
 */

export const PROBLEM_CATEGORIES = [
  'All Problem Specialties',
  'Pest & Insect Diagnostics',
  'Fungal & Bacterial Diseases',
  'Soil Health & NPK Dosage',
  'Organic Bio-Pesticides & Preparations',
  'Precision Irrigation & Water Management',
  'Post-Harvest & Cold Storage Advisory'
];

export const COMMODITY_CROPS = [
  'All Cultivated Crops',
  'Wheat',
  'Paddy / Basmati Rice',
  'Mustard',
  'Cotton',
  'Sugarcane',
  'Maize & Millets',
  'Pulses (Gram / Lentils)',
  'Horticulture & Vegetables'
];

export const CONSULTANTS = [
  {
    id: 'consultant-ananya-301',
    name: 'Dr. Ananya Sharma',
    title: 'Senior Agronomist & Plant Pathologist',
    institution: 'Krishi Vigyan Kendra (KVK) & ICAR Associate',
    location: 'Regional Krishi Research Station, New Delhi',
    state: 'Delhi',
    district: 'New Delhi',
    avatarInitials: 'AS',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80',
    qualifications: 'Ph.D. Plant Pathology (PAU Ludhiana), M.Sc. Agronomy',
    experience: '14+ Years Field Diagnostics & Organic Agronomy',
    registrationNumber: 'ICAR-REG-2012-8841',
    rating: '4.9',
    totalConsultations: 184,
    activeCases: 2,
    completedCases: 182,
    responseTime: '< 3 hours',
    availability: 'Available Today',
    fee: 'Free Public KVK Advisory',
    specialties: [
      'Fungal & Bacterial Diseases',
      'Pest & Insect Diagnostics',
      'Organic Bio-Pesticides & Preparations',
      'Soil Health & NPK Dosage'
    ],
    cropsSpecialized: ['Wheat', 'Mustard', 'Paddy / Basmati Rice', 'Cotton'],
    bio: 'Specialist in fungal rusts, powdery mildew management, and chemical-free bio-pesticide concoctions. 14 years supporting northern belt grain and cash crop growers with sustainable remediation.',
    publications: [
      'Biological Suppression of Yellow Rust in Northern Wheat Belts (ICAR Bulletin 2023)',
      'Efficacy of Cow-Urine fermented Neem Extracts against Mustard Aphids (Journal of Sustainable Agri 2021)'
    ],
    caseStudies: [
      {
        farmer: 'Baldev Singh (Sangrur, PB)',
        crop: 'Wheat (PBW-826)',
        problem: 'Early Yellow Rust on flag leaves',
        resolution: 'Prescribed 0.1% propiconazole foliar buffer combined with sub-surface drainage correction. 94% yield salvage achieved.'
      },
      {
        farmer: 'Gopal Meena (Alwar, RJ)',
        crop: 'Mustard',
        problem: 'Aphid colony buildup on central shoot',
        resolution: 'Formulated 5% Neemastra spray with sticky yellow trap perimeter. Pest population declined within 48 hours without synthetic chemicals.'
      }
    ]
  },
  {
    id: 'consultant-ramesh-302',
    name: 'Dr. Ramesh Verma',
    title: 'Principal Soil Scientist & Micronutrient Expert',
    institution: 'Punjab Agricultural University (PAU), Ludhiana',
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    district: 'Ludhiana',
    avatarInitials: 'RV',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
    qualifications: 'Ph.D. Soil Science & Agricultural Chemistry (IARI New Delhi)',
    experience: '18+ Years Soil Health & Mineral Nutrition',
    registrationNumber: 'PAU-SCI-2008-4109',
    rating: '4.95',
    totalConsultations: 246,
    activeCases: 1,
    completedCases: 245,
    responseTime: '< 2 hours',
    availability: 'Available Today',
    fee: 'Free University Extension',
    specialties: [
      'Soil Health & NPK Dosage',
      'Precision Irrigation & Water Management',
      'Organic Bio-Pesticides & Preparations'
    ],
    cropsSpecialized: ['Wheat', 'Paddy / Basmati Rice', 'Sugarcane', 'Maize & Millets'],
    bio: 'Pioneered split nitrogen dosage models, zinc-iron deficiency reversal protocols, and saline-alkali soil reclamation techniques across Punjab, Haryana, and Western Uttar Pradesh.',
    publications: [
      'Precision Potassium Fertigation Dynamics in Direct-Seeded Rice (PAU Research 2022)',
      'Macro and Micronutrient Mapping of Indo-Gangetic Alluvial Plains (2020)'
    ],
    caseStudies: [
      {
        farmer: 'Jagjit Sandhu (Moga, PB)',
        crop: 'Basmati Paddy',
        problem: 'Severe Khaira disease (Zinc deficiency)',
        resolution: 'Prescribed 25 kg/ha Zinc Sulphate heptahydrate basal dressing and 0.5% foliar spray. Leaf chlorosis reversed within 6 days.'
      }
    ]
  },
  {
    id: 'consultant-sunita-303',
    name: 'Dr. Sunita Patel',
    title: 'Entomologist & Integrated Pest Management Specialist',
    institution: 'Central Institute of Cotton Research & Anand Agri University',
    location: 'Anand, Gujarat',
    state: 'Gujarat',
    district: 'Anand',
    avatarInitials: 'SP',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
    qualifications: 'Ph.D. Agricultural Entomology (AAU), M.Sc. IPM',
    experience: '11+ Years Integrated Pest Management & Pheromone Traps',
    registrationNumber: 'CICR-AG-2015-1102',
    rating: '4.88',
    totalConsultations: 158,
    activeCases: 3,
    completedCases: 155,
    responseTime: '< 4 hours',
    availability: 'Available Today',
    fee: 'Zero Commission Advisory',
    specialties: [
      'Pest & Insect Diagnostics',
      'Organic Bio-Pesticides & Preparations',
      'Post-Harvest & Cold Storage Advisory'
    ],
    cropsSpecialized: ['Cotton', 'Pulses (Gram / Lentils)', 'Mustard', 'Horticulture & Vegetables'],
    bio: 'Dedicated to non-toxic pink bollworm containment, Trichogramma parasitoid wasp biological releases, and botanical extract recipes for oilseeds, cotton, and vegetables.',
    publications: [
      'Field Validation of Gossyplure Pheromone Traps for Pink Bollworm Mating Disruption (CICR Report 2023)',
      'Integrated Parasitoid Protocols for Pod Borer in Chickpea (2021)'
    ],
    caseStudies: [
      {
        farmer: 'Mansukh Bhai (Rajkot, GJ)',
        crop: 'Bt Cotton',
        problem: 'Square drop due to early bollworm larvae',
        resolution: 'Recommended mass pheromone trapping at 8 traps/acre and release of Trichogramma egg parasitoids. Crop loss minimized to under 3%.'
      }
    ]
  },
  {
    id: 'consultant-vikram-304',
    name: 'Er. Vikramaditya Singh',
    title: 'Senior Agricultural Engineer & Micro-Irrigation Consultant',
    institution: 'National Institute of Agricultural Engineering & Tech',
    location: 'Jaipur, Rajasthan',
    state: 'Rajasthan',
    district: 'Jaipur',
    avatarInitials: 'VS',
    image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=600&q=80',
    qualifications: 'M.Tech Farm Power & Water Resource Engineering (IIT Kharagpur)',
    experience: '16+ Years Drip Fertigation & Solar Pumping Systems',
    registrationNumber: 'NIAE-ENG-2010-3371',
    rating: '4.92',
    totalConsultations: 210,
    activeCases: 1,
    completedCases: 209,
    responseTime: '< 3 hours',
    availability: 'Available Today',
    fee: 'Subsidized Solar Advisory',
    specialties: [
      'Precision Irrigation & Water Management',
      'Soil Health & NPK Dosage',
      'Post-Harvest & Cold Storage Advisory'
    ],
    cropsSpecialized: ['Mustard', 'Pulses (Gram / Lentils)', 'Horticulture & Vegetables', 'Wheat'],
    bio: 'Expert in gravity-fed low-pressure drip networks, PM-KUSUM solar water pumps sizing, and automated soil-moisture sensor fertigation for arid and semi-arid zones.',
    publications: [
      'Design of Gravity Drip Systems for Smallholder Mustard Cultivators (Agri Water Eng 2022)',
      'Solar Photovoltaic Pumping Economics in Rajasthan Basin (2020)'
    ],
    caseStudies: [
      {
        farmer: 'Om Prakash Choudhary (Sikar, RJ)',
        crop: 'Gram & Mustard',
        problem: 'Acute water table depletion during flowering',
        resolution: 'Engineered inline drip network operating from 5 HP PM-KUSUM solar pump with 40% water savings. Full harvest secured.'
      }
    ]
  }
];

export function getConsultantById(id) {
  return CONSULTANTS.find((c) => c.id === id) || CONSULTANTS[0];
}
