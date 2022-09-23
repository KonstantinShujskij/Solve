const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    price: {type: String},
    description: {type: String},
    owner: {type: Types.ObjectId, ref: 'User'},
    ownerName: {type: String},
    device: {type: Types.ObjectId, ref: 'Device'},
})

module.exports = model('Bet', schema)
