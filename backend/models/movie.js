// define schema

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const movieSchema = new Schema({
    name: String,
    genre: String,
    directorId: String,
})

//第一引数は名前
module.exports = mongoose.model('Movie', movieSchema)
