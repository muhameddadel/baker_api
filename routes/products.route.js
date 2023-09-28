const express = require("express");
const {validationSchema} = require('../middlewares/validation_schema')
const productController = require('../controller/products.controller');
const verifyToken = require("../middlewares/verifyToken");
const appError = require("../utils/appError");
const role = require("../utils/role");
const allowedTo = require("../middlewares/allowedTo");

const router = express.Router();

router.route('/')
    .get(productController.getProducts)
    .post(verifyToken, allowedTo(role.BAKER), validationSchema(), productController.createProduct)

router.route('/:id')
    .patch(verifyToken, allowedTo(role.BAKER), productController.updateProduct)
    .delete(verifyToken, allowedTo(role.BAKER), productController.deleteProduct)



module.exports = router;