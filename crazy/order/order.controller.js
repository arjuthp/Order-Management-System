const Order = require('./order.model');
const Product = require('../product/product.model');
const User = require('../user/user.model');

async function handleCreateOrder(req, res) {
    const {userId, productId, quantity} = req.body;

    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({error: 'User not found'});
    }

//find product
    const product = await Product.findById(productId);
    if(!product){
        return res.status(404).json({error: "Product not found"});
    }
    //stock
    if(product.stock < quantity){
        return res.status(400).json({
            error: 'Insufficient stock',
            available: product.stock,
            requested: quantity
        });
    }

    //total 
    const totalAmount = product.price * quantity;

    //create order
    const order = await Order.create({
        userId,
        productId,
        quantity,
        totalAmount,
        status: 'pending'
    });
 //redn in stock
    product.stock -= quantity;
    await product.save();

    return res.status(201).json({
        message: 'Order placed successfully',
        order
    });

}

async function handleGetAllOrders(req, res) {
    const {userId} = req.query;

    let filter = {};
    if(userId){
        filter.userId = userId;
    }
    const orders = await Order.find(filter)
    .populate('userId')
    .populate('productId');
    return res.status(200).json(orders);
}

async function handleGetOrderById(req, res) {
    const order = await Order.findById(req.params.id)
    .populate('userId')
    .populate('productId');
    if(!order){
        return res.status(404).json({error:'Order not found'});
    }
    return res.status(200).json(order);
}
async function handleupdateStatus(req, res) {
    const {status} = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if(!validStatuses.includes(status)){
        return res.status(400).json({
            err: 'Invalid Ststus',
            validStatuses
        });
    }
   const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { returnDocument: 'after' }
    );
    if(!order){
        return res.status(404).json({error: 'Order not found'});
    }
    return res.status(200).json({
        message: "Order Status updated Successfully",
        order
    });
    
}

async function handleCancelOrderById(req, res) {
    const order = await  Order.findByIdAndDelete(req.params.id);
     if(!order){
        return res.status(404).json({error: 'Order not found'});
    }

    //product stocl
    const product = await Product.findById(order.productId);
    if(product){
        product.stock += order.quantity;
        await product.save();
    }
    return res.status(200).json({
        message: 'Orde deleted successfully'
    });
}

module.exports = {
    handleCreateOrder,
    handleGetAllOrders,
    handleGetOrderById,
    handleupdateStatus,
    handleCancelOrderById,
}