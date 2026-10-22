import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PRODUCT_CATEGORIES } from '../../data/marketplaceSeedData';
import { INDIAN_STATES, DISTRICTS_DATA } from '../../data/localitiesData';
import { getCropImage } from '../../data/imagesData';

export default function AddProductModal({ isOpen, onClose }) {
  const { addProduct } = useMarketplace();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[1]); // Grains & Cereals
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('Quintal');
  const [quantity, setQuantity] = useState('25');
  const [selectedStateId, setSelectedStateId] = useState(
    currentUser?.state === 'Maharashtra' ? 'MH' : 'PB'
  );
  const [selectedDistrict, setSelectedDistrict] = useState(currentUser?.district || 'Ludhiana');
  const [phone, setPhone] = useState(currentUser?.emailOrPhone || '9876543210');
  const [organic, setOrganic] = useState(true);
  const [harvestDate, setHarvestDate] = useState('Fresh Harvest (This Week)');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const availableDistricts = DISTRICTS_DATA.filter((d) => d.stateId === selectedStateId);

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Product title is required.';
    } else if (title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters.';
    }

    const priceNum = parseFloat(price);
    if (!price || isNaN(priceNum) || priceNum <= 0) {
      errs.price = 'Enter a valid price greater than 0.';
    }

    const qtyNum = parseInt(quantity, 10);
    if (!quantity || isNaN(qtyNum) || qtyNum <= 0) {
      errs.quantity = 'Enter a valid stock quantity.';
    }

    const cleanPhone = phone.replace(/\s+|-/g, '').replace(/^\+91/, '');
    if (!cleanPhone || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = 'Valid 10-digit mobile number is required.';
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, price: true, quantity: true, phone: true });
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      showToast('Please fix the form errors before uploading.', 'warning');
      return;
    }

    const matchedState = INDIAN_STATES.find((s) => s.id === selectedStateId);
    const assignedImage = getCropImage(title);

    const newProd = addProduct({
      title: title.trim(),
      category,
      price: Number(price),
      unit,
      quantityAvailable: Number(quantity),
      farmerName: currentUser?.name || 'Verified Kisan Grower',
      farmName: currentUser?.farmName || 'Green Valley Agro Farm',
      stateId: selectedStateId,
      state: matchedState?.name || 'Punjab',
      district: selectedDistrict,
      phone: phone.trim(),
      organicCertified: organic,
      harvestDate: harvestDate.trim() || 'Fresh Harvest',
      description: description.trim() || 'Direct farm harvest freshly prepared for buyers.',
      imageUrl: assignedImage
    });

    showToast(`Produce "${newProd.title}" is live! Buyers see it in real-time.`, 'success');

    // Reset fields
    setTitle('');
    setPrice('');
    setDescription('');
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Real-Time Farm Produce" maxWidth="680px">
      <form onSubmit={handleSubmit} className="add-product-form" noValidate>
        <div className="form-info-note">
          <strong>Real-Time Synchronization:</strong> Once submitted, your crop listing is broadcast instantly to buyers sorted by geographic proximity.
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="prod-title-input">Crop / Product Title: *</label>
          <input
            id="prod-title-input"
            type="text"
            className={`form-control ${touched.title && errors.title ? 'input-error' : ''}`}
            placeholder="e.g. Certified Organic Basmati Rice (Pusa 1121) or Sharbati Wheat"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
            required
          />
          {touched.title && errors.title && (
            <span className="field-error-message">{errors.title}</span>
          )}
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="prod-category-select">Category: *</label>
            <select
              id="prod-category-select"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {PRODUCT_CATEGORIES.filter((c) => c !== 'All Products').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prod-harvest-input">Harvest Freshness Period:</label>
            <input
              id="prod-harvest-input"
              type="text"
              className="form-control"
              placeholder="e.g. March 2026 or Fresh Today"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row-3">
          <div className="form-group">
            <label className="form-label" htmlFor="prod-price-input">Price (₹ INR): *</label>
            <input
              id="prod-price-input"
              type="number"
              min="1"
              step="any"
              className={`form-control ${touched.price && errors.price ? 'input-error' : ''}`}
              placeholder="e.g. 2400"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price) setErrors((prev) => ({ ...prev, price: '' }));
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, price: true }))}
              required
            />
            {touched.price && errors.price && (
              <span className="field-error-message">{errors.price}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prod-unit-select">Unit of Measure: *</label>
            <select
              id="prod-unit-select"
              className="form-control"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="Quintal">Quintal</option>
              <option value="Kg">Kg</option>
              <option value="50kg Bag">50kg Bag</option>
              <option value="Liter">Liter</option>
              <option value="Piece">Piece / Unit</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prod-quantity-input">Stock Quantity: *</label>
            <input
              id="prod-quantity-input"
              type="number"
              min="1"
              className={`form-control ${touched.quantity && errors.quantity ? 'input-error' : ''}`}
              placeholder="e.g. 50"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                if (errors.quantity) setErrors((prev) => ({ ...prev, quantity: '' }));
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, quantity: true }))}
              required
            />
            {touched.quantity && errors.quantity && (
              <span className="field-error-message">{errors.quantity}</span>
            )}
          </div>
        </div>

        {/* Location of Farmland */}
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="prod-state-select">Farm State: *</label>
            <select
              id="prod-state-select"
              className="form-control"
              value={selectedStateId}
              onChange={(e) => {
                setSelectedStateId(e.target.value);
                const d = DISTRICTS_DATA.find((item) => item.stateId === e.target.value);
                if (d) setSelectedDistrict(d.name);
              }}
            >
              {INDIAN_STATES.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prod-district-select">Farm District: *</label>
            <select
              id="prod-district-select"
              className="form-control"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              {availableDistricts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="prod-phone-input">Farmer Contact Phone: *</label>
            <input
              id="prod-phone-input"
              type="text"
              className={`form-control ${touched.phone && errors.phone ? 'input-error' : ''}`}
              placeholder="9876543210"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
              required
            />
            {touched.phone && errors.phone && (
              <span className="field-error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group checkbox-field-group">
            <label className="checkbox-styled-label">
              <input
                type="checkbox"
                checked={organic}
                onChange={(e) => setOrganic(e.target.checked)}
              />
              <span>Chemical-Free / 100% Certified Organic</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="prod-desc-textarea">Quality Description &amp; Details:</label>
          <textarea
            id="prod-desc-textarea"
            rows="3"
            className="form-control"
            placeholder="Mention grain moisture, variety (e.g. PBW 824), seed purity, or packing size..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-actions-row">
          <button type="submit" className="btn-primary">
            Publish Produce (Live to All Buyers)
          </button>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
