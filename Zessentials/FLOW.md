# Order Management System - Complete Flow

## 🎯 INGREDIENTS (Functions) FOR EACH FILE

### USER.JS
```
1. userLogin(email, password) - User logs in, returns userId
2. userRegister(name, email, password) - New user registration
3. userProfile(userId) - Get user details
4. userViewProducts() - User requests product list
5. userSelectProduct(productId) - User selects a product
6. userConfirmOrder(userId, productId, quantity) - User places order
7. userOrderHistory(userId) - View past orders
8. userLogout(userId) - User logs out
```

### PRODUCT.JS
```
1. productList() - Show all available products
2. productSearch(productId) - Find specific product
3. productDetails(productId) - Get full product info (name, price, stock, description)
4. productCheckStock(productId, quantity) - Check if enough stock
5. productUpdateStock(productId, quantity) - Reduce stock after order
6. productAdd(name, price, stock) - Admin adds new product
7. productUpdate(productId, updates) - Admin updates product
8. productDelete(productId) - Admin removes product
```

### ORDER.JS
```
1. orderValidateUser(userId) - Check user exists
2. orderValidateProduct(productId) - Check product exists
3. orderCheckStock(productId, quantity) - Verify stock available
4. orderCalculatePrice(productId, quantity) - Calculate total price
5. orderCreate(userId, productId, quantity) - Create order object
6. orderSave(orderData) - Save order to database
7. orderConfirm(orderId) - Return order confirmation
8. orderHistory(userId) - Get all orders for user
9. orderDetails(orderId) - Get specific order details
10. orderCancel(orderId) - Cancel order (restore stock)
```

---

## 🔄 COMPLETE USER JOURNEY

### STEP 1: User Registration/Login
```
New User:
  → userRegister(name, email, password)
  → System creates user with userId
  → User logged in

Existing User:
  → userLogin(email, password)
  → System validates credentials
  → Returns userId
  → User logged in
```

### STEP 2: User Browses Products
```
User logged in
  ↓
userViewProducts()
  ↓
Calls: productList()
  ↓
Returns: All products [{id, name, price, stock}, ...]
  ↓
User sees product catalog
```

### STEP 3: User Views Product Details
```
User clicks on product
  ↓
userSelectProduct(productId)
  ↓
Calls: productDetails(productId)
  ↓
Returns: {id, name, price, stock, description}
  ↓
User sees full product info
```

### STEP 4: User Checks Stock
```
User enters quantity
  ↓
Calls: productCheckStock(productId, quantity)
  ↓
Returns: true/false
  ↓
If true: Show "Add to Cart"
If false: Show "Out of Stock"
```

### STEP 5: User Places Order
```
User clicks "Place Order"
  ↓
userConfirmOrder(userId, productId, quantity)
  ↓
Calls orderCreate() which does:
  1. orderValidateUser(userId) → User exists?
  2. orderValidateProduct(productId) → Product exists?
  3. orderCheckStock(productId, quantity) → Stock available?
  4. orderCalculatePrice(productId, quantity) → Calculate total
  5. orderCreate(userId, productId, quantity) → Create order
  6. productUpdateStock(productId, quantity) → Reduce stock
  7. orderSave(orderData) → Save to database
  8. orderConfirm(orderId) → Return confirmation
  ↓
User receives order confirmation
```

### STEP 6: User Views Order History
```
User clicks "My Orders"
  ↓
userOrderHistory(userId)
  ↓
Calls: orderHistory(userId)
  ↓
Returns: All user's orders
  ↓
User sees order list
```

### STEP 7: User Views Order Details
```
User clicks on specific order
  ↓
Calls: orderDetails(orderId)
  ↓
Returns: Full order info
  ↓
User sees order details
```

### STEP 8: User Cancels Order (Optional)
```
User clicks "Cancel Order"
  ↓
Calls: orderCancel(orderId)
  ↓
System:
  - Marks order as cancelled
  - Restores product stock
  ↓
User receives cancellation confirmation
```

### STEP 9: User Logs Out
```
User clicks "Logout"
  ↓
userLogout(userId)
  ↓
Session ended
```

---

## 📋 DETAILED FUNCTION BREAKDOWN

### USER.JS Functions

**1. userLogin(email, password)**
```
Input: email, password
Process:
  - Find user by email
  - Verify password
  - Return userId if valid
Output: userId or error
```

**2. userRegister(name, email, password)**
```
Input: name, email, password
Process:
  - Check if email already exists
  - Create new user with unique userId
  - Hash password (security)
  - Save to users array
Output: new user object
```

**3. userProfile(userId)**
```
Input: userId
Process:
  - Find user by userId
  - Return user details
Output: {id, name, email}
```

**4. userViewProducts()**
```
Process:
  - Call productList()
  - Return all products
Output: array of products
```

**5. userSelectProduct(productId)**
```
Input: productId
Process:
  - Call productDetails(productId)
  - Return product info
Output: product object
```

**6. userConfirmOrder(userId, productId, quantity)**
```
Input: userId, productId, quantity
Process:
  - Call orderCreate()
  - Handle validation and order creation
Output: order confirmation or error
```

