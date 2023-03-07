const db = require("../models"); 
const Product = db.products;

exports.createProduct = async (req,res)=>{
    try {
        const {Product_Code,Product_title,description,price,quantity} = req.body
        const Pro = await Product.create({Product_Code,Product_title,description,price,quantity})
        res.status(201).json({Pro})
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
}
exports.getAllProduct = async(req,res)=>{
    try {
        const getAllProducts = await Product.findAll({})
        res.status(200).json({getAllProducts})
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
}
exports.updateProduct = async(req,res)=>{
    try {
        const {id} = req.params
        const {Product_Code,Product_title,description,price,quantity} = req.body
        const updateProducts = await Product.update({
            Product_Code:Product_Code,Product_title:Product_title,description:description,price:price,quantity:quantity   
        },
        { where: {id} }
        )
        res.status(200).json("Updated")
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params
        await Product.destroy({where:{id}})
        res.status(200).json("Deleted")
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
}