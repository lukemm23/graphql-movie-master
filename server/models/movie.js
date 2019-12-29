const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    poster: String,
    description: String,
    genreId: [String],
});

module.exports = mongoose.model('Movie', movieSchema);