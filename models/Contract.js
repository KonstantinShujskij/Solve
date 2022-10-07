const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    data: {type: String},
    price: {type: String},
    device: {type: Types.ObjectId, ref: 'Device'},

    client: {type: Types.ObjectId, ref: 'User'},
    master: {type: Types.ObjectId, ref: 'User'},

    clientAccept: {type: Boolean},
    masterAccept: {type: Boolean},    
})

module.exports = model('Contract', schema)
