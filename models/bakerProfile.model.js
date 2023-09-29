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
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('BakerProfile', bakerProfileSchema);
