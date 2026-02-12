# Code Guide - Write Your Own Logic

## USER.JS Template

```javascript
// Import data
const data = require('./data.js');

// 1. USER LOGIN
function userLogin(email, password) {
  // Step 1: Find user by email in data.users array
  // Step 2: Check if password matches
  // Step 3: If match, return success with userId
  // Step 4: If no match, return error
}

// 2. USER REGISTER
function userRegister(name, email, password) {
  // Step 1: Check if email already exists in data.users
  // Step 2: If exists, return error "Email already registered"
  // Step 3: Create new user object with data.nextUserId
  // Step 4: Increment data.nextUserId
  // Step 5: Push new user to data.users array
  // Step 6: Return success with user object
}

// 3. USER PROFILE
function userProfile(userId) {
  // Step 1: Find user by userId in data.users array
  // Step 2: If found, return user object (without password)
  // Step 3: If not found, return null
}

// 4. USER VIEW PRODUCTS
function userViewProducts() {
  // Step 1: Import productLogic
  // Step 2: Call productList() function
  // Step 3: Return all products
}

// 5. USER SELECT PRODUCT
function userSelectProduct(productId) {
  // Step 1: Import productLogic
  // Step 2: Call productDetails(productId)
  // Step 3: Return product details
}

// 6. USER CONFIRM ORDER
function userConfirmOrder(userId, productId, quantity) {
  // Step 1: Import orderLogic
  // Step 2: Call orderCreate(userId, productId, quantity)
  // Step 3: Return order result (success or error)
}

// 7. USER ORDER HISTORY
function userOrderHistory(userId) {
  // Step 1: Import orderLogic
  // Step 2: Call orderHistory(userId)
  // Step 3: Return array of user's orders
}

// 8. USER LOGOUT
function userLogout(userId) {
  // Step 1: Log the logout action (optional)
  // Step 2: Return success message
}

// Export all functions
module.exports = {
  userLogin,
  userRegister,
  userProfile,
  userViewProducts,
  userSelectProduct,
  userConfirmOrder,
  userOrderHistory,
  userLogout
};
```

---

## PRODUCT.JS Template

```javascript
// Import data
const data = require('./data.js');

// 1. PRODUCT LIST
function productList() {
  // Step 1: Return data.products array
}

// 2. PRODUCT SEARCH
function productSearch(productId) {
  // Step 1: Find product by productId in data.products array
  // Step 2: Return product object or null
}

// 3. PRODUCT DETAILS
function productDetails(productId) {
  // Step 1: Call productSearch(productId)
  // Step 2: Return full product details
}

// 4. PRODUCT CHECK STOCK
function productCheckStock(productId, quantity) {
  // Step 1: Find product by productId
  // Step 2: Check if product.stock >= quantity
  // Step 3: Return true or false
}

// 5. PRODUCT UPDATE STOCK
function productUpdateStock(productId, quantity) {
  // Step 1: Find product by productId
  // Step 2: Reduce stock: product.stock -= quantity
  // Step 3: Return updated product
}

// 6. PRODUCT ADD (Admin)
function productAdd(name, price, stock, description) {
  // Step 1: Create new product object with data.nextProductId
  // Step 2: Increment data.nextProductId
  // Step 3: Push to data.products array
  // Step 4: Return new product
}

// 7. PRODUCT UPDATE (Admin)
function productUpdate(productId, updates) {
  // Step 1: Find product by productId
  // Step 2: Update fields (name, price, stock, description)
  // Step 3: Return updated product
}

// 8. PRODUCT DELETE (Admin)
function productDelete(productId) {
  // Step 1: Find product index in data.products array
  // Step 2: Remove product using splice()
  // Step 3: Return success message
}

// Export all functions
module.exports = {
  productList,
  productSearch,
  productDetails,
  productCheckStock,
  productUpdateStock,
  productAdd,
  productUpdate,
  productDelete
};
```

---

## ORDER.JS Template

