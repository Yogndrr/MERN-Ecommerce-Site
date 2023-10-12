const mongoose = require("mongoose")

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Seller"
    },
    shopName: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model("seller", sellerSchema)