const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    post: String,
    description: String,
    genreId: [String],
});

module.exports = mongoose.model('Movie', movieSchema);