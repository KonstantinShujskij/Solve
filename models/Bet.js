const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    price: {type: String},
    description: {type: String},
    owner: {type: Types.ObjectId, ref: 'User'},
    client: {type: Types.ObjectId, ref: 'User'},
    device: {type: Types.ObjectId, ref: 'Device'},
    accept: {type: Boolean, default: false}
})

module.exports = model('Bet', schema)
