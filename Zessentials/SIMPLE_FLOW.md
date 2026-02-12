# Order Management System - Simple Flow

## User Flow

```
1. User browses products
   ↓
2. User selects product + quantity
   ↓
3. User places order
   ↓
4. System checks: User exists?
   ↓
5. System checks: Product exists?
   ↓
6. System checks: Stock available?
   ↓
7. System calculates price
   ↓
8. System reduces stock
   ↓
9. System saves order
   ↓
10. User gets confirmation
```

## Product Flow

```
1. Admin adds product (name, price, stock)
   ↓
2. Product saved with id
   ↓
3. Users can browse products
   ↓
4. When ordered, stock reduces
```

## Order Flow

```
1. Receive: userId, productId, quantity
   ↓
2. Validate user → exists?
   ↓
3. Validate product → exists?
   ↓
4. Check stock → enough?
   ↓
5. Calculate: price × quantity
   ↓
6. Create order object
   ↓
7. Reduce product stock
   ↓
8. Save order
   ↓
9. Return success/error
```

## File Flow

```
Request → index.js → orderLogic → userLogic/productLogic → data.js
```

Done.
