const User = require(appDir + '/src/models/user');
const config = require('config');
const response = require(appDir + '/src/response/response');
const { validationResult } = require('express-validator');

exports.remove = async (req, res, next)=>{
    try {
        await User.findOneAndRemove({user: req.user.id});
      
        response.success(res, {msg: "Removed successfully!"});
    } catch(err){
        
    }
}