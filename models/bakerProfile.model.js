const mongoose = require('mongoose');

const bakerProfileSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        default: "Cairo"
    },
    rating: {
        type: Number,
        default: 0,
    },
    collectionTimeRange: {
        type: String, // You can use a more appropriate data type for time range
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('BakerProfile', bakerProfileSchema);
