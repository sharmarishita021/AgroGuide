/**
 * Scheme Relevance Ranking Engine
 * Calculates a match score (0 - 100%) for each government scheme based on
 * the user's location, category selection, land size, and search keywords.
 * Sorts results dynamically from most relevant to least relevant.
 */

export function calculateSchemeRelevance(scheme, filters) {
  const { searchTerm = '', stateId = '', category = 'All Categories', landSize = 'all' } = filters;
  
  let score = 50; // baseline score for all registered active schemes

  // 1. Keyword search match (up to +30 points)
  if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase().trim();
    const nameMatch = scheme.name.toLowerCase().includes(term);
    const shortMatch = scheme.shortName.toLowerCase().includes(term);
    const summaryMatch = scheme.summary.toLowerCase().includes(term);
    const tagMatch = scheme.tags && scheme.tags.some(tag => tag.toLowerCase().includes(term));

    if (nameMatch || shortMatch) {
      score += 25;
    } else if (tagMatch) {
      score += 18;
    } else if (summaryMatch) {
      score += 12;
    } else {
      // If user typed a search term and scheme does not match at all, penalize
      score -= 30;
    }
  }

  // 2. State / Locality relevance (up to +25 points)
  if (stateId) {
    if (scheme.applicableStates.includes(stateId)) {
      // Explicit state specific or state-supported scheme
      score += (scheme.applicableStates.length <= 2) ? 25 : 18;
    } else if (scheme.applicableStates.includes('ALL')) {
      // Pan-India Central Government scheme
      score += 15;
    } else {
      // Scheme not applicable to this state
      score -= 40;
    }
  } else {
    // No state selected, slight boost to national schemes
    if (scheme.applicableStates.includes('ALL')) {
      score += 10;
    }
  }

  // 3. Category match (up to +25 points)
  if (category && category !== 'All Categories') {
    if (scheme.category === category) {
      score += 25;
    } else {
      score -= 35;
    }
  }

  // 4. Land holding size match (up to +20 points)
  if (landSize && landSize !== 'all') {
    if (scheme.eligibleLandSizes.includes(landSize)) {
      score += 15;
    } else {
      score -= 20;
    }
  }

  // Bound score between 0 and 100
  const finalScore = Math.max(0, Math.min(100, Math.round(score)));

  // Determine user-friendly match tier
  let badgeText = 'General Scheme';
  let badgeColor = 'neutral';

  if (finalScore >= 85) {
    badgeText = 'Top 95%+ Match';
    badgeColor = 'success';
  } else if (finalScore >= 70) {
    badgeText = 'High Match';
    badgeColor = 'accent';
  } else if (finalScore >= 50) {
    badgeText = 'Relevant';
    badgeColor = 'info';
  } else {
    badgeText = 'Low Match';
    badgeColor = 'muted';
  }

  return {
    ...scheme,
    relevanceScore: finalScore,
    badgeText,
    badgeColor
  };
}

/**
 * Filter and sort schemes from most relevant to least relevant
 */
export function rankSchemes(schemes, filters) {
  const scored = schemes.map(scheme => calculateSchemeRelevance(scheme, filters));

  // Sort descending by relevanceScore
  scored.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return scored;
}
