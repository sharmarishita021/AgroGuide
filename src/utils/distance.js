/**
 * Distance Calculation Utility
 * Uses the Haversine formula to compute great-circle distance between two coordinates in kilometers.
 * Part of ES6+ math and helper functions.
 */

export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
    return 999; // Default fallback if coordinates unavailable
  }

  // Radius of the Earth in kilometers
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Return rounded to 1 decimal place
  return Math.round(distance * 10) / 10;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Helper to get a human-friendly proximity label
 */
export function getProximityLabel(distanceKm) {
  if (distanceKm <= 5) return 'Within your town (< 5 km)';
  if (distanceKm <= 25) return 'Nearby District (< 25 km)';
  if (distanceKm <= 100) return 'Within Region (< 100 km)';
  if (distanceKm <= 350) return 'Same State / Zone';
  return 'Interstate Delivery';
}
