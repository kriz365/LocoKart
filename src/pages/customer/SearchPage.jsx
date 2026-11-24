import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { products, stores, categories } from '../../data/mockData';
import {
  Search,
  ArrowLeft,
  X,
  ShoppingBag,
  Store,
  Star,
  MapPin,
  ChevronRight,
} from 'lucide-react';

export default function SearchPage() {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems } = useApp();

  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredProducts = products.filter((p) => {
    const matchesQuery =
      query.trim() === '' ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());

    const matchesCat = selectedCat === 'all' || p.category.toLowerCase().includes(selectedCat.toLowerCase());
    return matchesQuery && matchesCat;
  });

  const filteredStores = stores.filter((s) => {
    if (!query.trim()) return false;
    return (
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.categories.some((c) => c.toLowerCase().includes(query.toLowerCase()))
    );
  });

  const getProductQty = (productId) => {
    const item = cartItems.find((ci) => ci.id === productId);
    return item ? item.qty : 0;
  };

  return (
    <div className="page customer-search">
      {/* Search Header */}
      <div className="search-top-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div className="search-input-wrapper">
          <Search size={18} className="search-input-icon" />
          <input
            type="text"
            autoFocus
            placeholder="Search groceries, milk, atta, snacks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="clear-query-btn" onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="search-cat-pills">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`search-cat-pill ${selectedCat === c.id ? 'active' : ''}`}
            onClick={() => setSelectedCat(c.id)}
          >
            <span>{c.icon}</span> {c.name}
          </button>
        ))}
      </div>

      <div className="search-results-scroll">
        {/* Stores matching query */}
        {filteredStores.length > 0 && (
          <div className="search-stores-section">
            <h4 className="search-section-title">Matching Kirana Stores</h4>
            <div className="stores-list-mini">
              {filteredStores.map((s) => (
                <div
                  key={s.id}
                  className="store-mini-card"
                  onClick={() => navigate(`/customer/store/${s.id}`)}
                >
                  <span className="store-mini-avatar">{s.image}</span>
                  <div className="store-mini-info">
                    <h5>{s.name}</h5>
                    <p>
                      ⭐ {s.rating} • 📍 {s.distance} • ⏱️ {s.deliveryTime}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Results Grid */}
        <div className="search-products-section">
          <div className="search-results-meta">
            <span>Showing {filteredProducts.length} items at real store MRP</span>
          </div>

          <div className="search-products-grid">
            {filteredProducts.map((p) => {
              const qty = getProductQty(p.id);
              return (
                <div key={p.id} className="search-product-card">
                  <div className="prod-thumb-large">{p.imageUrl}</div>
                  <span className="prod-card-brand">{p.brand}</span>
                  <h5 className="prod-card-name">{p.name}</h5>
                  <span className="prod-card-unit">{p.quantity}</span>

                  <div className="prod-card-bottom">
                    <div className="prod-card-price">
                      <span className="mrp-currency">₹</span>
                      <span className="mrp-val">{p.mrp}</span>
                    </div>

                    {qty === 0 ? (
                      <button
                        className="add-btn-primary"
                        onClick={() => addToCart(p)}
                      >
                        + ADD
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
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-search-state">
              <span className="empty-icon">🔍</span>
              <h4>No products found</h4>
              <p>Try searching for "Amul", "Milk", "Atta", "Chips", or select a category above.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Bar */}
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
