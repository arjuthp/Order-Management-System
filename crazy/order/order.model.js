const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //mongoose DT
        ref: 'user', //population
        required: true, //validation
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required:true,
    },
    quantity:{
        type: Number,
        requied: true,
        min: 1,
    },
    totalAmount:{
        type: Number,
        required: true,
    },
    status: {
        type:String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    }
    
}, {timestamps: true});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;


