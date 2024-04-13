const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userid:String,
    company:String
})

const ProductModel = new mongoose.model('products',ProductSchema)

module.exports = ProductModel;