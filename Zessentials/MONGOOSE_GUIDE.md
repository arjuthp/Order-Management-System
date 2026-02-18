# Complete Mongoose Guide for Beginners

## What is Mongoose?

Mongoose is a library that helps you talk to MongoDB (database) from Node.js in an easier way.

**Think of it like:**
- MongoDB = Your storage warehouse
- Mongoose = Your organized filing system with rules

---

## Core Concepts

### 1. Schema (Blueprint)
A schema defines the structure of your data - like a form template.

```javascript
const userSchema = new mongoose.Schema({
    name: {
        type: String,        // What type of data
        required: true,      // Must have this field
    },
    email: {
        type: String,
        required: true,
        unique: true,        // No duplicates allowed
    },
    age: {
        type: Number,
        required: false,     // Optional field
        default: 18,         // Default value if not provided
    }
}, { timestamps: true });    // Auto-add createdAt, updatedAt
```

**Common field types:**
- `String` - Text ("John", "hello@example.com")
- `Number` - Numbers (25, 100.50)
- `Boolean` - true/false
- `Date` - Dates (new Date())
- `Array` - Lists ([1, 2, 3])
- `Object` - Nested data ({ street: "123 Main" })

**Common options:**
- `required: true` - Field must exist
- `unique: true` - No duplicates
- `default: value` - Use this if not provided
- `min: 0` - Minimum value (for numbers)
- `max: 100` - Maximum value
- `lowercase: true` - Convert to lowercase
- `trim: true` - Remove spaces from start/end

---

### 2. Model (The Worker)
A model is created from a schema and does the actual database work.

```javascript
const User = mongoose.model('user', userSchema);
```

Now `User` has superpowers to interact with database!

---

## CRUD Operations (Create, Read, Update, Delete)

### CREATE - Add new data

**Method 1: create()**
```javascript
const user = await User.create({
    name: "John",
    email: "john@example.com",
    age: 25
});
// Returns: The created user object
```

**Method 2: new + save()**
```javascript
const user = new User({
    name: "John",
    email: "john@example.com"
});
await user.save();
// Returns: The saved user object
```

**When to use which?**
- `create()` - Quick, one-step creation
- `new + save()` - When you need to modify before saving

---

### READ - Find data

**1. Find all**
```javascript
const users = await User.find({});
// Returns: Array of all users
// Example: [{name: "John"}, {name: "Jane"}]
```

**2. Find with conditions**
```javascript
const adults = await User.find({ age: { $gte: 18 } });
// Returns: Array of users where age >= 18
```

**3. Find one**
```javascript
const user = await User.findOne({ email: "john@example.com" });
// Returns: First matching user or null
```

**4. Find by ID**
```javascript
const user = await User.findById("507f1f77bcf86cd799439011");
// Returns: User with that ID or null
```

**5. Count documents**
```javascript
const count = await User.countDocuments({ age: { $gte: 18 } });
// Returns: Number of matching documents
```

---

### UPDATE - Modify data

**1. Update one by ID**
```javascript
const user = await User.findByIdAndUpdate(
    "507f1f77bcf86cd799439011",           // Which user
    { name: "John Updated", age: 26 },    // What to change
    { returnDocument: 'after' }           // Return updated data
);
// Returns: Updated user object
```

**2. Update one by condition**
```javascript
const user = await User.findOneAndUpdate(
    { email: "john@example.com" },        // Find by email
    { name: "John Updated" },             // Update name
    { returnDocument: 'after' }
);
```

**3. Update many**
```javascript
const result = await User.updateMany(
    { age: { $lt: 18 } },                 // All users under 18
    { status: "minor" }                   // Set status
);
// Returns: { matchedCount: 5, modifiedCount: 5 }
```

**Important options:**
- `{ returnDocument: 'after' }` - Return NEW data (after update)
- `{ returnDocument: 'before' }` - Return OLD data (before update)
- `{ upsert: true }` - Create if doesn't exist

---

### DELETE - Remove data

**1. Delete one by ID**
```javascript
const user = await User.findByIdAndDelete("507f1f77bcf86cd799439011");
// Returns: Deleted user object or null
```

**2. Delete one by condition**
```javascript
const user = await User.findOneAndDelete({ email: "john@example.com" });
// Returns: Deleted user object or null
```

**3. Delete many**
```javascript
const result = await User.deleteMany({ age: { $lt: 18 } });
// Returns: { deletedCount: 5 }
```

---

## Query Operators (Filters)

### Comparison Operators
```javascript
// Equal
User.find({ age: 25 })

// Greater than
User.find({ age: { $gt: 25 } })

// Greater than or equal
User.find({ age: { $gte: 25 } })

// Less than
User.find({ age: { $lt: 25 } })

// Less than or equal
User.find({ age: { $lte: 25 } })

// Not equal
User.find({ age: { $ne: 25 } })

// In array
User.find({ age: { $in: [25, 30, 35] } })

// Not in array
User.find({ age: { $nin: [25, 30] } })
```

