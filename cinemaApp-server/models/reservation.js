const mongoose = require('mongoose');

const cinemaSchema = mongoose.Schema({
    idFilm: { type: mongoose.Schema.Types.ObjectId, ref: "film", required:true },
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: "user", required:true},
    date: {type:Date, required:true},
    nbPlace: {type:Number, required:true},
})

module.exports = mongoose.model('Reservation', cinemaSchema);
