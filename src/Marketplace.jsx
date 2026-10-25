import React, { useState } from "react";
import "./Marketplace.css";
import initialProducts from "./marketplaceData";
function Marketplace() {
  // Demo seller credentials
  const DEMO_SELLER_EMAIL = "demo.seller@agroguide.com";
  const DEMO_SELLER_PASSWORD = "AgroGuide@123";

  // Email and password validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  // Save and load products using localStorage
  const [products, setProducts] = useState(function () {
    try {
      const savedProducts = localStorage.getItem("agroguideProducts");
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch (error) {
      return initialProducts;
    }
  });

  // Page and buyer filters
  const [page, setPage] = useState("buyer");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [buyerLocation, setBuyerLocation] = useState("");

  // Seller login and registration
  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [sellerFullName, setSellerFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sellerName, setSellerName] = useState("");

  // Product form fields
  const [name, setName] = useState("");
  const [newCategory, setNewCategory] = useState("Crops");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("per kg");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [productLocation, setProductLocation] = useState("Rajpura");

  // Popup message
  const [showMessage, setShowMessage] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");

  // Demo basket
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    "All",
    "Crops",
    "Seeds",
    "Fertilizers",
    "Farm Equipment"
  ];

  const locations = [
    "Rajpura",
    "Patiala",
    "Chandigarh",
    "Ambala",
    "Ludhiana",
    "Jalandhar",
    "Amritsar",
    "Bathinda",
    "Mohali",
    "Barnala"
  ];

  // Approximate coordinates for supported locations
  const locationCoordinates = {
    rajpura: [30.484, 76.594],
    patiala: [30.3398, 76.3869],
    chandigarh: [30.7333, 76.7794],
    ambala: [30.3782, 76.7767],
    ludhiana: [30.901, 75.8573],
    jalandhar: [31.326, 75.5762],
    amritsar: [31.634, 74.8723],
    bathinda: [30.211, 74.9455],
    mohali: [30.7046, 76.7179],
    barnala: [30.3783, 75.5468]
  };

  // Show popup messages
  function showPopup(title, text) {
    setMessageTitle(title);
    setMessageText(text);
    setShowMessage(true);
  }

  // Read registered sellers
  function getSavedSellers() {
    try {
      return JSON.parse(
        localStorage.getItem("agroguideSellers") || "[]"
      );
    } catch (error) {
      return [];
    }
  }

  // Open seller dashboard or login window
  function openSellerPage() {
    if (sellerName !== "") {
      setPage("seller");
    } else {
      setAuthMode("login");
      setShowLogin(true);
    }
  }

  // Seller registration
  function handleSignup(event) {
    event.preventDefault();

    if (
      sellerFullName.trim() === "" ||
      email.trim() === "" ||
      password === ""
    ) {
      showPopup(
        "Missing details",
        "Please fill in your name, email and password."
      );
      return;
    }

    if (!emailRegex.test(email.trim())) {
      showPopup(
        "Invalid email",
        "Enter a valid email address, such as name@example.com."
      );
      return;
    }

    if (!passwordRegex.test(password)) {
      showPopup(
        "Weak password",
        "Your password must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      );
      return;
    }

    if (email.trim().toLowerCase() === DEMO_SELLER_EMAIL) {
      showPopup(
        "Email reserved",
        "This email is reserved for the demo seller account. Please use another email."
      );
      return;
    }

    const savedSellers = getSavedSellers();

    const alreadyRegistered = savedSellers.some(function (seller) {
      return (
        seller.email.toLowerCase() === email.trim().toLowerCase()
      );
    });

    if (alreadyRegistered) {
      showPopup(
        "Account already exists",
        "This email is already registered. Please sign in."
      );
      setAuthMode("login");
      return;
    }

    const newSeller = {
      id: Date.now(),
      name: sellerFullName.trim(),
      email: email.trim().toLowerCase(),
      password: password
    };

    savedSellers.push(newSeller);

    localStorage.setItem(
      "agroguideSellers",
      JSON.stringify(savedSellers)
    );

    setSellerFullName("");
    setPassword("");
    setAuthMode("login");

    showPopup(
      "Account created!",
      "Your account has been saved. Please sign in using your new credentials."
    );
  }

  // Seller login
  function handleLogin(event) {
    event.preventDefault();

    // Allow the fixed demo account
    if (
      email.trim().toLowerCase() === DEMO_SELLER_EMAIL &&
      password === DEMO_SELLER_PASSWORD
    ) {
      setSellerName("Demo Seller");
      setShowLogin(false);
      setPage("seller");
      setEmail("");
      setPassword("");

      showPopup(
        "Login successful!",
        "Welcome to your Demo Seller dashboard."
      );
      return;
    }

    // Check accounts created through sign-up
    const savedSellers = getSavedSellers();

    const foundSeller = savedSellers.find(function (seller) {
      return (
        seller.email.toLowerCase() === email.trim().toLowerCase() &&
        seller.password === password
      );
    });

    if (!foundSeller) {
      showPopup(
        "Login failed",
        "The email or password is incorrect. Please sign up first or check your details."
      );
      return;
    }

    setSellerName(foundSeller.name);
    setShowLogin(false);
    setPage("seller");
    setEmail("");
    setPassword("");

    showPopup(
      "Login successful!",
      "Welcome back, " + foundSeller.name + "!"
    );
  }

  // Calculate approximate distance between two locations
  function getDistance(locationOne, locationTwo) {
    const first =
      locationCoordinates[
        (locationOne || "").trim().toLowerCase()
      ];

    const second =
      locationCoordinates[
        (locationTwo || "").trim().toLowerCase()
      ];

    if (!first || !second) {
      return 999999;
    }

    const latitudeDifference =
      (second[0] - first[0]) * Math.PI / 180;

    const longitudeDifference =
      (second[1] - first[1]) * Math.PI / 180;

    const a =
      Math.sin(latitudeDifference / 2) *
        Math.sin(latitudeDifference / 2) +
      Math.cos(first[0] * Math.PI / 180) *
        Math.cos(second[0] * Math.PI / 180) *
        Math.sin(longitudeDifference / 2) *
        Math.sin(longitudeDifference / 2);

    return (
      6371 *
      2 *
      Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    );
  }

  // Add a new product
  function handleAddProduct(event) {
    event.preventDefault();

    if (name.trim() === "") {
      showPopup("Missing name", "Please enter a product name.");
      return;
    }

    if (price === "" || Number(price) <= 0) {
      showPopup("Invalid price", "Please enter a valid price.");
      return;
    }
    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      category: newCategory,
      price: Number(price),
      unit: unit,
      description: description,
      image: image.trim(),
      stock: Number(stock) || 0,
      location: productLocation,
      seller: sellerName,
      rating: null,
      badge: ""
    };

    const updatedProducts = [newProduct, ...products];

    setProducts(updatedProducts);

    localStorage.setItem(
      "agroguideProducts",
      JSON.stringify(updatedProducts)
    );

    setName("");
    setNewCategory("Crops");
    setPrice("");
    setUnit("per kg");
    setDescription("");
    setImage("");
    setStock("");
    setProductLocation("Rajpura");

    showPopup(
      "Product published!",
      "Your product has been added to the buyer marketplace."
    );
  }
  // Filter products by category and search
  const filteredProducts = products.filter(function (product) {
    const matchesCategory =
      category === "All" || product.category === category;

    const productText =
      product.name +
      " " +
      (product.description || "") +
      " " +
      product.category +
      " " +
      (product.location || "");

    const matchesSearch = productText
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort products from nearest to farthest
  const visibleProducts = [...filteredProducts].sort(
    function (productOne, productTwo) {
      if (buyerLocation.trim() === "") {
        return 0;
      }

      return (
        getDistance(buyerLocation, productOne.location) -
        getDistance(buyerLocation, productTwo.location)
      );
    }
  );

  // View product information
  function viewProduct(product) {
    showPopup(
      product.name,
      (product.description || "No description available.") +
        " Price: ₹" +
        product.price +
        " / " +
        product.unit +
        ". Location: " +
        (product.location || "Not specified") +
        ". Seller: " +
        (product.seller || "AgroGuide seller") +
        "."
    );
  }

  // Add item to demo basket
  function addToCart(product) {
    setCartCount(cartCount + 1);

    showPopup(
      "Added to basket",
      product.name + " was added to your demo basket."
    );
  }

  return (
    <main className="ag-marketplace">

      {/* Navigation */}
      <header className="ag-topbar">
        <a
          className="ag-brand"
          href="#marketplace"
          onClick={function (event) {
            event.preventDefault();
            setPage("buyer");
          }}
        >
          <span className="ag-brand-icon">✳</span>
          <span>
            Agro<span>Guide</span>
            <small>GROW TOGETHER</small>
          </span>
        </a>

        <nav className="ag-main-nav">
          <a
            className={page === "buyer" ? "active" : ""}
            href="#marketplace"
            onClick={function (event) {
              event.preventDefault();
              setPage("buyer");
            }}
          >
            Marketplace
          </a>

          <a
            href="#how-it-works"
            onClick={function (event) {
              event.preventDefault();
              showPopup(
                "How AgroGuide works",
                "Browse products, search by name, choose a category and enter your location to find nearby products. Sellers can register and list their products."
              );
            }}
          >
            How it works
          </a>
        </nav>

        <div className="ag-header-actions">
          <button
            className="ag-cart-button"
            onClick={function () {
              showPopup(
                "Your basket",
                "You have " + cartCount + " item(s) in your demo basket."
              );
            }}
          >
            ♧ Basket <b>{cartCount}</b>
          </button>

          <button
            className="ag-seller-button"
            onClick={openSellerPage}
          >
            {sellerName === ""
              ? "Become a seller ↗"
              : "Seller dashboard ↗"}
          </button>
        </div>
      </header>

      {/* Hero section */}
      <section className="ag-hero" id="marketplace">
        <div className="ag-hero-copy">
          <div className="ag-eyebrow">
            <span /> FARMING'S NEXT CHAPTER
          </div>

          <h1>
            Good things grow
            <br />
            when we <em>grow together.</em>
          </h1>

          <p>
            Find quality seeds, fresh crops, and useful farming essentials
            in one simple marketplace.
          </p>

          <button
            className="ag-hero-cta"
            onClick={function () {
              document.getElementById("ag-products").scrollIntoView({
                behavior: "smooth"
              });
            }}
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
              <strong>Local first</strong>
              <span>Supporting farmers</span>
            </div>
          </div>
        </div>

        <div className="ag-hero-art">
          <div className="ag-art-circle ag-art-circle-one"></div>
          <div className="ag-art-circle ag-art-circle-two"></div>

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
            FROM OUR FIELDS
            <br />
            TO YOUR FUTURE.
          </div>
        </div>
      </section>

      {/* Marketplace heading */}
      <section className="ag-market-tools" id="ag-products">
        <div>
          <p className="ag-section-kicker">THE MARKETPLACE</p>

          <h2>
            Find your next <em>good thing.</em>
          </h2>

          <p className="ag-section-subtitle">
            A little something for every growing season.
          </p>
        </div>

        <div className="ag-interface-switch">
          <button
            className={page === "buyer" ? "selected" : ""}
            onClick={function () {
              setPage("buyer");
            }}
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

      {/* Buyer marketplace */}
      {page === "buyer" && (
        <div>
          <section className="ag-categories">
            <div className="ag-category-heading">
              <h3>Shop by category</h3>
              <span>Find what your farm needs</span>
            </div>

            <div className="ag-category-list">
              {categories.map(function (item) {
                return (
                  <button
                    key={item}
                    className={
                      "ag-category-chip " +
                      (category === item ? "selected" : "")
                    }
                    onClick={function () {
                      setCategory(item);
                    }}
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
                );
              })}
            </div>
          </section>

          <section className="ag-product-section">
            <div className="ag-products-heading">
              <div>
                <h2>
                  {category === "All"
                    ? "Made for your farm"
                    : category}
                </h2>

                <p>{visibleProducts.length} products to explore</p>
              </div>

              <div className="ag-location-box">
                <label htmlFor="buyer-location">
                  Your location
                </label>

                <input
                  id="buyer-location"
                  list="ag-location-options"
                  value={buyerLocation}
                  onChange={function (event) {
                    setBuyerLocation(event.target.value);
                  }}
                  placeholder="Enter your city"
                />

                <datalist id="ag-location-options">
                  {locations.map(function (location) {
                    return (
                      <option key={location} value={location} />
                    );
                  })}
                </datalist>
              </div>

              <label className="ag-search-box">
                <span>⌕</span>

                <input
                  type="text"
                  value={search}
                  onChange={function (event) {
                    setSearch(event.target.value);
                  }}
                  placeholder="Search seeds, crops, tools..."
                />

                {search !== "" && (
                  <button
                    type="button"
                    onClick={function () {
                      setSearch("");
                    }}
                  >
                    ×
                  </button>
                )}
              </label>
            </div>

            {buyerLocation.trim() !== "" &&
              !locationCoordinates[
                buyerLocation.trim().toLowerCase()
              ] && (
                <p className="ag-section-subtitle">
                  Please select a supported city from the suggestions
                  to sort products by approximate distance.
                </p>
              )}

            {visibleProducts.length > 0 ? (
              <div className="ag-product-grid">
                {visibleProducts.map(function (product) {
                  const distance = getDistance(
                    buyerLocation,
                    product.location
                  );

                  return (
                    <div
                      className="ag-product-card"
                      key={product.id}
                    >
                      <div className="ag-product-image-wrap">
                        {product.image && (
                          <img
                            className="ag-product-image"
                            src={product.image}
                            alt={product.name}
                            onError={function (event) {
                              event.target.style.display = "none";
                            }}
                          />
                        )}

                        <button
                          className="ag-quick-view"
                          onClick={function () {
                            viewProduct(product);
                          }}
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
                          {product.description ||
                            "Quality farming product."}
                        </p>

                        <div className="ag-product-bottom">
                          <div>
                            <strong>₹{product.price}</strong>
                            <small> / {product.unit}</small>
                          </div>

                          <button
                            className="ag-add-button"
                            onClick={function () {
                              addToCart(product);
                            }}
                          >
                            +
                          </button>
                        </div>

                        <p className="ag-seller-name">
                          Sold by {product.seller || "AgroGuide seller"}
                        </p>

                        <p className="ag-seller-name">
                          Location: {product.location || "Not specified"}
                        </p>

                        {buyerLocation.trim() !== "" &&
                          locationCoordinates[
                            buyerLocation.trim().toLowerCase()
                          ] && (
                            <p className="ag-seller-name">
                              Approx. distance:{" "}
                              {distance >= 999999
                                ? "Not available"
                                : Math.round(distance) + " km"}
                            </p>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="ag-empty-state">
                <span>⌕</span>
                <h3>No products found</h3>
                <p>Try another search or category.</p>

                <button
                  onClick={function () {
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

      {/* Seller dashboard */}
      {page === "seller" && sellerName !== "" && (
        <section className="ag-seller-dashboard">
          <div className="ag-seller-welcome">
            <div>
              <p className="ag-section-kicker">SELLER STUDIO</p>

              <h2>
                Bring your harvest <em>to market.</em>
              </h2>

              <p>
                Add a product here and it will appear in the buyer marketplace.
              </p>
            </div>

            <div className="ag-seller-avatar">
              {sellerName.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="ag-seller-layout">
            <form
              className="ag-listing-form"
              onSubmit={handleAddProduct}
            >
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
                  onChange={function (event) {
                    setName(event.target.value);
                  }}
                  placeholder="e.g. Premium wheat seeds"
                  required
                />
              </label>

              <div className="ag-form-row">
                <label>
                  Category *
                  <select
                    value={newCategory}
                    onChange={function (event) {
                      setNewCategory(event.target.value);
                    }}
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
                    onChange={function (event) {
                      setPrice(event.target.value);
                    }}
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
                    onChange={function (event) {
                      setUnit(event.target.value);
                    }}
                    placeholder="per kg or per bag"
                  />
                </label>

                <label>
                  Stock quantity
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={function (event) {
                      setStock(event.target.value);
                    }}
                    placeholder="e.g. 25"
                  />
                </label>
              </div>

              <label>
                Farm / shop location *
                <select
                  value={productLocation}
                  onChange={function (event) {
                    setProductLocation(event.target.value);
                  }}
                >
                  {locations.map(function (location) {
                    return (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label>
                Description
                <textarea
                  rows="3"
                  value={description}
                  onChange={function (event) {
                    setDescription(event.target.value);
                  }}
                  placeholder="Describe your product..."
                />
              </label>

              <label>
                Product image URL (optional)
                <input
                  type="url"
                  value={image}
                  onChange={function (event) {
                    setImage(event.target.value);
                  }}
                  placeholder="https://example.com/product.jpg"
                />
              </label>

              <button className="ag-publish-button" type="submit">
                Publish product <span>↗</span>
              </button>

              <p className="ag-form-note">
                Products are saved in this browser using localStorage.
              </p>
            </form>

            <aside className="ag-seller-side">
              <div className="ag-side-card ag-side-green">
                <span className="ag-side-icon">✳</span>
                <h3>Your farm, your business.</h3>

                <p>
                  Share your products with people looking for farming essentials.
                </p>

                <div className="ag-side-stat">
                  <strong>{products.length}</strong>
                  <span>Total products in marketplace</span>
                </div>
              </div>

              <div className="ag-side-card">
                <h3>Quick listing tips</h3>

                <ul>
                  <li>Use a clear product name.</li>
                  <li>Choose the correct category.</li>
                  <li>Enter the correct price and unit.</li>
                  <li>Select the correct farm location.</li>
                </ul>
              </div>

              <button
                className="ag-back-to-buyer"
                onClick={function () {
                  setPage("buyer");
                }}
              >
                ← Back to buyer marketplace
              </button>

              <button
                className="ag-back-to-buyer"
                onClick={function () {
                  setSellerName("");
                  setPage("buyer");
                  showPopup(
                    "Signed out",
                    "You have been signed out of the seller dashboard."
                  );
                }}
              >
                Sign out
              </button>
            </aside>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="ag-footer">
        <a
          className="ag-brand ag-footer-brand"
          href="#marketplace"
          onClick={function (event) {
            event.preventDefault();
            setPage("buyer");
          }}
        >
          <span className="ag-brand-icon">✳</span>

          <span>
            Agro<span>Guide</span>
            <small>GROW TOGETHER</small>
          </span>
        </a>

        <p>
          Growing stronger, together. © {new Date().getFullYear()} AgroGuide
        </p>

        <span className="ag-footer-leaf">✳</span>
      </footer>

      {/* Seller login and sign-up modal */}
      {showLogin && (
        <div
          className="ag-modal-backdrop"
          onClick={function () {
            setShowLogin(false);
          }}
        >
          <section
            className="ag-modal"
            role="dialog"
            aria-modal="true"
            onClick={function (event) {
              event.stopPropagation();
            }}
          >
            <button
              className="ag-modal-close"
              onClick={function () {
                setShowLogin(false);
              }}
            >
              ×
            </button>

            <div className="ag-modal-mark">✦</div>

            <h2>
              {authMode === "login"
                ? "Welcome back, seller."
                : "Join AgroGuide."}
            </h2>

            <p className="ag-modal-message">
              {authMode === "login"
                ? "Sign in using your registered email and password."
                : "Create your seller account to list farming products."}
            </p>

            {authMode === "login" && (
              <div className="ag-demo-credentials">
                <strong>Demo credentials</strong>
                <span>Email: {DEMO_SELLER_EMAIL}</span>
                <span>Password: {DEMO_SELLER_PASSWORD}</span>
              </div>
            )}

            <form
              className="ag-login-form"
              onSubmit={
                authMode === "login" ? handleLogin : handleSignup
              }
            >
              {authMode === "signup" && (
                <label>
                  Full name

                  <input
                    type="text"
                    value={sellerFullName}
                    onChange={function (event) {
                      setSellerFullName(event.target.value);
                    }}
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
                  onChange={function (event) {
                    setEmail(event.target.value);
                  }}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Password

                <input
                  type="password"
                  value={password}
                  onChange={function (event) {
                    setPassword(event.target.value);
                  }}
                  placeholder={
                    authMode === "signup"
                      ? "8+ characters, uppercase, number, symbol"
                      : "Enter your password"
                  }
                  minLength={authMode === "signup" ? 8 : undefined}
                  required
                />
              </label>

              {authMode === "signup" && (
                <p className="ag-demo-note">
                  Use at least 8 characters with an uppercase letter,
                  a lowercase letter, a number and a special character.
                </p>
              )}

              <button className="ag-publish-button" type="submit">
                {authMode === "login"
                  ? "Sign in to seller view ↗"
                  : "Create seller account ↗"}
              </button>
            </form>

            <p className="ag-auth-toggle">
              {authMode === "login"
                ? "Not registered yet? "
                : "Already have an account? "}

              <button
                type="button"
                onClick={function () {
                  setAuthMode(
                    authMode === "login" ? "signup" : "login"
                  );

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

      {/* Popup messages */}
      {showMessage && (
        <div
          className="ag-modal-backdrop"
          onClick={function () {
            setShowMessage(false);
          }}
        >
          <section
            className="ag-modal"
            role="dialog"
            aria-modal="true"
            onClick={function (event) {
              event.stopPropagation();
            }}
          >
            <button
              className="ag-modal-close"
              onClick={function () {
                setShowMessage(false);
              }}
            >
              ×
            </button>

            <div className="ag-modal-mark">✓</div>

            <h2>{messageTitle}</h2>
            <p className="ag-modal-message">{messageText}</p>
            <button
              className="ag-modal-action"
              onClick={function () {
                setShowMessage(false);
              }}
            >
              Got it
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
export default Marketplace;
