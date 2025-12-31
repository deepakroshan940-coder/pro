// localStorage utility functions

// Products
export function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

export function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

export function getProductById(id) {
    const products = getProducts();
    return products.find(p => p.id === id);
}

// Cart
export function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function clearCart() {
    localStorage.removeItem('cart');
}

export function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    
    saveCart(cart);
}

export function removeFromCart(productId) {
    const cart = getCart();
    const filteredCart = cart.filter(item => item.productId !== productId);
    saveCart(filteredCart);
}

export function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart(cart);
        }
    }
}

// Admin
export function getAdmin() {
    const admin = localStorage.getItem('admin');
    if (!admin) {
        // Initialize default admin credentials
        const defaultAdmin = {
            username: 'admin',
            password: 'admin123'
        };
        saveAdmin(defaultAdmin);
        return defaultAdmin;
    }
    return JSON.parse(admin);
}

export function saveAdmin(admin) {
    localStorage.setItem('admin', JSON.stringify(admin));
}

export function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

export function setAdminLoggedIn(status) {
    if (status) {
        localStorage.setItem('adminLoggedIn', 'true');
    } else {
        localStorage.removeItem('adminLoggedIn');
    }
}

// Orders
export function getOrders() {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
}

export function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function saveOrder(order) {
    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);
}

export function getOrderById(orderId) {
    const orders = getOrders();
    return orders.find(o => o.orderId === orderId);
}

