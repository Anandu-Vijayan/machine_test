const { createProduct, getAllProduct, updateProduct, deleteProduct } = require("../controllers/product.controller.js");

  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create_product",createProduct )
    router.get("/getAll_products",getAllProduct)
    router.put("/update_product/:id",updateProduct)
    router.delete("/delete_product/:id",deleteProduct)

  
module.exports =router