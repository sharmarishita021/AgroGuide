import React, { useState } from "react";
import initialProducts from "./marketplaceData";
import "./Marketplace.css";

// Fallback image if a product image link is broken
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80";

function Marketplace() {
  const DEMO_SELLER_EMAIL = "demo.seller@agroguide.com";
  const DEMO_SELLER_PASSWORD = "AgroGuide@123";

  // Regex validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  // Load products from localStorage or use initial dataset
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("agroguideProducts");
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Navigation & Filtering
  const [page, setPage] = useState("buyer"); // 'buyer' or 'seller'
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Seller auth states
  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [sellerFullName, setSellerFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sellerName, setSellerName] = useState("");

  // Product form states
  const [name, setName] = useState("");
  const [newCategory, setNewCategory] = useState("Crops");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("per kg");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  // Modal / Popup state
  const [showMessage, setShowMessage] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");

  // Cart
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    "All",
    "Crops",
    "Seeds",
    "Fertilizers",
    "Farm Equipment"
  ];

  // Show dialog popup
  const showPopup = (title, text) => {
    setMessageTitle(title);
    setMessageText(text);
    setShowMessage(true);
  };

  const getSavedSellers = () => {
    try {
      return JSON.parse(localStorage.getItem("agroguideSellers") || "[]");
    } catch {
      return [];
    }
  };

  const openSellerPage = () => {
    if (sellerName) {
      setPage("seller");
    } else {
      setAuthMode("login");
      setShowLogin(true);
    }
  };

  // Handle seller registration
  const handleSignup = (e) => {
    e.preventDefault();

    if (!sellerFullName.trim() || !email.trim() || !password) {
      showPopup("Missing details", "Please fill in your name, email and password.");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      showPopup("Invalid email", "Enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      showPopup("Weak password", "Password must have 8+ chars with uppercase, lowercase, number and symbol.");
      return;
    }

    const savedSellers = getSavedSellers();
    if (savedSellers.some((s) => s.email.toLowerCase() === email.trim().toLowerCase())) {
      showPopup("Account already exists", "This email is already registered. Please sign in.");
      setAuthMode("login");
      return;
    }

    const newSeller = {
      id: Date.now(),
      name: sellerFullName.trim(),
      email: email.trim().toLowerCase(),
      password
    };

    savedSellers.push(newSeller);
    localStorage.setItem("agroguideSellers", JSON.stringify(savedSellers));

    setSellerFullName("");
    setPassword("");
    setAuthMode("login");
    showPopup("Account created!", "Your account has been created. Please sign in.");
  };

  // Handle seller login
  const handleLogin = (e) => {
    e.preventDefault();

    // Check fixed demo account
    if (email.trim().toLowerCase() === DEMO_SELLER_EMAIL && password === DEMO_SELLER_PASSWORD) {
      setSellerName("Demo Seller");
      setShowLogin(false);
      setPage("seller");
      setEmail("");
      setPassword("");
      showPopup("Login successful!", "Welcome to your Demo Seller dashboard.");
      return;
    }

    const savedSellers = getSavedSellers();
    const found = savedSellers.find(
      (s) => s.email.toLowerCase() === email.trim().toLowerCase() && s.password === password
    );

    if (!found) {
      showPopup("Login failed", "Incorrect email or password. Please try again.");
      return;
    }

    setSellerName(found.name);
    setShowLogin(false);
    setPage("seller");
    setEmail("");
    setPassword("");
    showPopup("Login successful!", `Welcome back, ${found.name}!`);
  };

  // Add a new product (no location required)
  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showPopup("Missing name", "Please enter a product name.");
      return;
    }

    if (!price || Number(price) <= 0) {
      showPopup("Invalid price", "Please enter a valid price.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      category: newCategory,
      price: Number(price),
      unit,
      description,
      image: image.trim(),
      stock: Number(stock) || 0,
      seller: sellerName || "Demo Seller"
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem("agroguideProducts", JSON.stringify(updated));

    // Reset fields
    setName("");
    setNewCategory("Crops");
    setPrice("");
    setUnit("per kg");
    setDescription("");
    setImage("");
    setStock("");

    showPopup("Product published!", "Your product has been added to the marketplace.");
  };

  // Filter products by category and keyword
  const filteredProducts = products.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.description || "").toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const viewProduct = (p) => {
    showPopup(
      p.name,
      `${p.description || "No description available."} Price: ₹${p.price} / ${p.unit}. Seller: ${
        p.seller || "AgroGuide seller"
      }.`
    );
  };

  const addToCart = (p) => {
    setCartCount((prev) => prev + 1);
    showPopup("Added to basket", `${p.name} was added to your basket.`);
  };

  return (
    <main className="ag-marketplace">
      {/* Top Navbar */}
      <header className="ag-topbar">
        <a className="ag-brand" href="#marketplace" onClick={() => setPage("buyer")}>
          <span className="ag-brand-icon">✳</span>
          <span>Agro<span>Guide</span></span>
        </a>

        <nav className="ag-main-nav">
          <a
            className={page === "buyer" ? "active" : ""}
            href="#marketplace"
            onClick={() => setPage("buyer")}
          >
            Marketplace
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              showPopup(
                "How AgroGuide works",
                "Browse agricultural products, search by keyword, filter by categories, and buy or list your own harvest."
              );
            }}
          >
            How it works
          </a>
        </nav>

        <div className="ag-header-actions">
          <button
            className="ag-cart-button"
            onClick={() => showPopup("Your basket", `You have ${cartCount} item(s) in your basket.`)}
          >
            ♧ Basket <b>{cartCount}</b>
          </button>

          <button className="ag-seller-button" onClick={openSellerPage}>
            {!sellerName ? "Become a seller ↗" : "Seller dashboard ↗"}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="ag-hero" id="marketplace">
        <div className="ag-hero-copy">
          <div className="ag-eyebrow">
            <span /> FARMING'S NEXT CHAPTER
          </div>
          <h1>
            Good things grow<br />when we <em>grow together.</em>
          </h1>
          <p>Find quality seeds, fresh crops, and useful farming essentials in one simple marketplace.</p>

          <button
            className="ag-hero-cta"
            onClick={() => document.getElementById("ag-products").scrollIntoView({ behavior: "smooth" })}
          >
            Explore marketplace <span>↘</span>
          </button>

          <div className="ag-hero-stats">
            <div>
              <strong>{products.length}+</strong>
              <span>Products listed</span>
            </div>
            <i />
            <div>
              <strong>Farmer first</strong>
              <span>Direct agricultural trade</span>
            </div>
          </div>
        </div>

        <div className="ag-hero-art">
          <div className="ag-art-circle ag-art-circle-one" />
          <div className="ag-art-circle ag-art-circle-two" />
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
            alt="Green agricultural fields"
          />
          <div className="ag-floating-note">
            <span>✦</span>
            <div>
              <strong>Rooted in trust</strong>
              <small>Growing a better harvest</small>
            </div>
          </div>
          <div className="ag-art-label">
            FROM OUR FIELDS<br />TO YOUR FUTURE.
          </div>
        </div>
      </section>

      {/* View Switcher Header */}
      <section className="ag-market-tools" id="ag-products">
        <div>
          <p className="ag-section-kicker">THE MARKETPLACE</p>
          <h2>Find your next <em>good thing.</em></h2>
          <p className="ag-section-subtitle">A little something for every growing season.</p>
        </div>

        <div className="ag-interface-switch">
          <button
            className={page === "buyer" ? "selected" : ""}
            onClick={() => setPage("buyer")}
          >
            Buyer view
          </button>
          <button
            className={page === "seller" ? "selected" : ""}
            onClick={openSellerPage}
          >
            Seller view
          </button>
        </div>
      </section>

      {/* BUYER VIEW */}
      {page === "buyer" && (
        <div>
          {/* Categories */}
          <section className="ag-categories">
            <div className="ag-category-heading">
              <h3>Shop by category</h3>
              <span>Find what your farm needs</span>
            </div>

            <div className="ag-category-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`ag-category-chip ${category === item ? "selected" : ""}`}
                  onClick={() => setCategory(item)}
                >
                  <span className="ag-category-icon">
                    {item === "All" && "✳"}
                    {item === "Crops" && "🌾"}
                    {item === "Seeds" && "🌱"}
                    {item === "Fertilizers" && "♧"}
                    {item === "Farm Equipment" && "⚒"}
                  </span>
                  {item}
                  {category === item && <b>✓</b>}
                </button>
              ))}
            </div>
          </section>

          {/* Products Grid Section */}
          <section className="ag-product-section">
            <div className="ag-products-heading">
              <div>
                <h2>{category === "All" ? "Made for your farm" : category}</h2>
                <p>{filteredProducts.length} products to explore</p>
              </div>

              {/* Keyword Search Box */}
              <label className="ag-search-box">
                <span>⌕</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search seeds, crops, tools..."
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")}>
                    ×
                  </button>
                )}
              </label>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="ag-product-grid">
                {filteredProducts.map((product) => (
                  <div className="ag-product-card" key={product.id}>
                    <div className="ag-product-image-wrap">
                      <img
                        className="ag-product-image"
                        src={product.image || FALLBACK_IMAGE}
                        alt={product.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = FALLBACK_IMAGE;
                        }}
                      />
                      <button
                        className="ag-quick-view"
                        onClick={() => viewProduct(product)}
                      >
                        Quick view ↗
                      </button>
                    </div>

                    <div className="ag-product-content">
                      <div className="ag-product-meta">
                        <span>{product.category}</span>
                      </div>

                      <h3>{product.name}</h3>

                      <p className="ag-product-description">
                        {product.description || "Quality farming product."}
                      </p>

                      <div className="ag-product-bottom">
                        <div>
                          <strong>₹{product.price}</strong>
                          <small> / {product.unit}</small>
                        </div>
                        <button
                          className="ag-add-button"
                          onClick={() => addToCart(product)}
                        >
                          +
                        </button>
                      </div>

                      <p className="ag-seller-name">
                        Sold by {product.seller || "AgroGuide seller"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ag-empty-state">
                <span>⌕</span>
                <h3>No products found</h3>
                <p>Try another search or category.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                >
                  Show all products
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* SELLER DASHBOARD VIEW */}
      {page === "seller" && sellerName && (
        <section className="ag-seller-dashboard">
          <div className="ag-seller-welcome">
            <div>
              <p className="ag-section-kicker">SELLER STUDIO</p>
              <h2>Bring your harvest <em>to market.</em></h2>
              <p>Add a product here and it will appear in the buyer marketplace.</p>
            </div>
            <div className="ag-seller-avatar">
              {sellerName.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="ag-seller-layout">
            <form className="ag-listing-form" onSubmit={handleAddProduct}>
              <div className="ag-form-heading">
                <span>01</span>
                <div>
                  <h3>List a new product</h3>
                  <p>Fields marked * are required.</p>
                </div>
              </div>

              <label>
                Product name *
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Premium wheat seeds"
                  required
                />
              </label>

              <div className="ag-form-row">
                <label>
                  Category *
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option value="Crops">Crops</option>
                    <option value="Seeds">Seeds</option>
                    <option value="Fertilizers">Fertilizers</option>
                    <option value="Farm Equipment">Farm Equipment</option>
                  </select>
                </label>

                <label>
                  Price (₹) *
                  <input
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 850"
                    required
                  />
                </label>
              </div>

              <div className="ag-form-row">
                <label>
                  Price unit
                  <input
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="per kg or per bag"
                  />
                </label>

                <label>
                  Stock quantity
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="e.g. 25"
                  />
                </label>
              </div>

              <label>
                Description
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product..."
                />
              </label>

              <label>
                Product image URL (optional)
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/product.jpg"
                />
              </label>

              <button className="ag-publish-button" type="submit">
                Publish product <span>↗</span>
              </button>
            </form>

            <aside className="ag-seller-side">
              <div className="ag-side-card ag-side-green">
                <span className="ag-side-icon">✳</span>
                <h3>Your farm, your business.</h3>
                <p>Share your harvest with buyers looking for agricultural essentials.</p>
                <div className="ag-side-stat">
                  <strong>{products.length}</strong>
                  <span>Total products in marketplace</span>
                </div>
              </div>

              <div className="ag-side-card">
                <h3>Quick listing tips</h3>
                <ul>
                  <li>Use a clear product title.</li>
                  <li>Pick the appropriate category.</li>
                  <li>Enter reasonable price and unit.</li>
                </ul>
              </div>

              <button className="ag-back-to-buyer" onClick={() => setPage("buyer")}>
                ← Back to buyer marketplace
              </button>

              <button
                className="ag-back-to-buyer"
                onClick={() => {
                  setSellerName("");
                  setPage("buyer");
                  showPopup("Signed out", "You have been signed out of the seller dashboard.");
                }}
              >
                Sign out
              </button>
            </aside>
          </div>
        </section>
      )}

      {/* Seller Login / Signup Modal */}
      {showLogin && (
        <div className="ag-modal-backdrop" onClick={() => setShowLogin(false)}>
          <section
            className="ag-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="ag-modal-close" onClick={() => setShowLogin(false)}>
              ×
            </button>

            <div className="ag-modal-mark">✦</div>
            <h2>{authMode === "login" ? "Welcome back, seller." : "Join AgroGuide."}</h2>
            <p className="ag-modal-message">
              {authMode === "login"
                ? "Sign in using your registered credentials."
                : "Create your seller account to list farming products."}
            </p>

            {authMode === "login" && (
              <div className="ag-demo-credentials">
                <strong>Demo credentials</strong>
                <span>Email: {DEMO_SELLER_EMAIL}</span>
                <span>Password: {DEMO_SELLER_PASSWORD}</span>
              </div>
            )}

            <form className="ag-login-form" onSubmit={authMode === "login" ? handleLogin : handleSignup}>
              {authMode === "signup" && (
                <label>
                  Full name
                  <input
                    type="text"
                    value={sellerFullName}
                    onChange={(e) => setSellerFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </label>
              )}

              <label>
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </label>

              <button className="ag-publish-button" type="submit">
                {authMode === "login" ? "Sign in to seller view ↗" : "Create seller account ↗"}
              </button>
            </form>

            <p className="ag-auth-toggle">
              {authMode === "login" ? "Not registered yet? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === "login" ? "signup" : "login");
                  setEmail("");
                  setPassword("");
                  setSellerFullName("");
                }}
              >
                {authMode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </section>
        </div>
      )}

      {/* Message Dialog Modal */}
      {showMessage && (
        <div className="ag-modal-backdrop" onClick={() => setShowMessage(false)}>
          <section
            className="ag-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="ag-modal-close" onClick={() => setShowMessage(false)}>
              ×
            </button>
            <div className="ag-modal-mark">✓</div>
            <h2>{messageTitle}</h2>
            <p className="ag-modal-message">{messageText}</p>
            <button className="ag-modal-action" onClick={() => setShowMessage(false)}>
              Got it
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default Marketplace;