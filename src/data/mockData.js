// ===== STORES =====
export const stores = [
  {
    id: 'store-1',
    name: 'Sharma General Store',
    tagline: 'Your trusted neighborhood kirana since 1998',
    distance: '0.4 km',
    deliveryTime: '15-20 min',
    rating: 4.8,
    reviewsCount: 342,
    image: '🏪',
    address: 'Shop 4, MG Road, Sector 5, Pune',
    isOpen: true,
    isBusyMode: false,
    fssaiVerified: true,
    counterBins: 3,
    categories: ['Dairy', 'Snacks', 'Beverages', 'Staples'],
  },
  {
    id: 'store-2',
    name: 'Gupta Kirana & Provisions',
    tagline: 'Fresh grocery & daily essentials at true MRP',
    distance: '0.7 km',
    deliveryTime: '20-25 min',
    rating: 4.6,
    reviewsCount: 219,
    image: '🛒',
    address: '45, Laxmi Market, Sector 5, Pune',
    isOpen: true,
    isBusyMode: false,
    fssaiVerified: true,
    counterBins: 2,
    categories: ['Staples', 'Personal Care', 'Snacks', 'Dairy'],
  },
  {
    id: 'store-3',
    name: 'Fresh Basket Mart',
    tagline: 'Farm-fresh veggies & cold dairy drinks',
    distance: '1.1 km',
    deliveryTime: '20-30 min',
    rating: 4.9,
    reviewsCount: 512,
    image: '🧺',
    address: '78, Lane 4, Koregaon Park, Pune',
    isOpen: true,
    isBusyMode: false,
    fssaiVerified: true,
    counterBins: 4,
    categories: ['Fruits & Veggies', 'Dairy', 'Beverages'],
  },
  {
    id: 'store-4',
    name: 'Verma Dairy & Bakery',
    tagline: 'Daily farm fresh milk, paneer, artisanal bread',
    distance: '0.5 km',
    deliveryTime: '15-20 min',
    rating: 4.7,
    reviewsCount: 180,
    image: '🥛',
    address: '14, Green Avenue, Pune',
    isOpen: true,
    isBusyMode: false,
    fssaiVerified: true,
    counterBins: 2,
    categories: ['Dairy', 'Beverages', 'Snacks'],
  },
  {
    id: 'store-5',
    name: 'Desi Daily Needs',
    tagline: 'Complete household provisions with real price clarity',
    distance: '0.3 km',
    deliveryTime: '10-15 min',
    rating: 4.8,
    reviewsCount: 420,
    image: '🏠',
    address: '5, Central Bazaar, Viman Nagar, Pune',
    isOpen: true,
    isBusyMode: true, // In rush hour demo
    fssaiVerified: true,
    counterBins: 3,
    categories: ['Dairy', 'Fruits & Veggies', 'Staples', 'Snacks', 'Beverages', 'Personal Care'],
  },
];

// ===== CATEGORIES =====
export const categories = [
  { id: 'all', name: 'All Items', icon: '✨' },
  { id: 'Dairy', name: 'Dairy & Eggs', icon: '🥛' },
  { id: 'Snacks', name: 'Snacks & Biscuits', icon: '🍿' },
  { id: 'Beverages', name: 'Drinks & Juices', icon: '🥤' },
  { id: 'Staples', name: 'Atta, Rice & Dal', icon: '🌾' },
  { id: 'Personal Care', name: 'Personal Care', icon: '🧴' },
  { id: 'Fruits & Veggies', name: 'Fresh Produce', icon: '🥬' },
];

