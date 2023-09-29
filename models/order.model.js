const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    collectionTime: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null,
    },
});

module.exports = mongoose.model('Order', orderSchema)