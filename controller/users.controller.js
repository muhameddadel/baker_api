const User = require("../models/user.model")
const httpStatus = require("../utils/httpStatus");
const asyncWarpper = require("../middlewares/asyncWarpper");
const appError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const generateJWT = require("../utils/generateJWT");
const role = require("../utils/role");
const BakerProfile = require('../models/bakerProfile.model');


const register = asyncWarpper(async (req, res, next) => {
    const {username, email, password, role} = req.body

    const existedUser = await User.findOne({email: email})
    if (existedUser) {
        const error = appError.create("User already exists", 400, httpStatus.FAIL)
        return next(error)
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role, 
    })

    const token = await generateJWT({email: newUser.email, id: newUser._id, role: newUser.role})
    newUser.token = token


    await newUser.save()

    return res.status(201).json({status: httpStatus.SUCCESS, data: newUser})
})


const login = asyncWarpper(async (req, res, next) => {
    const {email, password} = req.body

    if (!email && !password) {
        const error = appError.create("Email and password are required", 400, httpStatus.FAIL)
        return next(error)
    }

    const user = await User.findOne({email: email})

    if (!user) {
        const error = appError.create("User not found", 400, httpStatus.FAIL)
        return next(error)
    }

    const matchedPassword = await bcrypt.compare(password, user.password)

    if (user && matchedPassword) {
        const token = await generateJWT({email: user.email, id: user._id, role: user.role})
        return res.status(200).json({status: httpStatus.SUCCESS, data: {token}})
    } else {
        const error = appError.create("Wrong password or email", 500, httpStatus.ERROR)
        return next(error)
    }

})


const getAllUsers = asyncWarpper(async (req, res) => {
    const query = req.query

    const limit = query.limit || 2
    const page = query.page || 1
    const skip = (page - 1) * limit

    const users = await User.find({}, {password: 0, "__v": false}).limit(limit).skip(skip)
    res.json({status: httpStatus.SUCCESS, data: {users}})
})


const getBakerProfile = asyncWarpper(async (req, res, next) => {
    const bakerId = req.params.id;
    const { location, rating } = req.body;

    const query = { user: bakerId };

    if (location) {
        query.location = location;
    }

    if (rating) {
        query.rating = rating;
    }

    const projection = { location: 1, rating: 1, _id: 0};
    const bakerProfile = await BakerProfile.findOne(query, projection);

    if (!bakerProfile) {
        const error = appError.create('Baker profile not found', 404, httpStatus.FAIL);
        return next(error);
    }

    res.json({ status: httpStatus.SUCCESS, data: { bakerProfile } });
});


module.exports = {
    getAllUsers,
    register,
    login,
    getBakerProfile
}