// ===== PRODUCTS =====
export const products = [
  // Dairy
  { id: 'p1', name: 'Amul Taaza Toned Milk', brand: 'Amul', category: 'Dairy', mrp: 27, imageUrl: '🥛', storeId: 'store-1', inStock: true, bufferStock: 4, quantity: '500 ml' },
  { id: 'p2', name: 'Amul Butter Salted', brand: 'Amul', category: 'Dairy', mrp: 56, imageUrl: '🧈', storeId: 'store-1', inStock: true, bufferStock: 5, quantity: '100 g' },
  { id: 'p3', name: 'Mother Dairy Fresh Dahi', brand: 'Mother Dairy', category: 'Dairy', mrp: 42, imageUrl: '🫙', storeId: 'store-3', inStock: true, bufferStock: 3, quantity: '400 g' },
  { id: 'p4', name: 'Amul Malai Paneer', brand: 'Amul', category: 'Dairy', mrp: 90, imageUrl: '🧀', storeId: 'store-4', inStock: true, bufferStock: 2, quantity: '200 g' },
  { id: 'p5', name: 'Nestle Everyday Dairy Whitener', brand: 'Nestle', category: 'Dairy', mrp: 145, imageUrl: '🍯', storeId: 'store-2', inStock: true, bufferStock: 4, quantity: '400 g' },
  { id: 'p34', name: 'Country Fresh Farm Eggs (6 pcs)', brand: 'Farm Fresh', category: 'Dairy', mrp: 48, imageUrl: '🥚', storeId: 'store-1', inStock: true, bufferStock: 6, quantity: '6 pcs' },

  // Snacks
  { id: 'p6', name: "Lay's Classic Salted Chips", brand: "Lay's", category: 'Snacks', mrp: 20, imageUrl: '🍟', storeId: 'store-1', inStock: true, bufferStock: 8, quantity: '52 g' },
  { id: 'p7', name: 'Haldiram Nagpur Aloo Bhujia', brand: 'Haldiram', category: 'Snacks', mrp: 65, imageUrl: '🥨', storeId: 'store-2', inStock: true, bufferStock: 5, quantity: '200 g' },
  { id: 'p8', name: 'Parle-G Original Glucose Biscuits', brand: 'Parle', category: 'Snacks', mrp: 25, imageUrl: '🍪', storeId: 'store-1', inStock: true, bufferStock: 10, quantity: '250 g' },
  { id: 'p9', name: 'Kurkure Masala Munch Crisps', brand: 'Kurkure', category: 'Snacks', mrp: 20, imageUrl: '🌶️', storeId: 'store-5', inStock: true, bufferStock: 6, quantity: '90 g' },
  { id: 'p10', name: 'Britannia Good Day Cashew Cookies', brand: 'Britannia', category: 'Snacks', mrp: 45, imageUrl: '🍘', storeId: 'store-2', inStock: true, bufferStock: 5, quantity: '250 g' },
  { id: 'p11', name: 'Sunfeast Dark Fantasy Choco Fills', brand: 'Sunfeast', category: 'Snacks', mrp: 40, imageUrl: '🍫', storeId: 'store-5', inStock: true, bufferStock: 4, quantity: '75 g' },
  { id: 'p35', name: 'Act II Golden Sizzle Popcorn', brand: 'Act II', category: 'Snacks', mrp: 35, imageUrl: '🍿', storeId: 'store-1', inStock: true, bufferStock: 4, quantity: '60 g' },

  // Beverages
  { id: 'p12', name: 'Coca-Cola Soft Drink Bottle', brand: 'Coca-Cola', category: 'Beverages', mrp: 40, imageUrl: '🥤', storeId: 'store-1', inStock: true, bufferStock: 6, quantity: '750 ml' },
  { id: 'p13', name: 'Tata Tea Gold Premium Blend', brand: 'Tata', category: 'Beverages', mrp: 265, imageUrl: '🍵', storeId: 'store-2', inStock: true, bufferStock: 3, quantity: '500 g' },
  { id: 'p14', name: 'Nescafe Classic Instant Coffee', brand: 'Nescafe', category: 'Beverages', mrp: 175, imageUrl: '☕', storeId: 'store-5', inStock: true, bufferStock: 3, quantity: '50 g' },
  { id: 'p15', name: 'Real Activ 100% Mixed Fruit Juice', brand: 'Real', category: 'Beverages', mrp: 110, imageUrl: '🧃', storeId: 'store-3', inStock: true, bufferStock: 4, quantity: '1 L' },
  { id: 'p16', name: 'Bisleri Mineral Water with Minerals', brand: 'Bisleri', category: 'Beverages', mrp: 20, imageUrl: '💧', storeId: 'store-1', inStock: true, bufferStock: 12, quantity: '1 L' },

  // Staples
  { id: 'p17', name: 'India Gate Feast Rozzana Basmati Rice', brand: 'India Gate', category: 'Staples', mrp: 165, imageUrl: '🍚', storeId: 'store-2', inStock: true, bufferStock: 4, quantity: '1 kg' },
  { id: 'p18', name: 'Aashirvaad Superior MP Sharbati Atta', brand: 'Aashirvaad', category: 'Staples', mrp: 285, imageUrl: '🌾', storeId: 'store-1', inStock: true, bufferStock: 5, quantity: '5 kg' },
  { id: 'p19', name: 'Fortune Sunlite Refined Sunflower Oil', brand: 'Fortune', category: 'Staples', mrp: 145, imageUrl: '🫗', storeId: 'store-5', inStock: true, bufferStock: 5, quantity: '1 L' },
  { id: 'p20', name: 'Tata Salt Vacuum Evaporated Iodized', brand: 'Tata', category: 'Staples', mrp: 28, imageUrl: '🧂', storeId: 'store-2', inStock: true, bufferStock: 10, quantity: '1 kg' },
  { id: 'p21', name: 'MDH Deggi Mirch Red Chilli Powder', brand: 'MDH', category: 'Staples', mrp: 85, imageUrl: '🫚', storeId: 'store-1', inStock: true, bufferStock: 5, quantity: '100 g' },
  { id: 'p22', name: 'Organic Tovar / Arhar Dal Unpolished', brand: 'Local', category: 'Staples', mrp: 160, imageUrl: '🫘', storeId: 'store-5', inStock: true, bufferStock: 6, quantity: '1 kg' },
  { id: 'p23', name: 'Madhur Pure & Hygienic Refined Sugar', brand: 'Madhur', category: 'Staples', mrp: 49, imageUrl: '🍬', storeId: 'store-2', inStock: true, bufferStock: 8, quantity: '1 kg' },

  // Personal Care
  { id: 'p24', name: 'Dove Cream Beauty Bathing Bar', brand: 'Dove', category: 'Personal Care', mrp: 55, imageUrl: '🧼', storeId: 'store-2', inStock: true, bufferStock: 4, quantity: '100 g' },
  { id: 'p25', name: 'Colgate MaxFresh Peppermint Gel', brand: 'Colgate', category: 'Personal Care', mrp: 95, imageUrl: '🪥', storeId: 'store-4', inStock: true, bufferStock: 5, quantity: '150 g' },
  { id: 'p26', name: 'Head & Shoulders Cool Menthol Shampoo', brand: 'H&S', category: 'Personal Care', mrp: 220, imageUrl: '🧴', storeId: 'store-2', inStock: true, bufferStock: 3, quantity: '180 ml' },
  { id: 'p27', name: 'Dettol Original Germ Protection Handwash', brand: 'Dettol', category: 'Personal Care', mrp: 65, imageUrl: '🫧', storeId: 'store-5', inStock: true, bufferStock: 4, quantity: '200 ml' },

  // Fruits & Veggies
  { id: 'p28', name: 'Fresh Robusta Ripe Bananas (1 Dozen)', brand: 'Farm Fresh', category: 'Fruits & Veggies', mrp: 50, imageUrl: '🍌', storeId: 'store-3', inStock: true, bufferStock: 6, quantity: '12 pcs' },
  { id: 'p29', name: 'Fresh Hybrid Tomatoes', brand: 'Farm Fresh', category: 'Fruits & Veggies', mrp: 25, imageUrl: '🍅', storeId: 'store-3', inStock: true, bufferStock: 8, quantity: '500 g' },
  { id: 'p30', name: 'Fresh Red Onions (Nashik Quality)', brand: 'Farm Fresh', category: 'Fruits & Veggies', mrp: 35, imageUrl: '🧅', storeId: 'store-5', inStock: true, bufferStock: 10, quantity: '1 kg' },
  { id: 'p31', name: 'Fresh Jyoti Baking Potatoes', brand: 'Farm Fresh', category: 'Fruits & Veggies', mrp: 30, imageUrl: '🥔', storeId: 'store-3', inStock: true, bufferStock: 12, quantity: '1 kg' },
  { id: 'p32', name: 'Kashmir Delicious Crisp Red Apples (4 pcs)', brand: 'Farm Fresh', category: 'Fruits & Veggies', mrp: 120, imageUrl: '🍎', storeId: 'store-5', inStock: true, bufferStock: 4, quantity: '4 pcs' },
  { id: 'p33', name: 'Fresh Clean Palak (Spinach Leaves)', brand: 'Farm Fresh', category: 'Fruits & Veggies', mrp: 20, imageUrl: '🥬', storeId: 'store-3', inStock: true, bufferStock: 5, quantity: '250 g' },
];

