import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// IMAGE URLS
// All Unsplash URLs are already used/verified across the project.
// ---------------------------------------------------------------------------
const IMG = {
  // Problem card images
  waterScarcity:    'https://imgs.search.brave.com/ez_oU_vvis2qAOSqe8ZmX6CUtnIAbPqkEG-2IF3wFrg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE5LzY5LzIyLzY0/LzM2MF9GXzE5Njky/MjY0MTZfcERBaktI/Tmt5WlFOWTJrbThB/ZHJJT1JyOGRCTU5V/UUEuanBn',
  soilDegradation:  'https://imgs.search.brave.com/Lg2_MgSZAL1L2HbJx-vgSQhuUi8AiUynjdskszpHir4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hcmV2/by5zZS9jb250ZW50/L3VwbG9hZHMvMjAy/Ni8wNS9zb2lsLWRl/Z3JhZGF0aW9uLWRp/c2FzdGVyLnBuZw',
  pestProblems:     'https://imgs.search.brave.com/c6S7SwVgXF_lOJQPln3nWttXz26vWj4wIHvNXhSYec8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ1/MTM5MzE2MS9waG90/by9tYWxlLWFzaWFu/LWZhcm1lci1zcHJh/eS1mZXJ0aWxpemVy/LWF0LXRvYmFjY28t/ZmFybS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9LTFMUWdy/d3BPNnFuaU0xbU9a/dFdKMHVoNFI0UjlD/SThRN1EyQjQ1TEVF/Zz0',
  lowFertility:     'https://imgs.search.brave.com/z7S1AjtZm21OQGTiqR75agTIvRf9Pd1aIYWrRzjV1ck/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9lb3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIxLzAzL3NvaWwt/ZmVydGlsaXR5LWxv/c3MuanBn',
  excessiveHeat:    'https://imgs.search.brave.com/6K4uFiSYJlc6j7J-jmLHgOrH8EtPj_odvFglQJrw8BQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZi1p/bWFnZXMuYXNzZXR0/eXBlLmNvbS9kb3du/dG9lYXJ0aC8yMDI2/LTA3LTA3LzludGVu/OGVtL2lTdG9jay05/MjI3MjA2MTItMS5q/cGc_dz00ODAmYXV0/bz1mb3JtYXQsY29t/cHJlc3MmZml0PW1h/eA',
  excessWater:      'https://imgs.search.brave.com/Sd-JeKANUV4rZDJthXbBMbkmtvFe0Ps45fYI3lHKXOg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/am91YXYuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzA4/L2Zhcm1sYW5kLWZs/b29kaW5nLTEwMjR4/NTc2LmpwZw',
  chemicalUse:      'https://imgs.search.brave.com/r5Cp_5ylasDrhFUwaY9RLg_LhFuKLmnUQEWrKHQBCY4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jYW1h/Y2hlbS5jb20vcHVi/L21lZGlhL3d5c2l3/eWcvVG9wXzEwX0No/ZW1pY2Fsc19mb3Jf/QWdyaWN1bHR1cmVf/SW5kdXN0cnkuanBn',

  // Method images
  dripIrrigation:   'https://imgs.search.brave.com/CzJ3F_uhqo5E364nFj1i4a2l9YLdhURuxdLLD5Fhs_E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9kcmlw/LXdhdGVyLWlycmln/YXRpb24tc3lzdGVt/LXJvc2UtcGxhbnQt/Z3Jvd2luZy1ncmVl/bmhvdXNlLWRyaXAt/d2F0ZXItaXJyaWdh/dGlvbi1zeXN0ZW0t/cm9zZS1mbG93ZXIt/Z3Jvd2luZy0xMzUy/MjA0MjEuanBn',
  mulching:         'https://imgs.search.brave.com/PJgeARzkZQV0mFt3sTMm-3J6y-t05_PpCEpN22p2SEQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtZXUuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxaWVjQjUzTXhM/Ll9BQ19VTDMwMF9T/UjMwMCwyMDBfLmpw/Zw',
  rainHarvest:      'https://imgs.search.brave.com/EpFoOJdgIJHvleZl1mJNN_dOyg7N-rgzgjJsxJgThxw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9yYWluLXdh/dGVyLWhhcnZlc3Rp/bmctc3lzdGVtLXVu/ZGVyZ3JvdW5kLTI2/MG53LTIwNDEwNzM1/NzMuanBn',
  soilMonitor:      'https://imgs.search.brave.com/FPAiJpaqqKUOyLpyfvJSKdb66NA5QFrvy2V5iIayFs8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zb2ls/LXNlbnNvci1tb25p/dG9yaW5nLW1vaXN0/dXJlLXRlbXBlcmF0/dXJlLXZlZ2V0YWJs/ZS1nYXJkZW4tZGln/aXRhbC1tZWFzdXJp/bmcteW91bmctc2Vl/ZGxpbmdzLXJhaXNl/ZC1iZWQtYnJpZ2h0/LTQ1ODcwNjkxMi5q/cGc',
  
  cropRotation:     'https://imgs.search.brave.com/5qznast_wISiheccDhCbKAXpOtRUnn_yehGYv62E_sw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9lb3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL3JvdGFj/aW9uLWRlLTQtY3Vs/dGl2b3MuanBn',
  compost:          'https://imgs.search.brave.com/J772LxaDmSgpGaf3Pw9owG81EeL8wP1iV5N9RCf-eU4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzIv/MjY1LzExNy9zbWFs/bC9ncmVlbi1jb21w/b3N0LWJpbi1vdmVy/Zmxvd2luZy13aXRo/LW9yZ2FuaWMtd2Fz/dGUtYWdhaW5zdC1v/cmFuZ2UtYmFja2dy/b3VuZC1waG90by5q/cGVn',
  coverCropping:    'https://imgs.search.brave.com/KSUFJEK_MnNltbIyvhjMMaHiV_h_Bc9pibVZS5xj00M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE3/MjI0MjI5MC9waG90/by9jb3Zlci1jcm9w/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1zRnR1VzVLaTUw/SExzcnpNMzkxU3Fu/cTBlRU1Tb0Y0eEpS/amtoekNRakpvPQ',
  reducedTillage:   'https://imgs.search.brave.com/7NTMyY5Wza8SORT7V2Xf1_OD4ZfAA3W3rcbaDM6S4Kc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTA1/NDk5MjY3Ni9waG90/by9hZXJpYWwtdmll/dy13aXRoLWRyb25l/LW9mLXRyYWN0b3It/cGxvd2luZy10aGUt/bGFuZC1pbi10aGUt/Y291bnRyeXNpZGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXozcFBLTnJfU2RK/YmxzZVQyLVE3cktE/b3o1c0c3MTZVekl4/T2hENHVjSm89',
  ipm:              'https://imgs.search.brave.com/pRH5Bl4XDsbb_AZYzvoLhO_lYicQwE9vXq2K9puP5Wk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbGFu/dC1wZXN0LWFkdmlz/b3J5LnJ1dGdlcnMu/ZWR1L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIxLzAzL0lQTS12/cy4tUEhDLTEzLTEt/MzAweDIxNi5qcGc',
  bioControl:       'https://imgs.search.brave.com/2w3hO3kYRjLI-kAdZw-dgl_HZK8zGERTVKC4UvoBLaI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hbHRp/bmNvLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvYmlvY29udHJv/bC1hZ3JpY3VsdHVy/YS1jYW1wby0xMDI0/eDY0MC53ZWJw',
  neem:             'https://imgs.search.brave.com/FPAiJpaqqKUOyLpyfvJSKdb66NA5QFrvy2V5iIayFs8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zb2ls/LXNlbnNvci1tb25p/dG9yaW5nLW1vaXN0/dXJlLXRlbXBlcmF0/dXJlLXZlZ2V0YWJs/ZS1nYXJkZW4tZGln/aXRhbC1tZWFzdXJp/bmcteW91bmctc2Vl/ZGxpbmdzLXJhaXNl/ZC1iZWQtYnJpZ2h0/LTQ1ODcwNjkxMi5q/cGc',
  greenManure:      'https://imgs.search.brave.com/2w3hO3kYRjLI-kAdZw-dgl_HZK8zGERTVKC4UvoBLaI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hbHRp/bmNvLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvYmlvY29udHJv/bC1hZ3JpY3VsdHVy/YS1jYW1wby0xMDI0/eDY0MC53ZWJw',
  organicFert:      'https://imgs.search.brave.com/9r7Sv4-QvkMMZJcuCo5574rW6diQsIUwVDio1z0mQPk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM5/MjQzMDIyNi9waG90/by9zYXZlLXRoZS1z/b2lsLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1KTzZjcGhY/ZmFoRjctWGdpTHBN/aV84WlFEQXQxcWNH/U05GYXlPbEtzcm1Z/PQ',
  shade:            'https://imgs.search.brave.com/9r7Sv4-QvkMMZJcuCo5574rW6diQsIUwVDio1z0mQPk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM5/MjQzMDIyNi9waG90/by9zYXZlLXRoZS1z/b2lsLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1KTzZjcGhY/ZmFoRjctWGdpTHBN/aV84WlFEQXQxcWNH/U05GYXlPbEtzcm1Z/PQ',
  heatVarieties:    'https://imgs.search.brave.com/VJJOdp5Hgv_ZOyzxEyqMDR-jLQbEJUNvH2FWuxo97rg/rs:fit:500:0:1:0/g:ce/aHR0cDovL2Fncmlj/YXJlaHViLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNi8w/NC8xMi1CZXN0LUhl/YXQtVG9sZXJhbnQt/Q3JvcHMtZm9yLUhv/dC1DbGltYXRlcy4t/cmVhbC1waWMtMS5q/cGc',
  efficientIrrig:   'https://imgs.search.brave.com/kyzAhAviv4PftuMWkZXOrXEcJOhEYSAzfV-XlwLVj8Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vaXJyaWdhdGlv/bi1zeXN0ZW1zLWNv/bnNlcnZlLXdhdGVy/LXByb21vdGUtaGVh/bHRoeS1jcm9wLWdy/b3d0aC1lZmZpY2ll/bnRseS1jb25jZXB0/LWFncmljdWx0dXJh/bC1lZmZpY2llbmN5/LXN1c3RhaW5hYmxl/LWZhcm1pbmctd2F0/ZXItY29uc2VydmF0/aW9uLWNyb3AtaGVh/bHRoLWlycmlnYXRp/b24tdGVjaG5pcXVl/c184NjQ1ODgtMTgz/OTE2LmpwZz9nYT1H/QTEuMS4xMDIxOTQ5/NDA4LjE3OTE2MDQw/NDImc2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA',
  fieldDrainage:    'https://imgs.search.brave.com/Wsrf56EySyKRTdcx1K22D-wd2fOURy-W_iReKPQ6SsY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bmRzdS5lZHUvYWdy/aWN1bHR1cmUvc2l0/ZXMvZGVmYXVsdC9m/aWxlcy9zdHlsZXMv/Nzg0eDQyNC9wdWJs/aWMvMjAyNS0wNS9k/cmFpbmFnZSUyMHB1/bXAlMjBzdGF0aW9u/LnBuZy53ZWJwP2g9/YzhkZDczNzUmaXRv/az16T2ZHaDRsag',
  raisedBeds:       'https://imgs.search.brave.com/Uapj4Ia8z69xDEz8zFbJMTg_bIeZTo4O1NEzvRamdDU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzA1/OTgvNzE5NS8zMDYx/L2ZpbGVzL1ZlZ2Vn/YS1nYXJkZW4tZ3Jv/dXBzLTYuanBnP3Y9/MTc1NzY3MTE4NCZ3/aWR0aD0yMDQ4',
  irrigSched:       'https://imgs.search.brave.com/AS4yaqFGxk5hizZk8G2rzMbhmUb6QAyEELG9PINqDiY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODQ5/ODkyODk4L3Bob3Rv/L2NvZmZlZS1pcnJp/Z2F0aW9uLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1JSzZB/Tlo3QzdRUUxITkQ5/RHNVOHJZUGZJTHNF/SHpGbF9PS2MwRnBz/Z2swPQ',
  waterTolerant:    'https://imgs.search.brave.com/FPAiJpaqqKUOyLpyfvJSKdb66NA5QFrvy2V5iIayFs8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zb2ls/LXNlbnNvci1tb25p/dG9yaW5nLW1vaXN0/dXJlLXRlbXBlcmF0/dXJlLXZlZ2V0YWJs/ZS1nYXJkZW4tZGln/aXRhbC1tZWFzdXJp/bmcteW91bmctc2Vl/ZGxpbmdzLXJhaXNl/ZC1iZWQtYnJpZ2h0/LTQ1ODcwNjkxMi5q/cGc',
  soilTesting:      'https://imgs.search.brave.com/AS4yaqFGxk5hizZk8G2rzMbhmUb6QAyEELG9PINqDiY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODQ5/ODkyODk4L3Bob3Rv/L2NvZmZlZS1pcnJp/Z2F0aW9uLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1JSzZB/Tlo3QzdRUUxITkQ5/RHNVOHJZUGZJTHNF/SHpGbF9PS2MwRnBz/Z2swPQ',
  bioFert:          'https://imgs.search.brave.com/WkCDM6d4kBKxImUHWApn4HgD0zPnKzBF-TwuGYqSc4Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9iaW8t/ZmVydGlsaXplci1l/YXJ0aHdvcm0tYmlv/LWZlcnRpbGl6ZXIt/ZWFydGh3b3JtLWFn/cmljdXR1cmUtY29u/Y2VwdC0xMDg4MDk5/MTQuanBn',
};

