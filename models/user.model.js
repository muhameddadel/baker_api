const mongoose = require('mongoose');
const validator = require('validator');
const role = require('../utils/role')
const BakerProfile = require('./bakerProfile.model');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: [role.BAKER, role.MEMBER, role.GUEST],
        default: role.BAKER,
        required: true,
    },
});


userSchema.post('save', async function () {
    if (this.role === role.BAKER) {
        await BakerProfile.create({ user: this._id });
    }
});


module.exports = mongoose.model('User', userSchema);
