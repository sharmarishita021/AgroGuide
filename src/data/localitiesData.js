/**
 * Agricultural Locality Database
 * Contains major Indian agricultural states and districts with coordinates,
 * typical soil types, climatic zones, favourable crops, and regional agricultural vulnerabilities.
 */

export const INDIAN_STATES = [
  { id: 'PB', name: 'Punjab' },
  { id: 'HR', name: 'Haryana' },
  { id: 'UP', name: 'Uttar Pradesh' },
  { id: 'MH', name: 'Maharashtra' },
  { id: 'MP', name: 'Madhya Pradesh' },
  { id: 'GJ', name: 'Gujarat' },
  { id: 'RJ', name: 'Rajasthan' },
  { id: 'KA', name: 'Karnataka' },
  { id: 'TN', name: 'Tamil Nadu' },
  { id: 'AP', name: 'Andhra Pradesh' },
  { id: 'WB', name: 'West Bengal' },
  { id: 'BR', name: 'Bihar' },
  { id: 'KL', name: 'Kerala' },
  { id: 'AS', name: 'Assam' },
  { id: 'HP', name: 'Himachal Pradesh' },
  { id: 'OD', name: 'Odisha' }
];

export const DISTRICTS_DATA = [
  // Punjab
  {
    id: 'pb-ludhiana',
    name: 'Ludhiana',
    stateId: 'PB',
    stateName: 'Punjab',
    lat: 30.9010,
    lon: 75.8573,
    climateZone: 'Semi-Arid Subtropical',
    soilType: 'Deep Alluvial Loamy Soil',
    avgAnnualRainfall: '680 mm',
    groundwaterStatus: 'Over-exploited (Requires Micro-irrigation)',
    favourableCrops: [
      { name: 'Wheat (PBW 824 / HD 3086)', season: 'Rabi (Nov - Apr)', waterNeed: 'Medium', yield: '20-22 Quintals/Acre', type: 'Cereal' },
      { name: 'Basmati Rice (Pusa 1121)', season: 'Kharif (Jun - Oct)', waterNeed: 'High', yield: '16-18 Quintals/Acre', type: 'Cereal' },
      { name: 'Mustard (PBR 357)', season: 'Rabi (Oct - Mar)', waterNeed: 'Low', yield: '8-10 Quintals/Acre', type: 'Oilseed' },
      { name: 'Moong Dal (SML 668)', season: 'Zaid (Mar - May)', waterNeed: 'Low', yield: '5-6 Quintals/Acre', type: 'Pulse' },
      { name: 'Sugarcane (CoPb 92)', season: 'Annual', waterNeed: 'High', yield: '350-400 Quintals/Acre', type: 'Cash Crop' }
    ],
    vulnerabilities: [
      {
        title: 'Groundwater Table Depletion',
        severity: 'High',
        description: 'Intensive paddy cultivation has lowered aquifer levels by over 0.6m per year.',
        prevention: 'Switch to Direct Seeded Rice (DSR), laser leveling, and drip irrigation.'
      },
      {
        title: 'Yellow Rust in Wheat',
        severity: 'Moderate',
        description: 'Humid foggy winter conditions during January trigger fungal stripe rust on leaves.',
        prevention: 'Apply Propiconazole 25 EC (0.1%) or organic bio-fungicide like Trichoderma.'
      },
      {
        title: 'Stubble Smog & Soil Microbe Burn',
        severity: 'High',
        description: 'Post-harvest residue burning depletes organic carbon and kills earthworms.',
        prevention: 'Use Happy Seeder or Super Seeder; apply Pusa Bio-Decomposer for in-situ management.'
      }
    ],
    seasonalAdvisory: 'Monitor humidity levels for early signs of yellow rust. Ensure timely second irrigation for late-sown wheat.'
  },
  {
    id: 'pb-amritsar',
    name: 'Amritsar',
    stateId: 'PB',
    stateName: 'Punjab',
    lat: 31.6340,
    lon: 74.8723,
    climateZone: 'Semi-Arid Subtropical',
    soilType: 'Rich Fertile Alluvial Soil',
    avgAnnualRainfall: '650 mm',
    groundwaterStatus: 'Critical',
    favourableCrops: [
      { name: 'Basmati Rice (Traditional & 1509)', season: 'Kharif (Jun - Nov)', waterNeed: 'High', yield: '18-20 Quintals/Acre', type: 'Cereal' },
      { name: 'Wheat (HD 2967)', season: 'Rabi (Nov - Apr)', waterNeed: 'Medium', yield: '21 Quintals/Acre', type: 'Cereal' },
      { name: 'Pear & Peach (Patharnakh)', season: 'Horticulture', waterNeed: 'Medium', yield: '60-80 Quintals/Acre', type: 'Fruit' },
      { name: 'Green Peas & Potato', season: 'Rabi (Oct - Jan)', waterNeed: 'Medium', yield: '100-120 Quintals/Acre', type: 'Vegetable' }
    ],
    vulnerabilities: [
      {
        title: 'Late Blight in Potato',
        severity: 'High',
        description: 'High relative humidity combined with cloudy days causes rapid leaf blight in potato crops.',
        prevention: 'Preventive spray of Mancozeb (0.25%) or copper oxychloride.'
      },
      {
        title: 'Stem Borer in Basmati',
        severity: 'Moderate',
        description: 'Larvae bore into central stems causing dead hearts at vegetative stage.',
        prevention: 'Install pheromone traps at 5 traps/acre and release Trichogramma egg parasitoids.'
      }
    ],
    seasonalAdvisory: 'Inspect potato crop borders for dark lesions. Avoid excessive night nitrogen applications.'
  },
  {
    id: 'pb-bathinda',
    name: 'Bathinda',
    stateId: 'PB',
    stateName: 'Punjab',
    lat: 30.2110,
    lon: 74.9455,
    climateZone: 'Arid to Semi-Arid Sandy',
    soilType: 'Sandy Loam to Calcareous',
    avgAnnualRainfall: '410 mm',
    groundwaterStatus: 'Saline / Brackish in Deeper Layers',
    favourableCrops: [
      { name: 'Bt Cotton (RCH 659)', season: 'Kharif (May - Oct)', waterNeed: 'Medium', yield: '10-12 Quintals/Acre', type: 'Cash Crop' },
      { name: 'Mustard (Giriraj)', season: 'Rabi (Oct - Mar)', waterNeed: 'Low', yield: '9-11 Quintals/Acre', type: 'Oilseed' },
      { name: 'Wheat (DBW 187)', season: 'Rabi (Nov - Apr)', waterNeed: 'Medium', yield: '19 Quintals/Acre', type: 'Cereal' },
      { name: 'Guar (Cluster Bean)', season: 'Kharif (Jul - Oct)', waterNeed: 'Very Low', yield: '6-8 Quintals/Acre', type: 'Legume' },
      { name: 'Kinnow Mandarin', season: 'Perennial', waterNeed: 'Medium', yield: '90-110 Quintals/Acre', type: 'Fruit' }
    ],
    vulnerabilities: [
      {
        title: 'Pink Bollworm & Whitefly in Cotton',
        severity: 'High',
        description: 'Rising pesticide resistance in pink bollworm causes square and boll shedding.',
        prevention: 'Use pheromone traps, spray Neem oil 1500 ppm, and avoid synthetic pyrethroids early.'
      },
      {
        title: 'Soil Salinity & Alkalinity',
        severity: 'Moderate',
        description: 'High sodium content in canal tail ends and brackish tubewell water stunts root development.',
        prevention: 'Apply agricultural gypsum and green manuring with Dhaincha (Sesbania).'
      }
    ],
    seasonalAdvisory: 'Maintain drip lines for citrus orchards. Check cotton seed beds for early sucking pests.'
  },

  // Haryana
  {
    id: 'hr-karnal',
    name: 'Karnal',
    stateId: 'HR',
    stateName: 'Haryana',
    lat: 29.6857,
    lon: 76.9905,
    climateZone: 'Sub-Tropical Semi-Arid',
    soilType: 'Alluvial Loamy & Clayey',
    avgAnnualRainfall: '700 mm',
    groundwaterStatus: 'Critical',
    favourableCrops: [
      { name: 'Basmati Rice (CSR 30 / Pusa 1509)', season: 'Kharif (Jun - Nov)', waterNeed: 'High', yield: '17-19 Quintals/Acre', type: 'Cereal' },
      { name: 'Wheat (KRL 210 Saline Tolerant)', season: 'Rabi (Nov - Apr)', waterNeed: 'Medium', yield: '20 Quintals/Acre', type: 'Cereal' },
      { name: 'Sugarcane (Co 0238)', season: 'Annual', waterNeed: 'High', yield: '380 Quintals/Acre', type: 'Cash Crop' },
      { name: 'Sunflower & Baby Corn', season: 'Zaid (Feb - May)', waterNeed: 'Medium', yield: '12-14 Quintals/Acre', type: 'Vegetable' }
    ],
    vulnerabilities: [
      {
        title: 'Soil Compaction & Hardpan',
        severity: 'Moderate',
        description: 'Decades of puddling for paddy created a subsoil hardpan restricting deep root penetration.',
        prevention: 'Subsoiling / deep chisel plowing once every 3 years; incorporate organic compost.'
      },
      {
        title: 'Aphid Attack in Mustard / Wheat',
        severity: 'Moderate',
        description: 'Warm winter spells speed up aphid reproduction on tender heads.',
        prevention: 'Spray Verticillium lecanii bio-agent or mild soap solution early morning.'
      }
    ],
    seasonalAdvisory: 'Ensure balanced fertilization with zinc sulphate (25 kg/ha) to prevent khaira disease.'
  },
  {
    id: 'hr-hisar',
    name: 'Hisar',
    stateId: 'HR',
    stateName: 'Haryana',
    lat: 29.1492,
    lon: 75.7217,
    climateZone: 'Arid Sandy Plain',
    soilType: 'Sandy Loam to Sierozem',
    avgAnnualRainfall: '450 mm',
    groundwaterStatus: 'Brackish & Deep',
    favourableCrops: [
      { name: 'Cotton (American & Desi)', season: 'Kharif (May - Oct)', waterNeed: 'Medium', yield: '9-11 Quintals/Acre', type: 'Cash Crop' },
      { name: 'Pearl Millet (Bajra HHB 67)', season: 'Kharif (Jul - Oct)', waterNeed: 'Low', yield: '12-14 Quintals/Acre', type: 'Millets' },
      { name: 'Gram / Chickpea (HC 5)', season: 'Rabi (Oct - Mar)', waterNeed: 'Low', yield: '8-10 Quintals/Acre', type: 'Pulse' },
      { name: 'Barley (BH 902)', season: 'Rabi (Nov - Mar)', waterNeed: 'Low', yield: '18 Quintals/Acre', type: 'Cereal' }
    ],
    vulnerabilities: [
      {
        title: 'Termite & Cutworm Attack',
        severity: 'Moderate',
        description: 'Sandy soil dry spells invite subterranean termites damaging young seedling crowns.',
        prevention: 'Seed treatment with Chlorpyrifos or application of Neem cake (150 kg/acre).'
      },
      {
        title: 'Heat Stress during Grain Filling',
        severity: 'High',
        description: 'Sudden spike in March temperatures causes shriveled grains.',
        prevention: 'Sow heat-tolerant varieties; apply light sprinkler irrigation before hot winds.'
      }
    ],
    seasonalAdvisory: 'Conserve moisture by mulching. Irrigate chickpea only at branching and pod development.'
  },

  // Uttar Pradesh
  {
    id: 'up-varanasi',
    name: 'Varanasi',
    stateId: 'UP',
    stateName: 'Uttar Pradesh',
    lat: 25.3176,
    lon: 82.9739,
    climateZone: 'Humid Subtropical Gangetic Plain',
    soilType: 'Deep Indo-Gangetic Alluvium',
    avgAnnualRainfall: '1050 mm',
    groundwaterStatus: 'Semi-Critical',
    favourableCrops: [
      { name: 'Paddy (Swarna Sub-1 Flood Tolerant)', season: 'Kharif (Jun - Nov)', waterNeed: 'High', yield: '22-25 Quintals/Acre', type: 'Cereal' },
      { name: 'Wheat (HD 3226)', season: 'Rabi (Nov - Apr)', waterNeed: 'Medium', yield: '21 Quintals/Acre', type: 'Cereal' },
      { name: 'Pigeonpea / Arhar (Bahar)', season: 'Kharif (Jul - Mar)', waterNeed: 'Low', yield: '9-11 Quintals/Acre', type: 'Pulse' },
      { name: 'Green Chilli & Tomato (Kashi Amrit)', season: 'Rabi/Zaid', waterNeed: 'Medium', yield: '80-100 Quintals/Acre', type: 'Vegetable' },
      { name: 'Mango (Langra / Chausa)', season: 'Horticulture', waterNeed: 'Medium', yield: '70-90 Quintals/Acre', type: 'Fruit' }
    ],
    vulnerabilities: [
      {
        title: 'Bacterial Leaf Blight in Paddy',
        severity: 'Moderate',
        description: 'Waterlogged fields with high nitrogen favor Xanthomonas oryzae spread.',
        prevention: 'Avoid excessive urea; spray Streptocycline (1 g/10 L) mixed with copper oxychloride.'
      },
      {
        title: 'Sudden Monsoon Waterlogging',
        severity: 'High',
        description: 'Heavy localized rains cause inundation of low-lying floodplains.',
        prevention: 'Construct raised bed nurseries and adopt Sub-1 submergence tolerant seeds.'
      }
    ],
    seasonalAdvisory: 'Apply zinc and sulphur to mustard and pulses. Spray neem-based bio-pesticides on chilli thrips.'
  },
  {
    id: 'up-meerut',
    name: 'Meerut',
    stateId: 'UP',
    stateName: 'Uttar Pradesh',
    lat: 28.9845,
    lon: 77.7064,
    climateZone: 'Sub-Tropical Western Gangetic',
    soilType: 'Sandy Loam to Silt Loam',
    avgAnnualRainfall: '840 mm',
    groundwaterStatus: 'Over-exploited',
    favourableCrops: [
      { name: 'Sugarcane (Co 15023 / Co 0238)', season: 'Annual', waterNeed: 'High', yield: '420 Quintals/Acre', type: 'Cash Crop' },
      { name: 'Wheat (PBW 550)', season: 'Rabi (Nov - Apr)', waterNeed: 'Medium', yield: '22 Quintals/Acre', type: 'Cereal' },
      { name: 'Potato (Kufri Chipsona)', season: 'Rabi (Oct - Feb)', waterNeed: 'Medium', yield: '130 Quintals/Acre', type: 'Tuber' },
      { name: 'Maize & Fodder Sorghum', season: 'Kharif/Zaid', waterNeed: 'Medium', yield: '25 Quintals/Acre', type: 'Cereal' }
    ],
    vulnerabilities: [
      {
        title: 'Red Rot in Sugarcane',
        severity: 'High',
        description: 'Fungal infection causes internal stalks to turn reddish with white patches, reducing sucrose.',
        prevention: 'Use tissue-cultured disease-free setts; rotate fields away from Co 0238 to resistant varieties.'
      },
      {
        title: 'Nitrate Leaching into Aquifers',
        severity: 'Moderate',
        description: 'Over-application of urea in sugarcane leads to heavy nitrate runoff.',
        prevention: 'Use neem-coated urea and split applications using Leaf Color Chart (LCC).'
      }
    ],
    seasonalAdvisory: 'Trench planting of sugarcane saves 30% water and allows intercropping with onion or pulses.'
  },

  // Maharashtra
  {
    id: 'mh-pune',
    name: 'Pune',
    stateId: 'MH',
    stateName: 'Maharashtra',
    lat: 18.5204,
    lon: 73.8567,
    climateZone: 'Tropical Wet and Dry / Deccan Plateau',
    soilType: 'Medium to Deep Black Cotton Soil (Regur)',
    avgAnnualRainfall: '720 mm',
    groundwaterStatus: 'Safe to Semi-Critical',
    favourableCrops: [
      { name: 'Pomegranate (Bhagwa)', season: 'Horticulture', waterNeed: 'Medium', yield: '60-80 Quintals/Acre', type: 'Fruit' },
      { name: 'Sugarcane (CoM 0265)', season: 'Annual', waterNeed: 'High', yield: '400 Quintals/Acre', type: 'Cash Crop' },
      { name: 'Soybean (JS 335 / Phule Kalyani)', season: 'Kharif (Jun - Oct)', waterNeed: 'Medium', yield: '10-12 Quintals/Acre', type: 'Oilseed' },
      { name: 'Onion (Fursungi / Gavran)', season: 'Rabi & Late Kharif', waterNeed: 'Medium', yield: '120-140 Quintals/Acre', type: 'Vegetable' },
      { name: 'Grapes (Thompson Seedless)', season: 'Horticulture', waterNeed: 'Medium', yield: '90-110 Quintals/Acre', type: 'Fruit' }
    ],
    vulnerabilities: [
      {
        title: 'Downy Mildew in Grapes & Cucurbits',
        severity: 'High',
        description: 'Cloudy weather with high humidity leads to oily yellow patches on grape leaves and berry rot.',
        prevention: 'Prune canopy for aeration; prophylactic spray of Bordeaux mixture (1%) or Potassium phosphonate.'
      },
      {
        title: 'Bacterial Blight (Telya) in Pomegranate',
        severity: 'High',
        description: 'Xanthomonas axonopodis damages fruit peel resulting in non-marketable cracks.',
        prevention: 'Sanitize orchard clippers; spray Streptocycline + Copper oxychloride after pruning.'
      }
    ],
    seasonalAdvisory: 'Schedule drip fertigation according to crop phenological stage to avoid nutrient stress.'
  },
  {
    id: 'mh-nagpur',
    name: 'Nagpur',
    stateId: 'MH',
    stateName: 'Maharashtra',
    lat: 21.1458,
    lon: 79.0882,
    climateZone: 'Tropical Savannah (Vidarbha Region)',
    soilType: 'Heavy Black Vertisol',
    avgAnnualRainfall: '1100 mm',
    groundwaterStatus: 'Semi-Critical',
    favourableCrops: [
      { name: 'Nagpur Mandarin (Orange)', season: 'Mrig / Ambe Bahar', waterNeed: 'Medium', yield: '80-100 Quintals/Acre', type: 'Fruit' },
      { name: 'Cotton (G. hirsutum)', season: 'Kharif (Jun - Dec)', waterNeed: 'Medium', yield: '8-10 Quintals/Acre', type: 'Fiber' },
      { name: 'Soybean (JS 9305)', season: 'Kharif (Jun - Sep)', waterNeed: 'Medium', yield: '11-13 Quintals/Acre', type: 'Oilseed' },
      { name: 'Pigeonpea / Tur (BDN 711)', season: 'Kharif (Jun - Jan)', waterNeed: 'Low', yield: '8-9 Quintals/Acre', type: 'Pulse' }
    ],
    vulnerabilities: [
      {
        title: 'Gummosis & Phytophthora in Citrus',
        severity: 'High',
        description: 'Prolonged soil waterlogging during monsoon causes trunk collar rot and gum exudation.',
        prevention: 'Ensure ring-basin or drip irrigation; paint tree trunks with Bordeaux paste up to 2 feet.'
      },
      {
        title: 'Mid-Season Drought Spells',
        severity: 'High',
        description: 'Vidarbha frequently experiences 3-week dry breaks during July-August.',
        prevention: 'Adopt broad bed furrow (BBF) planting; apply anti-transpirants or mulch with crop residue.'
      }
    ],
    seasonalAdvisory: 'Spray zinc sulphate (0.5%) and urea (1%) on citrus to overcome seasonal chlorosis.'
  },

  // Gujarat
  {
    id: 'gj-ahmedabad',
    name: 'Ahmedabad',
    stateId: 'GJ',
    stateName: 'Gujarat',
    lat: 23.0225,
    lon: 72.5714,
    climateZone: 'Semi-Arid Dry Tropical',
    soilType: 'Medium Black & Goradu (Sandy Loam)',
    avgAnnualRainfall: '750 mm',
    groundwaterStatus: 'Critical in Northern Talukas',
    favourableCrops: [
      { name: 'Cotton (G. Cot 23)', season: 'Kharif (Jun - Nov)', waterNeed: 'Medium', yield: '11-13 Quintals/Acre', type: 'Fiber' },
      { name: 'Castor (GCH 7)', season: 'Kharif/Rabi', waterNeed: 'Low', yield: '14-16 Quintals/Acre', type: 'Oilseed' },
      { name: 'Wheat (GW 496 / Lok-1)', season: 'Rabi (Nov - Mar)', waterNeed: 'Medium', yield: '20 Quintals/Acre', type: 'Cereal' },
      { name: 'Cumin / Jeera (GC 4)', season: 'Rabi (Nov - Feb)', waterNeed: 'Low', yield: '5-7 Quintals/Acre', type: 'Spice' }
    ],
    vulnerabilities: [
      {
        title: 'Blight & Wilt in Cumin',
        severity: 'High',
        description: 'Foggy mornings in December cause fungal blight that can wipe out cumin within days.',
        prevention: 'Treat seeds with Trichoderma harzianum; spray Mancozeb as soon as cloudy weather persists.'
      },
      {
        title: 'Whitefly Transmission of Leaf Curl Virus',
        severity: 'Moderate',
        description: 'Dry hot winds support whitefly swarms feeding on cotton and papaya.',
        prevention: 'Install yellow sticky traps (15/acre); apply neem oil 10,000 ppm.'
      }
    ],
    seasonalAdvisory: 'Regulate irrigation in cumin carefully; avoid wetting foliage during flowering.'
  },

  // Rajasthan
  {
    id: 'rj-jaipur',
    name: 'Jaipur',
    stateId: 'RJ',
    stateName: 'Rajasthan',
    lat: 26.9124,
    lon: 75.7873,
    climateZone: 'Semi-Arid to Arid',
    soilType: 'Sandy to Sandy Loam (Low Organic Carbon)',
    avgAnnualRainfall: '550 mm',
    groundwaterStatus: 'Over-exploited',
    favourableCrops: [
      { name: 'Pearl Millet / Bajra (RHB 173)', season: 'Kharif (Jul - Oct)', waterNeed: 'Very Low', yield: '12-14 Quintals/Acre', type: 'Millets' },
      { name: 'Mustard (RH 749)', season: 'Rabi (Oct - Mar)', waterNeed: 'Low', yield: '10-12 Quintals/Acre', type: 'Oilseed' },
      { name: 'Gram / Chickpea (GNG 1581)', season: 'Rabi (Oct - Mar)', waterNeed: 'Low', yield: '8-9 Quintals/Acre', type: 'Pulse' },
      { name: 'Fennel / Saunf (RF 101)', season: 'Rabi (Oct - Apr)', waterNeed: 'Medium', yield: '9-11 Quintals/Acre', type: 'Spice' }
    ],
    vulnerabilities: [
      {
        title: 'Extreme Frost (Pala) in January',
        severity: 'High',
        description: 'Sub-zero temperatures burn tender mustard flowers and vegetable buds.',
        prevention: 'Give light irrigation before anticipated frosty nights or create smoke screens at farm borders.'
      },
      {
        title: 'Locust Swarms & Pod Borer',
        severity: 'Moderate',
        description: 'Desert migratory pests attack late pulses and young standing crops.',
        prevention: 'Community field surveillance; early spray of biopesticides and pheromone monitoring.'
      }
    ],
    seasonalAdvisory: 'Apply 0.1% sulphuric acid spray to protect mustard crops from extreme cold and frost.'
  },

  // Karnataka
  {
    id: 'ka-bengaluru',
    name: 'Bengaluru Rural',
    stateId: 'KA',
    stateName: 'Karnataka',
    lat: 13.2248,
    lon: 77.5756,
    climateZone: 'Tropical Semi-Arid Southern Plateau',
    soilType: 'Red Sandy Loam to Clayey Loam',
    avgAnnualRainfall: '880 mm',
    groundwaterStatus: 'Over-exploited',
    favourableCrops: [
      { name: 'Finger Millet / Ragi (GPU 28 / ML 365)', season: 'Kharif (Jul - Nov)', waterNeed: 'Low', yield: '14-16 Quintals/Acre', type: 'Millets' },
      { name: 'Tomato (Shivajee / Lakshmi)', season: 'All Season', waterNeed: 'Medium', yield: '180-220 Quintals/Acre', type: 'Vegetable' },
      { name: 'Mulberry (Sericulture V1)', season: 'Perennial', waterNeed: 'Medium', yield: '25-30 Tons/Acre Leaf', type: 'Commercial' },
      { name: 'Mango (Alphonso / Mallika)', season: 'Horticulture', waterNeed: 'Medium', yield: '60-70 Quintals/Acre', type: 'Fruit' },
      { name: 'Marigold & Chrysanthemum', season: 'Floriculture', waterNeed: 'Medium', yield: '40-50 Quintals/Acre', type: 'Flowers' }
    ],
    vulnerabilities: [
      {
        title: 'Blast Disease (Pyricularia) in Ragi',
        severity: 'Moderate',
        description: 'Prolonged drizzly cloudy days cause neck blast and finger blast, turning heads sterile.',
        prevention: 'Treat seeds with Pseudomonas fluorescens; avoid excessive nitrogen top-dressing.'
      },
      {
        title: 'Tomato Pinworm (Tuta absoluta)',
        severity: 'High',
        description: 'Invasive leaf miner larvae burrow into green tomatoes creating black rotten cavities.',
        prevention: 'Use delta sticky traps with pheromone lures; apply Bacillus thuringiensis (Bt).'
      }
    ],
    seasonalAdvisory: 'Adopt drip fertigation for high-value polyhouse vegetables. Practice mulching for soil moisture.'
  },

  // Tamil Nadu
  {
    id: 'tn-coimbatore',
    name: 'Coimbatore',
    stateId: 'TN',
    stateName: 'Tamil Nadu',
    lat: 11.0168,
    lon: 76.9558,
    climateZone: 'Semi-Arid Rainshadow Tropical',
    soilType: 'Red Soil & Shallow Black Soil',
    avgAnnualRainfall: '650 mm',
    groundwaterStatus: 'Critical',
    favourableCrops: [
      { name: 'Coconut (West Coast Tall / Hybrid)', season: 'Perennial', waterNeed: 'Medium', yield: '120 Nuts/Tree/Year', type: 'Plantation' },
      { name: 'Banana (Grand Naine / Robusta)', season: 'Annual', waterNeed: 'High', yield: '30-35 Tons/Acre', type: 'Fruit' },
      { name: 'Cotton (MCU 5)', season: 'Winter / Summer', waterNeed: 'Medium', yield: '10-12 Quintals/Acre', type: 'Fiber' },
      { name: 'Turmeric (BSR 2)', season: 'Kharif (Jun - Jan)', waterNeed: 'High', yield: '80-100 Quintals/Acre', type: 'Spice' }
    ],
    vulnerabilities: [
      {
        title: 'Rhinoceros Beetle & Red Palm Weevil in Coconut',
        severity: 'High',
        description: 'Beetles bore through crown tissues leaving V-shaped cuts and destroying fronds.',
        prevention: 'Place naphthalene balls in leaf axils; use pheromone traps (Ferrolure+).'
      },
      {
        title: 'Rhizome Rot in Turmeric',
        severity: 'Moderate',
        description: 'Poor field drainage during northeast monsoon leads to Pythium fungal rotting.',
        prevention: 'Ensure raised bed cultivation; drench with Trichoderma harzianum.'
      }
    ],
    seasonalAdvisory: 'Practice drip irrigation with coir-pith composting to retain root moisture during dry summer winds.'
  },

  // West Bengal
  {
    id: 'wb-burdwan',
    name: 'Purba Bardhaman',
    stateId: 'WB',
    stateName: 'West Bengal',
    lat: 23.2324,
    lon: 87.8615,
    climateZone: 'Tropical Wet Gangetic Delta',
    soilType: 'Rich Alluvial Silt Loam',
    avgAnnualRainfall: '1450 mm',
    groundwaterStatus: 'Safe',
    favourableCrops: [
      { name: 'Rice - Aman & Boro (IET 4786)', season: 'Kharif & Summer', waterNeed: 'High', yield: '24-28 Quintals/Acre', type: 'Cereal' },
      { name: 'Potato (Kufri Jyoti / Pokhraj)', season: 'Rabi (Nov - Feb)', waterNeed: 'Medium', yield: '140-160 Quintals/Acre', type: 'Tuber' },
      { name: 'Jute (JRO 204)', season: 'Pre-Kharif (Mar - Jul)', waterNeed: 'High', yield: '14-16 Quintals/Acre', type: 'Fiber' },
      { name: 'Mustard & Lentils', season: 'Rabi (Nov - Feb)', waterNeed: 'Low', yield: '7-9 Quintals/Acre', type: 'Oilseed/Pulse' }
    ],
    vulnerabilities: [
      {
        title: 'Sheath Blight in Boro Rice',
        severity: 'High',
        description: 'Warm and humid canopy microclimate encourages Rhizoctonia solani fungus up the stems.',
        prevention: 'Maintain balanced potash fertilization; apply bio-agent Trichoderma at tillering.'
      },
      {
        title: 'Post-Harvest Potato Storage Rot',
        severity: 'Moderate',
        description: 'Early spring humidity triggers soft rot during transit and cold store entry.',
        prevention: 'Cure tubers in shade for 10 days before packing; avoid bruising during harvest.'
      }
    ],
    seasonalAdvisory: 'Prepare fields for Boro rice transplantation. Maintain 2-3 cm standing water in nurseries.'
  },

  // Madhya Pradesh
  {
    id: 'mp-indore',
    name: 'Indore',
    stateId: 'MP',
    stateName: 'Madhya Pradesh',
    lat: 22.7196,
    lon: 75.8577,
    climateZone: 'Tropical Semi-Arid Malwa Plateau',
    soilType: 'Deep Black Cotton Soil',
    avgAnnualRainfall: '920 mm',
    groundwaterStatus: 'Semi-Critical',
    favourableCrops: [
      { name: 'Soybean (JS 20-34 / NRC 37)', season: 'Kharif (Jun - Oct)', waterNeed: 'Medium', yield: '11-13 Quintals/Acre', type: 'Oilseed' },
      { name: 'Wheat (Sharbati / HI 8663)', season: 'Rabi (Nov - Apr)', waterNeed: 'Medium', yield: '20-22 Quintals/Acre', type: 'Cereal' },
      { name: 'Gram / Chickpea (JG 11)', season: 'Rabi (Oct - Mar)', waterNeed: 'Low', yield: '9-11 Quintals/Acre', type: 'Pulse' },
      { name: 'Garlic (G-282)', season: 'Rabi (Oct - Mar)', waterNeed: 'Medium', yield: '50-60 Quintals/Acre', type: 'Spice' }
    ],
    vulnerabilities: [
      {
        title: 'Yellow Mosaic Virus (YMV) in Soybean',
        severity: 'High',
        description: 'Spread rapidly by whitefly during hot humid breaks, turning leaves chlorotic and brittle.',
        prevention: 'Use YMV-resistant cultivars (JS 20-34); install yellow sticky traps.'
      },
      {
        title: 'Soil Cracking & Root Tearing',
        severity: 'Moderate',
        description: 'Heavy clay soils develop deep shrinkage fissures during dry winter breaks.',
        prevention: 'Apply light frequent irrigations; mulch with crop residue to reduce evaporation.'
      }
    ],
    seasonalAdvisory: 'Inspect chickpea for pod borer (Helicoverpa armigera); spray NPV bio-virus or neem oil.'
  }
];

// Helper to find district by ID
export function getDistrictById(id) {
  return DISTRICTS_DATA.find((d) => d.id === id) || DISTRICTS_DATA[0];
}

// Search matching states
export function searchStates(query) {
  if (!query || !query.trim()) return INDIAN_STATES;
  const q = query.toLowerCase().trim();
  return INDIAN_STATES.filter(
    (s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
  );
}

// Search matching districts for a given state
export function searchDistricts(stateId, query) {
  let list = DISTRICTS_DATA;
  if (stateId) {
    list = list.filter((d) => d.stateId === stateId);
  }
  if (!query || !query.trim()) return list;
  const q = query.toLowerCase().trim();
  return list.filter((d) => d.name.toLowerCase().includes(q));
}
