const categoryModel = require("../models/category");

exports.addCategory = async category => {
  try{
    if(category.parent) {
      category.path = `${category.parent}/${category.title}`;
    }else {
      category.path = `${category.title}`;
      category.parent = null;
    }
    const addedCategory = await categoryModel.create(category);
    return addedCategory;
  }catch(err){
    throw err;
  }
}
exports.getCategory = async () => {
  try{
    const pipeline = [
      {
        $group : {
          _id : "$parent",
          child_categories: { $push : "$path" }
        }
      },
      {
        $project : {
          _id : 0,
          category : "$_id",
          child_categories : 1
        }
      }
    ]
    const categories = await categoryModel.aggregate(pipeline).allowDiskUse().exec();
    return categories;
  }catch(err){
    throw err;
  }
}
exports.deleteCategory = async id => {
  try{
    const categories = await categoryModel.findOneAndDelete({ _id : id});
    return categories;
  }catch(err){
    throw err;
  }
}

