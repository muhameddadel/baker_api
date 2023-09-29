const express = require("express");
const {validationSchema} = require('../middlewares/validation_schema')
const ordersController = require('../controller/orders.controller');
const verifyToken = require("../middlewares/verifyToken");
const appError = require("../utils/appError");
const role = require("../utils/role");
const allowedTo = require("../middlewares/allowedTo");


const router = express.Router()

        
router.route('/')
        .post(ordersController.placeOrder)

router.route('/:id/rate')
        .post(allowedTo(role.GUEST), ordersController.rateOrder)



module.exports = router