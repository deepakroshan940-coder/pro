import { getProducts, addToCart, getCart, initializeSampleProducts } from './storage.js';

// Display products
function displayProducts() {
    const products = getProducts();
    const container = document.getElementById('products-container');
    const emptyState = document.getElementById('empty-state');
    
    if (products.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image || 'https://via.placeholder.com/300x250?text=No+Image'}" 
                 alt="${product.name}" 
                 class="product-image"
                 onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description || ''}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-stock">Stock: ${product.stock}</div>
                <button class="btn btn-primary" 
                        onclick="addToCartHandler('${product.id}')"
                        ${product.stock === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                    ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart handler
window.addToCartHandler = function(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Product not found!');
        return;
    }
    
    if (product.stock === 0) {
        alert('This product is out of stock!');
        return;
    }
    
    const cart = getCart();
    const cartItem = cart.find(item => item.productId === productId);
    
    if (cartItem && cartItem.quantity >= product.stock) {
        alert(`Only ${product.stock} items available in stock!`);
        return;
    }
    
    addToCart(productId, 1);
    updateCartCount();
    
    // Show feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.backgroundColor = '#27ae60';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 1000);
};

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize sample products if none exist
    initializeSampleProducts();
    displayProducts();
    updateCartCount();
});

