const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ProductSchema = new Schema(
    {
        title: String,
        description: String,
        categories: [String],
        quantity: Number,
        price: Number
    },
    { 
        collection: 'Product'
    }
);

ProductSchema.index({categories:1 });

module.exports = mongoose.model('Product', ProductSchema);
