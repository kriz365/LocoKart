import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { stores, categories, products } from '../../data/mockData';
import {
  MapPin,
  Search,
  Zap,
  ShieldCheck,
  Star,
  Clock,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Store,
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { userLocation, isPassMember, addToCart, cartItems } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredStores = stores.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.categories.includes(selectedCategory);
  });

  const featuredProducts = products.slice(0, 6);

  const getProductCartQty = (productId) => {
    const item = cartItems.find((ci) => ci.id === productId);
    return item ? item.qty : 0;
  };

  return (
    <div className="page customer-home">
      {/* Top Geofenced Location Header */}
      <div className="locokart-header">
        <div className="loc-row">
          <div className="loc-pin-icon">
            <MapPin size={18} className="text-primary" />
          </div>
          <div className="loc-text" onClick={() => navigate('/customer/profile')}>
            <div className="loc-title-row">
              <span className="loc-title">Deliver to Sector 5</span>
              <span className="geofence-badge">2km Geofence</span>
            </div>
            <p className="loc-address-sub">{userLocation.address}</p>
          </div>
          <button
            className="profile-quick-btn"
            onClick={() => navigate('/customer/profile')}
            aria-label="Profile"
          >
            👤
          </button>
        </div>

        {/* Search Bar */}
        <div className="home-search-bar" onClick={() => navigate('/customer/search')}>
          <Search size={18} className="search-icon" />
          <span className="search-placeholder">Search "Amul milk", "Atta", "Biscuits"...</span>
        </div>
      </div>

      <div className="home-scroll-body">
        {/* Real MRP & Zero Markup Guarantee Hero Banner */}
        <div className="hero-banner">
          <div className="hero-tagline">
            <span className="hero-pill">
              <Zap size={13} /> Rapid Hyperlocal Delivery
            </span>
            <h2>Real Prices. Local Faces. Delivered in 20 Mins.</h2>
            <p>
              Direct from your trusted Kiranas at exact physical store MRP. No markups, no inflated prices.
            </p>
          </div>
          <div className="hero-perks">
            <span className="hero-perk">
              <ShieldCheck size={14} /> Tamper-Evident Sealed
            </span>
            <span className="hero-perk">
              <Sparkles size={14} /> Buffer Stock Protected
            </span>
          </div>
        </div>

        {/* LocoKart Pass Membership Teaser */}
        <div
          className={`membership-card-banner ${isPassMember ? 'active-member' : ''}`}
          onClick={() => navigate('/customer/membership')}
        >
          <div className="pass-icon">⭐</div>
          <div className="pass-info">
            <div className="pass-header-row">
              <span className="pass-badge">
                {isPassMember ? 'LocoPass Active' : 'LocoPass Available'}
              </span>
              <span className="pass-price">{isPassMember ? 'VIP Benefits' : 'From ₹99/mo'}</span>
            </div>
            <p className="pass-desc">
              {isPassMember
                ? 'Enjoy ₹0 delivery fee on all your local neighborhood orders!'
                : 'Get ₹0 Delivery fee on all Kirana stores & priority routing'}
            </p>
          </div>
          <ChevronRight size={18} className="pass-arrow" />
        </div>

        {/* Category Horizontal Scroll */}
        <div className="section-header">
          <h3>Shop by Category</h3>
          <span className="text-sub">Instant local shelves</span>
        </div>
        <div className="categories-scroll-row">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`category-pill ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Nearby Kirana Stores Section */}
        <div className="section-header">
          <div>
            <h3>Trusted Neighborhood Kiranas</h3>
            <p className="section-subtitle">Real physical stores within your 2 km zone</p>
          </div>
        </div>

        <div className="stores-list">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className={`store-card ${store.isBusyMode ? 'store-busy' : ''}`}
              onClick={() => navigate(`/customer/store/${store.id}`)}
            >
              <div className="store-avatar">{store.image}</div>
              <div className="store-details">
                <div className="store-name-row">
                  <h4 className="store-name">{store.name}</h4>
                  <span className="store-rating">
                    <Star size={12} fill="#F59E0B" color="#F59E0B" /> {store.rating}
                  </span>
                </div>
                <p className="store-tagline">{store.tagline}</p>
                <div className="store-meta-row">
                  <span className="meta-pill">
                    <MapPin size={11} /> {store.distance}
                  </span>
                  <span className="meta-pill">
                    <Clock size={11} /> {store.deliveryTime}
                  </span>
                  {store.isBusyMode ? (
                    <span className="busy-pill">Busy Mode (Rush Hour)</span>
                  ) : (
                    <span className="open-pill">🟢 Accepting Orders</span>
                  )}
                </div>
                <div className="store-categories-tags">
                  {store.categories.map((c) => (
                    <span key={c} className="cat-tag">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="store-action-col">
                <button className="view-store-btn" aria-label="Open Store">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Best Selling Daily Essentials (Direct Add) */}
        <div className="section-header mt-4">
          <div>
            <h3>Daily Essentials at Real MRP</h3>
            <p className="section-subtitle">No ₹199 minimum order limit</p>
          </div>
          <button className="view-all-link" onClick={() => navigate('/customer/search')}>
            View All
          </button>
        </div>

        <div className="products-horizontal-grid">
          {featuredProducts.map((p) => {
            const qty = getProductCartQty(p.id);
            return (
              <div key={p.id} className="home-product-card">
                <div className="prod-img-box">{p.imageUrl}</div>
                <span className="prod-brand">{p.brand}</span>
                <h5 className="prod-name">{p.name}</h5>
                <span className="prod-unit">{p.quantity}</span>
                <div className="prod-bottom-row">
                  <div className="prod-price-col">
                    <span className="prod-mrp">₹{p.mrp}</span>
                    <span className="mrp-label">Store MRP</span>
                  </div>
                  {qty === 0 ? (
                    <button
                      className="add-btn-compact"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                    >
                      + ADD
                    </button>
                  ) : (
                    <div className="qty-counter-compact" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => navigate('/customer/cart')}>
                        {qty} in Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Educational Architecture Strip */}
        <div className="loco-promise-box">
          <h4>Why LocoKart is Different</h4>
          <div className="promise-grid">
            <div className="promise-item">
              <span className="promise-icon">🏷️</span>
              <div>
                <strong>True Store MRP</strong>
                <p>Zero price inflation over neighborhood counter rates.</p>
              </div>
            </div>
            <div className="promise-item">
              <span className="promise-icon">🛡️</span>
              <div>
                <strong>Tamper-Proof Seal</strong>
                <p>Every bag sealed with unique serialized barcode sticker.</p>
              </div>
            </div>
            <div className="promise-item">
              <span className="promise-icon">🔄</span>
              <div>
                <strong>Instant Missing Item Refund</strong>
                <p>Live inventory cushion & automated UPI refund if item sold out.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Indicator */}
      {cartItems.length > 0 && (
        <div className="floating-cart-bar" onClick={() => navigate('/customer/cart')}>
          <div className="cart-bar-left">
            <ShoppingBag size={20} />
            <div>
              <span className="cart-bar-qty">{cartItems.reduce((acc, i) => acc + i.qty, 0)} items</span>
              <span className="cart-bar-sep">•</span>
              <span className="cart-bar-total">₹{cartItems.reduce((sum, item) => sum + item.mrp * item.qty, 0)}</span>
            </div>
          </div>
          <div className="cart-bar-right">
            <span>View Cart</span>
            <ChevronRight size={18} />
          </div>
        </div>
      )}
    </div>
  );
}
