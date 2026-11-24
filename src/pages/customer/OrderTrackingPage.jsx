import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Bike,
  ShieldCheck,
  Phone,
  AlertTriangle,
  Package,
  Store,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const steps = [
  { key: 'PLACED', label: 'Order Placed', desc: 'Alert sent to Kirana soundbox', icon: '🛒' },
  { key: 'ACCEPTED', label: 'Merchant Packing', desc: 'Shelf items packed & tamper-sealed', icon: '🏪' },
  { key: 'PICKED_UP', label: 'Rider Picked Up', desc: 'Verbal handshake handover complete', icon: '🛵' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', desc: 'Rider navigating 2km neighborhood route', icon: '🚀' },
  { key: 'DELIVERED', label: 'Delivered', desc: 'Package received & seal verified', icon: '🎉' },
];

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus, verifyOrderSeal } = useApp();

  const [sealFeedback, setSealFeedback] = useState(null); // 'intact' | 'broken'

  const order = orders.find((o) => o.id === orderId) || orders[0];

  // Map order status to step index
  const getStepIndex = (status) => {
    switch (status) {
      case 'PLACED':
        return 0;
      case 'ACCEPTED':
        return 1;
      case 'PICKED_UP':
        return 2;
      case 'OUT_FOR_DELIVERY':
        return 3;
      case 'DELIVERED':
        return 4;
      default:
        return 2;
    }
  };

  const currentStepIndex = getStepIndex(order.status);

  // Demo controller to advance stage for laptop presentations
  const handleAdvanceStage = () => {
    const nextStatuses = ['PLACED', 'ACCEPTED', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const nextIdx = (currentStepIndex + 1) % nextStatuses.length;
    updateOrderStatus(order.id, nextStatuses[nextIdx]);
  };

  const handleVerifySeal = (isIntact) => {
    setSealFeedback(isIntact ? 'intact' : 'broken');
    verifyOrderSeal(order.id, isIntact);
  };

  return (
    <div className="page customer-tracking">
      {/* Top Header */}
      <div className="store-top-nav">
        <button className="back-btn" onClick={() => navigate('/customer/orders')} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <span className="store-top-title">Live Order Tracking</span>
        <button className="demo-step-btn" onClick={handleAdvanceStage} title="Click to advance stage for presentation">
          Demo ⏩
        </button>
      </div>

      <div className="tracking-scroll-body">
        {/* Estimated Time Card */}
        <div className="tracking-eta-card">
          <div className="eta-header">
            <span className="eta-badge">
              <Clock size={14} /> Hyperlocal Dispatch
            </span>
            <span className="order-id-tag">#{order.id}</span>
          </div>

          <div className="eta-time-row">
            <h2>{order.status === 'DELIVERED' ? 'Order Delivered!' : 'Arriving in 12–18 Mins'}</h2>
            <p>
              Fulfilling from <strong>{order.storeName || 'Sharma General Store'}</strong>
            </p>
          </div>

          {/* Interactive Stepper Progress Bar */}
          <div className="tracking-stepper">
            {steps.map((st, idx) => {
              const isPassed = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={st.key} className={`stepper-node ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="node-icon-circle">
                    {isPassed && idx < currentStepIndex ? (
                      <CheckCircle2 size={16} className="text-white" />
                    ) : (
                      <span>{st.icon}</span>
                    )}
                  </div>
                  <span className="node-label">{st.label}</span>
                </div>
              );
            })}
          </div>

          <div className="active-step-desc-box">
            <span className="desc-icon">ℹ️</span>
            <span>{steps[currentStepIndex]?.desc}</span>
          </div>
        </div>

        {/* Presentation Demo Banner */}
        <div className="presentation-tip-banner">
          <span>💡 <strong>Presentation Tip:</strong> Tap the "Demo ⏩" button above to cycle through Order Placed ➔ Merchant Packed ➔ Rider Handover ➔ Delivered!</span>
        </div>

        {/* Tamper-Evident Security Seal Section (Core LocoKart Feature) */}
        <div className="tracking-section-card seal-security-card">
          <div className="seal-header">
            <ShieldCheck size={20} className="text-primary" />
            <div>
              <h4>Tamper-Evident Security Seal</h4>
              <p>Bag sealed at Kirana counter with serialized security sticker.</p>
            </div>
          </div>

          <div className="seal-barcode-box">
            <div className="barcode-visual">
              ||| | |||| | ||| || |||| | ||
            </div>
            <div className="seal-id-row">
              <span className="seal-label">Security Seal ID:</span>
              <strong className="seal-number">{order.sealNumber || 'LK-SEAL-8821'}</strong>
            </div>
          </div>

          {order.status === 'DELIVERED' ? (
            <div className="seal-verification-area">
              <h5>Package Handover Verification</h5>
              {sealFeedback === 'intact' ? (
                <div className="seal-status-success">
                  ✅ Seal verified intact by customer. Order closed safely!
                </div>
              ) : sealFeedback === 'broken' ? (
                <div className="seal-status-warning">
                  ⚠️ Compromised seal reported. LocoKart instant replacement/refund initiated!
                </div>
              ) : (
                <div className="seal-verify-buttons">
                  <p className="seal-verify-prompt">Did the bag arrive with the security seal intact?</p>
                  <div className="btn-group-2">
                    <button
                      className="seal-confirm-btn"
                      onClick={() => handleVerifySeal(true)}
                    >
                      ✅ Yes, Seal Intact
                    </button>
                    <button
                      className="seal-reject-btn"
                      onClick={() => handleVerifySeal(false)}
                    >
                      ❌ Broken Seal
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="seal-instruction">
              🔒 <strong>Safety Protocol:</strong> Inspect this serialized sticker upon delivery before opening.
            </p>
          )}
        </div>

        {/* Assigned Rider Card */}
        <div className="tracking-section-card rider-card">
          <div className="rider-avatar">🛵</div>
          <div className="rider-info">
            <div className="rider-name-row">
              <h4>{order.riderName || 'Ravi Kumar'}</h4>
              <span className="rider-rating">⭐ {order.riderRating || 4.8}</span>
            </div>
            <p className="rider-meta">Neighborhood Delivery Partner • Electric Vehicle</p>
            <span className="rider-cluster-pill">📍 2km Cluster Route</span>
          </div>
          <a href={`tel:${order.riderPhone || '+919876543210'}`} className="rider-call-btn" aria-label="Call Rider">
            <Phone size={18} />
          </a>
        </div>

        {/* Missing Item Protocol Status */}
        <div className="tracking-section-card protocol-recap-card">
          <div className="protocol-recap-row">
            <span className="protocol-recap-icon">🛡️</span>
            <div>
              <strong>Missing Item Protection: Auto-Refund Active</strong>
              <p>If walk-in customers bought any item before pack, UPI refund is automatically processed.</p>
            </div>
          </div>
        </div>

        {/* Order Items & Receipt */}
        <div className="tracking-section-card order-recap-card">
          <h4>Order Items Summary</h4>
          <div className="recap-items-list">
            {order.items?.map((item, idx) => (
              <div key={idx} className="recap-item-row">
                <span className="recap-item-name">
                  {item.imageUrl} {item.name} × {item.qty}
                </span>
                <span className="recap-item-price">₹{item.mrp * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="recap-totals">
            <div className="recap-row">
              <span>Product MRP Total</span>
              <span>₹{order.productTotal}</span>
            </div>
            <div className="recap-row">
              <span>Delivery Fee ({order.deliveryTier?.toUpperCase()})</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
            </div>
            <div className="recap-row">
              <span>Tamper-Evident Packaging</span>
              <span>₹{order.packagingFee || 15}</span>
            </div>
            <div className="recap-row total">
              <strong>Total Paid</strong>
              <strong>₹{order.totalAmount}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