```javascript
// Import data and other modules
const data = require('./data.js');
const { userProfile } = require('./user.js');
const { productSearch, productCheckStock, productUpdateStock } = require('./product.js');

// 1. ORDER VALIDATE USER
function orderValidateUser(userId) {
  // Step 1: Find user in data.users array
  // Step 2: Return true if found, false if not
}

// 2. ORDER VALIDATE PRODUCT
function orderValidateProduct(productId) {
  // Step 1: Call productSearch(productId)
  // Step 2: Return true if found, false if not
}

// 3. ORDER CHECK STOCK
function orderCheckStock(productId, quantity) {
  // Step 1: Call productCheckStock(productId, quantity)
  // Step 2: Return result (true/false)
}

// 4. ORDER CALCULATE PRICE
function orderCalculatePrice(productId, quantity) {
  // Step 1: Get product using productSearch(productId)
  // Step 2: Calculate: product.price * quantity
  // Step 3: Return totalPrice
}

// 5. ORDER CREATE (Main function)
function orderCreate(userId, productId, quantity) {
  // Step 1: Validate user exists using orderValidateUser()
  // Step 2: If not, return error "User not found"
  // Step 3: Validate product exists using orderValidateProduct()
  // Step 4: If not, return error "Product not found"
  // Step 5: Check quantity > 0
  // Step 6: If not, return error "Invalid quantity"
  // Step 7: Check stock using orderCheckStock()
  // Step 8: If not enough, return error "Not enough stock"
  // Step 9: Calculate price using orderCalculatePrice()
  // Step 10: Create order object with data.nextOrderId
  // Step 11: Increment data.nextOrderId
  // Step 12: Update stock using productUpdateStock()
  // Step 13: Push order to data.orders array
  // Step 14: Return success with order object
}

// 6. ORDER SAVE
function orderSave(orderData) {
  // Step 1: Push orderData to data.orders array
  // Step 2: Return saved order
}

// 7. ORDER CONFIRM
function orderConfirm(orderId) {
  // Step 1: Find order by orderId in data.orders array
  // Step 2: Return order confirmation details
}

// 8. ORDER HISTORY
function orderHistory(userId) {
  // Step 1: Filter data.orders array where order.userId === userId
  // Step 2: Return array of matching orders
}

// 9. ORDER DETAILS
function orderDetails(orderId) {
  // Step 1: Find order by orderId in data.orders array
  // Step 2: Return full order object
}

// 10. ORDER CANCEL
function orderCancel(orderId) {
  // Step 1: Find order by orderId
  // Step 2: Get productId and quantity from order
  // Step 3: Restore stock: call productUpdateStock with negative quantity
  // Step 4: Mark order as cancelled or remove from array
  // Step 5: Return cancellation confirmation
}

// Export all functions
module.exports = {
  orderValidateUser,
  orderValidateProduct,
  orderCheckStock,
  orderCalculatePrice,
  orderCreate,
  orderSave,
  orderConfirm,
  orderHistory,
  orderDetails,
  orderCancel
};
```

---

## INDEX.JS Template

```javascript
const http = require('http');
const userLogic = require('./user.js');
const productLogic = require('./product.js');
const orderLogic = require('./order.js');

const PORT = 3000;

// Helper: Parse POST request body
function parseBody(req, callback) {
  // Step 1: Initialize empty body string
  // Step 2: Listen to 'data' event, append chunks
  // Step 3: Listen to 'end' event, parse JSON
  // Step 4: Call callback with parsed data or error
}

// Create server
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  // USER ROUTES
  
  // POST /api/login
  if (req.method === 'POST' && req.url === '/api/login') {
    // Step 1: Parse body
    // Step 2: Call userLogic.userLogin(email, password)
    // Step 3: Send response
  }
  
  // POST /api/register
  else if (req.method === 'POST' && req.url === '/api/register') {
    // Step 1: Parse body
    // Step 2: Call userLogic.userRegister(name, email, password)
    // Step 3: Send response
  }
  
  // GET /api/profile/:userId
  else if (req.method === 'GET' && req.url.startsWith('/api/profile/')) {
    // Step 1: Extract userId from URL
    // Step 2: Call userLogic.userProfile(userId)
    // Step 3: Send response
  }
  
  // PRODUCT ROUTES
  
  // GET /api/products
  else if (req.method === 'GET' && req.url === '/api/products') {
    // Step 1: Call productLogic.productList()
    // Step 2: Send response
  }
  
  // GET /api/products/:productId
  else if (req.method === 'GET' && req.url.startsWith('/api/products/')) {
    // Step 1: Extract productId from URL
    // Step 2: Call productLogic.productDetails(productId)
    // Step 3: Send response
  }
  
  // POST /api/products (Admin)
  else if (req.method === 'POST' && req.url === '/api/products') {
    // Step 1: Parse body
    // Step 2: Call productLogic.productAdd(name, price, stock, description)
    // Step 3: Send response
  }
  
  // ORDER ROUTES
  
  // POST /api/orders
  else if (req.method === 'POST' && req.url === '/api/orders') {
    // Step 1: Parse body
    // Step 2: Call orderLogic.orderCreate(userId, productId, quantity)
    // Step 3: Send response with status 201 or 400
  }
  
  // GET /api/orders/:userId
  else if (req.method === 'GET' && req.url.startsWith('/api/orders/')) {
    // Step 1: Extract userId from URL
    // Step 2: Call orderLogic.orderHistory(userId)
    // Step 3: Send response
  }
  
  // 404 Not Found
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 🎯 CODING ORDER

1. ✅ Create data.js (Done)
2. Write user.js functions one by one
3. Write product.js functions one by one
4. Write order.js functions one by one
5. Write index.js routes
6. Test with curl commands

---

## 💡 TIPS

- Write one function at a time
- Test each function before moving to next
- Use console.log() to debug
- Start with simple functions (productList, userProfile)
- End with complex functions (orderCreate)

---

**Now write your own logic following these steps!** 🚀