### Logical Operators
```javascript
// AND (all conditions must match)
User.find({ 
    age: { $gte: 18 },
    status: "active"
})

// OR (any condition matches)
User.find({
    $or: [
        { age: { $lt: 18 } },
        { status: "minor" }
    ]
})

// NOT
User.find({ age: { $not: { $gte: 18 } } })
```

### String Operators
```javascript
// Contains (case-insensitive)
User.find({ name: { $regex: "john", $options: "i" } })

// Starts with
User.find({ name: { $regex: "^John" } })

// Ends with
User.find({ name: { $regex: "Doe$" } })
```

### Existence
```javascript
// Field exists
User.find({ phone: { $exists: true } })

// Field doesn't exist
User.find({ phone: { $exists: false } })
```

---

## Common Patterns in Your Project

### 1. User Registration
```javascript
async function handleUserRegister(req, res) {
    const { name, email, password } = req.body;
    
    // Create new user
    const user = await User.create({
        name,
        email,
        password
    });
    
    return res.json({ message: 'User registered successfully' });
}
```

### 2. User Login
```javascript
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    
    // Find user by email and password
    const user = await User.findOne({ email, password });
    
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    
    return res.json({
        message: "Login successful",
        user: { _id: user._id, name: user.name, email: user.email }
    });
}
```

### 3. Get All with Filters
```javascript
async function handleGetAllProducts(req, res) {
    const { q, category, minPrice, maxPrice } = req.query;
    
    let filter = {};
    
    // Search by name
    if (q) {
        filter.name = { $regex: q, $options: 'i' };
    }
    
    // Filter by category
    if (category) {
        filter.category = category;
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    const products = await Product.find(filter);
    return res.json(products);
}
```

### 4. Update User Profile
```javascript
async function handleUpdateUser(req, res) {
    const { name, email, password, phone, address } = req.body;
    
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, password, phone, address },
        { returnDocument: 'after' }
    );
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    return res.json({
        message: 'User updated successfully',
        user
    });
}
```

### 5. Delete User
```javascript
async function handleDeleteUser(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    return res.json({ message: 'User deleted successfully' });
}
```

---

## Best Practices

### 1. Always use async/await
```javascript
// ✅ Good
async function getUser() {
    const user = await User.findById(id);
    return user;
}

// ❌ Bad (callback hell)
function getUser(callback) {
    User.findById(id, (err, user) => {
        callback(user);
    });
}
```

### 2. Handle errors
```javascript
async function getUser(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}
```

### 3. Validate before saving
```javascript
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [150, 'Age too high']
    }
});
```

### 4. Use lean() for read-only data
```javascript
// ✅ Faster (plain JavaScript object)
const users = await User.find({}).lean();

// ❌ Slower (Mongoose document with methods)
const users = await User.find({});
```

### 5. Select only needed fields
```javascript
// Get only name and email
const users = await User.find({}).select('name email');

// Exclude password
const users = await User.find({}).select('-password');
```

---

## Common Mistakes to Avoid

### 1. Forgetting await
```javascript
// ❌ Wrong - returns Promise, not data
const user = User.findById(id);

// ✅ Correct
const user = await User.findById(id);
```

### 2. Not checking if data exists
```javascript
// ❌ Wrong - will crash if user is null
const user = await User.findById(id);
console.log(user.name);  // Error if user is null

// ✅ Correct
const user = await User.findById(id);
if (!user) {
    return res.status(404).json({ error: 'Not found' });
}
console.log(user.name);
```

### 3. Using wrong method
```javascript
// ❌ Wrong - findById expects ID string, not object
const user = await User.findById({ email: "john@example.com" });

// ✅ Correct - use findOne for conditions
const user = await User.findOne({ email: "john@example.com" });
```

### 4. Not returning updated data
```javascript
// ❌ Wrong - returns OLD data
const user = await User.findByIdAndUpdate(id, { name: "New" });

// ✅ Correct - returns NEW data
const user = await User.findByIdAndUpdate(
    id, 
    { name: "New" },
    { returnDocument: 'after' }
);
```

---

## Quick Reference Cheat Sheet

| Operation | Method | Returns |
|-----------|--------|---------|
| Create one | `create(data)` | Created document |
| Find all | `find({})` | Array of documents |
| Find one | `findOne(filter)` | Document or null |
| Find by ID | `findById(id)` | Document or null |
| Update by ID | `findByIdAndUpdate(id, data, options)` | Updated document |
| Delete by ID | `findByIdAndDelete(id)` | Deleted document |
| Count | `countDocuments(filter)` | Number |

---

## Practice Exercise

Try building these functions for your Order model:

1. Create an order
2. Get all orders for a user
3. Update order status
4. Cancel (delete) an order
5. Get orders by status (pending, shipped, delivered)

Use this guide as reference!

---

## Need Help?

When stuck, ask yourself:
1. Am I using `await`?
2. Am I using the right method? (findOne vs findById vs find)
3. Did I check if the result exists before using it?
4. Are my filters correct? (use console.log to debug)

Happy coding! 🚀
