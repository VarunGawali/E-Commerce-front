import mongoose, { Schema } from "mongoose"

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    images: [{type:String}],
    category: {type:mongoose.Types.ObjectId, ref: 'Category'},
    properies: {type:Object}
},{
    timestamps:true,
})

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);