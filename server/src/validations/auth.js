const { check, validationResult } = require('express-validator');
const User = require(appDir + '/src/models/user');
/**
 * Check user register information
 */
exports.register = () => {
    return [
        check('name', 'Not empty').not().isEmpty(),
        check('email', 'Invalid email').isEmail().custom(async(email) => {
            let user = await User.exists(email);
            if (user) {
                throw new Error("User already exists");
            }

            return true
        }),
        check('email', 'Already used'),
        check('password', 'Password must at least contain 6 characters').exists().isLength({ min: 6}),
        check('password', 'Password must at less than 128 characters').isLength({ max: 128})
    ]
}
/**
 * Check user login information
 */
exports.login = () => {
   return[ 
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required').exists()
]
}