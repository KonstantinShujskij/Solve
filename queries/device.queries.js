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
    
    // -------------------
    getDevices: async (owner) => {
        const statusList = [constants.status.PACT, constants.status.CONFIRM, constants.status.RESERVE,
                            constants.status.CHECK, constants.status.CANCLE, constants.status.CREATE]

        return Device.find({ owner, status: { $in: statusList} })
    },
    getAuctions: async (owner) => {
        return Device.find({ owner, status: constants.status.SEARCH })
    },
    getOrders: async (master) => {
        const statusList = [constants.status.PACT, constants.status.CONFIRM, constants.status.RESERVE]

        return Device.find({ master, status: { $in: statusList} })
    },
    getClaims: async (master) => {
        return Device.find({ master, status: constants.status.CHECK })
    },
    getLots: async (categories) => {
        return Device.find({ category: {$in: categories}, status: constants.status.SEARCH })
    },
}
