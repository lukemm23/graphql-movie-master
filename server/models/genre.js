const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Genre', genreSchema);