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


const getProducts = async (req, res) => {
    const { sortBy, search, brand, category, priceMin, priceMax, page = 1, limit = 10 } = req.query;
    let sortOptions = { _id: -1 }; // Default to descending order by _id (most recent first)
    let searchQuery = {};

    // Apply sort options for price sorting if provided
    if (sortBy === 'priceLowToHigh') {
        sortOptions = { price: 1 }; // Price ascending order
    } else if (sortBy === 'priceHighToLow') {
        sortOptions = { price: -1 }; // Price descending order
    }

    // Apply search filter if search query is provided
    if (search) {
        searchQuery.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Apply brand filter if brand is provided
    if (brand) {
        searchQuery.brand = brand;
    }

    // Apply category filter if category is provided
    if (category) {
        searchQuery.category = category;
    }

    // Apply price range filter if priceMin and priceMax are provided
    if (priceMin !== undefined && priceMax !== undefined) {
        searchQuery.price = { $gte: priceMin, $lte: priceMax };
    }

    try {
        const products = await Product.find(searchQuery)
            .sort(sortOptions)
            .skip((page - 1) * limit) // Skip the products for the previous pages
            .limit(parseInt(limit)); // Limit the number of products per page

        const totalProducts = await Product.countDocuments(searchQuery); // Get total number of products

        res.status(200).json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};



module.exports = {
    addProduct,
    addProducts,
    getProducts
}