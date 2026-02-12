const mongoose = require('mongoose');
const Product = require('./product/product.model');

mongoose.connect('mongodb://127.0.0.1:27017/orderdb')
.then(() => console.log("MongoDB Connected"));

const sampleProducts = [
    {
        name: "iPhone 15 Pro",
        description: "Latest Apple smartphone with A17 Pro chip",
        price: 129900,
        category: "electronics",
        stock: 50,
        imageUrl: "https://via.placeholder.com/200/0000FF/FFFFFF?text=iPhone+15"
    },
    {
        name: "Samsung Galaxy S24",
        description: "Flagship Android phone with AI features",
        price: 89900,
        category: "electronics",
        stock: 40,
        imageUrl: "https://via.placeholder.com/200/000000/FFFFFF?text=Galaxy+S24"
    },
    {
        name: "MacBook Pro M3",
        description: "Powerful laptop for professionals",
        price: 199900,
        category: "electronics",
        stock: 25,
        imageUrl: "https://via.placeholder.com/200/808080/FFFFFF?text=MacBook"
    },
    {
        name: "Nike Air Max",
        description: "Comfortable running shoes with air cushioning",
        price: 8999,
        category: "fashion",
        stock: 80,
        imageUrl: "https://via.placeholder.com/200/FF6347/FFFFFF?text=Nike+Shoes"
    },
    {
        name: "Levi's Jeans",
        description: "Classic denim jeans for everyday wear",
        price: 3499,
        category: "fashion",
        stock: 120,
        imageUrl: "https://via.placeholder.com/200/4169E1/FFFFFF?text=Levis+Jeans"
    },
    {
        name: "The Great Gatsby",
        description: "Classic novel by F. Scott Fitzgerald",
        price: 299,
        category: "books",
        stock: 200,
        imageUrl: "https://via.placeholder.com/200/FFD700/000000?text=Book"
    },
    {
        name: "Yoga Mat",
        description: "Non-slip exercise mat for yoga and fitness",
        price: 1299,
        category: "sports",
        stock: 150,
        imageUrl: "https://via.placeholder.com/200/32CD32/FFFFFF?text=Yoga+Mat"
    },
    {
        name: "Coffee Maker",
        description: "Automatic drip coffee maker with timer",
        price: 4999,
        category: "home",
        stock: 45,
        imageUrl: "https://via.placeholder.com/200/8B4513/FFFFFF?text=Coffee+Maker"
    },
    {
        name: "Wooden Dining Table",
        description: "Solid wood dining table for 6 people",
        price: 24999,
        category: "furniture",
        stock: 15,
        imageUrl: "https://via.placeholder.com/200/D2691E/FFFFFF?text=Dining+Table"
    },
    {
        name: "Organic Green Tea",
        description: "Premium organic green tea leaves - 100g",
        price: 399,
        category: "food",
        stock: 300,
        imageUrl: "https://via.placeholder.com/200/228B22/FFFFFF?text=Green+Tea"
    }
];

async function addProducts() {
    try {
        await Product.deleteMany({}); // Clear existing products
        await Product.insertMany(sampleProducts);
        console.log("✅ Sample products added successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

setTimeout(addProducts, 1000); // Wait for DB connection
