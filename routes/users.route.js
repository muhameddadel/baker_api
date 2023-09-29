const express = require("express");
const userController = require('../controller/users.controller');
const orderController = require('../controller/orders.controller');
const verifyToken = require("../middlewares/verifyToken");
    

const router = express.Router()

router.route('/')
        .get(userController.getAllUsers)

router.route('/baker/:id')
        .get(userController.getBakerProfile)
        
router.route('/baker/:id/available-collection-times')
        .get(orderController.getAvailableCollectionTimes)

router.route('/register')
        .post(userController.register)

router.route('/login')
        .post(verifyToken, userController.login)


module.exports = router;