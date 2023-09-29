const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }, 
    bakingTime: {
        type: Number,
        required: true,
    }
});


module.exports = mongoose.model("Product", productSchema)