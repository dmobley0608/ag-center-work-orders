const { Schema, model } = require("mongoose");

const schema = new Schema({
    username:String,
    password:String
})

const User = model('User', schema)

module.exports = User
