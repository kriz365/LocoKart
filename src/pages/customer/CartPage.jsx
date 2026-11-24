import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { stores } from '../../data/mockData';
import {
  ArrowLeft,
  Trash2,
  ShieldCheck,
  Zap,
  Clock,
  Calendar,
  AlertCircle,
  PhoneCall,
  XCircle,
  CreditCard,
  MapPin,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getDeliveryFee,
    packagingFee,
    selectedDeliveryTier,
    setSelectedDeliveryTier,
    missingItemProtocol,
    setMissingItemProtocol,
    isPassMember,
    userLocation,
    placeOrder,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card'
  const [isPlacing, setIsPlacing] = useState(false);

  const productTotal = getCartTotal();
  const deliveryFee = getDeliveryFee();
  const totalAmount = productTotal + deliveryFee + packagingFee;

  const fulfillmentStoreId = cartItems[0]?.storeId || 'store-1';
  const store = stores.find((s) => s.id === fulfillmentStoreId) || stores[0];

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsPlacing(true);

    setTimeout(() => {
      const order = placeOrder({
        storeName: store.name,
        merchantId: store.id,
      });
      setIsPlacing(false);
      navigate(`/customer/orders/${order.id}`);
    }, 800);
  };

  if (cartItems.length === 0) {
    return (
      <div className="page customer-cart empty-cart-view">
        <div className="store-top-nav">
          <button className="back-btn" onClick={() => navigate('/customer')}>
            <ArrowLeft size={20} />
          </button>
          <span className="store-top-title">Your Cart</span>
          <div style={{ width: 32 }} />
        </div>
        <div className="empty-cart-content">
          <span className="empty-cart-emoji">🛒</span>
          <h3>Your cart is empty</h3>
          <p>Explore your neighborhood kirana shelves at real store MRP prices.</p>
          <button className="browse-stores-btn" onClick={() => navigate('/customer')}>
            Browse Nearby Stores
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page customer-cart">
      {/* Header */}
      <div className="store-top-nav">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <span className="store-top-title">Review & Checkout</span>
        <button className="clear-cart-link" onClick={clearCart}>
          Clear
        </button>
      </div>

      <div className="cart-content-scroll">
        {/* Fulfillment Store Banner */}
        <div className="fulfillment-badge">
          <span className="badge-icon">🏪</span>
          <div className="badge-text">
            <strong>Fulfilling from: {store.name}</strong>
            <p>Direct from counter shelf • {store.distance} away</p>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-section-card">
          <div className="section-title-row">
            <h4>Ordered Items ({cartItems.reduce((acc, i) => acc + i.qty, 0)})</h4>
            <span className="mrp-guarantee-tag">Exact MRP Guaranteed</span>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="item-left">
                  <span className="item-emoji">{item.imageUrl}</span>
                  <div className="item-meta">
                    <span className="item-brand">{item.brand}</span>
                    <h5 className="item-name">{item.name}</h5>
                    <span className="item-unit">{item.quantity}</span>
                    <span className="item-unit-price">₹{item.mrp} each</span>
                  </div>
                </div>

                <div className="item-right">
                  <div className="qty-controls-row">
                    <button
                      className="qty-btn minus"
                      onClick={() => removeFromCart(item.id)}
                    >
                      -
                    </button>
                    <span className="qty-count">{item.qty}</span>
                    <button
                      className="qty-btn plus"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                  <span className="item-total-mrp">₹{item.mrp * item.qty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRE-SET MISSING ITEM PROTOCOL (Key LocoKart Architectural USP) */}
        <div className="cart-section-card missing-protocol-card">
          <div className="protocol-title">
            <ShieldCheck size={18} className="text-primary" />
            <div>
              <h4>Pre-Set Missing Item Protocol</h4>
              <p>Because Kiranas sell to physical walk-ins, what if an item runs out?</p>
            </div>
          </div>

          <div className="protocol-options">
            <label
              className={`protocol-radio ${missingItemProtocol === 'auto_refund' ? 'selected' : ''}`}
              onClick={() => setMissingItemProtocol('auto_refund')}
            >
              <input
                type="radio"
                name="protocol"
                checked={missingItemProtocol === 'auto_refund'}
                onChange={() => setMissingItemProtocol('auto_refund')}
              />
              <div className="protocol-text">
                <div className="protocol-label-row">
                  <strong>⚡ Auto-Refund (Recommended)</strong>
                  <span className="instant-pill">Instant</span>
                </div>
                <p>Auto-deduct missing item and credit refund to your UPI before rider leaves counter.</p>
              </div>
            </label>

            <label
              className={`protocol-radio ${missingItemProtocol === 'call_replacement' ? 'selected' : ''}`}
              onClick={() => setMissingItemProtocol('call_replacement')}
            >
              <input
                type="radio"
                name="protocol"
                checked={missingItemProtocol === 'call_replacement'}
                onChange={() => setMissingItemProtocol('call_replacement')}
              />
              <div className="protocol-text">
                <div className="protocol-label-row">
                  <strong>📞 Call for Replacement</strong>
                </div>
                <p>Rider calls you to verify alternative brand/size from the same shelf.</p>
              </div>
            </label>

            <label
              className={`protocol-radio ${missingItemProtocol === 'cancel_order' ? 'selected' : ''}`}
              onClick={() => setMissingItemProtocol('cancel_order')}
            >
              <input
                type="radio"
                name="protocol"
                checked={missingItemProtocol === 'cancel_order'}
                onChange={() => setMissingItemProtocol('cancel_order')}
              />
              <div className="protocol-text">
                <div className="protocol-label-row">
                  <strong>❌ Cancel Entire Order</strong>
                </div>
                <p>Cancel full order if primary essentials are unavailable.</p>
              </div>
            </label>
          </div>
        </div>

        {/* DELIVERY TIERS */}
        <div className="cart-section-card">
          <div className="section-title-row">
            <h4>Select Delivery Tier</h4>
            <span className="text-sub">Hyperlocal speeds</span>
          </div>

          <div className="tier-options-grid">
            <div
              className={`tier-card ${selectedDeliveryTier === 'express' ? 'active' : ''}`}
              onClick={() => setSelectedDeliveryTier('express')}
            >
              <div className="tier-header">
                <Zap size={16} className="tier-icon express" />
                <span className="tier-title">Express</span>
              </div>
              <p className="tier-eta">15-20 Mins</p>
              <span className="tier-cost">
                {isPassMember ? <><s className="old-fee">₹19</s> <span className="free-fee">FREE</span></> : '₹19'}
              </span>
            </div>

            <div
              className={`tier-card ${selectedDeliveryTier === 'standard' ? 'active' : ''}`}
              onClick={() => setSelectedDeliveryTier('standard')}
            >
              <div className="tier-header">
                <Clock size={16} className="tier-icon standard" />
                <span className="tier-title">Standard</span>
              </div>
              <p className="tier-eta">25-30 Mins</p>
              <span className="tier-cost">
                {isPassMember ? <><s className="old-fee">₹9</s> <span className="free-fee">FREE</span></> : '₹9'}
              </span>
            </div>

            <div
              className={`tier-card ${selectedDeliveryTier === 'scheduled' ? 'active' : ''}`}
              onClick={() => setSelectedDeliveryTier('scheduled')}
            >
              <div className="tier-header">
                <Calendar size={16} className="tier-icon scheduled" />
                <span className="tier-title">Batched</span>
              </div>
              <p className="tier-eta">Slot Routing</p>
              <span className="tier-cost free-fee">FREE (₹0)</span>
            </div>
          </div>

          {isPassMember && (
            <div className="pass-applied-pill">
              ⭐ LocoPass Active: Delivery charge waived!
            </div>
          )}
        </div>

        {/* BILL DETAILS */}
        <div className="cart-section-card bill-details-card">
          <h4>Bill Details</h4>
          <div className="bill-row">
            <span>Product Total (Real Store MRP)</span>
            <span className="bill-val">₹{productTotal}</span>
          </div>
          <div className="bill-row">
            <span>
              Delivery Fee ({selectedDeliveryTier.toUpperCase()})
            </span>
            <span className="bill-val">
              {deliveryFee === 0 ? <span className="free-text">FREE</span> : `₹${deliveryFee}`}
            </span>
          </div>
          <div className="bill-row">
            <span className="flex-center">
              Tamper-Evident Bag & Seal <ShieldCheck size={13} className="ml-1 text-primary" />
            </span>
            <span className="bill-val">₹{packagingFee}</span>
          </div>

          <div className="bill-divider" />

          <div className="bill-row grand-total-row">
            <strong>To Pay</strong>
            <strong className="grand-total-amount">₹{totalAmount}</strong>
          </div>
          <p className="bill-clarity-note">
            💡 Zero hidden markups. You pay strictly for physical items + verified handling.
          </p>
        </div>

        {/* Delivery Address */}
        <div className="cart-section-card address-card">
          <div className="address-icon">
            <MapPin size={18} className="text-primary" />
          </div>
          <div className="address-info">
            <span className="address-label">Delivering to Home</span>
            <p className="address-text">{userLocation.address}</p>
          </div>
        </div>

        {/* Payment Simulation */}
        <div className="cart-section-card payment-options-card">
          <h4>Payment Method (100% Prepaid)</h4>
          <div className="upi-options-row">
            <button
              className={`upi-pill ${paymentMethod === 'upi' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              🟢 UPI (GPay / PhonePe / Paytm)
            </button>
            <button
              className={`upi-pill ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              💳 Card / NetBanking
            </button>
          </div>
          <p className="payment-note">
            🔒 Cash on delivery disabled to eliminate cash-handling friction for quick neighborhood drops.
          </p>
        </div>
      </div>

      {/* Sticky Place Order Bar */}
      <div className="cart-checkout-footer">
        <div className="footer-price-info">
          <span className="footer-total-label">Grand Total</span>
          <span className="footer-total-price">₹{totalAmount}</span>
        </div>
        <button
          className="place-order-btn"
          disabled={isPlacing}
          onClick={handleCheckout}
        >
          {isPlacing ? (
            <span className="placing-spinner">Placing Order...</span>
          ) : (
            <>
              <span>Place Order</span>
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
