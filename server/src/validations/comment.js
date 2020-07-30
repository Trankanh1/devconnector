const { check, validationResult } = require('express-validator');


exports.postComment = ()=>{
    return [
        check('comment', 'Comment is requred').not().isEmpty(),
        check('oid', 'Missing fields').not().isEmpty()
    ]
}

exports.editComment = ()=>{
    return [
        check('comment', 'Comment is requred').not().isEmpty(),
        check('oid', 'Missing fields').not().isEmpty()
    ]
}