const Device = require('../models/Device')
const errors = require('../errors')
const constants = require('../constants')


const get = async (id) => {
    try { return await Device.findOne({ _id: id }) }
    catch(error) { throw errors.deviceNotFind }    
}

const create = async (data, images, owner) => {
    const { category, model, description } = data

    const device = new Device({ 
        category, 
        model, 
        description, 
        status: constants.status.SEARCH,
        images, 
        owner
    })
    
    return device
}


module.exports = { get, create }
