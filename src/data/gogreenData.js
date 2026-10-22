/**
 * GoGreen Sustainable Agriculture Data & Formulas
 * Promotes chemical-free, regenerative, and water-conserving farming methods.
 */

export const SUSTAINABLE_PRACTICES = [
  {
    id: 'drip-fertigation',
    title: 'Precision Drip Fertigation',
    category: 'Water Conservation',
    icon: 'Droplet',
    savings: 'Saves 50-60% Water',
    description: 'Delivers precise water and dissolved organic nutrients directly to the root zone via emitters, minimizing evaporation and weed growth.',
    steps: [
      'Conduct soil infiltration test and design lateral tube layout based on row spacing.',
      'Install sand and disc filters at main pump head to prevent emitter clogging.',
      'Inject water-soluble biological nutrients during early morning hours.',
      'Flush lateral sub-mains fortnightly with plain water.'
    ],
    impact: 'Prevents 2.5 million liters of aquifer water loss per acre per crop cycle.'
  },
  {
    id: 'jeevamrit',
    title: 'Jeevamrit Bio-Culture',
    category: 'Bio-Fertilizer',
    icon: 'Sprout',
    savings: '100% Chemical-Free',
    description: 'A miraculous fermented bacterial culture prepared from indigenous cow dung, urine, jaggery, and pulse flour that multiplies beneficial soil microorganisms.',
    steps: [
      'Take 200 liters of water in a plastic drum (do not use metal containers).',
      'Mix 10 kg fresh indigenous cow dung and 10 liters of cow urine.',
      'Add 2 kg local jaggery and 2 kg besan (chickpea pulse flour).',
      'Add a handful of undisturbed virgin soil from under a banyan tree or field bund.',
      'Stir clockwise twice daily for 48 to 72 hours under shade. Culture is ready for irrigation application!'
    ],
    impact: 'Multiplies earthworms, solubilizes fixed phosphorus, and enriches soil microbiology.'
  },
  {
    id: 'neemastra',
    title: 'Neemastra Natural Pest Repellent',
    category: 'Natural Pest Control',
    icon: 'ShieldCheck',
    savings: 'Zero Toxic Residue',
    description: 'A potent bio-insecticide made from crushed neem leaves and cow urine to combat sucking pests like aphids, jassids, and whiteflies without killing beneficial ladybird beetles.',
    steps: [
      'Crush 5 kg fresh neem leaves into a coarse paste.',
      'Add 5 liters of cow urine and 2 kg cow dung in 100 liters of water.',
      'Leave to ferment for 48 hours, stirring occasionally with a wooden stick.',
      'Filter the liquid through a fine muslin cloth and spray directly on affected leaves.'
    ],
    impact: 'Replaces dangerous organophosphates while preserving natural pollinator bees.'
  },
  {
    id: 'in-situ-mulching',
    title: 'Zero-Burn Stubble Mulching',
    category: 'Regenerative Soil',
    icon: 'Leaf',
    savings: 'Zero Smog Emission',
    description: 'Incorporates crop residue directly into the soil using Happy Seeder or bio-decomposer instead of burning, trapping soil moisture and boosting organic carbon.',
    steps: [
      'Attach Super SMS to harvester to chop and evenly distribute straw behind combine.',
      'Spray Pusa Bio-Decomposer microbial consortium at 300 ml/acre.',
      'Sow subsequent wheat or mustard directly through standing residue using Happy Seeder.',
      'Apply light moisture irrigation to accelerate decomposition into dark humus.'
    ],
    impact: 'Eliminates 3.2 tons of carbon dioxide and hazardous PM2.5 emissions per acre.'
  },
  {
    id: 'vermicomposting',
    title: 'Vermicompost (Black Gold)',
    category: 'Bio-Fertilizer',
    icon: 'Layers',
    savings: 'Cuts Urea Cost by 40%',
    description: 'Uses earthworms (Eisenia fetida) to convert agricultural green biomass and farmyard waste into nutrient-rich organic castings.',
    steps: [
      'Build brick beds (10ft x 3ft x 2ft) under thatched shade with drainage holes.',
      'Lay a 3-inch bedding of dried leaves, straw, and coconut coir.',
      'Add partially decomposed cow dung layer (15 days old to release initial heat).',
      'Release 1 kg of earthworms per bed and maintain 60% moisture.',
      'Harvest granular odorless compost after 45-60 days.'
    ],
    impact: 'Boosts soil water retention by 28% and adds plant-available nitrogen, calcium, and humic acid.'
  },
  {
    id: 'intercropping',
    title: 'Leguminous Crop Rotation & Intercropping',
    category: 'Crop Diversity',
    icon: 'RefreshCw',
    savings: 'Natural Nitrogen Fixation',
    description: 'Planting nitrogen-fixing legumes (chickpea, moong, cowpea) alongside heavy feeders (cotton, sugarcane, maize) breaks pest cycles and fertilizes soil naturally.',
    steps: [
      'Select a companion legume matching canopy height and root depth.',
      'Incorporate Rhizobium seed inoculation before planting.',
      'Maintain 2:1 or 4:2 row ratios to maximize sunlight interception.',
      'Incorporate legume residue back into soil after pod harvest.'
    ],
    impact: 'Fixes 40-70 kg of atmospheric nitrogen naturally per hectare.'
  }
];

export const GREEN_PLEDGES = [
  'I will eliminate stubble and residue burning on my farmland.',
  'I will adopt micro-irrigation (drip or sprinkler) to conserve groundwater.',
  'I will replace at least 30% of chemical fertilizer with organic bio-compost.',
  'I will practice crop rotation with nitrogen-fixing pulses or cover crops.',
  'I will test my soil health annually to prevent over-fertilization.',
  'I will protect beneficial bees and natural insect predators on my farm.'
];
