import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Package,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Store,
  ShieldCheck,
} from 'lucide-react';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { orders } = useApp();
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'active' | 'completed'

  const activeOrders = orders.filter((o) => o.status !== 'DELIVERED');
  const pastOrders = orders.filter((o) => o.status === 'DELIVERED');

  const displayedOrders =
    filterTab === 'active'
      ? activeOrders
      : filterTab === 'completed'
      ? pastOrders
      : orders;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PLACED':
        return <span className="status-badge placed">🛒 Order Placed</span>;
      case 'ACCEPTED':
        return <span className="status-badge accepted">🏪 Packing at Store</span>;
      case 'PICKED_UP':
        return <span className="status-badge transit">🛵 Out for Delivery</span>;
      case 'OUT_FOR_DELIVERY':
        return <span className="status-badge transit">🛵 Out for Delivery</span>;
      case 'DELIVERED':
        return <span className="status-badge delivered">✅ Delivered</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="page customer-orders">
      {/* Top Header */}
      <div className="orders-header">
        <h2>My Orders</h2>
        <p>Hyperlocal grocery deliveries with verified seals</p>
      </div>

      {/* Filter Tabs */}
      <div className="orders-tab-filter">
        <button
          className={`tab-btn ${filterTab === 'all' ? 'active' : ''}`}
          onClick={() => setFilterTab('all')}
        >
          All ({orders.length})
        </button>
        <button
          className={`tab-btn ${filterTab === 'active' ? 'active' : ''}`}
          onClick={() => setFilterTab('active')}
        >
          Active ({activeOrders.length})
        </button>
        <button
          className={`tab-btn ${filterTab === 'completed' ? 'active' : ''}`}
          onClick={() => setFilterTab('completed')}
        >
          Past ({pastOrders.length})
        </button>
      </div>

      {/* Orders List */}
      <div className="orders-scroll-list">
        {displayedOrders.map((order) => {
          const isActive = order.status !== 'DELIVERED';
          return (
            <div
              key={order.id}
              className={`order-card-summary ${isActive ? 'order-active-glow' : ''}`}
              onClick={() => navigate(`/customer/orders/${order.id}`)}
            >
              <div className="order-card-top">
                <div className="store-avatar-mini">🏪</div>
                <div className="order-store-meta">
                  <h4 className="order-store-name">{order.storeName || 'Sharma General Store'}</h4>
                  <span className="order-time-stamp">
                    #{order.id} • {order.timestamps?.placed || 'Today'}
                  </span>
                </div>
                {getStatusBadge(order.status)}
              </div>

              {/* Items summary */}
              <div className="order-items-snippet">
                {order.items?.map((item, idx) => (
                  <span key={idx} className="item-pill-tag">
                    {item.name} ×{item.qty}
                  </span>
                ))}
              </div>

              {/* Card Footer */}
              <div className="order-card-bottom">
                <div className="order-total-col">
                  <span className="order-total-label">Total Amount</span>
                  <span className="order-total-amt">₹{order.totalAmount}</span>
                </div>

                <button
                  className={`track-order-cta ${isActive ? 'active-cta' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/customer/orders/${order.id}`);
                  }}
                >
                  {isActive ? (
                    <>
                      <span>Track Live</span>
                      <ArrowRight size={15} />
                    </>
                  ) : (
                    <>
                      <span>View Receipt</span>
                      <ChevronRight size={15} />
                    </>
                  )}
                </button>
              </div>

              {/* Serialized seal notice */}
              <div className="order-seal-footer">
                <ShieldCheck size={13} className="text-primary" />
                <span>Security Seal: {order.sealNumber || 'LK-SEAL-8821'}</span>
              </div>
            </div>
          );
        })}

        {displayedOrders.length === 0 && (
          <div className="empty-orders-view">
            <span className="empty-emoji">📦</span>
            <h4>No orders in this tab</h4>
            <p>Your hyperlocal orders from neighborhood Kiranas will appear here.</p>
            <button className="browse-stores-btn mt-3" onClick={() => navigate('/customer')}>
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