// ---------------------------------------------------------------------------
// STATIC DATA — 7 problems × 4 methods each
// ---------------------------------------------------------------------------
const PROBLEMS = [
  {
    id: 'water-scarcity',
    title: 'Water Scarcity',
    img: IMG.waterScarcity,
    description:
      'Limited water availability can reduce crop growth and productivity. Sustainable water-management practices help farmers use available water more efficiently.',
    methods: [
      {
        name: 'Drip Irrigation',
        img: IMG.dripIrrigation,
        description: 'Delivers water directly near the plant roots through small emitters.',
        benefit: 'Reduces water wastage and improves irrigation efficiency.',
        howItHelps: 'Provides controlled water to crops instead of flooding the entire field.',
      },
      {
        name: 'Mulching',
        img: IMG.mulching,
        description: 'Covers the soil around crops with organic material such as straw, dry leaves, or crop residue.',
        benefit: 'Reduces evaporation and helps retain soil moisture.',
        howItHelps: 'Keeps the soil moist for longer between irrigation cycles.',
      },
      {
        name: 'Rainwater Harvesting',
        img: IMG.rainHarvest,
        description: 'Collects and stores rainwater for later agricultural use.',
        benefit: 'Provides an additional source of irrigation water.',
        howItHelps: 'Reduces dependence on groundwater during dry periods.',
      },
      {
        name: 'Soil Moisture Monitoring',
        img: IMG.soilMonitor,
        description: 'Checks the moisture level of soil before irrigation.',
        benefit: 'Prevents unnecessary watering.',
        howItHelps: 'Farmers can irrigate when the soil actually needs water.',
      },
    ],
  },
  {
    id: 'soil-degradation',
    title: 'Soil Degradation',
    img: IMG.soilDegradation,
    description:
      'Continuous cultivation, excessive chemical use, erosion, and poor soil management can reduce soil quality and fertility.',
    methods: [
      {
        name: 'Crop Rotation',
        img: IMG.cropRotation,
        description: 'Growing different crops on the same land in different seasons.',
        benefit: 'Helps maintain soil fertility and reduces repeated nutrient depletion.',
        howItHelps: 'Different crops have different nutrient requirements and can break pest and disease cycles.',
      },
      {
        name: 'Compost',
        img: IMG.compost,
        description: 'Uses decomposed organic materials to improve soil.',
        benefit: 'Adds organic matter and improves soil structure.',
        howItHelps: 'Supports healthier soil and better nutrient availability.',
      },
      {
        name: 'Cover Cropping',
        img: IMG.coverCropping,
        description: 'Growing crops mainly to keep the soil covered between main crop cycles.',
        benefit: 'Reduces soil erosion and helps retain soil moisture.',
        howItHelps: 'Protects exposed soil from wind and water erosion.',
      },
      {
        name: 'Reduced Tillage',
        img: IMG.reducedTillage,
        description: 'Minimizes unnecessary ploughing and soil disturbance.',
        benefit: 'Helps protect soil structure and reduce erosion.',
        howItHelps: 'Preserves soil organisms and organic matter.',
      },
    ],
  },
  {
    id: 'pest-problems',
    title: 'Pest Problems',
    img: IMG.pestProblems,
    description:
      'Pests can damage crops and reduce yield. Sustainable pest management focuses on controlling pests without unnecessary pesticide use.',
    methods: [
      {
        name: 'Integrated Pest Management (IPM)',
        img: IMG.ipm,
        description: 'Combines monitoring, biological, cultural, and chemical methods when needed.',
        benefit: 'Reduces unnecessary pesticide use.',
        howItHelps: 'Treats pest problems based on actual pest levels rather than routine spraying.',
      },
      {
        name: 'Crop Rotation',
        img: IMG.cropRotation,
        description: 'Changes the crop grown in a field across seasons.',
        benefit: 'Helps interrupt pest life cycles.',
        howItHelps: 'Makes it harder for crop-specific pests to continuously reproduce.',
      },
      {
        name: 'Biological Pest Control',
        img: IMG.bioControl,
        description: 'Uses natural predators or beneficial organisms to control harmful pests.',
        benefit: 'Reduces dependence on chemical pesticides.',
        howItHelps: 'Maintains natural pest-control mechanisms in the field.',
      },
      {
        name: 'Neem-Based Pest Management',
        img: IMG.neem,
        description: 'Uses neem-based preparations as a plant-derived pest-management option.',
        benefit: 'Provides an alternative to repeated chemical pesticide application.',
        howItHelps: 'Can help manage certain insect pests when used appropriately.',
      },
    ],
  },
  {
    id: 'low-fertility',
    title: 'Low Soil Fertility',
    img: IMG.lowFertility,
    description:
      'Low soil fertility can result from nutrient depletion, low organic matter, and repeated cultivation without adequate nutrient replacement.',
    methods: [
      {
        name: 'Compost Application',
        img: IMG.compost,
        description: 'Adds decomposed organic material to the soil.',
        benefit: 'Improves organic matter and supports nutrient availability.',
        howItHelps: 'Helps improve soil structure and long-term soil health.',
      },
      {
        name: 'Green Manuring',
        img: IMG.greenManure,
        description: 'Growing suitable plants and incorporating their green biomass into the soil.',
        benefit: 'Adds organic matter and nutrients to the soil.',
        howItHelps: 'Improves soil fertility before the next crop.',
      },
      {
        name: 'Crop Rotation',
        img: IMG.cropRotation,
        description: 'Alternates crops with different nutrient requirements.',
        benefit: 'Helps reduce continuous depletion of the same nutrients.',
        howItHelps: 'Can improve nutrient balance over multiple cropping seasons.',
      },
      {
        name: 'Organic Fertilizers',
        img: IMG.organicFert,
        description: 'Uses materials such as compost or well-decomposed manure as nutrient sources.',
        benefit: 'Adds nutrients along with organic matter.',
        howItHelps: 'Supports both crop nutrition and long-term soil quality.',
      },
    ],
  },
  {
    id: 'excessive-heat',
    title: 'Excessive Heat',
    img: IMG.excessiveHeat,
    description:
      'High temperatures can increase water loss, stress crops, and affect crop growth.',
    methods: [
      {
        name: 'Mulching',
        img: IMG.mulching,
        description: 'Covers soil with crop residue, straw, or other suitable organic material.',
        benefit: 'Reduces soil temperature and moisture loss.',
        howItHelps: 'Protects the soil surface during hot conditions.',
      },
      {
        name: 'Shade Management',
        img: IMG.shade,
        description: 'Uses suitable shade structures or plant-based shading where appropriate.',
        benefit: 'Reduces direct heat stress on sensitive crops.',
        howItHelps: 'Protects crops during periods of extreme heat.',
      },
      {
        name: 'Efficient Irrigation',
        img: IMG.efficientIrrig,
        description: 'Provides water efficiently according to crop and soil requirements.',
        benefit: 'Helps maintain adequate soil moisture.',
        howItHelps: 'Reduces water stress during hot weather.',
      },
      {
        name: 'Heat-Tolerant Crop Varieties',
        img: IMG.heatVarieties,
        description: 'Selects crop varieties that are better adapted to high temperatures.',
        benefit: 'Improves crop resilience under heat stress.',
        howItHelps: 'Reduces the impact of high temperatures on crop performance.',
      },
    ],
  },
  {
    id: 'excess-water',
    title: 'Excess Water',
    img: IMG.excessWater,
    description:
      'Excess water can reduce oxygen availability around roots, damage crops, and increase the risk of root diseases.',
    methods: [
      {
        name: 'Field Drainage',
        img: IMG.fieldDrainage,
        description: 'Provides channels or drainage pathways for excess water to leave the field.',
        benefit: 'Reduces waterlogging.',
        howItHelps: 'Removes standing water from the crop root zone.',
      },
      {
        name: 'Raised Beds',
        img: IMG.raisedBeds,
        description: 'Crops are grown on raised soil beds rather than completely flat land.',
        benefit: 'Improves drainage around plant roots.',
        howItHelps: 'Allows excess water to move away from the root zone.',
      },
      {
        name: 'Proper Irrigation Scheduling',
        img: IMG.irrigSched,
        description: 'Adjusts irrigation according to soil moisture and weather conditions.',
        benefit: 'Prevents unnecessary irrigation.',
        howItHelps: 'Reduces the chance of adding excess water to already moist soil.',
      },
      {
        name: 'Water-Tolerant Crop Selection',
        img: IMG.waterTolerant,
        description: 'Selects crops or varieties that can better tolerate temporarily wet conditions.',
        benefit: 'Reduces crop stress in areas prone to excess water.',
        howItHelps: 'Matches crop choice with local water conditions.',
      },
    ],
  },
  {
    id: 'chemical-use',
    title: 'Excessive Chemical Use',
    img: IMG.chemicalUse,
    description:
      'Repeated or unnecessary use of chemical fertilizers and pesticides can increase costs and may negatively affect soil health and the surrounding environment.',
    methods: [
      {
        name: 'Integrated Pest Management',
        img: IMG.ipm,
        description: 'Uses monitoring and non-chemical pest-control methods before chemical treatment.',
        benefit: 'Reduces unnecessary pesticide applications.',
        howItHelps: 'Chemicals are used only when they are actually needed.',
      },
      {
        name: 'Organic Fertilizers',
        img: IMG.organicFert,
        description: 'Uses compost, manure, and other suitable organic nutrient sources.',
        benefit: 'Adds organic matter while reducing dependence on synthetic fertilizers.',
        howItHelps: 'Supports long-term soil health.',
      },
      {
        name: 'Soil Testing',
        img: IMG.soilTesting,
        description: 'Checks soil nutrient status before deciding fertilizer requirements.',
        benefit: 'Helps avoid unnecessary fertilizer application.',
        howItHelps: 'Fertilizer decisions can be based on actual soil nutrient conditions.',
      },
      {
        name: 'Bio-Fertilizers',
        img: IMG.bioFert,
        description: 'Uses beneficial microorganisms that can support nutrient availability to plants.',
        benefit: 'Can reduce dependence on some synthetic nutrient inputs.',
        howItHelps: 'Supports biological nutrient cycling in the soil.',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
export default function SustainableMethods() {
  const [selectedProblem, setSelectedProblem] = useState(null);

  // ---- Problem selection screen ----
  if (!selectedProblem) {
    return (
      <div className="sm-root">
        <div className="sm-intro">
          <h2 className="sm-main-heading">Sustainable Methods</h2>
          <p className="sm-intro-text">
            Explore practical, sustainable solutions for the most common farming challenges.
            Select a problem below to discover methods that can help you manage it effectively.
          </p>
        </div>

        <h3 className="sm-question-heading">What problem are you facing?</h3>

        <div className="sm-problems-grid">
          {PROBLEMS.map((p) => (
            <button
              key={p.id}
              type="button"
              className="sm-problem-card"
              onClick={() => setSelectedProblem(p.id)}
            >
              <div className="sm-problem-img-wrap">
                <img src={p.img} alt={p.title} className="sm-problem-img" loading="lazy" />
              </div>
              <div className="sm-problem-label">
                <span>{p.title}</span>
                <span className="sm-problem-arrow">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---- Methods detail screen ----
  const problem = PROBLEMS.find((p) => p.id === selectedProblem);

  return (
    <div className="sm-root">
      <button
        type="button"
        className="sm-back-btn"
        onClick={() => setSelectedProblem(null)}
      >
        ← Back to Problems
      </button>

      <div className="sm-problem-detail-header">
        <h2 className="sm-detail-title">{problem.title}</h2>
        <p className="sm-detail-description">{problem.description}</p>
        <p className="sm-detail-subline">
          Sustainable methods that can help manage this problem.
        </p>
      </div>

      <div className="sm-methods-grid">
        {problem.methods.map((m, idx) => (
          <div key={idx} className="sm-method-card">
            <div className="sm-method-img-wrap">
              <img src={m.img} alt={m.name} className="sm-method-img" loading="lazy" />
            </div>
            <div className="sm-method-body">
              <h4 className="sm-method-name">{m.name}</h4>
              <p className="sm-method-desc">{m.description}</p>
              <div className="sm-method-detail">
                <span className="sm-detail-label">Benefit</span>
                <span className="sm-detail-value">{m.benefit}</span>
              </div>
              <div className="sm-method-detail">
                <span className="sm-detail-label">How it helps</span>
                <span className="sm-detail-value">{m.howItHelps}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="sm-back-btn sm-back-btn--bottom"
        onClick={() => setSelectedProblem(null)}
      >
        ← Back to Problems
      </button>
    </div>
  );
}
