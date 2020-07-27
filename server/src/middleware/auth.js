const jwt = require('jsonwebtoken');
const config = require('config');
const response = require(appDir+'/src/response/response');

module.exports = (req, res, next) =>{
    const token = req.header('x-auth-token');
    if(!token) {
        return response.failure(res,{errors:[{msg: 'No token, authorization denied' }]});
    }

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch(err){
        res.status(401).json({msg: 'Token is not valid'});
    }
}