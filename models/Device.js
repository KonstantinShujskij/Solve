const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    category: {type: String},
    model: {type: String},
    description: {type: String},
    images: [ {type: String} ],
    status: {type: String},
    owner: {type: Types.ObjectId, ref: 'User'},
    bets: [ {type: Types.ObjectId, ref: 'Bet'} ],
    bet: {type: Types.ObjectId, ref: 'Bet'},
    master: {type: Types.ObjectId, ref: 'User'},
    contract: {type: Types.ObjectId, ref: 'Contract'},
    workStatus: {type: String},
    notes: {type: String},

    createdAt: {type: Number},
    updatedAt: {type: Number}
}, {
    timestamps: { currentTime: () => Date.now() }
})

module.exports = model('Device', schema)
