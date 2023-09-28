const {validationResult} = require("express-validator");
const Product = require("../models/product.model")
const httpStatus = require("../utils/httpStatus");
const asyncWarpper = require("../middlewares/asyncWarpper");
const appError = require("../utils/appError");

const createProduct = asyncWarpper(async (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        const error = appError.create(errors.array(), 400, httpStatus.FAIL)
        next(error)
    }

    const newProduct = new Product(req.body)
    await newProduct.save()

    res.status(201).json({status: httpStatus.SUCCESS, data: {product: newProduct}})
})


const getProducts = asyncWarpper(async (req, res) => {
    const query = req.query
    const {type} = query

    const limit = query.limit || 3
    const page = query.page || 1
    const skip = (page - 1) * limit
    const filter = {};

    if (type) {
        filter.type = type;
    }

    // Use the filter object to query the products
    const products = await Product.find(filter, { __v: false })
        .limit(limit)
        .skip(skip);
    res.json({status: httpStatus.SUCCESS, data: {products}})
})


const updateProduct = asyncWarpper(async (req, res, next) => {
    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
        new: true,
        runValidators: true,
    });

    if (!updatedProduct) {
        const error = appError.create('Product not found', 404, httpStatus.FAIL);
        return next(error);
    }

    res.json({ status: httpStatus.SUCCESS, data: { product: updatedProduct } });
});


const deleteProduct = asyncWarpper(async (req, res, next) => {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
        const error = appError.create('Product not found', 404, httpStatus.FAIL);
        return next(error);
    }

    res.json({ status: httpStatus.SUCCESS, message: 'Product deleted successfully' });
});

module.exports = {
    createProduct, 
    getProducts,
    updateProduct,
    deleteProduct
}