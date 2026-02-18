//authenticateTOken mdlleware

//why we dont store token in database

const {verifyAccessToken} = require('../utils/jwt');
function authenticateToken(req, res, next) {
    //get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.sendStatus(401);
    }

    const decoded = verifyAccessToken(token);
    if(!decoded){
        return res.sendStatus(403);
    }

    req.user = decoded;
    next();
}

module.exports = {authenticateToken};

//this middleware is used in order.route