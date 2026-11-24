import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  User,
  Star,
  MapPin,
  CreditCard,
  Package,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, isPassMember, togglePassMembership, userLocation } = useApp();
  const [showFaq, setShowFaq] = useState(false);

  return (
    <div className="page customer-profile">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar-circle">
          <span>👤</span>
        </div>
        <div className="profile-user-info">
          <h3>{currentUser?.name || 'Rahul Sharma'}</h3>
          <p>{currentUser?.phone || '+91 98765 43210'}</p>
          <span className="profile-email">{currentUser?.email || 'rahul.sharma@example.com'}</span>
        </div>
      </div>

      <div className="profile-scroll-body">
        {/* LocoKart Pass Membership Status Card */}
        <div className={`locopass-status-card ${isPassMember ? 'active' : ''}`}>
          <div className="pass-card-left">
            <span className="pass-badge-icon">⭐</span>
            <div>
              <div className="pass-title-row">
                <h4>LocoKart Pass</h4>
                <span className={`pass-status-pill ${isPassMember ? 'active' : 'inactive'}`}>
                  {isPassMember ? 'ACTIVE VIP' : 'NOT ACTIVE'}
                </span>
              </div>
              <p>
                {isPassMember
                  ? 'Unlimited ₹0 Delivery on all Kirana stores + Priority routing.'
                  : 'Subscribe for ₹0 delivery charges & exclusive local discounts.'}
              </p>
            </div>
          </div>
          <button
            className="manage-pass-btn"
            onClick={() => navigate('/customer/membership')}
          >
            {isPassMember ? 'Manage' : 'Join Pass'}
          </button>
        </div>

        {/* Quick Demo Toggle for Presentation */}
        <div className="demo-toggle-card">
          <div className="toggle-left">
            <strong>Toggle LocoPass for Demo</strong>
            <p>Instantly see cart delivery fees change to FREE</p>
          </div>
          <button
            className={`demo-switch-btn ${isPassMember ? 'on' : 'off'}`}
            onClick={togglePassMembership}
          >
            {isPassMember ? 'ON (Pass Active)' : 'OFF (Regular User)'}
          </button>
        </div>

        {/* Saved Addresses */}
        <div className="profile-section-card">
          <div className="section-title-row">
            <h4>Saved Addresses</h4>
            <span className="text-primary text-sm">Add New</span>
          </div>

          <div className="address-item-row">
            <div className="addr-icon">🏠</div>
            <div className="addr-meta">
              <strong>Home (Current Delivery Location)</strong>
              <p>{userLocation.address}</p>
              <span className="geofence-tag">2.0 km Geofence Active</span>
            </div>
          </div>

          <div className="address-item-row">
            <div className="addr-icon">🏢</div>
            <div className="addr-meta">
              <strong>Work / Office</strong>
              <p>Cyber City, Magarpatta, Hadapsar, Pune - 411028</p>
            </div>
          </div>
        </div>

        {/* Account Quick Links */}
        <div className="profile-section-card menu-card">
          <div className="menu-item" onClick={() => navigate('/customer/orders')}>
            <div className="menu-left">
              <Package size={18} className="text-primary" />
              <span>Order History & Receipts</span>
            </div>
            <ChevronRight size={16} />
          </div>

          <div className="menu-item" onClick={() => navigate('/customer/membership')}>
            <div className="menu-left">
              <Star size={18} className="text-accent" />
              <span>LocoKart Pass Subscription Plans</span>
            </div>
            <ChevronRight size={16} />
          </div>

          <div className="menu-item" onClick={() => setShowFaq(!showFaq)}>
            <div className="menu-left">
              <HelpCircle size={18} className="text-muted" />
              <span>LocoKart Operational Principles (SAD Architecture)</span>
            </div>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Architecture & FAQ Dropdown (Crucial for Software Architecture Presentation) */}
        {showFaq && (
          <div className="profile-section-card faq-card">
            <h4>Hyperlocal Architecture FAQ</h4>

            <div className="faq-item">
              <strong>1. Why Real Store MRP?</strong>
              <p>
                Unlike dark-store apps with hidden product markups, LocoKart customers pay the exact physical counter price.
              </p>
            </div>

            <div className="faq-item">
              <strong>2. How does the Buffer Stock Cushion work?</strong>
              <p>
                To avoid out-of-stock cancellations when walk-in customers buy from physical shelves, the app caps online stock at 60-70% of physical inventory.
              </p>
            </div>

            <div className="faq-item">
              <strong>3. Tamper-Proof Security Seal?</strong>
              <p>
                Every grocery bag is sealed at the Kirana counter with a serialized sticker (e.g. LK-SEAL-8821). Customers check the seal upon handover.
              </p>
            </div>

            <div className="faq-item">
              <strong>4. Rider Handshake (No QR Delay)?</strong>
              <p>
                Eliminates bottlenecks. Handover uses verbal confirmation (Order #) + visual seal check, keeping pickup under 60 seconds.
              </p>
            </div>

            <div className="faq-item">
              <strong>5. Hyper-Batching Economics?</strong>
              <p>
                Holding orders in a 3-5 minute window allows 1 rider to deliver 2-3 orders to the same society, dropping rider cost from ₹40 to ~₹21 per drop!
              </p>
            </div>
          </div>
        )}

        {/* App Version Info */}
        <div className="app-version-footer">
          <span>LocoKart Hyperlocal Commerce V1.0</span>
          <p>SAD Project • Kirana, Customer & Rider Unified Platform</p>
        </div>
      </div>
    </div>
  );
}
