import { check, validationResult } from 'express-validator/check'
import { Request, Response, NextFunction } from 'express'
import { MobilePhoneLocale } from 'express-validator/src/options';

exports.signUpValid = [
    
    check('nickname', 'Name is required')
    .notEmpty()
    .isLength({
        min: 3,
        max: 32
    })
    .withMessage('name must be between 3 to 32 characters'),
    
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 8
    })
    .withMessage('Password must contain at least 8 characters')
    .matches(/\d/)
    .withMessage('password must contain a number'),

    check('phoneNumber')
    .isMobilePhone(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
]

exports.validLogin = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 8
    }).withMessage('Password must contain at least 8 characters').matches(/\d/).withMessage('password must contain a number')
]


exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
];