'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AccountsSchema = new Schema({
    accountName: String
})

module.exports = mongoose.model('AccountName', AccountsSchema)