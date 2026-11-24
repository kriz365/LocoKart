import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { stores, products } from '../../data/mockData';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Search,
  ShoppingBag,
  ChevronRight,
  Info,
} from 'lucide-react';

export default function StorePage() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const store = stores.find((s) => s.id === storeId) || stores[0];

  // Store products
  const storeProducts = products.filter((p) => {
    // Show products matching this store or general products for rich demo
    const matchesCategory =
      activeCategory === 'All' || p.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProductQty = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.qty : 0;
  };

  const categoriesInStore = ['All', ...store.categories];

  return (
    <div className="page customer-store">
      {/* Top Header */}
      <div className="store-top-nav">
        <button className="back-btn" onClick={() => navigate('/customer')} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <span className="store-top-title">{store.name}</span>
        <button className="cart-header-icon" onClick={() => navigate('/customer/cart')}>
          <ShoppingBag size={20} />
          {cartItems.length > 0 && <span className="cart-badge-dot">{cartItems.length}</span>}
        </button>
      </div>

      <div className="store-content-scroll">
        {/* Store Detail Banner */}
        <div className="store-hero-card">
          <div className="store-hero-row">
            <div className="store-hero-avatar">{store.image}</div>
            <div className="store-hero-info">
              <h2>{store.name}</h2>
              <p className="store-hero-tagline">{store.tagline}</p>
              <div className="store-hero-pills">
                <span className="hero-rating">
                  <Star size={13} fill="#F59E0B" color="#F59E0B" /> {store.rating} ({store.reviewsCount})
                </span>
                <span className="hero-dist">
                  <MapPin size={13} /> {store.distance}
                </span>
                <span className="hero-time">
                  <Clock size={13} /> {store.deliveryTime}
                </span>
              </div>
            </div>
          </div>

          <div className="store-trust-strip">
            <span className="trust-item">
              <ShieldCheck size={14} className="text-primary" /> FSSAI Quality Audited
            </span>
            <span className="trust-item">
              <Info size={14} className="text-primary" /> Real In-Store MRP
            </span>
          </div>

          {store.isBusyMode && (
            <div className="busy-alert-banner">
              ⚠️ <strong>Store in Rush Hour Mode:</strong> Orders may take 5-10 extra minutes as the merchant serves counter foot traffic.
            </div>
          )}
        </div>

        {/* Store Search */}
        <div className="store-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder={`Search items in ${store.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              ×
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="store-cat-tabs">
          {categoriesInStore.map((cat) => (
            <button
              key={cat}
              className={`store-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Store Products List */}
        <div className="store-products-list">
          <div className="products-count-label">
            Showing {storeProducts.length} verified products
          </div>

          {storeProducts.map((p) => {
            const qty = getProductQty(p.id);
            return (
              <div key={p.id} className="store-product-row">
                <div className="prod-thumb">{p.imageUrl}</div>
                <div className="prod-middle">
                  <span className="prod-brand-label">{p.brand}</span>
                  <h4 className="prod-title">{p.name}</h4>
                  <span className="prod-quantity-tag">{p.quantity}</span>
                  <div className="prod-buffer-info">
                    <span className="buffer-bullet">🟢</span> In Stock (Buffer: {p.bufferStock} reserved for walk-ins)
                  </div>
                  <div className="prod-price-tag">
                    <span className="prod-currency">₹</span>
                    <span className="prod-amount">{p.mrp}</span>
                    <span className="prod-mrp-tag">Counter MRP</span>
                  </div>
                </div>
                <div className="prod-action">
                  {qty === 0 ? (
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(p)}
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="qty-controls-row">
                      <button
                        className="qty-btn minus"
                        onClick={() => removeFromCart(p.id)}
                      >
                        -
                      </button>
                      <span className="qty-count">{qty}</span>
                      <button
                        className="qty-btn plus"
                        onClick={() => addToCart(p)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {storeProducts.length === 0 && (
            <div className="empty-search-state">
              <span className="empty-icon">🔍</span>
              <p>No products match "{searchQuery}" in this store.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Cart Bar */}
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
            <span>Proceed to Cart</span>
            <ChevronRight size={18} />
          </div>
        </div>
      )}
    </div>
  );
}
