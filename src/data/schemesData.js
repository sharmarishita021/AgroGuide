/**
 * Central & State Agricultural Schemes Database
 * Includes authentic schemes with subsidy benefits, eligibility, and direct application guides.
 */

export const SCHEME_CATEGORIES = [
  'All Categories',
  'Financial & DBT',
  'Irrigation & Solar',
  'Machinery & Equipment',
  'Organic & Sustainable',
  'Crop Insurance',
  'Horticulture & Seeds'
];

export const LAND_SIZES = [
  { id: 'all', label: 'Any Land Size' },
  { id: 'marginal', label: 'Marginal (< 1 Hectare / 2.5 Acres)' },
  { id: 'small', label: 'Small (1 - 2 Hectares / 2.5 - 5 Acres)' },
  { id: 'medium', label: 'Medium (2 - 10 Hectares / 5 - 25 Acres)' },
  { id: 'large', label: 'Large (> 10 Hectares / > 25 Acres)' }
];

export const SCHEMES_DATA = [
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    shortName: 'PM-KISAN DBT',
    category: 'Financial & DBT',
    applicableStates: ['ALL'],
    eligibleLandSizes: ['marginal', 'small', 'medium', 'large'],
    targetBeneficiary: 'All Landholding Farmer Families',
    subsidyAmount: '₹6,000 per year (in 3 equal installments of ₹2,000)',
    summary: 'Direct income support credited directly into the verified bank account of landholding farmer families across India.',
    eligibility: [
      'All landholding farmer families with cultivable landholding in their names.',
      'Aadhaar seeded bank account with e-KYC completed.',
      'Excludes institutional landholders, tax-paying individuals, and government employees.'
    ],
    keyBenefits: [
      'Guaranteed ₹2,000 every 4 months directly in Aadhaar-linked account.',
      'Zero intermediaries or commission deduction.',
      'Helps meet emergency input costs during sowing season.'
    ],
    documentsNeeded: [
      'Aadhaar Card',
      'Proof of land ownership (Khasra/Khatauni or 7/12 record)',
      'Active bank account passbook details',
      'Mobile number linked to Aadhaar'
    ],
    officialUrl: 'https://pmkisan.gov.in',
    tags: ['income', 'dbt', 'cash', 'money', 'pmkisan', 'installment', 'financial', 'subsidy']
  },
  {
    id: 'pm-kusum',
    name: 'PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)',
    shortName: 'PM-KUSUM Solar Pump',
    category: 'Irrigation & Solar',
    applicableStates: ['ALL', 'PB', 'HR', 'MH', 'RJ', 'GJ'],
    eligibleLandSizes: ['marginal', 'small', 'medium', 'large'],
    targetBeneficiary: 'Individual Farmers, Water User Associations & FPOs',
    subsidyAmount: 'Up to 60% capital subsidy + 30% bank loan (Farmer pays only 10%)',
    summary: 'De-dieselizing the agriculture sector by providing stand-alone solar water pumps and grid-connected solar power generation on barren farmlands.',
    eligibility: [
      'Farmers with agricultural land possessing an existing water source (borewell/canal/open well).',
      'Priority given to small/marginal farmers in dark zones and diesel-pump users.',
      'Farmers with barren or uncultivated land can install grid-tied solar plants up to 2 MW.'
    ],
    keyBenefits: [
      'Free uninterrupted daytime solar electricity for irrigation.',
      'Eliminates heavy diesel fuel and rising power tariffs.',
      'Option to sell surplus generated solar power back to the discom grid.'
    ],
    documentsNeeded: [
      'Aadhaar & PAN Card',
      'Land revenue records / Jamabandi',
      'Electricity bill connection or proof of non-electrified diesel pump',
      'Cancelled cheque'
    ],
    officialUrl: 'https://pmkusum.mnre.gov.in',
    tags: ['solar', 'pump', 'energy', 'electricity', 'irrigation', 'water', 'kusum', 'diesel']
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    shortName: 'PMFBY Crop Insurance',
    category: 'Crop Insurance',
    applicableStates: ['ALL'],
    eligibleLandSizes: ['marginal', 'small', 'medium', 'large'],
    targetBeneficiary: 'All Farmers Growing Notified Crops',
    subsidyAmount: 'Farmers pay only 1.5% - 2% premium; balance 98% borne by Government',
    summary: 'Comprehensive financial cushion against unforeseen crop loss caused by floods, drought, pest attacks, hailstorms, and post-harvest cyclone damage.',
    eligibility: [
      'All farmers cultivating notified crops in notified areas (both loanee and non-loanee farmers).',
      'Must enroll before the cut-off sowing deadline for Kharif or Rabi.',
      'Immediate loss intimation within 72 hours of localized calamity via Crop Insurance App.'
    ],
    keyBenefits: [
      'Nominal premium: 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops.',
      'Full insured sum paid directly to account based on satellite and Crop Cutting Experiments (CCE).',
      'Covers mid-season adversity, prevented sowing, and post-harvest losses.'
    ],
    documentsNeeded: [
      'Aadhaar card',
      'Land possession certificate / RoR',
      'Sowing certificate / self-declaration of crop sown',
      'Bank passbook copy'
    ],
    officialUrl: 'https://pmfby.gov.in',
    tags: ['insurance', 'crop loss', 'flood', 'drought', 'hailstorm', 'fasal bima', 'risk', 'compensation']
  },
  {
    id: 'smam',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    shortName: 'SMAM Equipment Subsidy',
    category: 'Machinery & Equipment',
    applicableStates: ['ALL', 'PB', 'HR', 'UP', 'MH', 'MP', 'RJ'],
    eligibleLandSizes: ['marginal', 'small', 'medium'],
    targetBeneficiary: 'Small/Marginal Farmers, SC/ST, Women Farmers, Custom Hiring Centers',
    subsidyAmount: '40% to 50% subsidy on farm implements (up to 80% for Custom Hiring Centers)',
    summary: 'Financial assistance to procure modern farm machinery such as tractors, rotavators, laser land levelers, happy seeders, power weeders, and sprayers.',
    eligibility: [
      'Valid farmer ID on state agriculture DBT portal.',
      'Has not availed subsidy for the same equipment in the preceding 5 years.',
      'Preference to women and smallholder farmers.'
    ],
    keyBenefits: [
      'Substantial subsidy up to ₹1.5 Lakhs on tractor implements.',
      'Reduces labor bottlenecks and shortens harvesting-sowing turnaround time.',
      'Enables establishing Custom Hiring Centers (CHC) for rural youth employment.'
    ],
    documentsNeeded: [
      'Aadhaar Card & Caste Certificate (if applicable)',
      'Land records (Khatauni / 7/12)',
      'Quotation from registered machinery dealer',
      'Bank account details'
    ],
    officialUrl: 'https://agrimachinery.nic.in',
    tags: ['tractor', 'machinery', 'equipment', 'rotavator', 'happy seeder', 'laser leveler', 'tools']
  },
  {
    id: 'pkvy',
    name: 'Paramparagat Krishi Vikas Yojana (PKVY - Organic Farming)',
    shortName: 'PKVY Organic Mission',
    category: 'Organic & Sustainable',
    applicableStates: ['ALL'],
    eligibleLandSizes: ['marginal', 'small', 'medium'],
    targetBeneficiary: 'Farmer Farmer Producer Groups / Clusters (20-50 ha)',
    subsidyAmount: '₹50,000 per hectare for 3 years (₹31,000 for organic inputs & bio-fertilizers)',
    summary: 'Promotes chemical-free organic farming through cluster approach and Participatory Guarantee System (PGS) certification, with premium market linkage.',
    eligibility: [
      'Farmers willing to form clusters of 20 to 50 hectares with fellow village growers.',
      'Commitment to abstain from synthetic fertilizers and chemical pesticides.',
      'Adoption of PGS organic certification norms.'
    ],
    keyBenefits: [
      'Direct financial support for organic inputs like vermicompost, jeevamrit, and bio-control agents.',
      'Free PGS-India organic certification without tedious third-party audit fees.',
      'Direct linkage to organic markets and Jaivik Kheti e-commerce portal.'
    ],
    documentsNeeded: [
      'Aadhaar card of cluster members',
      'Land revenue records',
      'Farmer group resolution and registration form'
    ],
    officialUrl: 'https://pgsindia-ncof.gov.in',
    tags: ['organic', 'sustainable', 'chemical-free', 'vermicompost', 'bio-fertilizer', 'certification', 'green']
  },
  {
    id: 'per-drop-more-crop',
    name: 'Per Drop More Crop - PM Krishi Sinchayee Yojana (PMKSY)',
    shortName: 'Micro-Irrigation Subsidy',
    category: 'Irrigation & Solar',
    applicableStates: ['ALL', 'MH', 'KA', 'GJ', 'TN', 'AP', 'RJ'],
    eligibleLandSizes: ['marginal', 'small', 'medium', 'large'],
    targetBeneficiary: 'All Farmers Adopting Drip or Sprinkler Systems',
    subsidyAmount: '55% subsidy for Small/Marginal Farmers; 45% for Other Category Farmers',
    summary: 'Increases water use efficiency on the farm through pressurized micro-irrigation systems, reducing water waste by up to 50% while boosting crop yield.',
    eligibility: [
      'Cultivable land with an assured irrigation water source.',
      'Installation must be done through approved empanelled micro-irrigation vendors.'
    ],
    keyBenefits: [
      'Saves 40% to 60% water compared to conventional flood irrigation.',
      'Enables fertigation (injecting soluble fertilizers directly to root zones).',
      'Improves harvest uniformity and fruit sizing.'
    ],
    documentsNeeded: [
      'Aadhaar Card',
      'Land Record (7/12 or RoR)',
      'Water source self-declaration',
      'Survey layout and vendor quotation'
    ],
    officialUrl: 'https://pmksy.gov.in',
    tags: ['drip', 'sprinkler', 'water', 'irrigation', 'micro-irrigation', 'water saving', 'borewell']
  },
  {
    id: 'soil-health-card',
    name: 'Soil Health Card & Soil Management Scheme',
    shortName: 'Soil Health Card',
    category: 'Organic & Sustainable',
    applicableStates: ['ALL'],
    eligibleLandSizes: ['marginal', 'small', 'medium', 'large'],
    targetBeneficiary: 'All Landholders',
    subsidyAmount: 'Free soil testing & customized crop fertilizer prescription',
    summary: 'Provides farmers with printed report cards assessing 12 chemical and physical parameters of their field soil with custom N-P-K and micronutrient dosage advice.',
    eligibility: [
      'Open to all agricultural landholders across every state and union territory.'
    ],
    keyBenefits: [
      'Accurate assessment of pH, EC, Organic Carbon, Nitrogen, Phosphorus, Potassium, Zinc, and Boron.',
      'Cuts down wasteful over-fertilization costs by 15-25%.',
      'Restores depleted soil microbiomes.'
    ],
    documentsNeeded: [
      'Aadhaar card',
      'Khasra/Survey number of the sample plot'
    ],
    officialUrl: 'https://soilhealth.dac.gov.in',
    tags: ['soil', 'testing', 'fertilizer', 'npk', 'soil health', 'nutrients', 'card']
  },
  {
    id: 'aif-loan',
    name: 'Agriculture Infrastructure Fund (AIF)',
    shortName: 'AIF Post-Harvest Loans',
    category: 'Machinery & Equipment',
    applicableStates: ['ALL'],
    eligibleLandSizes: ['medium', 'large'],
    targetBeneficiary: 'Farmers, Agri-Entrepreneurs, FPOs, Self Help Groups',
    subsidyAmount: '3% interest subvention on loans up to ₹2 Crores for 7 years',
    summary: 'Medium-to-long term debt financing facility for post-harvest management infrastructure like cold storage, pack houses, assaying units, and primary processing.',
    eligibility: [
      'Primary Agricultural Credit Societies (PACS), FPOs, Agri-startups, and individual farmers.'
    ],
    keyBenefits: [
      'Cheap credit with 3% annual interest rebate.',
      'Credit guarantee coverage under CGTMSE for loans up to ₹2 Crore without collateral.',
      'Prevents distress selling of perishables during post-harvest glut.'
    ],
    documentsNeeded: [
      'Detailed Project Report (DPR)',
      'Entity Registration / Aadhaar & PAN',
      'Land ownership or lease deed (minimum 10 years)'
    ],
    officialUrl: 'https://agriinfra.dac.gov.in',
    tags: ['cold storage', 'loan', 'infrastructure', 'warehouse', 'post-harvest', 'interest rebate']
  },
  {
    id: 'pb-pani-bachao',
    name: 'Pani Bachao Paisa Kamao (PBPK) Scheme',
    shortName: 'PBPK Electricity Incentive',
    category: 'Irrigation & Solar',
    applicableStates: ['PB'],
    eligibleLandSizes: ['marginal', 'small', 'medium', 'large'],
    targetBeneficiary: 'Punjab Agricultural Tubewell Power Consumers',
    subsidyAmount: 'Direct cash deposit of ₹4 per kWh of agricultural electricity saved',
    summary: 'A direct incentive scheme in Punjab that rewards tubewell-owning farmers who voluntarily install electricity meters and conserve groundwater.',
    eligibility: [
      'Farmers residing in Punjab possessing an AP (Agricultural Power) tubewell connection.'
    ],
    keyBenefits: [
      'Free electricity quota remains intact; unspent electricity is paid in hard cash.',
      'Earned revenue credited directly into farmer’s bank account every month.',
      'Substantially decreases unnecessary groundwater pumping.'
    ],
    documentsNeeded: [
      'PSPCL Consumer Account Number',
      'Aadhaar Card',
      'Bank Account Passbook'
    ],
    officialUrl: 'https://pspcl.in',
    tags: ['punjab', 'water', 'electricity', 'cashback', 'tubewell', 'groundwater', 'pbpk']
  },
  {
    id: 'mh-shet-tale',
    name: 'Magel Tyala Shet Tale (Farm Ponds on Demand)',
    shortName: 'Maharashtra Shet Tale',
    category: 'Irrigation & Solar',
    applicableStates: ['MH'],
    eligibleLandSizes: ['marginal', 'small', 'medium'],
    targetBeneficiary: 'Farmers in Drought-Prone Districts of Maharashtra',
    subsidyAmount: 'Direct grant up to ₹75,000 for farm pond excavation and plastic lining',
    summary: 'Guarantees a dedicated farm rainwater harvesting pond for every farmer who demands one in drought-prone regions of Maharashtra.',
    eligibility: [
      'Farmers owning at least 0.60 hectare of land in Maharashtra.',
      'Land suitability for water holding and catchment.'
    ],
    keyBenefits: [
      'Assured life-saving protective irrigation during long dry spells in Kharif/Rabi.',
      'Enables fish farming and secondary horticulture.',
      'Recharges surrounding open wells and borewells.'
    ],
    documentsNeeded: [
      '7/12 & 8A extract',
      'Aadhaar Card',
      'Bank passbook copy'
    ],
    officialUrl: 'https://mahadbt.maharashtra.gov.in',
    tags: ['maharashtra', 'pond', 'shet tale', 'rainwater', 'drought', 'water storage']
  },
  {
    id: 'hr-mera-pani',
    name: 'Mera Pani Meri Virasat Crop Diversification Scheme',
    shortName: 'Haryana Crop Diversification',
    category: 'Financial & DBT',
    applicableStates: ['HR'],
    eligibleLandSizes: ['marginal', 'small', 'medium', 'large'],
    targetBeneficiary: 'Farmers Switching from Paddy to Alternative Crops in Haryana',
    subsidyAmount: 'Financial incentive of ₹7,000 per acre for replacing water-thirsty paddy',
    summary: 'Financial reward given to Haryana farmers who replace paddy with water-efficient crops like maize, cotton, pulses, oilseeds, or agroforestry.',
    eligibility: [
      'Farmers in Haryana registered on Meri Fasal Mera Byora portal.',
      'Must leave paddy uncultivated or switch to maize, bajra, pulses, or horticulture.'
    ],
    keyBenefits: [
      'Direct payout of ₹7,000/acre credited to bank account.',
      'Free crop insurance coverage on diversified crops.',
      'Promotes sustainable soil fertility and saves millions of cubic meters of water.'
    ],
    documentsNeeded: [
      'Meri Fasal Mera Byora registration ID',
      'Aadhaar Card',
      'Bank account details'
    ],
    officialUrl: 'https://fasal.haryana.gov.in',
    tags: ['haryana', 'water', 'diversification', 'paddy', 'incentive', 'mera pani']
  }
];
