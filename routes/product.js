const express = require('express');
const router = express.Router();
const productService = require("../services/product");

router.get('/', async(req, res, next) => {
  try{
    const category = req.query.category;
    const response = await productService.getProducts(category);
    return res.json({ status : true, products : response });
  }catch(err){
    return res.json({ status : false, message : 'Something went wrong. Try later.' });
  }
});

router.post('/', async(req, res, next) => {
  try{
    const product = req.body;
    if(!product || !product.title) return res.json({ status : false, message : 'Product title is missing.'});
    if(!product.categories || !product.categories.length) return res.json({ status : false, message : 'Please select at least one category for product.'});
    if(!product.quantity) return res.json({ status : false, message : 'Product quantity is missing.'});
    if(!product.price) return res.json({ status : false, message : 'Product price is missing.'});
    const isInvalid = await productService.validateProduct(product);
    if(isInvalid) return res.json({ status : false, message : isInvalid.message }); 
    const response = await productService.addProduct(product);
    return res.json({ status : true, product : response, message : "Product added successfully." });
  }catch(err){
    return res.json({ status : false, message : 'Something went wrong. Try later.' });
  }
});

router.put('/', async(req, res, next) => {
  try{
    const product = req.body;
    if(product.categories && !product.categories.length) return res.json({ status : false, message : 'Please select at least one category for product.'});
    const isInvalid = await productService.validateProduct(product);
    if(isInvalid) return res.json({ status : false, message : isInvalid.message }); 
    const response = await productService.updateProduct(product._id, product);
    return res.json({ status : true, product : response, message : "Product updated successfully." });
  }catch(err){
    console.log(err);
    return res.json({ status : false, message : 'Something went wrong. Try later.' });
  }
});

router.delete('/removeProductById/:id', async(req, res, next) => {
  try{
    const id = req.params.id;
    const response = await productService.deleteProduct(id);
    return res.json({ status : true, category : response, message : response ? 'Product deleted successfully.' : 'No product present with id.' });
  }catch(err){
    console.log(err)
    return res.json({ status : false, message : 'Something went wrong. Try later.' });
  }
});

module.exports = router;
