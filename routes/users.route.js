const express = require("express");
const {validationSchema} = require('../middlewares/validation_schema')
const userController = require('../controller/users.controller');
const verifyToken = require("../middlewares/verifyToken");
const appError = require("../utils/appError");
const role = require("../utils/role");
const allowedTo = require("../middlewares/allowedTo");

    

const router = express.Router()

router.route('/')
        .get(verifyToken, userController.getAllUsers)

// router.route('/:id')
//         .get()

router.route('/register')
        .post(userController.register)

router.route('/login')
        .post(verifyToken, userController.login)


module.exports = router;