const problems = {
    weather: [
        {
            id: 1,
            title: "Heavy Rainfall",
            description: "Excess rainfall can cause waterlogging and crop damage.",
            image:"https://imgs.search.brave.com/8yrJA4w5OX3ZneFadtcpjZFxiKUDnuqwFNhw9LrPrdg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzY0LzEyLzEw/LzM2MF9GXzE2NDEy/MTA5N19QM1NFM3Vh/em5Ma3VYVFFHUFFi/NXc0bUVYZ1ZVT0xH/ZC5qcGc",
            details:
                "Heavy rainfall can saturate agricultural soil, causing waterlogging, nutrient loss and stress to crop roots.",

            effects: [
                "Waterlogging",
                "Root stress",
                "Nutrient loss",
                "Increased risk of some crop diseases"
            ],

            solutions: [
                "Improve field drainage",
                "Avoid unnecessary irrigation after heavy rainfall",
                "Monitor the crop for signs of stress",
                "Use suitable soil and water management practices"
            ],

            crops: [
                "Rice in suitable regions",
                "Other locally suitable water-tolerant crops"
            ]
        },
        {
            id: 2,
            title: "Drought",
            description:
                "Low rainfall and insufficient water can cause severe crop stress.",

            image:"https://imgs.search.brave.com/DIhSD1jbYNEq1f-vbqOMKXEj5UdIz-OqO_pc6tC1irw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI4/ODgzNjIyMS9waG90/by9yaWNlLWZpZWxk/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1NSzNJNmwyUml0/clk2WnpGcXdSak5z/OGpub2pjVDhVcVdS/OWFQbDNDTENRPQ",
            details:
                "Drought occurs when water availability remains below the requirements of crops for a significant period. It can reduce plant growth, affect flowering and lower crop yield.",

            effects: [
                "Wilting",
                "Reduced plant growth",
                "Poor flowering or fruit development",
                "Lower yield",
                "Soil moisture loss"
            ],

            solutions: [
                "Improve irrigation efficiency",
                "Use mulching to reduce soil moisture loss",
                "Avoid unnecessary water use",
                "Maintain suitable soil organic matter",
                "Consider drought-tolerant crop varieties"
            ],

            crops: [
                "Millets in suitable regions",
                "Pulses in suitable regions",
                "Other locally suitable drought-tolerant crops"
            ]
        },
        {
            id: 3,
            title: "Extreme Heat",
            description:
                "Very high temperatures can affect crop growth and yield.",

            image:"https://imgs.search.brave.com/cT8NOQbp0QbqUUBZe-BZH9puNJ8kcW5ZOtFXFiBxuVY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/b3JnYW5pY2J1dGNo/ZXJ5LmNvLnVrL2Nk/bi9zaG9wL2FydGlj/bGVzL2plZC1vd2Vu/LWFqWmliREdwUGV3/LXVuc3BsYXNoXzEx/MDB4LmpwZz92PTE3/Nzk4ODc3MjI",
            details:
                "Extreme heat can increase water loss from plants and soil. High temperatures can interfere with important stages of crop development such as flowering, pollination and grain or fruit formation.",

            effects: [
                "Leaf wilting",
                "Increased water requirement",
                "Poor flowering",
                "Reduced crop growth",
                "Lower yield"
            ],

            solutions: [
                "Maintain adequate soil moisture",
                "Use mulching where appropriate",
                "Avoid unnecessary disturbance of the soil",
                "Use suitable heat-tolerant varieties",
                "Adjust irrigation according to crop and weather conditions"
            ],

            crops: [
                "Heat-tolerant varieties suitable for the region",
                "Millets in suitable regions",
                "Other locally suitable heat-tolerant crops"
            ]
        }
    ],

    soil: [
         {
            id: 4,
            title: "Acidic Soil",
            description:
                "Low soil pH can affect nutrient availability and crop growth.",

            image:"https://imgs.search.brave.com/nIebXEIQMqBJ2qOH_jwH72rQ2Tn3AIOkhnm7h9L8TV8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dHJlZWh1Z2dlci5j/b20vdGhtYi95aDFn/QjJmXzlCcnR5d1pF/cm1GVlJYdFVXVkk9/LzE1MDB4MC9maWx0/ZXJzOm5vX3Vwc2Nh/bGUoKTptYXhfYnl0/ZXMoMTUwMDAwKTpz/dHJpcF9pY2MoKS83/YnBlYXRtb3NzLWIw/MTM4YWM0OGY5MjQ2/YTE5YzAwNmQ3NjU5/OGI5Yzg3LmpwZWc",
            details:
                "Soil with a low pH is considered acidic. Strongly acidic soil can affect the availability of several nutrients and may increase the availability of some elements to levels that can harm plants.",

            effects: [
                "Poor nutrient availability",
                "Reduced root development",
                "Poor crop growth",
                "Possible nutrient toxicity at very low pH",
                "Reduced productivity of sensitive crops"
            ],

            solutions: [
                "Test the soil pH before applying amendments",
                "Use agricultural lime when recommended by a soil test",
                "Improve soil organic matter",
                "Select crops or varieties that tolerate the soil conditions",
                "Monitor soil pH regularly"
            ],

            crops: [
                "Potato can tolerate relatively acidic conditions",
                "Some suitable pulses and crops depending on the actual pH",
                "Crop selection should be based on local soil and climate conditions"
            ]
        },
        {
            id: 5,
            title: "Alkaline Soil",
            description:
                "High soil pH can reduce the availability of some nutrients.",

            image:"https://imgs.search.brave.com/El9kDoKbf0rxAKZDnM6U03R1ghiFw9A5tOQaIdZL3-M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vdnN1cmtvdi92/c3Vya292MTAwNS92/c3Vya292MTAwNTAw/MDQ4LzY5ODg0MTkt/bmV3LXBsYW50LWlu/LXRoZS1zb2lsLmpw/Zz92ZXI9Ng",
            details:
                "Alkaline soil has a relatively high pH. At high pH levels, nutrients such as iron, zinc and phosphorus may become less available to plants even when they are present in the soil.",

            effects: [
                "Iron deficiency symptoms",
                "Zinc deficiency",
                "Poor nutrient uptake",
                "Yellowing of leaves in some crops",
                "Reduced crop growth"
            ],

            solutions: [
                "Test soil pH before taking corrective action",
                "Improve soil organic matter",
                "Use nutrients based on soil-test recommendations",
                "Avoid excessive application of fertilizers",
                "Select crops that are suitable for the soil conditions"
            ],

            crops: [
                "Barley can tolerate relatively alkaline conditions",
                "Some suitable wheat varieties",
                "Other locally suitable alkaline-tolerant crops"
            ]
        },
         {
            id: 6,
            title: "Nutrient Deficiency",
            description:
                "Lack of essential nutrients can cause poor crop growth.",
            image:"https://imgs.search.brave.com/QawyKC_pb85F6kgMgQEQYinQstbfg9fohQQkCSMBX8U/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9lb3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIxLzA3L3NveWJl/YW4teWVsbG93aW5n/LmpwZw",
            details:
                "Plants require essential nutrients such as nitrogen, phosphorus, potassium and several micronutrients. A deficiency can occur because of low nutrient levels, poor availability or unsuitable soil conditions.",

            effects: [
                "Yellowing or abnormal leaf colour",
                "Slow plant growth",
                "Weak plants",
                "Poor flowering or fruit development",
                "Reduced yield"
            ],

            solutions: [
                "Use soil testing to identify nutrient status",
                "Apply the required nutrient according to soil-test recommendations",
                "Improve organic matter where appropriate",
                "Use balanced nutrient management",
                "Avoid applying nutrients without identifying the actual deficiency"
            ],

            crops: [
                "Crop selection should depend on the identified deficiency",
                "Legume-based rotation can be useful in suitable systems",
                "Select crops according to soil-test results and local conditions"
            ]
        },
        {
            id: 7,
            title: "Soil Salinity",
            description:
                "Excess salts in soil can make it difficult for plants to absorb water.",

            image:"https://imgs.search.brave.com/Dc8BpVoGC5OD_GqkSX5vOjaBAgUmsy2Ww5gjJeYMXpA/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9lb3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIxLzAyL211c3Rh/cmQtY3JvcC1vbi1y/b3dzLmpwZw",
            details:
                "Soil salinity occurs when soluble salts accumulate in the soil. High salt levels can make it harder for plant roots to take up water and can interfere with normal plant growth.",

            effects: [
                "Poor seed germination",
                "Stunted growth",
                "Leaf stress",
                "Poor crop development",
                "Salt deposits may appear on the soil surface"
            ],

            solutions: [
                "Test soil salinity or electrical conductivity",
                "Improve drainage where possible",
                "Manage irrigation carefully",
                "Avoid unnecessary fertilizer application",
                "Consider salt-tolerant crops or varieties where appropriate"
            ],

            crops: [
                "Barley can tolerate relatively saline conditions",
                "Some salt-tolerant crops depending on salinity level",
                "Crop choice should be based on soil testing"
            ]
        }
    ],

    crop: [
        {
            id: 8,
            title: "Continuous Cropping",
            description:
                "Growing the same crop repeatedly can increase nutrient depletion and pest pressure.",
            image:"https://imgs.search.brave.com/Gjv9nBuwfm3r5Gy46WR1Hhve6dCWgA3z57oU6ggl8cY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9h/L2FkL1Bsb2Rvem1p/YW4uanBn",
            details:
                "Growing the same crop repeatedly on the same land can place repeated demand on particular nutrients and may also increase the buildup of crop-specific pests and diseases.",

            effects: [
                "Nutrient depletion",
                "Increased pest pressure",
                "Increased disease risk",
                "Declining soil health",
                "Possible reduction in productivity"
            ],

            solutions: [
                "Use suitable crop rotation",
                "Include crops with different nutrient requirements",
                "Consider legumes where appropriate",
                "Return suitable crop residues to the soil",
                "Use soil testing to monitor nutrient levels"
            ],

            crops: [
                "Legumes such as chickpea or lentil in suitable rotations",
                "Other crops selected according to the local cropping system",
                "Cover crops where suitable"
            ]
        },
        {
            id: 9,
            title: "Loss of Soil Fertility",
            description:
                "Repeated cultivation without proper nutrient management can reduce soil fertility.",

            image:"https://imgs.search.brave.com/z7S1AjtZm21OQGTiqR75agTIvRf9Pd1aIYWrRzjV1ck/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9lb3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIxLzAzL3NvaWwt/ZmVydGlsaXR5LWxv/c3MuanBn",
            details:
                "Soil fertility can decline when crops continuously remove nutrients without adequate replacement. Organic matter can also decrease when soil is poorly managed over long periods.",

            effects: [
                "Poor plant growth",
                "Reduced nutrient availability",
                "Lower crop productivity",
                "Poor soil structure",
                "Reduced organic matter"
            ],

            solutions: [
                "Conduct regular soil testing",
                "Apply nutrients according to crop requirements and soil-test results",
                "Add suitable organic matter",
                "Use crop rotation",
                "Reduce unnecessary fertilizer application"
            ],

            crops: [
                "Legumes can be included in suitable crop rotations",
                "Cover crops can help protect and improve soil",
                "Choose rotational crops according to local conditions"
            ]
        },
        {
            id: 10,
            title: "Soil Erosion",
            description:
                "Water and wind can remove valuable topsoil from agricultural fields.",

            image:"https://imgs.search.brave.com/oYdFk5sSGp86myOEO3j0D4ScWAui8oyFa4BiLp93_dQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9zb2lsLWVy/b3Npb24tZXJvc2l2/ZS1ncm9vdmUtZmll/bGQtNjAwbnctMTY4/MDQxMjc1My5qcGc",
            details:
                "Soil erosion removes the nutrient-rich upper layer of soil. Heavy rainfall, strong winds, bare soil, excessive tillage and sloping land can increase erosion.",

            effects: [
                "Loss of topsoil",
                "Loss of nutrients",
                "Reduced soil depth",
                "Poor water retention",
                "Reduced long-term soil productivity"
            ],

            solutions: [
                "Maintain plant or crop cover",
                "Use mulching",
                "Consider contour farming on suitable slopes",
                "Use cover crops where appropriate",
                "Reduce unnecessary soil disturbance"
            ],

            crops: [
                "Cover crops suitable for the region",
                "Grass-based protective cover where appropriate",
                "Crops selected according to local soil and climate conditions"
            ]
        }
        
    ],

    pest: [
         {
            id: 11,
            title: "Pest Infestation",
            description:
                "Pests can damage crops and reduce their growth and yield.",
    
            image:"https://imgs.search.brave.com/6gkHPbE-Jv4686OfR_i-Kd6P0fuXV5pKEtnmWPI37_k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/MDY4MTIzMy9waG90/by9hZ3Jvbm9taXN0/LWV4YW1pbmluZy1k/YW1hZ2VkLWNvcm4t/bGVhZi1jb3JuLWxl/YXZlcy1hdHRhY2tl/ZC1ieS13b3Jtcy1p/bi1tYWl6ZS1maWVs/ZC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Qm5EZ1h1RHJh/b3hrZ25PSC1jSk13/NGJpcmhZYWdqVWQ2/Vm5YV0VWcDRvQT0",
            details:
                "Insect pests and other organisms can feed on crops or damage plant parts. Early identification is important because the correct management method depends on the pest and crop involved.",

            effects: [
                "Leaf damage",
                "Stem or root damage",
                "Reduced plant growth",
                "Damage to fruits or grains",
                "Reduced yield"
            ],

            solutions: [
                "Identify the pest before choosing a control method",
                "Monitor the field regularly",
                "Remove or manage affected plant material where appropriate",
                "Use integrated pest management practices",
                "Use pesticides only when appropriate and according to their label"
            ],

            crops: [
                "Crop choice should depend on the pest and local conditions",
                "Consider pest-resistant varieties where available",
                "Use suitable crop rotation practices"
            ]
        },
         {
            id: 12,
            title: "Excess Chemical Use",
            description:
                "Incorrect or excessive chemical application can harm crops, soil and beneficial organisms.",
            image:"https://imgs.search.brave.com/6AZnAL8xsJxhEgCLjCtfqgMCJK9LHMsmPTW3zIenSVM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzMv/OTE1LzU0My9zbWFs/bC90cmFjdG9yLXNw/cmF5aW5nLXBlc3Rp/Y2lkZS1vbi1hLWZp/ZWxkLWF0LXN1bnNl/dC1waG90by5qcGc",
            details:
                "Applying fertilizers or pesticides in excessive amounts can create environmental and agricultural problems. The correct response depends on the chemical, amount applied, soil conditions and crop.",

            effects: [
                "Crop injury",
                "Nutrient imbalance",
                "Possible soil contamination",
                "Harm to beneficial organisms",
                "Increased risk of pesticide resistance from repeated misuse"
            ],

            solutions: [
                "Stop unnecessary applications",
                "Identify the chemical and amount that was applied",
                "Use soil testing for suspected nutrient excess",
                "Follow product labels and recommended application rates",
                "Seek local agricultural advice for serious chemical injury"
            ],

            crops: [
                "Do not select a crop solely to correct chemical excess",
                "First identify the chemical and assess the soil condition",
                "Choose the next crop after checking soil and crop requirements"
            ]
        },
        {
            id: 13,
            title: "Repeated Pesticide Use",
            description:
                "Repeated use of the same pesticide can contribute to pest resistance.",
            image:"https://imgs.search.brave.com/WdcdwIXmpWDUxUyjavqIX8BYXHzQGIyVRrbloBK7qZY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjAv/MzQ2Lzk4Ny9zbWFs/bC9mYXJtZXJzLWFy/ZS1zcHJheWluZy1w/ZXN0aWNpZGVzLWlu/LXRoZS1zd2VldC1w/b3RhdG8tcGxhbnRh/dGlvbnMtc28tdGhh/dC1wZXN0cy1kby1u/b3QtaW50ZXJmZXJl/LWFuZC1kYW1hZ2Ut/YWdyaWN1bHR1cmFs/LXByb2R1Y3RzLXBo/b3RvLmpwZw",
            details:
                "When the same pesticide or mode of action is repeatedly used, some pests may survive and reproduce. Over time, this can make the pesticide less effective.",

            effects: [
                "Reduced pesticide effectiveness",
                "Pest resistance",
                "Higher pest management costs",
                "Possible harm to beneficial organisms"
            ],

            solutions: [
                "Correctly identify the pest",
                "Use integrated pest management",
                "Rotate pesticide modes of action according to expert and label guidance",
                "Avoid unnecessary pesticide applications",
                "Monitor pest populations"
            ],

            crops: [
                "Use crop rotation where suitable",
                "Consider pest-resistant varieties where available",
                "Choose crops based on local pest pressure"
            ]
        }
    ]
};

export default problems;