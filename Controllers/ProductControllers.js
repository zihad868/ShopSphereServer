const Product = require('../Models/ProdectModels');


// Add Single Product
const addProduct = async(req, res) => {
    const { name, image, description, price, category, brand, rating } = req.body;
    
    try{
        const newProduct = new Product({
            name, image, description, price, category, brand, rating,
        });

        await newProduct.save();
        res.status(201).json({
            message: 'Product Add Successful',
            success: true
        })
    }
    catch(error){
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false
    })
    }
}

// Add Products
const addProducts = async (req, res) => {
    const products = req.body; // Expecting an array of products

    try {
        const newProducts = await Product.insertMany(products);
        res.status(201).json(newProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    const { sortBy } = req.query;
    let sortOptions = {};

    if (sortBy === 'priceLowToHigh') {
        sortOptions = { price: 1 }; // 1 for ascending order
    } else if (sortBy === 'priceHighToLow') {
        sortOptions = { price: -1 }; // -1 for descending order
    }else{
        sortOptions = { _id: -1 }
    }

    try {
        const products = await Product.find().sort(sortOptions);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


module.exports = {
    addProduct,
    addProducts,
    getProducts
}