const {body} = require("express-validator");


const validationSchema = () => {
    return [body('type')
                .notEmpty()
                .withMessage("type is required")
                .isLength({min: 2})
                .withMessage("type at least is 2 char"),
]}


module.exports = {
    validationSchema
}