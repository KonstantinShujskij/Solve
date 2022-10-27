const User = require('../models/User')
const bcrypt = require('bcrypt');
const errors = require('../errors');


module.exports = {
    login: async (email, password, service = 'default') => {
        const user = await User.findOne({ email })

        if(!user) { 
            const hashedPassword = service === 'default'? await bcrypt.hash(password, 12) : 'None'
            const user = new User({ email, password: hashedPassword })
            await user.save()
    
            return { user, error: null }
        }

        if(service === 'google') { return { user, error: null } }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) { return { user, error: 'Incorect password' } }

        return { user, error: null }
    },
    setInfo: async (id, info) => {
        try {
            await User.updateOne({ _id: id }, { $set: {...info, info: true} } ) 
            return null;

        } catch(error) { return error }        
    },

    get: async (id) => {
        try { return await User.findOne({ _id: id }) } 
        catch(error) { return null }        
    },
    getMasters: async () => {
        try { return await User.find({ type: 'MASTER' }) } 
        catch(error) { return [] }        
    },


    getMaster: async (id) => {
        const user = await User.findOne({ _id: id }) 

        if(user.type !== 'MASTER') { throw errors.isNotMaster }

        return user
    },

}
