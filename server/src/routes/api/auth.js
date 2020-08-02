const express = require('express');
const router = express.Router();
const response = require(appDir+'/src/response/response')
const auth = require(appDir+ '/src/middleware/auth');
const User = require(appDir+'/src/models/user');
const validator = require(appDir + '/src/validations/auth');
const AuthController = require(appDir + '/src/controllers/auth');

router.get('/', auth, async(req, res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err){
        response.serverError({res,msg: "Server Error"})
    }
    
});
/**
 * @route  POST api/users
 * @desc   Register user
 * @access Public
 */
router.post('/register', validator.register(), AuthController.register);

/**
 * @route  POST api/login
 * @desc   User Login
 * @access Public
 */
router.post('/login', validator.login(), AuthController.login);

module.exports = router;