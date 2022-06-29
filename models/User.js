const {Schema, model} = require('mongoose')

const User = new Schema({
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    root: [{type: String, ref: 'Root'}]
})

module.exports = model('User', User)