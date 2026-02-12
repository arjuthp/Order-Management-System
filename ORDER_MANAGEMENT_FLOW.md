# Order Management System - MVC Flow

## System Architecture

```
═══════════════════════════════════════════════════════════════════════════════
                    ORDER MANAGEMENT SYSTEM - MVC FLOW (SIMPLIFIED)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT REQUESTS                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            ROUTES (Entry Points)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  /api/users/*         → User Management Routes                              │
│  /api/products/*      → Product Routes                                      │
│  /api/cart/*          → Cart Routes                                         │
│  /api/orders/*        → Order Routes                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTROLLERS (Business Logic)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ UserController   │  │ ProductController│  │ CartController   │         │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤         │
│  │ • createUser()   │  │ • getAllProducts()│ │ • addToCart()    │         │
│  │ • getUser()      │  │ • getProductById()│ │ • getCart()      │         │
│  │ • updateUser()   │  │ • searchProducts()│ │ • updateCart()   │         │
│  │ • deleteUser()   │  │ • filterProducts()│ │ • removeFromCart()│        │
│  └──────────────────┘  │ • createProduct() │ │ • clearCart()    │         │
│                        │ • updateProduct() │ └──────────────────┘         │
│                        │ • deleteProduct() │                               │
│                        └──────────────────┘                                │
│                                                                              │
│  ┌──────────────────┐                                                       │
│  │ OrderController  │                                                       │
│  ├──────────────────┤                                                       │
│  │ • createOrder()  │                                                       │
│  │ • getOrders()    │                                                       │
│  │ • getOrderById() │                                                       │
│  │ • updateStatus() │                                                       │
│  │ • cancelOrder()  │                                                       │
│  └──────────────────┘                                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          MODELS (Data Schema)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ User Model       │  │ Product Model    │  │ Cart Model       │         │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤         │
│  │ • name           │  │ • name           │  │ • userId         │         │
│  │ • email          │  │ • description    │  │ • items[]        │         │
│  │ • password       │  │ • price          │  │   - productId    │         │
│  │ • phone          │  │ • category       │  │   - quantity     │         │
│  │ • address        │  │ • stock          │  │   - price        │         │
│  │ • createdAt      │  │ • imageUrl       │  │ • totalAmount    │         │
│  └──────────────────┘  │ • createdAt      │  │ • createdAt      │         │
│                        └──────────────────┘  │ • updatedAt      │         │
│                                               └──────────────────┘         │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │ Order Model                                                   │          │
│  ├──────────────────────────────────────────────────────────────┤          │
│  │ • userId (ref: User)                                          │          │
│  │ • orderItems[]                                                │          │
│  │   - productId (ref: Product)                                  │          │
│  │   - name                                                      │          │
│  │   - quantity                                                  │          │
│  │   - price                                                     │          │
│  │ • shippingAddress                                             │          │
│  │   - street, city, state, zipCode, country                     │          │
│  │ • paymentMethod (COD, Card, UPI, etc.)                        │          │
│  │ • totalAmount                                                 │          │
│  │ • orderStatus (pending, confirmed, shipped, delivered,        │          │
│  │                cancelled)                                     │          │
│  │ • createdAt, updatedAt                                        │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DATABASE (MongoDB)                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Collections: users, products, carts, orders                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

## User Journey Flow

### 1. USER MANAGEMENT
- `POST /api/users` → Create user account
- `GET /api/users/:id` → Get user details
- `PUT /api/users/:id` → Update user profile/address

### 2. BROWSE PRODUCTS
- `GET /api/products` → Get all products
- `GET /api/products/:id` → Get single product
- `GET /api/products/search?q=laptop` → Search by name
- `GET /api/products?category=electronics&minPrice=100&maxPrice=1000` → Filter products

### 3. CART MANAGEMENT
- `POST /api/cart/add` → Add product to cart
- `GET /api/cart/:userId` → View cart
- `PUT /api/cart/update` → Update quantity
- `DELETE /api/cart/remove/:productId` → Remove item
- `DELETE /api/cart/clear/:userId` → Clear cart

### 4. CHECKOUT & ORDER
- `POST /api/orders` → Create order from cart
- `GET /api/orders/:userId` → View user's order history
- `GET /api/orders/detail/:orderId` → View specific order
- `PUT /api/orders/:orderId/status` → Update order status
- `PUT /api/orders/:orderId/cancel` → Cancel order

## Folder Structure

```
order-management-system/
│
├── index.js                    # Main entry point
├── package.json
├── .env                        # Environment variables (DB connection)
│
├── config/
│   └── db.js                   # MongoDB connection
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
│
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
│
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
│
└── middleware/
    └── errorMiddleware.js      # Error handling
```

## Key Features

- **User Management**: Create, read, update user profiles
- **Product Catalog**: Browse, search, and filter products
- **Shopping Cart**: Add, update, remove items with quantity management
- **Order Processing**: Create orders, track status, view history
- **Inventory Tracking**: Monitor product stock levels
- **Order Status Management**: Track orders through different states (pending, confirmed, shipped, delivered, cancelled)

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: MVC (Model-View-Controller) pattern
