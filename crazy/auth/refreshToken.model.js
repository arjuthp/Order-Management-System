//refresh token storage

const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 604800,
    }
});

const RefreshToken = mongoose.model('refreshToken', refreshTokenSchema);
module.exports = RefreshToken;