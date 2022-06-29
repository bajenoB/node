const {Schema, model} = require('mongoose')

const Root = new Schema({
    value: {type: String, unique: true, default: "USER"}
})

module.exports = model('Root', Root)