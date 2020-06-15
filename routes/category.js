const express = require('express');
const router = express.Router();
const categoryService = require("../services/category")

router.get('/', async(req, res, next) => {
  try{
    const response = await categoryService.getCategory();
    return res.json({ status : true, category : response });
  }catch(err){
    return res.json({ status : false, message : 'Something went wrong. Try later.' });
  }
});

router.delete('/removeCategoryById/:id', async(req, res, next) => {
  try{
    const id = req.params.id;
    const response = await categoryService.deleteCategory(id);
    return res.json({ status : true, category : response, message : response ? 'Category deleted successfully.' : 'No category present with id.' });
  }catch(err){
    return res.json({ status : false, message : 'Something went wrong. Try later.' });
  }
});

router.post('/', async(req, res, next) => {
  try{
    const category = req.body;
    if(!category || !category.title) return res.json({ status : false, message : 'Category title is missing.'});
    const response = await categoryService.addCategory(category);
    return res.json({ status : true, message : 'Category added successfully.', category : response });
  }catch(err){
    return res.json({ status : false, message : 'Something went wrong. Try later.' });
  }
});

module.exports = router;
