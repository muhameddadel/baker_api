const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    type: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model("Product", productSchema)