// ===== ORDERS =====
export const orders = [
  {
    id: 'ord-1002',
    customerId: 'cust-1',
    merchantId: 'store-1',
    storeName: 'Sharma General Store',
    riderId: 'rider-1',
    riderName: 'Ravi Kumar',
    riderPhone: '+91 98765 43210',
    riderRating: 4.8,
    sealNumber: 'LK-SEAL-8821',
    sealVerified: false,
    items: [
      { productId: 'p1', name: 'Amul Taaza Toned Milk', qty: 2, mrp: 27, imageUrl: '🥛' },
      { productId: 'p6', name: "Lay's Classic Salted Chips", qty: 1, mrp: 20, imageUrl: '🍟' },
    ],
    status: 'PICKED_UP', // PLACED -> ACCEPTED -> PICKED_UP -> DELIVERED
    deliveryTier: 'standard',
    missingItemProtocol: 'auto_refund',
    productTotal: 74,
    deliveryFee: 0, // LocoPass active
    packagingFee: 15,
    totalAmount: 89,
    deliveryAddress: 'Flat 402, Sunshine Apts, Sector 5, Pune',
    timestamps: {
      placed: '13:40',
      accepted: '13:42',
      pickedUp: '13:48',
      delivered: null,
    },
  },
  {
    id: 'ord-1001',
    customerId: 'cust-1',
    merchantId: 'store-3',
    storeName: 'Fresh Basket Mart',
    riderId: 'rider-2',
    riderName: 'Sunil Yadav',
    riderPhone: '+91 98765 43211',
    riderRating: 4.6,
    sealNumber: 'LK-SEAL-7419',
    sealVerified: true,
    items: [
      { productId: 'p28', name: 'Fresh Robusta Ripe Bananas', qty: 1, mrp: 50, imageUrl: '🍌' },
      { productId: 'p15', name: 'Real Activ 100% Mixed Fruit Juice', qty: 1, mrp: 110, imageUrl: '🧃' },
    ],
    status: 'DELIVERED',
    deliveryTier: 'express',
    missingItemProtocol: 'call_replacement',
    productTotal: 160,
    deliveryFee: 19,
    packagingFee: 15,
    totalAmount: 194,
    deliveryAddress: 'Flat 402, Sunshine Apts, Sector 5, Pune',
    timestamps: {
      placed: '11:15',
      accepted: '11:17',
      pickedUp: '11:25',
      delivered: '11:35',
    },
  },
];