// Initialize sample products
export function initializeSampleProducts() {
    const existingProducts = getProducts();
    if (existingProducts.length > 0) {
        return; // Don't overwrite existing products
    }
    
    const sampleProducts = [
        {
            id: 'PROD-001',
            name: 'Wireless Bluetooth Headphones',
            description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Features active noise cancellation, crystal-clear sound quality, and comfortable over-ear design.',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
            stock: 45,
            category: 'Electronics'
        },
        {
            id: 'PROD-002',
            name: 'Smart Fitness Watch',
            description: 'Advanced fitness tracking watch with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Water-resistant design perfect for all activities.',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            stock: 32,
            category: 'Electronics'
        },
        {
            id: 'PROD-003',
            name: 'Organic Cotton T-Shirt',
            description: 'Comfortable 100% organic cotton t-shirt. Soft, breathable fabric perfect for everyday wear. Available in multiple colors, sustainably made.',
            price: 24.99,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            stock: 78,
            category: 'Clothing'
        },
        {
            id: 'PROD-004',
            name: 'Stainless Steel Water Bottle',
            description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof design with easy-carry handle.',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
            stock: 56,
            category: 'Home & Kitchen'
        },
        {
            id: 'PROD-005',
            name: 'Leather Laptop Backpack',
            description: 'Premium genuine leather backpack with padded laptop compartment, multiple pockets, and comfortable shoulder straps. Perfect for work or travel.',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
            stock: 28,
            category: 'Accessories'
        },
        {
            id: 'PROD-006',
            name: 'Wireless Charging Pad',
            description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.',
            price: 34.99,
            image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
            stock: 67,
            category: 'Electronics'
        },
        {
            id: 'PROD-007',
            name: 'Yoga Mat Premium',
            description: 'Extra-thick non-slip yoga mat with carrying strap. Eco-friendly TPE material, perfect for yoga, pilates, and exercise routines.',
            price: 39.99,
            image: 'https://images.unsplash.com/photo-1601925260368-ae2f83d4876a?w=500',
            stock: 43,
            category: 'Sports & Fitness'
        },
        {
            id: 'PROD-008',
            name: 'Ceramic Coffee Mug Set',
            description: 'Set of 4 handcrafted ceramic mugs. Dishwasher and microwave safe. Beautiful glazed finish, perfect for home or office.',
            price: 19.99,
            image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca93?w=500',
            stock: 89,
            category: 'Home & Kitchen'
        },
        {
            id: 'PROD-009',
            name: 'Running Shoes',
            description: 'Lightweight running shoes with breathable mesh upper and cushioned sole. Perfect for jogging, walking, and daily exercise.',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
            stock: 52,
            category: 'Footwear'
        },
        {
            id: 'PROD-010',
            name: 'Portable Phone Power Bank',
            description: 'High-capacity 20000mAh power bank with fast charging technology. Compatible with all smartphones and tablets. Includes USB-C and micro-USB cables.',
            price: 44.99,
            image: 'https://images.unsplash.com/photo-1609091839311-d5365f5bf644?w=500',
            stock: 61,
            category: 'Electronics'
        },
        {
            id: 'PROD-011',
            name: 'Classic Denim Jacket',
            description: 'Timeless denim jacket with vintage wash. 100% cotton, comfortable fit, perfect for layering. Durable construction for years of wear.',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
            stock: 37,
            category: 'Clothing'
        },
        {
            id: 'PROD-012',
            name: 'Indoor Plant Set',
            description: 'Set of 3 easy-care indoor plants in decorative pots. Includes care instructions. Perfect for home or office decoration.',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
            stock: 24,
            category: 'Home & Garden'
        },
        {
            id: 'PROD-013',
            name: 'Bluetooth Speaker',
            description: 'Portable waterproof Bluetooth speaker with 360-degree sound. 12-hour battery life, perfect for outdoor adventures and parties.',
            price: 69.99,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
            stock: 41,
            category: 'Electronics'
        },
        {
            id: 'PROD-014',
            name: 'Stainless Steel Cookware Set',
            description: '10-piece stainless steel cookware set. Includes pots, pans, and lids. Dishwasher safe, compatible with all cooktops.',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
            stock: 19,
            category: 'Home & Kitchen'
        },
        {
            id: 'PROD-015',
            name: 'Cotton Bedding Set',
            description: 'Luxurious 100% cotton bedding set includes duvet cover, pillowcases, and fitted sheet. Soft, breathable, and machine washable.',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500',
            stock: 33,
            category: 'Home & Kitchen'
        },
        {
            id: 'PROD-016',
            name: 'Mechanical Keyboard',
            description: 'RGB backlit mechanical gaming keyboard with Cherry MX switches. Programmable keys, wrist rest included. Perfect for gaming and typing.',
            price: 119.99,
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
            stock: 26,
            category: 'Electronics'
        },
        {
            id: 'PROD-017',
            name: 'Leather Wallet',
            description: 'Genuine leather wallet with RFID blocking technology. Multiple card slots, cash compartment, and coin pocket. Slim design.',
            price: 39.99,
            image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
            stock: 58,
            category: 'Accessories'
        },
        {
            id: 'PROD-018',
            name: 'Resistance Bands Set',
            description: 'Set of 5 resistance bands with different resistance levels. Includes door anchor, handles, and carrying bag. Perfect for home workouts.',
            price: 24.99,
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
            stock: 72,
            category: 'Sports & Fitness'
        },
        {
            id: 'PROD-019',
            name: 'Aromatherapy Diffuser',
            description: 'Ultrasonic essential oil diffuser with 7-color LED lights. Auto shut-off, whisper-quiet operation. Perfect for relaxation and wellness.',
            price: 34.99,
            image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500',
            stock: 47,
            category: 'Home & Kitchen'
        },
        {
            id: 'PROD-020',
            name: 'Canvas Art Print',
            description: 'High-quality canvas art print, ready to hang. Modern abstract design, printed on premium canvas with fade-resistant inks.',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500',
            stock: 15,
            category: 'Home Decor'
        },
        {
            id: 'PROD-021',
            name: 'Gaming Mouse',
            description: 'High-precision gaming mouse with customizable RGB lighting. 16000 DPI sensor, programmable buttons, ergonomic design.',
            price: 54.99,
            image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
            stock: 38,
            category: 'Electronics'
        },
        {
            id: 'PROD-022',
            name: 'Stainless Steel Watch',
            description: 'Classic stainless steel watch with leather strap. Water-resistant, date display, and luminous hands. Timeless design.',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            stock: 22,
            category: 'Accessories'
        },
        {
            id: 'PROD-023',
            name: 'Bamboo Cutting Board',
            description: 'Eco-friendly bamboo cutting board. Naturally antimicrobial, knife-friendly surface, and easy to clean. Reversible design.',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500',
            stock: 64,
            category: 'Home & Kitchen'
        },
        {
            id: 'PROD-024',
            name: 'Cotton Face Masks Pack',
            description: 'Pack of 5 reusable cotton face masks. Washable, breathable, and comfortable. Multiple colors included.',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500',
            stock: 91,
            category: 'Accessories'
        },
        {
            id: 'PROD-025',
            name: 'Tablet Stand',
            description: 'Adjustable aluminum tablet stand. Holds tablets and phones securely. Foldable design, perfect for desk or travel.',
            price: 19.99,
            image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
            stock: 53,
            category: 'Electronics'
        },
        {
            id: 'PROD-026',
            name: 'Hiking Backpack',
            description: 'Durable hiking backpack with hydration system compatibility. Multiple compartments, rain cover included. Perfect for outdoor adventures.',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
            stock: 29,
            category: 'Sports & Outdoors'
        },
        {
            id: 'PROD-027',
            name: 'Scented Candle Set',
            description: 'Set of 3 soy wax candles in elegant glass jars. Long-lasting, clean-burning, with natural fragrances. Perfect for relaxation.',
            price: 34.99,
            image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500',
            stock: 46,
            category: 'Home Decor'
        },
        {
            id: 'PROD-028',
            name: 'Wireless Earbuds',
            description: 'True wireless earbuds with noise cancellation. 8-hour battery life, charging case included. Perfect for music and calls.',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
            stock: 55,
            category: 'Electronics'
        },
        {
            id: 'PROD-029',
            name: 'Dumbbell Set',
            description: 'Adjustable dumbbell set with weight plates. Perfect for home gym workouts. Includes storage rack and weight plates from 5lbs to 25lbs.',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
            stock: 31,
            category: 'Sports & Fitness'
        },
        {
            id: 'PROD-030',
            name: 'Reading Glasses',
            description: 'Stylish reading glasses with blue light blocking technology. Lightweight frame, comfortable fit. Multiple magnification options available.',
            price: 24.99,
            image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500',
            stock: 42,
            category: 'Accessories'
        }
    ];
    
    saveProducts(sampleProducts);
}

