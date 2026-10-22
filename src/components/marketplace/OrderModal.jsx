import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { getProductImage } from '../../data/imagesData';

export default function OrderModal({ isOpen, onClose, product }) {
  const { showToast } = useToast();
  const { recordOrder } = useAuth();
  const [orderQty, setOrderQty] = useState(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentPreference, setPaymentPreference] = useState('Cash on Mandi Delivery / Inspection');
  const [isOrdered, setIsOrdered] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!product) return null;

  const productImg = getProductImage(product);
  const totalPrice = Math.round(orderQty * product.price);

  const validate = () => {
    const errs = {};
    if (!buyerName.trim()) {
      errs.buyerName = 'Buyer name is required.';
    } else if (buyerName.trim().length < 3) {
      errs.buyerName = 'Name must be at least 3 characters.';
    }

    if (!buyerPhone.trim()) {
      errs.buyerPhone = 'Mobile number is required.';
    } else {
      const cleanPhone = buyerPhone.replace(/\s+|-/g, '').replace(/^\+91/, '');
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        errs.buyerPhone = 'Enter a valid 10-digit Indian mobile number.';
      }
    }

    if (!deliveryAddress.trim()) {
      errs.deliveryAddress = 'Delivery address or Mandi depot pickup location is required.';
    } else if (deliveryAddress.trim().length < 8) {
      errs.deliveryAddress = 'Address must be at least 8 characters long.';
    }

    if (orderQty < 1 || orderQty > product.quantityAvailable) {
      errs.orderQty = `Quantity must be between 1 and available stock (${product.quantityAvailable}).`;
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ buyerName: true, buyerPhone: true, deliveryAddress: true, orderQty: true });
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast('Please fix the highlighted errors before confirming.', 'warning');
      return;
    }

    recordOrder({
      productId: product.id,
      productTitle: product.title,
      buyerName: buyerName.trim(),
      buyerPhone: buyerPhone.trim(),
      farmerName: product.farmerName,
      quantity: orderQty,
      unit: product.unit,
      price: product.price,
      totalAmount: totalPrice,
      deliveryAddress: deliveryAddress.trim(),
      paymentPreference
    });

    setIsOrdered(true);
    showToast(`Order confirmed for ${orderQty} ${product.unit} of ${product.title}! Direct farmer dispatch initiated.`, 'success');
  };

  const handleResetAndClose = () => {
    setIsOrdered(false);
    setBuyerName('');
    setBuyerPhone('');
    setDeliveryAddress('');
    setOrderQty(1);
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isOrdered ? 'Direct Farmer Order Confirmed' : 'Purchase Directly from Farmer'}
      maxWidth="620px"
    >
      {!isOrdered ? (
        <form onSubmit={handleSubmit} className="order-form" noValidate>
          {/* Product Thumbnail & Summary */}
          <div className="order-product-summary">
            <img
              src={productImg}
              alt={product.title}
              className="order-summary-thumb"
            />
            <div className="order-summary-meta">
              <span className="summary-cat">{product.category}</span>
              <h4 className="summary-title">{product.title}</h4>
              <div className="summary-price-line">
                <span className="unit-price">
                  Rate: <strong>₹{product.price.toLocaleString()}</strong> / {product.unit}
                </span>
                <span className="farmer-line">
                  Grower: <strong>{product.farmerName}</strong> ({product.district}, {product.state})
                </span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="order-qty-input">Order Quantity ({product.unit}s): *</label>
            <div className="qty-counter-row">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setOrderQty((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                id="order-qty-input"
                type="number"
                min="1"
                max={product.quantityAvailable}
                className="form-control qty-input"
                value={orderQty}
                onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button
                type="button"
                className="qty-btn"
                onClick={() => setOrderQty((prev) => Math.min(product.quantityAvailable, prev + 1))}
              >
                +
              </button>
              <span className="qty-max-hint">Available in stock: {product.quantityAvailable} {product.unit}s</span>
            </div>
            {errors.orderQty && <span className="field-error-message">{errors.orderQty}</span>}
          </div>

          <div className="order-total-banner">
            <span>Estimated Direct Total:</span>
            <strong className="total-amount">₹{totalPrice.toLocaleString()} INR</strong>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="buyer-name-input">Your Full Name: *</label>
              <input
                id="buyer-name-input"
                type="text"
                className={`form-control ${touched.buyerName && errors.buyerName ? 'input-error' : ''}`}
                placeholder="e.g. Ramesh Kumar"
                value={buyerName}
                onChange={(e) => {
                  setBuyerName(e.target.value);
                  if (errors.buyerName) setErrors((prev) => ({ ...prev, buyerName: '' }));
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, buyerName: true }))}
                required
              />
              {touched.buyerName && errors.buyerName && (
                <span className="field-error-message">{errors.buyerName}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="buyer-phone-input">Your 10-Digit Mobile: *</label>
              <input
                id="buyer-phone-input"
                type="tel"
                className={`form-control ${touched.buyerPhone && errors.buyerPhone ? 'input-error' : ''}`}
                placeholder="e.g. 9876543210"
                value={buyerPhone}
                onChange={(e) => {
                  setBuyerPhone(e.target.value);
                  if (errors.buyerPhone) setErrors((prev) => ({ ...prev, buyerPhone: '' }));
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, buyerPhone: true }))}
                required
              />
              {touched.buyerPhone && errors.buyerPhone && (
                <span className="field-error-message">{errors.buyerPhone}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="delivery-address-input">Delivery Address or Mandi Depot Hub: *</label>
            <textarea
              id="delivery-address-input"
              rows="2"
              className={`form-control ${touched.deliveryAddress && errors.deliveryAddress ? 'input-error' : ''}`}
              placeholder="Provide delivery location, grain mandi gate, or transport depot preference..."
              value={deliveryAddress}
              onChange={(e) => {
                setDeliveryAddress(e.target.value);
                if (errors.deliveryAddress) setErrors((prev) => ({ ...prev, deliveryAddress: '' }));
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, deliveryAddress: true }))}
              required
            />
            {touched.deliveryAddress && errors.deliveryAddress && (
              <span className="field-error-message">{errors.deliveryAddress}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="payment-pref-select">Payment Settlement Mode:</label>
            <select
              id="payment-pref-select"
              className="form-control"
              value={paymentPreference}
              onChange={(e) => setPaymentPreference(e.target.value)}
            >
              <option value="Cash on Mandi Delivery / Inspection">Cash on Mandi Delivery / Post-Inspection</option>
              <option value="Direct UPI to Farmer Account">Direct UPI to Farmer Bank Account</option>
              <option value="Bank NEFT / RTGS Transfer">Bank NEFT / RTGS Transfer</option>
            </select>
          </div>

          <div className="farmer-direct-box">
            <span>Direct Grower Contact: </span>
            <strong>{product.phone}</strong>
          </div>

          <div className="form-actions-row">
            <button type="submit" className="btn-primary">
              Confirm Direct Purchase (₹{totalPrice.toLocaleString()})
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="order-success-view">
          <div className="success-tag-badge">ORDER LOGGED SUCCESSFULLY</div>
          <h3>Order Dispatched to Farmer</h3>
          <p className="success-desc">
            Your purchase request for <strong>{orderQty} {product.unit}(s)</strong> of <strong>{product.title}</strong> has been forwarded directly to <strong>{product.farmerName}</strong>.
          </p>
          <div className="success-details-card">
            <div className="detail-row">
              <span>Invoice Subtotal:</span>
              <strong>₹{totalPrice.toLocaleString()} INR</strong>
            </div>
            <div className="detail-row">
              <span>Farmer Phone:</span>
              <strong>{product.phone}</strong>
            </div>
            <div className="detail-row">
              <span>Pickup/Dispatch Origin:</span>
              <strong>{product.district}, {product.state}</strong>
            </div>
            <div className="detail-row">
              <span>Payment Mode:</span>
              <strong>{paymentPreference}</strong>
            </div>
          </div>
          <p className="note-text">
            No middleman commission was charged. 100% of the proceeds reach the farmer directly.
          </p>
          <button type="button" className="btn-primary" onClick={handleResetAndClose}>
            Back to Marketplace
          </button>
        </div>
      )}
    </Modal>
  );
}
