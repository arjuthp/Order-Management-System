# Order Management System - MVC Flow (Simplified)

## System Architecture

```
═══════════════════════════════════════════════════════════════════════════════
                    ORDER MANAGEMENT SYSTEM - SIMPLE FLOW
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
│  /api/orders/*        → Order Routes                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTROLLERS (Business Logic)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ UserController   │  │ ProductController│  │ OrderController  │         │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤         │
│  │ • createUser()   │  │ • getAllProducts()│ │ • createOrder()  │         │
│  │ • getUser()      │  │ • getProductById()│ │ • getOrders()    │         │
│  │ • updateUser()   │  │ • searchProducts()│ │ • getOrderById() │         │
│  │ • deleteUser()   │  │ • filterProducts()│ │ • updateStatus() │         │
│  └──────────────────┘  │ • createProduct() │ │ • cancelOrder()  │         │
│                        │ • updateProduct() │ └──────────────────┘         │
│                        │ • deleteProduct() │                               │
│                        └──────────────────┘                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          MODELS (Data Schema)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ User Model       │  │ Product Model    │  │ Order Model      │         │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤         │
│  │ • name           │  │ • name           │  │ • userId         │         │
│  │ • email          │  │ • description    │  │ • productId      │         │
│  │ • password       │  │ • price          │  │ • quantity       │         │
│  │ • phone          │  │ • category       │  │ • totalAmount    │         │
│  │ • address        │  │ • stock          │  │ • status         │         │
│  │ • createdAt      │  │ • imageUrl       │  │ • createdAt      │         │
│  └──────────────────┘  │ • createdAt      │  └──────────────────┘         │
│                        └──────────────────┘                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DATABASE (MongoDB)                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Collections: users, products, orders                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## User Journey Flow

### 1. USER MANAGEMENT
- `POST /api/users` → Create user account
- `GET /api/users/:id` → Get user details
- `PUT /api/users/:id` → Update user profile
- `DELETE /api/users/:id` → Delete user

### 2. BROWSE PRODUCTS
- `GET /api/products` → Get all products
- `GET /api/products/:id` → Get single product
- `GET /api/products/search?q=laptop` → Search by name
- `GET /api/products?category=electronics&minPrice=100&maxPrice=1000` → Filter products
- `POST /api/products` → Create new product
- `PUT /api/products/:id` → Update product
- `DELETE /api/products/:id` → Delete product

### 3. PLACE ORDER (Direct)
- `POST /api/orders` → User selects product and places order directly
- `GET /api/orders/user/:userId` → View user's order history
- `GET /api/orders/:orderId` → View specific order details
- `PUT /api/orders/:orderId/status` → Update order status
- `DELETE /api/orders/:orderId` → Cancel/delete order

## Folder Structure

```
order-management-system/
│
├── index.js                    # Main entry point
├── package.json
│
├── user/
│   ├── user.model.js
│   ├── user.controller.js
│   └── user.routes.js
│
├── product/
│   ├── product.model.js
│   ├── product.controller.js
│   └── product.routes.js
│
└── order/
    ├── order.model.js
    ├── order.controller.js
    └── order.routes.js
```

## Key Features

- **User Management**: Create, read, update, delete user profiles
- **Product Catalog**: Browse, search, filter, create, update, delete products
- **Direct Ordering**: User selects product and places order immediately (no cart)
- **Order Management**: View orders, update status, cancel orders

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: MVC (Model-View-Controller) pattern

## Simple Flow Summary

1. User browses products
2. User selects a product with quantity
3. Order is created directly
4. Order status can be tracked and updated
