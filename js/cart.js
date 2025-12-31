import { getCart, getProducts, updateCartQuantity, removeFromCart } from './storage.js';

// Display cart items
function displayCart() {
    const cart = getCart();
    const products = getProducts();
    const container = document.getElementById('cart-container');
    const emptyState = document.getElementById('empty-state');
    
    if (cart.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        updateCartCount();
        return;
    }
    
    container.style.display = 'block';
    emptyState.style.display = 'none';
    
    let subtotal = 0;
    
    const cartItemsHTML = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="cart-item">
                <img src="${product.image || 'https://via.placeholder.com/120x120?text=No+Image'}" 
                     alt="${product.name}" 
                     class="cart-item-image"
                     onerror="this.src='https://via.placeholder.com/120x120?text=No+Image'">
                <div class="cart-item-details">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">$${product.price.toFixed(2)} each</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity('${product.id}')">-</button>
                        <input type="number" 
                               class="quantity-input" 
                               value="${item.quantity}" 
                               min="1" 
                               max="${product.stock}"
                               onchange="updateQuantityInput('${product.id}', this.value)">
                        <button class="quantity-btn" onclick="increaseQuantity('${product.id}', ${product.stock})">+</button>
                        <button class="btn btn-danger btn-small" onclick="removeItem('${product.id}')" style="margin-left: 1rem;">Remove</button>
                    </div>
                </div>
                <div style="font-size: 1.2rem; font-weight: bold; margin-left: auto;">
                    $${itemTotal.toFixed(2)}
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = `
        ${cartItemsHTML}
        <div class="cart-summary">
            <div class="cart-total">
                <span>Total:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <a href="checkout.html" class="btn btn-primary" style="width: 100%; text-align: center;">Proceed to Checkout</a>
        </div>
    `;
    
    updateCartCount();
}

// Quantity controls
window.increaseQuantity = function(productId, maxStock) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item && item.quantity < maxStock) {
        updateCartQuantity(productId, item.quantity + 1);
        displayCart();
    } else if (item && item.quantity >= maxStock) {
        alert(`Only ${maxStock} items available in stock!`);
    }
};

window.decreaseQuantity = function(productId) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item && item.quantity > 1) {
        updateCartQuantity(productId, item.quantity - 1);
        displayCart();
    }
};

window.updateQuantityInput = function(productId, value) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(value);
    
    if (isNaN(quantity) || quantity < 1) {
        displayCart();
        return;
    }
    
    if (quantity > product.stock) {
        alert(`Only ${product.stock} items available in stock!`);
        displayCart();
        return;
    }
    
    updateCartQuantity(productId, quantity);
    displayCart();
};

window.removeItem = function(productId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        removeFromCart(productId);
        displayCart();
    }
};

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

