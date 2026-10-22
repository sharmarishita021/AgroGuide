import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/marketplaceSeedData';
import { DISTRICTS_DATA } from '../data/localitiesData';

const MarketplaceContext = createContext(null);

export function MarketplaceProvider({ children }) {
  // Products list backed by localStorage
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_marketplace_products');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading products from localStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Buyer's selected locality for distance calculation (Default: Ludhiana, Punjab)
  const [buyerLocation, setBuyerLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_buyer_location');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading buyer location:', e);
    }
    return {
      stateId: 'PB',
      stateName: 'Punjab',
      districtId: 'pb-ludhiana',
      districtName: 'Ludhiana',
      lat: 30.9010,
      lon: 75.8573
    };
  });

  // Saved bookmarked schemes
  const [savedSchemes, setSavedSchemes] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_saved_schemes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('agri_marketplace_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to save products:', e);
    }
  }, [products]);

  // Save buyer location
  useEffect(() => {
    try {
      localStorage.setItem('agri_buyer_location', JSON.stringify(buyerLocation));
    } catch (e) {
      console.warn('Failed to save buyer location:', e);
    }
  }, [buyerLocation]);

  // Save bookmarked schemes
  useEffect(() => {
    try {
      localStorage.setItem('agri_saved_schemes', JSON.stringify(savedSchemes));
    } catch (e) {
      console.warn('Failed to save schemes:', e);
    }
  }, [savedSchemes]);

  // Cross-tab synchronization via storage event
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'agri_marketplace_products' && e.newValue) {
        try {
          setProducts(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Real-time add product (by authenticated seller)
  const addProduct = (productData) => {
    // Find district coordinates
    const matchedDistrict = DISTRICTS_DATA.find(
      (d) => d.id === productData.districtId || d.name.toLowerCase() === (productData.district || '').toLowerCase()
    );

    const lat = matchedDistrict ? matchedDistrict.lat : 30.9010;
    const lon = matchedDistrict ? matchedDistrict.lon : 75.8573;
    const districtName = matchedDistrict ? matchedDistrict.name : (productData.district || 'Ludhiana');
    const stateName = matchedDistrict ? matchedDistrict.stateName : (productData.state || 'Punjab');
    const stateId = matchedDistrict ? matchedDistrict.stateId : (productData.stateId || 'PB');

    const newProduct = {
      id: 'prod-' + Date.now(),
      title: productData.title,
      category: productData.category || 'Grains & Cereals',
      price: Number(productData.price),
      unit: productData.unit || 'Kg',
      quantityAvailable: Number(productData.quantityAvailable) || 10,
      farmerName: productData.farmerName || 'Verified Local Farmer',
      farmName: productData.farmName || 'Green Field Farmland',
      district: districtName,
      districtId: matchedDistrict ? matchedDistrict.id : 'custom',
      state: stateName,
      stateId,
      lat,
      lon,
      phone: productData.phone || '+91 98765 00000',
      organicCertified: Boolean(productData.organicCertified),
      harvestDate: productData.harvestDate || 'Fresh Harvest 2026',
      description: productData.description || 'Direct farm harvest produced with standard quality parameters.',
      rating: 5.0,
      reviewsCount: 1,
      reviews: [
        {
          id: 'rev-init-' + Date.now(),
          user: 'AgriQuality Assured',
          rating: 5,
          comment: 'New verified farm harvest listed directly by grower.',
          date: 'Just now'
        }
      ],
      createdAt: new Date().toISOString()
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  // Real-time rating update (reflected everywhere)
  const rateProduct = (productId, ratingVal, comment = '', reviewer = 'Verified Buyer') => {
    const numericRating = Math.max(1, Math.min(5, Number(ratingVal)));

    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id !== productId) return p;

        const currentReviews = p.reviews || [];
        const currentCount = p.reviewsCount || currentReviews.length || 0;
        const currentAvg = p.rating || 5;

        // Calculate weighted new average rating
        const updatedCount = currentCount + 1;
        const updatedAvg = Math.round(((currentAvg * currentCount + numericRating) / updatedCount) * 10) / 10;

        const newReviewObj = {
          id: 'rev-' + Date.now(),
          user: reviewer || 'Agri Buyer',
          rating: numericRating,
          comment: comment || 'Rated produce directly on AgroGuide.',
          date: 'Just now'
        };

        return {
          ...p,
          rating: updatedAvg,
          reviewsCount: updatedCount,
          reviews: [newReviewObj, ...currentReviews]
        };
      })
    );
  };

  // Toggle bookmark scheme
  const toggleSaveScheme = (schemeId) => {
    setSavedSchemes((prev) => {
      if (prev.includes(schemeId)) {
        return prev.filter((id) => id !== schemeId);
      } else {
        return [...prev, schemeId];
      }
    });
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        buyerLocation,
        setBuyerLocation,
        addProduct,
        rateProduct,
        savedSchemes,
        toggleSaveScheme
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
