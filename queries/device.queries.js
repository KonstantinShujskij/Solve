const Device = require('../models/Device')
const constants = require('../constants')

module.exports = {
    create: async (data, status, images, owner) => {
        const { category, model, description } = data
        const device = new Device({ category, model, description, status, images, owner })
        await device.save()
        
        return device
    },
    get: async (id) => {
        return Device.findOne({ _id: id })
    },
    getList: async (owner) => {
        return Device.find({ owner })
    },
}
