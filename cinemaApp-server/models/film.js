const mongoose = require('mongoose');

const cinemaSchema = mongoose.Schema({
    title: { type: String, required:true},
    description: { type: String, required:true},
    image: { type: String, required:false},
})

module.exports = mongoose.model('film', cinemaSchema);
