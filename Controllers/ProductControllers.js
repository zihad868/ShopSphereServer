const Product = require('../Models/ProdectModels');

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


const addProducts = async (req, res) => {
    const products = req.body; // Expecting an array of products

    try {
        const newProducts = await Product.insertMany(products);
        res.status(201).json(newProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    addProduct,
    addProducts
}