"use strict";
exports.__esModule = true;
var check_1 = require("express-validator/check");
exports.signUpValid = [
    check_1.check('nickname', 'Name is required')
        .notEmpty()
        .isLength({
        min: 3,
        max: 32
    })
        .withMessage('name must be between 3 to 32 characters'),
    check_1.check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check_1.check('password', 'password is required').notEmpty(),
    check_1.check('password').isLength({
        min: 8
    })
        .withMessage('Password must contain at least 8 characters')
        .matches(/\d/)
        .withMessage('password must contain a number'),
    check_1.check('phoneNumber')
        .isMobilePhone(),
    function (req, res, next) {
        var errors = check_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else
            next();
    }
];
exports.validLogin = [
    check_1.check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check_1.check('password', 'password is required').notEmpty(),
    check_1.check('password').isLength({
        min: 8
    }).withMessage('Password must contain at least 8 characters').matches(/\d/).withMessage('password must contain a number')
];
exports.forgotPasswordValidator = [
    check_1.check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];
exports.resetPasswordValidator = [
    check_1.check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
];
