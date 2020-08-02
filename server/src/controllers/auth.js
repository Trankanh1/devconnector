const jwt = require('jsonwebtoken');
const User = require(appDir + '/src/models/user');
const bcrypt = require('bcryptjs');
const config = require('config');
const response = require(appDir + '/src/response/response');
const gravatar = require('gravatar');
const { validationResult } = require('express-validator');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        const avatar = gravatar.url(email, {
            s: '200',
            r: "pg",
            d: "mm"
        });
        let user = new User({
            name,
            email,
            password,
            avatar
        });

        await user.save();

        return response.success(res, {access_token: generateAccessToken(user)});
    } catch (err) {
        response.serverError(res, err.message);
    }

}

exports.login = async (req, res, next) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response.failure(res, errors);
    }
  
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return response.failure(res, { errors: [{ msg: 'The email doesn\'t exists' }] });
        }
       
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            response.failure(res, { errors: [{ msg: 'Wrong email or password' }] });
        }
        
        return response.success(res, {access_token:  generateAccessToken(user)});

    } catch (err) {
        response.serverError(res, err.message)
    }
}

 function generateAccessToken(user){
    const payload = {
        user: {
            id: user.id,
        }
    };

    const signOptions = {
        expiresIn: config.get('jwtExpirationInterval')
    }

    return jwt.sign(
        payload,
        config.get('jwtSecret'),
        signOptions
    );
}