// ===== RIDERS =====
export const riders = [
  {
    id: 'rider-1',
    name: 'Ravi Kumar',
    phone: '+91 98765 43210',
    clusterZone: 'Sector 5 - MG Road Cluster (2km)',
    status: 'on-delivery',
    rating: 4.8,
    totalDeliveries: 482,
    vehicleType: 'EV Scooter',
    currentCapacity: 2,
  },
  {
    id: 'rider-2',
    name: 'Sunil Yadav',
    phone: '+91 98765 43211',
    clusterZone: 'Koregaon Park Zone',
    status: 'available',
    rating: 4.6,
    totalDeliveries: 310,
    vehicleType: 'Motorbike',
    currentCapacity: 1,
  },
];

// ===== CUSTOMERS =====
export const customers = [
  {
    id: 'cust-1',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
    address: 'Flat 402, Sunshine Apts, Sector 5, Pune',
    isPassMember: true,
  },
];

// ===== LOCOKART PASS PLANS =====
export const membershipPlans = [
  {
    planId: 'plan-monthly',
    name: 'LocoPass Monthly',
    tagline: 'Most flexible neighborhood pass',
    duration: '1 Month',
    price: 99,
    highlight: false,
    benefits: [
      '₹0 Delivery fee on all orders from any store',
      'Priority rider allocation during rush hours',
      'Instant missing-item UPI refund protection',
      'Exclusive member deals at neighborhood kiranas',
    ],
  },
  {
    planId: 'plan-quarterly',
    name: 'LocoPass Quarterly',
    tagline: 'Best value for frequent grocery buyers',
    duration: '3 Months',
    price: 199,
    savingsBadge: 'Save ₹98',
    highlight: true,
    benefits: [
      '₹0 Delivery fee on all orders from any store',
      'Priority rider allocation during rush hours',
      'Exclusive member pricing on daily staples & milk',
      'Tamper-evident VIP bag seals included',
      'Free split-cart dual store pickups',
    ],
  },
  {
    planId: 'plan-yearly',
    name: 'LocoPass Annual',
    tagline: 'Year-long complete peace of mind',
    duration: '12 Months',
    price: 699,
    savingsBadge: 'Best Long-Term Deal',
    highlight: false,
    benefits: [
      'Zero delivery charge for full 365 days',
      'Dedicated hyper-batch route prioritization',
      'Full monthly grocery spending reports',
      'Direct WhatsApp helpline with local store manager',
    ],
  },
];
