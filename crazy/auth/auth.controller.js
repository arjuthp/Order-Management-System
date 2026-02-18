//login, logout, refresh, register
const {generateAccessToken, generateRefreshToken, verifyRefreshToken} = require('../utils/jwt');

const RefreshToken = require('./refreshToken.model');
const User = require('../user/user.model');
const bcrypt = require('bcryptjs');

async function handleLogin(req, res) {
    const {email, password} = req.body;

    //find User
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({error: 'Invalid credientals'});
    }

    //Check Passwaord
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        return res.status(401).json({error: 'Invalid credientials'});
    }

    //use generateAccessToken here
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    //saves refreshToken to db
    await RefreshToken.create({token: refreshToken, userId: user._id});

    //send token to client
    return res.json({
        message: 'Login seccessful',
        accessToken: accessToken,
        refreshToken: refreshToken,

    });
}

async function handleRegister(req, res) {
    const {name, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({name, email,password: hashedPassword});
    return res.json({ message: 'User registered successfully'});
}

//get new access token
async function handleRefreshToken(req, res) {
    const {refreshToken} = req.body;

    if(!refreshToken){
        return res.sendStatus(401);

    }
    //check if token exists in db
    const tokenDoc = await RefreshToken.findOne({token: refreshToken});
    if(!tokenDoc){
        return res.sendStatus(403);
    }
    //verify refreshtoken
    const decoded = verifyRefreshToken(refreshToken);
    if(!decoded){
        return res.sendStatus(403);
    }
    //gen new access token
    const newAccessToken = generateAccessToken(decoded.userId);
    return res.json({accessToken : newAccessToken});
} 

async function handleLogout(req, res) {
    const {refreshToken} = req.body;

    await RefreshToken.deleteOne({token : refreshToken});
    return res.sendStatus(204);
}

module.exports = {
    handleLogin,
    handleRegister,
    handleRefreshToken,
    handleLogout
}