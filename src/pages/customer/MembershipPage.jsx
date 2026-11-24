import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { membershipPlans } from '../../data/mockData';
import {
  ArrowLeft,
  Check,
  Star,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export default function MembershipPage() {
  const navigate = useNavigate();
  const { isPassMember, togglePassMembership } = useApp();
  const [selectedPlanId, setSelectedPlanId] = useState('plan-quarterly');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubscribe = () => {
    if (!isPassMember) {
      togglePassMembership();
    }
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      navigate('/customer');
    }, 1500);
  };

  return (
    <div className="page customer-membership">
      {/* Header */}
      <div className="store-top-nav">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <span className="store-top-title">LocoKart Pass</span>
        <div style={{ width: 32 }} />
      </div>

      <div className="membership-scroll-body">
        {/* Hero Card */}
        <div className="membership-hero">
          <div className="membership-hero-badge">
            <Star size={14} fill="#F59E0B" color="#F59E0B" /> VIP Neighborhood Club
          </div>
          <h2>LocoKart Pass</h2>
          <p>
            Zero delivery charges on every single order, priority rider dispatch, and special Kirana counter discounts.
          </p>

          <div className="pass-perk-grid">
            <div className="perk-box">
              <span className="perk-emoji">🛵</span>
              <strong>₹0 Delivery Fee</strong>
              <span>On all orders & tiers</span>
            </div>
            <div className="perk-box">
              <span className="perk-emoji">⚡</span>
              <strong>Priority Rider</strong>
              <span>Faster shelf-to-door</span>
            </div>
            <div className="perk-box">
              <span className="perk-emoji">🏷️</span>
              <strong>Member Deals</strong>
              <span>Up to 10% cash savings</span>
            </div>
          </div>
        </div>

        {/* Current Status Pill */}
        {isPassMember ? (
          <div className="active-membership-banner">
            <div>
              <strong>⭐ You have an Active LocoPass!</strong>
              <p>Delivery fees are currently ₹0 on all local stores.</p>
            </div>
            <button className="cancel-pass-btn" onClick={togglePassMembership}>
              Deactivate (Demo)
            </button>
          </div>
        ) : (
          <div className="choose-plan-title">
            <h3>Select Your Pass Plan</h3>
            <p>Save over ₹450 every month on grocery logistics</p>
          </div>
        )}

        {/* Plans List */}
        <div className="plans-list">
          {membershipPlans.map((plan) => {
            const isSelected = selectedPlanId === plan.planId;
            return (
              <div
                key={plan.planId}
                className={`plan-card ${isSelected ? 'selected' : ''} ${plan.highlight ? 'highlight-plan' : ''}`}
                onClick={() => setSelectedPlanId(plan.planId)}
              >
                {plan.savingsBadge && (
                  <span className="plan-savings-pill">{plan.savingsBadge}</span>
                )}

                <div className="plan-header-row">
                  <div>
                    <h4 className="plan-name">{plan.name}</h4>
                    <span className="plan-tagline">{plan.tagline}</span>
                  </div>
                  <div className="plan-price-col">
                    <span className="plan-currency">₹</span>
                    <span className="plan-price">{plan.price}</span>
                    <span className="plan-duration">/{plan.duration}</span>
                  </div>
                </div>

                <div className="plan-benefits-list">
                  {plan.benefits.map((b, idx) => (
                    <div key={idx} className="plan-benefit-item">
                      <Check size={14} className="text-primary" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Financial Flywheel Explanation (for SAD Presentation) */}
        <div className="architecture-value-card">
          <h4>💡 The Revenue Flywheel Rationale</h4>
          <p>
            LocoKart Pass shifts revenue to predictable upfront recurring subscriptions while boosting order frequency. As neighborhood delivery density increases, per-drop rider logistics costs plunge from <strong>₹40 to ₹21.60</strong> via hyper-batching!
          </p>
        </div>
      </div>

      {/* Sticky Subscribe Footer */}
      <div className="membership-footer">
        <button className="subscribe-pass-cta" onClick={handleSubscribe}>
          {isPassMember ? 'Switch / Renew Pass' : 'Subscribe Now & Save'}
        </button>
      </div>

      {showSuccessToast && (
        <div className="success-toast">
          🎉 LocoKart Pass Activated! Free delivery unlocked!
        </div>
      )}
    </div>
  );
}
