# E-Commerce System

A simple e-commerce system built with vanilla HTML, CSS, and JavaScript, using localStorage for data persistence and Stripe for payment processing.

## Features

- **Product Management**: Browse products on the main page
- **Shopping Cart**: Add, update quantities, and remove items
- **Checkout**: Customer information collection and payment processing
- **Admin Panel**: Full CRUD operations for products
- **Admin Authentication**: Username/password login system
- **Order Management**: Orders stored in localStorage
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

1. **Clone or download** this repository

2. **Open the project** in a web server (required for ES6 modules)
   - You can use a simple HTTP server like:
     - Python: `python -m http.server 8000`
     - Node.js: `npx http-server`
     - VS Code: Use the "Live Server" extension
   - Then navigate to `http://localhost:8000`

3. **Stripe Integration**:
   - Replace the Stripe publishable key in `js/checkout.js` (line 4)
   - Get your test key from: https://stripe.com/docs/keys
   - For testing, you can use Stripe's test mode keys
   - **Note**: This is a frontend-only implementation. For production, you'll need a backend to securely handle payment processing.

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

You can change these credentials by logging in and modifying the admin data in localStorage, or by editing the default credentials in `js/storage.js`.

## Project Structure

```
/
├── index.html          # Product listing page
├── cart.html           # Shopping cart page
├── checkout.html       # Checkout and payment page
├── admin.html          # Admin panel (login + product CRUD)
├── css/
│   └── styles.css      # Shared styles
├── js/
│   ├── app.js          # Main application logic, product display
│   ├── cart.js         # Cart management (add, remove, update)
│   ├── checkout.js     # Checkout form and Stripe integration
│   ├── admin.js        # Admin authentication and product CRUD
│   └── storage.js      # localStorage utilities
└── README.md           # This file
```

## Usage

### For Customers

1. **Browse Products**: Visit `index.html` to see all available products
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click "Cart" in the navigation to see your items
4. **Checkout**: Click "Proceed to Checkout" to complete your purchase
5. **Payment**: Fill in your information and payment details

### For Admins

1. **Login**: Go to `admin.html` and login with admin credentials
2. **Add Products**: Fill in the product form and click "Save Product"
3. **Edit Products**: Click "Edit" on any product in the table
4. **Delete Products**: Click "Delete" on any product (with confirmation)
5. **Logout**: Click "Logout" when done

## Data Storage

All data is stored in the browser's localStorage:

- **Products**: `products` - Array of product objects
- **Cart**: `cart` - Array of cart items
- **Orders**: `orders` - Array of order objects
- **Admin**: `admin` - Admin credentials object
- **Admin Session**: `adminLoggedIn` - Login status

## Payment Integration

The system uses Stripe for payment processing. Currently configured for test mode:

- **Test Card Numbers**: Use Stripe's test cards (e.g., `4242 4242 4242 4242`)
- **Test Expiry**: Any future date (e.g., `12/34`)
- **Test CVC**: Any 3 digits (e.g., `123`)

**Important**: For production use, you'll need to:
1. Set up a backend server
2. Use Stripe's secure payment intent API
3. Never expose your secret keys in frontend code

## Browser Compatibility

- Modern browsers with ES6 module support
- Chrome, Firefox, Safari, Edge (latest versions)

## Notes

- This is a learning/demo project
- Data persists only in the browser (localStorage)
- No backend server required for basic functionality
- Stripe integration is simplified for frontend-only use
- For production, implement proper backend security and payment handling

## License

This project is for educational purposes.

