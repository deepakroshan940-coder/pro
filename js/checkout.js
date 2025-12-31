import { getCart, getProducts, clearCart, saveOrder } from './storage.js';

// Initialize Stripe (using test publishable key)
let stripe, cardElement;

function initializeStripe() {
    try {
        // Replace with your actual Stripe test publishable key
        stripe = Stripe('pk_test_51QKxXxXxXxXxXxX');
        const elements = stripe.elements();
        cardElement = elements.create('card');
        cardElement.mount('#card-element');
        
        // Display errors
        cardElement.on('change', ({error}) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });
    } catch (error) {
        console.error('Stripe initialization error:', error);
        document.getElementById('card-errors').textContent = 'Payment system unavailable. Please check your Stripe configuration.';
    }
}

// Display order summary
function displayOrderSummary() {
    const cart = getCart();
    const products = getProducts();
    const orderItemsEl = document.getElementById('order-items');
    const orderTotalEl = document.getElementById('order-total');
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    let total = 0;
    const itemsHTML = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="order-summary-item">
                <div>
                    <strong>${product.name}</strong> x ${item.quantity}
                </div>
                <div>$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    }).join('');
    
    orderItemsEl.innerHTML = itemsHTML;
    orderTotalEl.textContent = `$${total.toFixed(2)}`;
    
    return total;
}

// Handle form submission
const form = document.getElementById('checkout-form');
const submitButton = document.getElementById('submit-button');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const cart = getCart();
    const products = getProducts();
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    // Get customer information
    const customerInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };
    
    // Calculate total
    let total = 0;
    const orderItems = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return null;
        
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        
        return {
            productId: product.id,
            quantity: item.quantity,
            price: product.price
        };
    }).filter(item => item !== null);
    
    // Create order
    const orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // For frontend-only implementation, we'll simulate Stripe payment
    // In a real application, you would create a payment intent on your backend
    try {
        if (!stripe || !cardElement) {
            throw new Error('Stripe not initialized');
        }
        
        // Simulate payment processing
        const { token, error } = await stripe.createToken(cardElement);
        
        if (error) {
            // Show error
            document.getElementById('card-errors').textContent = error.message;
            submitButton.disabled = false;
            submitButton.textContent = 'Pay Now';
            return;
        }
        
        // Simulate payment success (in real app, this would be handled by your backend)
        // For demo purposes, we'll assume payment is successful
        const paymentStatus = 'completed';
        
        // Save order
        const order = {
            orderId,
            items: orderItems,
            total,
            customerInfo,
            paymentStatus,
            createdAt: new Date().toISOString()
        };
        
        saveOrder(order);
        
        // Clear cart
        clearCart();
        
        // Show success message
        document.getElementById('checkout-container').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('order-id').textContent = orderId;
        
        // Update cart count
        updateCartCount();
        
    } catch (error) {
        console.error('Payment error:', error);
        document.getElementById('card-errors').textContent = 'Payment failed. Please try again.';
        submitButton.disabled = false;
        submitButton.textContent = 'Pay Now';
    }
});

// Update cart count
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
    displayOrderSummary();
    updateCartCount();
    initializeStripe();
});

