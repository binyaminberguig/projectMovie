const mongoose = require('mongoose');

const cinemaSchema = mongoose.Schema({
    title: { type: String, required:true},
    description: { type: String, required:true},
    picture: { type: String, required:true},
})

module.exports = mongoose.model('movie', cinemaSchema);
