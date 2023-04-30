const mongoose = require('mongoose')
const {Schema} = mongoose;

const bookSchema = new Schema({
    title : String,
    author : String,
    publishedAt : String,
})


module.exports = mongoose.model('booklist', bookSchema);
