// AgroGuide Marketplace - Sample product data
// Prices and stock are demo values for your college project.

export const marketplaceProducts = [
  {
    id: 1,
    name: "Premium Wheat Seeds",
    category: "Seeds",
    price: 1200,
    unit: "40 kg bag",
    description: "Quality wheat seeds suitable for the Rabi season.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    stock: 25,
    seller: "Punjab Seed Store",
    rating: 4.7,
    badge: "Popular"
  },
  {
    id: 2,
    name: "Basmati Paddy Seeds",
    category: "Seeds",
    price: 950,
    unit: "10 kg bag",
    description: "Basmati paddy seeds for farmers growing aromatic rice.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    stock: 18,
    seller: "Green Field Supplies",
    rating: 4.5,
    badge: "Seasonal"
  },
  {
    id: 3,
    name: "Hybrid Maize Seeds",
    category: "Seeds",
    price: 780,
    unit: "5 kg bag",
    description: "Hybrid maize seeds for a productive growing season.",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    stock: 30,
    seller: "Kisan Agro Centre",
    rating: 4.6,
    badge: ""
  },
  {
    id: 4,
    name: "Fresh Potatoes",
    category: "Crops",
    price: 22,
    unit: "per kg",
    description: "Freshly harvested potatoes offered in bulk or small quantities.",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    stock: 500,
    seller: "Local Farm Produce",
    rating: 4.4,
    badge: "Fresh"
  },
  {
    id: 5,
    name: "Mustard Seeds",
    category: "Crops",
    price: 68,
    unit: "per kg",
    description: "Mustard seeds suitable for food processing and oil extraction.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    stock: 200,
    seller: "Harvest Traders",
    rating: 4.3,
    badge: ""
  },
  {
    id: 6,
    name: "Yellow Maize",
    category: "Crops",
    price: 24,
    unit: "per kg",
    description: "Clean yellow maize available for bulk purchase.",
    image: "https://images.unsplash.com/photo-1601593768793-6d9b5b6a7a1b?auto=format&fit=crop&w=800&q=80",
    stock: 350,
    seller: "Kisan Agro Centre",
    rating: 4.2,
    badge: ""
  },
  {
    id: 7,
    name: "Organic Compost",
    category: "Fertilizers",
    price: 350,
    unit: "25 kg bag",
    description: "Organic compost to improve soil structure and add nutrients.",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
    stock: 40,
    seller: "EarthCare Organics",
    rating: 4.8,
    badge: "Organic"
  },
  {
    id: 8,
    name: "Neem Cake Fertilizer",
    category: "Fertilizers",
    price: 480,
    unit: "20 kg bag",
    description: "Neem-based soil amendment for use as part of a balanced crop plan.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
    stock: 22,
    seller: "EarthCare Organics",
    rating: 4.5,
    badge: ""
  },
  {
    id: 9,
    name: "Handheld Garden Sprayer",
    category: "Tools",
    price: 650,
    unit: "1 piece",
    description: "Handheld sprayer for applying suitable agricultural solutions.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
    stock: 15,
    seller: "Farm Tools Hub",
    rating: 4.1,
    badge: ""
  },
  {
    id: 10,
    name: "Steel Garden Hoe",
    category: "Tools",
    price: 420,
    unit: "1 piece",
    description: "A sturdy hand tool for loosening soil and removing weeds.",
    image: "https://images.unsplash.com/photo-1599685315640-4ec4c6b8f9d0?auto=format&fit=crop&w=800&q=80",
    stock: 12,
    seller: "Farm Tools Hub",
    rating: 4.3,
    badge: ""
  },
  {
    id: 11,
    name: "Chilli Seeds",
    category: "Seeds",
    price: 180,
    unit: "100 g pack",
    description: "Chilli seeds for home gardens and small-scale cultivation.",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80",
    stock: 45,
    seller: "Punjab Seed Store",
    rating: 4.6,
    badge: "Popular"
  },
  {
    id: 12,
    name: "Fresh Onions",
    category: "Crops",
    price: 28,
    unit: "per kg",
    description: "Fresh onions from the farm, suitable for household or bulk orders.",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    stock: 400,
    seller: "Local Farm Produce",
    rating: 4.4,
    badge: "Fresh"
  }
];

// Categories for marketplace filters
export const marketplaceCategories = [
  "All",
  "Crops",
  "Seeds",
  "Fertilizers",
  "Tools"
];

// Example helper: get products belonging to a category
export function getProductsByCategory(category) {
  if (category === "All") {
    return marketplaceProducts;
  }

  return marketplaceProducts.filter(
    (product) => product.category === category
  );
}

// Example helper: search by product name or description
export function searchMarketplaceProducts(searchText) {
  const search = searchText.toLowerCase().trim();

  return marketplaceProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
  );
}
export default marketplaceProducts;