**7. userOrderHistory(userId)**
```
Input: userId
Process:
  - Call orderHistory(userId)
  - Return all user's orders
Output: array of orders
```

**8. userLogout(userId)**
```
Input: userId
Process:
  - Clear session
  - Log activity
Output: success message
```

---

### PRODUCT.JS Functions

**1. productList()**
```
Process:
  - Return all products from products array
Output: [{id, name, price, stock}, ...]
```

**2. productSearch(productId)**
```
Input: productId
Process:
  - Find product by id
Output: product object or null
```

**3. productDetails(productId)**
```
Input: productId
Process:
  - Find product
  - Return full details
Output: {id, name, price, stock, description}
```

**4. productCheckStock(productId, quantity)**
```
Input: productId, quantity
Process:
  - Find product
  - Check: product.stock >= quantity
Output: true/false
```

**5. productUpdateStock(productId, quantity)**
```
Input: productId, quantity
Process:
  - Find product
  - Reduce: product.stock -= quantity
Output: updated product
```

**6. productAdd(name, price, stock)**
```
Input: name, price, stock
Process:
  - Create new product with unique id
  - Add to products array
Output: new product object
```

**7. productUpdate(productId, updates)**
```
Input: productId, {name, price, stock}
Process:
  - Find product
  - Update fields
Output: updated product
```

**8. productDelete(productId)**
```
Input: productId
Process:
  - Find and remove product
Output: success message
```

---

### ORDER.JS Functions

**1. orderValidateUser(userId)**
```
Input: userId
Process:
  - Check if user exists in users array
Output: true/false
```

**2. orderValidateProduct(productId)**
```
Input: productId
Process:
  - Check if product exists
Output: true/false
```

**3. orderCheckStock(productId, quantity)**
```
Input: productId, quantity
Process:
  - Call productCheckStock()
Output: true/false
```

**4. orderCalculatePrice(productId, quantity)**
```
Input: productId, quantity
Process:
  - Get product price
  - Calculate: price × quantity
Output: totalPrice
```

**5. orderCreate(userId, productId, quantity)**
```
Input: userId, productId, quantity
Process:
  - Validate user
  - Validate product
  - Check stock
  - Calculate price
  - Create order object
Output: order object or error
```

**6. orderSave(orderData)**
```
Input: order object
Process:
  - Add to orders array
  - Generate orderId
Output: saved order
```

**7. orderConfirm(orderId)**
```
Input: orderId
Process:
  - Find order
  - Return confirmation details
Output: {orderId, totalPrice, status, date}
```

**8. orderHistory(userId)**
```
Input: userId
Process:
  - Filter orders by userId
  - Return all matching orders
Output: array of orders
```

**9. orderDetails(orderId)**
```
Input: orderId
Process:
  - Find order by id
  - Return full details
Output: order object
```

**10. orderCancel(orderId)**
```
Input: orderId
Process:
  - Find order
  - Mark as cancelled
  - Restore product stock
Output: cancellation confirmation
```

---

## 🔗 HOW FUNCTIONS CONNECT

```
USER FLOW:
userLogin → userViewProducts → userSelectProduct → userConfirmOrder → userOrderHistory

CALLS:
userViewProducts → productList
userSelectProduct → productDetails
userConfirmOrder → orderCreate → orderValidateUser + orderValidateProduct + orderCheckStock + orderCalculatePrice + productUpdateStock + orderSave
userOrderHistory → orderHistory
```

---

## ✅ COMPLETE EXAMPLE

```
1. Alice registers
   → userRegister("Alice", "alice@email.com", "pass123")
   → Returns: {id: 1, name: "Alice", email: "alice@email.com"}

2. Alice logs in
   → userLogin("alice@email.com", "pass123")
   → Returns: userId: 1

3. Alice views products
   → userViewProducts()
   → productList()
   → Returns: [{Laptop, Mouse, Keyboard}]

4. Alice selects Laptop
   → userSelectProduct(1)
   → productDetails(1)
   → Returns: {id: 1, name: "Laptop", price: 50000, stock: 10}

5. Alice checks stock for 2 units
   → productCheckStock(1, 2)
   → Returns: true (10 >= 2)

6. Alice places order
   → userConfirmOrder(1, 1, 2)
   → orderCreate(1, 1, 2)
     - orderValidateUser(1) → true
     - orderValidateProduct(1) → true
     - orderCheckStock(1, 2) → true
     - orderCalculatePrice(1, 2) → 100000
     - Create order object
     - productUpdateStock(1, 2) → stock: 8
     - orderSave()
     - orderConfirm()
   → Returns: {orderId: 1, totalPrice: 100000, status: "confirmed"}

7. Alice views order history
   → userOrderHistory(1)
   → orderHistory(1)
   → Returns: [{orderId: 1, productId: 1, quantity: 2, totalPrice: 100000}]

8. Alice logs out
   → userLogout(1)
   → Session ended
```

---

## 🎯 SUMMARY

**USER.JS** - User actions (login, browse, select, order, history, logout)
**PRODUCT.JS** - Product operations (list, search, details, stock management)
**ORDER.JS** - Order processing (validate, calculate, create, save, confirm, cancel)

**Flow:** User → Product → Order → Confirmation

---

**Now you have the complete structure!** 🚀
