import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import MobileFrame from './components/MobileFrame';
import BottomNav from './components/BottomNav';
import RoleSwitcher from './components/RoleSwitcher';

// Customer pages
import HomePage from './pages/customer/HomePage';
import StorePage from './pages/customer/StorePage';
import CartPage from './pages/customer/CartPage';
import OrdersPage from './pages/customer/OrdersPage';
import OrderTrackingPage from './pages/customer/OrderTrackingPage';
import SearchPage from './pages/customer/SearchPage';
import ProfilePage from './pages/customer/ProfilePage';
import MembershipPage from './pages/customer/MembershipPage';

// Placeholder for Merchant & Rider roles until built
function Placeholder({ title, subtitle, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 24, textAlign: 'center', flexDirection: 'column' }}>
      <span style={{ fontSize: 48, marginBottom: 16 }}>{icon || '🚧'}</span>
      <h3 style={{ color: 'var(--color-primary)', marginBottom: 8, fontSize: 20 }}>{title}</h3>
      <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.5, maxWidth: 260 }}>
        {subtitle || 'Switch to Customer role from the floating buttons on top to explore the complete live customer experience!'}
      </p>
    </div>
  );
}

function App() {
  const { role } = useApp();

  return (
    <div className="app-wrapper">
      <RoleSwitcher />
      <MobileFrame>
        <div className="screen-content">
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<Navigate to={`/${role}`} replace />} />

            {/* Customer Routes (100% Fully Built) */}
            <Route path="/customer" element={<HomePage />} />
            <Route path="/customer/search" element={<SearchPage />} />
            <Route path="/customer/cart" element={<CartPage />} />
            <Route path="/customer/orders" element={<OrdersPage />} />
            <Route path="/customer/orders/:orderId" element={<OrderTrackingPage />} />
            <Route path="/customer/profile" element={<ProfilePage />} />
            <Route path="/customer/store/:storeId" element={<StorePage />} />
            <Route path="/customer/membership" element={<MembershipPage />} />

            {/* Merchant Routes */}
            <Route path="/merchant" element={<Placeholder title="Kirana Merchant Dashboard" subtitle="Incoming audio soundbox alerts, order acceptance, and stock management." icon="🏪" />} />
            <Route path="/merchant/orders" element={<Placeholder title="Merchant Order Ledger" subtitle="Accept/Reject orders and apply tamper-evident security seals." icon="📋" />} />
            <Route path="/merchant/inventory" element={<Placeholder title="Inventory & Buffer Engine" subtitle="Smart barcode scan & top 20 daily fast-moving shelf sync." icon="📦" />} />
            <Route path="/merchant/analytics" element={<Placeholder title="Kirana Sales Analytics" subtitle="Revenue, commission (5-7%), and FMCG advertising insights." icon="📈" />} />
            <Route path="/merchant/settings" element={<Placeholder title="Merchant Settings" subtitle="Busy Mode rush hour toggles and Soundbox device controls." icon="⚙️" />} />

            {/* Rider Routes */}
            <Route path="/rider" element={<Placeholder title="Gig Rider Fleet Tasks" subtitle="Verbal handshake pickup, missing item override, and tamper-proof delivery." icon="🛵" />} />
            <Route path="/rider/map" element={<Placeholder title="Neighborhood Cluster Map" subtitle="2km dense routing and hyper-batch order navigation." icon="🗺️" />} />
            <Route path="/rider/earnings" element={<Placeholder title="Rider Earnings & Incentives" subtitle="Base drops (₹25-35), distance incentives, and milestone bonuses." icon="💰" />} />
            <Route path="/rider/profile" element={<Placeholder title="Rider Partner Profile" subtitle="EV scooter credentials and ratings." icon="👤" />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/customer" replace />} />
          </Routes>
        </div>
        <BottomNav />
      </MobileFrame>
    </div>
  );
}

export default App;
