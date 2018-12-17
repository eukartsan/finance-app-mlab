var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AccountsSchema = new Schema({
    author: String,
    text: String,
    account: String
})

module.exports = mongoose.model('Account', AccountsSchema)