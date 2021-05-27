const mongoose = require('mongoose');

const cinemaSchema = mongoose.Schema({
    title: { type: String, required:true},
    synopsis: { type: String, required:true},
    picture: { type: String, required:true},
    nbPlace: { type: Number, required:true}
})

module.exports = mongoose.model('movie', cinemaSchema);
