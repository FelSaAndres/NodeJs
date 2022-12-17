const mongoose = require('mongoose')

const userSchema = {
    username: String,
    password: String,
}

const userModel = mongoose.model('usuario', userSchema)
module.exports = {userModel}