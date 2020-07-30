const { check, validationResult } = require('express-validator');

exports.createPost = ()=>{
    return [
        check('text', 'Text is required').not().isEmpty(),
    ]
}

exports.reaction = ()=>{
    return [
        check('reaction', 'Reaction is requied').not().isEmpty(),
        check('oid', 'Missing fields').not().isEmpty()
    ]
}