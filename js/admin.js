import { getAdmin, saveAdmin, isAdminLoggedIn, setAdminLoggedIn, getProducts, saveProducts } from './storage.js';

let editingProductId = null;

// Check if already logged in
function checkLoginStatus() {
    if (isAdminLoggedIn()) {
        showAdminPanel();
    } else {
        showLoginForm();
    }
}

// Show login form
function showLoginForm() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    displayProducts();
}

// Handle login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const admin = getAdmin();
    const errorEl = document.getElementById('login-error');
    
    if (username === admin.username && password === admin.password) {
        setAdminLoggedIn(true);
        showAdminPanel();
        errorEl.style.display = 'none';
    } else {
        errorEl.style.display = 'block';
    }
});

// Logout
window.logout = function() {
    setAdminLoggedIn(false);
    showLoginForm();
    resetForm();
};

// Display products
function displayProducts() {
    const products = getProducts();
    const container = document.getElementById('products-list');
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">No products yet. Add your first product above!</p>';
        return;
    }
    
    container.innerHTML = `
        <table class="products-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td>
                            <img src="${product.image || 'https://via.placeholder.com/60x60?text=No+Image'}" 
                                 alt="${product.name}"
                                 onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'">
                        </td>
                        <td>${product.name}</td>
                        <td>${(product.description || '').substring(0, 50)}${product.description && product.description.length > 50 ? '...' : ''}</td>
                        <td>$${product.price.toFixed(2)}</td>
                        <td>${product.stock}</td>
                        <td>${product.category || '-'}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-primary btn-small" onclick="editProduct('${product.id}')">Edit</button>
                                <button class="btn btn-danger btn-small" onclick="deleteProduct('${product.id}')">Delete</button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Handle product form submission
document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const products = getProducts();
    const formData = {
        id: editingProductId || 'PROD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        image: document.getElementById('product-image').value,
        stock: parseInt(document.getElementById('product-stock').value),
        category: document.getElementById('product-category').value || undefined
    };
    
    if (editingProductId) {
        // Update existing product
        const index = products.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            products[index] = { ...products[index], ...formData };
        }
    } else {
        // Add new product
        products.push(formData);
    }
    
    saveProducts(products);
    displayProducts();
    resetForm();
    
    // Show success message
    alert(editingProductId ? 'Product updated successfully!' : 'Product added successfully!');
});

// Edit product
window.editProduct = function(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    editingProductId = productId;
    document.getElementById('form-title').textContent = 'Edit Product';
    document.getElementById('product-id').value = productId;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description || '';
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-image').value = product.image || '';
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-category').value = product.category || '';
    
    // Scroll to form
    document.querySelector('.product-form').scrollIntoView({ behavior: 'smooth' });
};

// Delete product
window.deleteProduct = function(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    const products = getProducts();
    const filteredProducts = products.filter(p => p.id !== productId);
    saveProducts(filteredProducts);
    displayProducts();
    
    // If we were editing this product, reset the form
    if (editingProductId === productId) {
        resetForm();
    }
};

// Reset form
window.resetForm = function() {
    editingProductId = null;
    document.getElementById('form-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

