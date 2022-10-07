const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String},
    phone: {type: String},
    password: {type: String, required: true},
    type: {type: String},
    cases: [ {type: String} ],
    lat: {type: Number},
    lng: {type: Number},
    adres: {type: String},
    info: {type: Boolean, default: false},
    telegram: {type: String},
    instagram: {type: String},
    facebook: {type: String},
    whatsapp: {type: String},
    images: [ {type: String} ],
    avatar: {type: String},
    reviews: []
})

module.exports = model('User', schema)
