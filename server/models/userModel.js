
const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String
})
const RegisterModel = mongoose.model("Login", RegisterSchema);
module.exports = RegisterModel;