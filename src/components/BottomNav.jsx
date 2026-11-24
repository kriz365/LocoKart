import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Home, Search, ShoppingCart, Package, User,
  LayoutDashboard, ClipboardList, Boxes, BarChart3, Settings,
  ListTodo, Map, Wallet,
} from 'lucide-react';

const tabs = {
  customer: [
    { label: 'Home', icon: Home, path: '/customer' },
    { label: 'Search', icon: Search, path: '/customer/search' },
    { label: 'Cart', icon: ShoppingCart, path: '/customer/cart' },
    { label: 'Orders', icon: Package, path: '/customer/orders' },
    { label: 'Profile', icon: User, path: '/customer/profile' },
  ],
  merchant: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/merchant' },
    { label: 'Orders', icon: ClipboardList, path: '/merchant/orders' },
    { label: 'Inventory', icon: Boxes, path: '/merchant/inventory' },
    { label: 'Analytics', icon: BarChart3, path: '/merchant/analytics' },
    { label: 'Settings', icon: Settings, path: '/merchant/settings' },
  ],
  rider: [
    { label: 'Tasks', icon: ListTodo, path: '/rider' },
    { label: 'Map', icon: Map, path: '/rider/map' },
    { label: 'Earnings', icon: Wallet, path: '/rider/earnings' },
    { label: 'Profile', icon: User, path: '/rider/profile' },
  ],
};

function BottomNav() {
  const { role } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const items = tabs[role] || tabs.customer;

  return (
    <nav className="bottom-nav">
      {items.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            className={`bottom-nav-item${isActive ? ' active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
