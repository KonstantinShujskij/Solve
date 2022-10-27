const User = require('../models/User')
const errors = require('../errors');

const get = async (id) => {
    try { return await User.findOne({ _id: id }) }
    catch(error) { throw errors.userNotFind }        
}

const getClient = async (id) => {
    const user = await this.get(id)

    if(user.type !== 'CLIENT') { throw errors.isNotClient }

    return user
}

const getMaster = async (id) => {
    const user = await get(id)

    if(user.type !== 'MASTER') { throw errors.isNotMaster }

    return user
}


module.exports = { get, getClient, getMaster }
