const validator = require('validator')

exports.signup = [
    check('email').isEmail(),
    check('phoneNumber').isMobilePhone(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
]