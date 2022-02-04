const mongoose = require('mongoose');
const { Schema } = mongoose; //Нужно, чтобы не обращятся к mongoose.Schema а использовать сразу Schema


const userSchema = new Schema({
    name: String,
    password: String
})

module.exports = mongoose.model('User', userSchema)