const {Router} = require('express')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const userQueries = require('../queries/user.queries')
const constants = require('../constants')
const errors = require('../errors')
const Device = require('../models/Device')



const router = Router()

router.post('/devices', auth, async (req, res) => {
    try {
        const { limit, skip } = req.body

        const user = await userQueries.get(req.user.userId)

        if(user.type !== constants.CLIENT) { return res.status(400).json(errors.isNotClient) }

        const list = await Device.find({ 
            owner: user._id, 
            status: { $in: constants.deviceStatusList} 
        }).limit(limit).skip(skip)

        res.status(200).json(list.map((item) => { return { id: item._id, updatedAt: item.updatedAt } }))
    } catch(error) {
        res.status(500).json(errors.unknown)
    }
})

router.post('/auctions', auth, async (req, res) => {
    try {
        const { limit, skip } = req.body

        const user = await userQueries.get(req.user.userId)

        if(user.type !== constants.CLIENT) { return res.status(400).json(errors.isNotClient) }

        const list = await Device.find({ 
            owner: user._id, 
            status: constants.status.SEARCH
        }).limit(limit).skip(skip)

        res.status(200).json(list.map((item) => { return { id: item._id, updatedAt: item.updatedAt } }))
    } catch(error) {
        res.status(500).json(errors.unknown)
    }
})

router.post('/orders', auth, async (req, res) => {
    try {
        const { filter, limit, skip } = req.body

        const user = await userQueries.get(req.user.userId)

        if(user.type !== constants.MASTER) { return res.status(400).json(errors.isNotMaster) }

        if(!filter.cases.length) { filter.cases = config.get('categories') }
        if(!filter.status.length) { filter.status = constants.orderStatusList }

        const list = await Device.find({ 
            master: user._id,
            category: {$in: filter.cases}, 
            status: { $in: filter.status} 
        }).sort({
            createdAt: filter.date,
        }).limit(limit).skip(skip)

        res.status(200).json(list.map((item) => { return { id: item._id, updatedAt: item.updatedAt } }))
    } catch(error) {
        res.status(500).json(errors.unknown)
    }
})

router.post('/claims', auth, async (req, res) => {
    try {
        const { limit, skip } = req.body

        const user = await userQueries.get(req.user.userId)

        if(user.type !== constants.MASTER) { return res.status(400).json(errors.isNotMaster) }

        const list = await Device.find({ 
            master: user._id, 
            status: constants.status.CHECK
        }).limit(limit).skip(skip)
        
        res.status(200).json(list.map((item) => { return { id: item._id, updatedAt: item.updatedAt } }))
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/lots', auth, async (req, res) => {
    try {
        const { filter, limit, skip } = req.body

        const user = await userQueries.get(req.user.userId)

        if(user.type !== constants.MASTER) { return res.status(400).json(errors.isNotMaster) }

        if(!filter.cases.length) { filter.cases = user.cases }

        const list = await Device.find({ 
            category: {$in: filter.cases}, 
            status: constants.status.SEARCH 
        }).sort({
            betsCount: filter.bets,
            createdAt: filter.date,
        }).limit(limit).skip(skip)

        res.status(200).json(list.map((item) => { return { id: item._id, updatedAt: item.updatedAt } }))
    } catch(error) {
        res.status(500).json(errors.unknown)
    }
})

module.exports = router;
