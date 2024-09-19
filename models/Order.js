import mongoose, { Schema } from "mongoose"

const OrderSchema = new mongoose.Schema({
    line_items: [{
        title: String,
        description: String,
        price: Number,
        images: [String],
        category: String,
        quantity: Number,
      }],
    name: String,
    email: String,
    city: String,
    pincode: String,
    address: String,
    country: String,
    paid: Boolean,
    orderId: String,
},{
    timestamps: true,
})

const Order = mongoose.models?.Order || mongoose.model('Order', OrderSchema)
export default Order;