const { check, validationResult } = require('express-validator');

/**
 * Check user create profile information
 */
exports.createOrUpdate = () => {
    return [ 
     check('status', 'Status is required').not().isEmpty(),
     check('skills', 'Skills are required').not().isEmpty()
    ]
 }