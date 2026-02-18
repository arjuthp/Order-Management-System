const jwt = require('jsonwebtoken');

//generate access token
function generateAccessToken(userId) {
    return jwt.sign({userId: userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

function generateRefreshToken(userId) {
    return jwt.sign({userId: userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
  
}

function verifyAccessToken(token){
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decoded;
    }catch(error){
        return null;
    }
}

function verifyRefreshToken(token) {
    try{
         const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
         return decoded;
    }catch(error){
        return null;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,// used in auhtcontroller


}