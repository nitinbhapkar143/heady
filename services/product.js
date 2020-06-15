const productModel = require("../models/product");

exports.addProduct = async product => {
  try{
    const addedProduct = await productModel.create(product);
    return addedProduct;
  }catch(err){
    throw err;
  }
}

exports.getProducts = async category => {
    try{
        const query = category ? { categories : new RegExp(category, 'i')} : {}
        const products = await productModel.find(query);
        return products;
    }catch(err){
      throw err;
    }
}

exports.updateProduct = async (id, product) => {
    try{
        const updatedProduct = await productModel.findOneAndUpdate({ _id : id}, product, { new: true });
        return updatedProduct;
    }catch(err){
      throw err;
    }
}

exports.validateProduct = async product => {
    let isValidString = validateString(product.title);
    if(product.title && !isValidString) return { message : "Invalid product title." };
    isValidString = validateString(product.description);
    if(product.description && !isValidString) return { message : "Invalid product description." };
    let isValidNumber = validateNumber(product.quantity);
    if(product.quantity && !isValidNumber) return { message : "Invalid product quantity." };
    isValidNumber = validateNumber(product.price);
    if(product.price && !isValidNumber) return { message : "Invalid product price." };
    let isValidArray = validateArray(product.categories);
    if(product.categories && !isValidArray) return { message : "Invalid product categories." };
    return false;
}

exports.deleteProduct = async id => {
    try{
      const product = await productModel.findOneAndDelete({ _id : id});
      return product;
    }catch(err){
      throw err;
    }
}

const validateString = string => {
    const regex = new RegExp('^[ A-Za-z0-9_@./#&+-]*$');
    return regex.test(string);
}
const validateNumber = number => {
  const regex = new RegExp('^[0-9]+$')
  return regex.test(number);
}

const validateArray = array => {
    return Array.isArray(array)
}