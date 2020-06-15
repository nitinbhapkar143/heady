const mongoose = require('mongoose');
const Schema = mongoose.Schema
const CategorySchema = new Schema(
    {
        title: String,
        description: String,
        parent: String,
        path: String
    },
    { 
        toJSON: { virtuals: true }, 
        toObject: { virtuals: true },
        collection: 'Category'
    }
);

CategorySchema.index({parent: 1, path: 1});
CategorySchema.index({path: 1});

CategorySchema.virtual('categories', {
    ref: 'Product',
    localField: 'path',
    foreignField: 'categories',
    justOne: false
});

module.exports = mongoose.model('Category', CategorySchema);
