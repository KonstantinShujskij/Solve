const Bet = require('../models/Bet')
const errors = require('../errors')


const get = async (id) => {
    try { return await Bet.findOne({ _id: id }) }
    catch(error) { throw errors.betNotFind }    
}

//master is not bet before. its need?
const create = async (price, description, device, master) => {
    if(device.status !== 'SEARCH') { throw errors.deviceNotSearch }

    const bet = new Bet({
        price, 
        description, 
        client: device.owner,
        owner: master._id,
        device: device.id
    })

    return bet
}


module.exports = { get, create }
