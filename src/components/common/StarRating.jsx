import React, { useState } from 'react';

/**
 * Clean, Accessible Rating Score Component
 * Replaces star icons/emojis with high-contrast numerical meters and selectable score pills.
 */
export default function StarRating({
  rating = 0,
  totalStars = 5,
  interactive = false,
  onRate = null,
  size = 'md'
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const RATING_LEVELS = [
    { value: 1, label: '1 - Poor' },
    { value: 2, label: '2 - Fair' },
    { value: 3, label: '3 - Good' },
    { value: 4, label: '4 - Very Good' },
    { value: 5, label: '5 - Excellent' }
  ];

  const handleClick = (val) => {
    if (interactive && onRate) {
      onRate(val);
    }
  };

  const percentage = Math.min(100, Math.max(0, (rating / totalStars) * 100));

  if (interactive) {
    return (
      <div className={`rating-score-interactive size-${size}`} role="radiogroup" aria-label="Select rating score">
        <div className="rating-pill-options">
          {RATING_LEVELS.map((lvl) => {
            const isSelected = rating === lvl.value;
            const isHovered = hoverRating === lvl.value;
            return (
              <button
                key={lvl.value}
                type="button"
                className={`rating-pill-btn ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                onClick={() => handleClick(lvl.value)}
                onMouseEnter={() => setHoverRating(lvl.value)}
                onMouseLeave={() => setHoverRating(0)}
                aria-checked={isSelected}
                role="radio"
              >
                <span className="pill-val">{lvl.value}</span>
                <span className="pill-txt">{lvl.label.split(' - ')[1]}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`rating-score-badge size-${size}`} aria-label={`Rating: ${rating.toFixed(1)} out of ${totalStars}`}>
      <span className="rating-numeric-strong">{rating.toFixed(1)}</span>
      <span className="rating-total-denom">/ {totalStars}.0</span>
      <div className="rating-linear-meter" aria-hidden="true">
        <div className="meter-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
