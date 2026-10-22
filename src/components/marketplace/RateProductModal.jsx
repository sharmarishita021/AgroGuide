import React, { useState } from 'react';
import Modal from '../common/Modal';
import StarRating from '../common/StarRating';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useToast } from '../../context/ToastContext';
import { getProductImage } from '../../data/imagesData';

export default function RateProductModal({ isOpen, onClose, product }) {
  const { rateProduct } = useMarketplace();
  const { showToast } = useToast();

  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  if (!product) return null;

  const productImg = getProductImage(product);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      setErrors((prev) => ({ ...prev, rating: 'Please select a rating score between 1 and 5' }));
      return;
    }

    if (!comment.trim()) {
      setErrors((prev) => ({ ...prev, comment: 'Please enter brief feedback regarding produce quality.' }));
      showToast('Please provide feedback comments for your rating.', 'warning');
      return;
    } else if (comment.trim().length < 8) {
      setErrors((prev) => ({ ...prev, comment: 'Feedback must be at least 8 characters long.' }));
      return;
    }

    const reviewer = userName.trim() || 'Verified Agri-Buyer';
    rateProduct(product.id, rating, comment.trim(), reviewer);

    showToast(`Rating of ${rating} / 5 submitted! Updated in real time across the marketplace.`, 'success');

    // Reset and close
    setRating(5);
    setUserName('');
    setComment('');
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rate &amp; Review Agricultural Produce" maxWidth="560px">
      <form onSubmit={handleSubmit} className="rate-product-form" noValidate>
        <div className="rate-product-preview">
          <img
            src={productImg}
            alt={product.title}
            className="rate-preview-thumb"
          />
          <div className="rate-preview-text">
            <span className="preview-cat">{product.category}</span>
            <h4 className="preview-title">{product.title}</h4>
            <p className="preview-farmer">
              Sold by <strong>{product.farmerName}</strong> ({product.district}, {product.state})
            </p>
            <div className="current-rating-info">
              Current Average Score: <strong>{product.rating.toFixed(1)} / 5.0</strong> ({product.reviewsCount || 0} reviews)
            </div>
          </div>
        </div>

        <div className="rate-selector-wrap">
          <label className="rate-label">Select Your Score Tier (1 to 5): *</label>
          <div className="interactive-score-box">
            <StarRating
              rating={rating}
              interactive={true}
              onRate={(val) => {
                setRating(val);
                setErrors((prev) => ({ ...prev, rating: '' }));
              }}
              size="lg"
            />
          </div>
          {errors.rating && <span className="field-error-message">{errors.rating}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reviewer-name-input">Your Name or Business Name (Optional):</label>
          <input
            id="reviewer-name-input"
            type="text"
            className="form-control"
            placeholder="e.g. Ramesh Kumar or Green Mandi Traders"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reviewer-feedback-input">Produce Quality Assessment &amp; Feedback: *</label>
          <textarea
            id="reviewer-feedback-input"
            rows="3"
            className={`form-control ${errors.comment ? 'input-error' : ''}`}
            placeholder="Share your experience regarding moisture, purity, grain size, packaging, or direct farmer cooperation..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (errors.comment) setErrors((prev) => ({ ...prev, comment: '' }));
            }}
            required
          />
          {errors.comment && <span className="field-error-message">{errors.comment}</span>}
        </div>

        {/* Existing Reviews List */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="existing-reviews-box">
            <span className="existing-title">Recent Buyer Reviews:</span>
            <div className="reviews-mini-list">
              {product.reviews.slice(0, 3).map((r, i) => (
                <div key={i} className="mini-review-item">
                  <div className="mini-review-header">
                    <strong>{r.user}</strong>
                    <span className="review-date-score">Score: {r.rating} / 5 • {r.date}</span>
                  </div>
                  <p className="mini-review-comment">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions-row">
          <button type="submit" className="btn-primary">
            Submit Rating (Reflects Instantly)
          </button>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
