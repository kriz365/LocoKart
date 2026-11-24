import { createContext, useContext, useState, useCallback } from 'react';
import { customers, orders as mockOrders, stores, products } from '../data/mockData';

const AppContext = createContext(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }) {
  // ---- Role / User state ----
  const [role, setRole] = useState('customer'); // 'customer' | 'merchant' | 'rider'
  const [currentUser, setCurrentUser] = useState(customers[0]);
  const [isPassMember, setIsPassMember] = useState(customers[0]?.isPassMember ?? true);

  const togglePassMembership = useCallback(() => {
    setIsPassMember((prev) => !prev);
  }, []);

  // ---- Store selection & Geofence ----
  const [userLocation, setUserLocation] = useState({
    address: 'Flat 402, Sunshine Apts, MG Road, Sector 5, Pune',
    pincode: '411014',
    geofenceKm: 2.0,
    isWithinGeofence: true,
  });

  // ---- Cart state ----
  const [cartItems, setCartItems] = useState([
    { ...products[0], qty: 2 }, // 2x Amul Milk
    { ...products[5], qty: 1 }, // 1x Lays
  ]);
  const [selectedDeliveryTier, setSelectedDeliveryTier] = useState('standard'); // 'express' | 'standard' | 'scheduled'
  const [missingItemProtocol, setMissingItemProtocol] = useState('auto_refund'); // 'auto_refund' | 'call_replacement' | 'cancel_order'

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === productId);
      if (existing && existing.qty > 1) {
        return prev.map((i) =>
          i.id === productId ? { ...i, qty: i.qty - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== productId);
    });
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const getCartTotal = useCallback(
    () => cartItems.reduce((sum, item) => sum + item.mrp * item.qty, 0),
    [cartItems]
  );

  const getDeliveryFee = useCallback(() => {
    if (isPassMember) return 0;
    if (selectedDeliveryTier === 'express') return 19;
    if (selectedDeliveryTier === 'standard') return 9;
    if (selectedDeliveryTier === 'scheduled') return 0;
    return 9;
  }, [isPassMember, selectedDeliveryTier]);

  const packagingFee = 15; // Flat standardized tamper-evident packaging fee

  // ---- Orders state ----
  const [orders, setOrders] = useState(mockOrders);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState('ord-1002');

  const placeOrder = useCallback(
    (orderData = {}) => {
      const storeId = cartItems[0]?.storeId || 'store-1';
      const storeObj = stores.find((s) => s.id === storeId) || stores[0];
      const prodTotal = getCartTotal();
      const delFee = getDeliveryFee();
      const total = prodTotal + delFee + packagingFee;

      const newOrder = {
        id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
        customerId: currentUser.id,
        merchantId: storeObj.id,
        storeName: storeObj.name,
        riderId: 'rider-1',
        riderName: 'Ravi Kumar',
        riderPhone: '+91 98765 43210',
        riderRating: 4.8,
        sealNumber: `LK-SEAL-${Math.floor(1000 + Math.random() * 9000)}`,
        sealVerified: false,
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          qty: item.qty,
          mrp: item.mrp,
          imageUrl: item.imageUrl,
        })),
        status: 'PLACED', // PLACED -> ACCEPTED -> PICKED_UP -> DELIVERED
        deliveryTier: selectedDeliveryTier,
        missingItemProtocol: missingItemProtocol,
        productTotal: prodTotal,
        deliveryFee: delFee,
        packagingFee: packagingFee,
        totalAmount: total,
        deliveryAddress: userLocation.address,
        timestamps: {
          placed: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          accepted: null,
          pickedUp: null,
          delivered: null,
        },
        ...orderData,
      };

      setOrders((prev) => [newOrder, ...prev]);
      setActiveTrackingOrderId(newOrder.id);
      clearCart();
      return newOrder;
    },
    [cartItems, currentUser, getCartTotal, getDeliveryFee, packagingFee, selectedDeliveryTier, missingItemProtocol, userLocation, clearCart]
  );

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const tsKey =
          newStatus === 'ACCEPTED' ? 'accepted'
          : newStatus === 'PICKED_UP' ? 'pickedUp'
          : newStatus === 'DELIVERED' ? 'delivered'
          : null;
        return {
          ...o,
          status: newStatus,
          timestamps: tsKey
            ? { ...o.timestamps, [tsKey]: nowTime }
            : o.timestamps,
        };
      })
    );
  }, []);

  const verifyOrderSeal = useCallback((orderId, isIntact) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return { ...o, sealVerified: isIntact, status: 'DELIVERED' };
      })
    );
  }, []);

  // ---- Notifications ----
  const [notifications, setNotifications] = useState([]);
  const addNotification = useCallback((message, type = 'info') => {
    const n = { id: Date.now(), message, type };
    setNotifications((prev) => [n, ...prev]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((item) => item.id !== n.id));
    }, 4000);
  }, []);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        isPassMember,
        togglePassMembership,
        userLocation,
        setUserLocation,
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
        orders,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        placeOrder,
        updateOrderStatus,
        verifyOrderSeal,
        notifications,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
