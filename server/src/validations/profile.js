const { check, validationResult } = require('express-validator');

/**
 * Check user create profile information
 */
exports.createOrUpdate = () => {
    return [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills are required').not().isEmpty()
    ];
}

exports.addExperience = () => {
    return [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is requried').not().isEmpty()
    ];
}

exports.addEducation = ()=>{
    return [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'Degree is reqiured').not().isEmpty(),
        check('fieldofstudy', 'Field of study is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty()
    ]
}