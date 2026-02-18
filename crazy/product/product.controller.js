const Product = require('./product.model');

async function handleCreateProduct(req, res) {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        imageUrl
    });
    return res.status(201).json({
        message: 'Product created successfully',
        product
    });
    }

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

async function handleUpdateProduct(req, res) {
   const {name, description, price, category, stock, imageUrl} = req.body;

   const product = await Product.findByIdAndUpdate(
    req.params.id,//which one
    {name, description, price, category, stock, imageUrl}, //what to change
    {returnDocument: 'after'})//return new data
    if(!product){
        return res.status(404).json({error: 'Product not found'});
    }
    return res.json({
        message: 'Product updated successfully',
        product
    });
}

async function handleGetByCategory(req, res) {
    const products = await Product.find({ 
        category: req.params.name 
    });
    return res.json(products);
}

async function handleDeleteProductById(req, res) {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
        return res.status(404).json({error: "Product not found"});
    }
    return res.json({message: "Product deleted successfully"});
}
module.exports = {
    handleCreateProduct,
    handleGetAllProducts,
    handleGetAllProductById,
    handleUpdateProduct,
    handleGetByCategory,
    handleDeleteProductById,

}