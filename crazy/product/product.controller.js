const Product = require('./product.model');


async function handleGetAllProducts(req, res) {
    const { q, minPrice, maxPrice } = req.query;
    
    let filter = {};
    
    // Search by name OR category OR ID
    if (q) {
        filter.$or = [
            { name: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } }
        ];
        
      if (q.match(/^[0-9a-fA-F]{24}$/)) {
            filter.$or.push({ _id: q });
        }
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

async function handleGetAllProductById(req, res) {
    const products = await Product.findById({
        name: {$regex : req.query.q, $options: 'i'}
    });
    return res.json(products);
}

async function handleCreateProduct(req, res) {
    const products = await Product.find({
        category: req.query.category
    });
    return res.json(products);
}

async function handleGetByCategory(req, res) {
    const products = await Product.find({ 
        category: req.params.name 
    });
    return res.json(products);
}
module.exports = {
    handleGetAllProducts,
    handleGetAllProductById,
    handleCreateProduct,
    handleGetByCategory,


}