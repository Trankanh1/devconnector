const { check, validationResult } = require('express-validator');

exports.createPost = ()=>{
    return [
        check('text', 'Text is required').not().isEmpty(),
    ]
}