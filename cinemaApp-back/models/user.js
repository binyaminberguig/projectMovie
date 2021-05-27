const mongoose = require('mongoose');

const cinemaSchema = mongoose.Schema({
    login: {type:String, required:true},
    fullName: {type:String, required:true},
    password: {type:String, required:true},
    isAdmin: {type:Boolean, required:true},
})

module.exports = mongoose.model('User', cinemaSchema);
