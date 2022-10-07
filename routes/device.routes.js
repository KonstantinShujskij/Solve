const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const file = require('../middleware/file.middleware')
const deviceQueries = require('../queries/device.queries')
const userQueries = require('../queries/user.queries')
const constants = require('../constants')
const Bet = require('../models/Bet')
const Contract = require('../models/Contract')



const router = Router()

router.post('/create',
    file.array('images', 6),
    [
        check('model', 'Incorect model').optional({checkFalsy: true}).isString(),
        check('description', 'Min len of name is 25 symbols').isLength({min: 25}),
    ], 
    auth,
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: "Incorect data" })
        }

        const images = req.files.map((file) => file.filename)

        const device = await deviceQueries.create(req.body, constants.status.SEARCH, images, req.user.userId)
        if(!device) { return res.status(400).json({ message: "Incorect data in base" }) }

        res.status(200).json(device)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/set-bet', auth, async (req, res) => {
    try {
        const { id, price, description } = req.body

        const user = await userQueries.get(req.user.userId)
        if(!user) { return res.status(400).json({ message: "User not find" }) }
        if(user.type !== 'MASTER') { return res.status(400).json({ message: "You is not master" }) }

        const device = await deviceQueries.get(id)
        if(!device) { return res.status(400).json({ message: "Device not find" }) }

        const bet = new Bet({ price, description, client: device.owner, 
            owner: req.user.userId, device: device._id })
        await bet.save()

        device.bets.push(bet._id)
        await device.save()

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/get-bet', auth, async (req, res) => {
    try {
        const { id } = req.body

        const bet = await Bet.findOne({ _id: id })

        res.status(200).json(bet)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/accept-bet', auth, async (req, res) => {
    try {
        const { id } = req.body

        const bet = await Bet.findOne({ _id: id })

        const device =  await deviceQueries.get(bet.device)
        if(!device) { return res.status(400).json({ message: "Device not find" }) }
        if(device.status !== constants.status.SEARCH) { 
            return res.status(400).json({ message: "Device not search" }) 
        }

        const contract = new Contract({ 
            price: bet.price,
            device: device._id, 
            client: device.owner, 
            master: bet.owner
        })

        await contract.save()

        device.status = constants.status.RESERVE
        device.master = bet.owner
        device.bet = bet._id
        device.contract = contract._id

        await device.save()

        bet.accept = true
        await bet.save()

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/cancel-bet', auth, async (req, res) => {
    try {
        //// Подтверждение пользователя - хозяина девайса или мастера
        const { id } = req.body

        const bet = await Bet.findOne({ _id: id })
        
        const device =  await deviceQueries.get(bet.device)
        if(!device) { return res.status(400).json({ message: "Device not find" }) }
        if(device.status !== constants.status.RESERVE) { 
            return res.status(400).json({ message: "Device not search" }) 
        }

        await Contract.deleteOne({_id: device.contract})
 
        device.status = constants.status.SEARCH
        device.master = null
        device.bet = null
        device.contract = null

        await device.save()

        bet.accept = false
        await bet.save()
        
        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/get-contract', auth, async (req, res) => {
    try {
        const { id } = req.body

        const contract = await Contract.findOne({ _id: id })

        if(!contract) { return res.status(400).json({ message: "Contract not find" }) }

        
        res.status(200).json(contract)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/accept-contract', auth, async (req, res) => {
    try {
        const { id, data, price } = req.body

        const device =  await deviceQueries.get(id)
        if(!device) { return res.status(400).json({ message: "Device not find" }) }

        if(device.status !== constants.status.RESERVE) { 
            return res.status(400).json({ message: "Device not search" }) 
        }

        const contract = await Contract.findOne({_id: device.contract})

        if(contract.clientAccept && contract.masterAccept) { 
            return res.status(400).json({ message: "Contract is confirmed" }) 
        }

        const isEdit = (contract.data !== data || contract.price !== price)

        if(isEdit) { 
            contract.data = data 
            contract.price = price
        } 

        if(req.user.userId == contract.client) {
            contract.clientAccept = true
            contract.masterAccept = !isEdit
        }
        else if(req.user.userId  == contract.master) {
            contract.masterAccept = true
            contract.clientAccept = !isEdit
        }
        else { return res.status(400).json({ message: "You not owner" })  }

        if(!isEdit) {  device.status = constants.status.PACT }
        await contract.save()        
        await device.save()
        
        res.status(200).json()
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/accept', 
    [
        check('review.price', 'Отцените цену работы').isFloat({min: 1, max: 5}),
        check('review.service', 'Отцените сервис').isFloat({min: 1, max: 5}),
        check('review.time', 'Отцените время выполнения').isFloat({min: 1, max: 5}),
        check('review.coment', 'Оставте отзыв').isLength({min: 10})
    ],
    auth, async (req, res) => {
    try {
        const { id, review } = req.body

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ message: errors.array().pop().msg })
        }

        const device =  await deviceQueries.get(id)
        if(!device) { return res.status(400).json({ message: "Device not find" }) }

        if(device.status !== constants.status.PACT) { return res.status(400).json({ message: "Device not pact" }) }

        const user = await userQueries.get(req.user.userId)
        if(req.user.userId != device.owner) { return res.status(400).json({ message: "You not owner" })  }

        const master = await userQueries.get(device.master)

        review.createAt = Date.now()
        review.ownerName = user.name
        master.reviews.push(review)
        device.status = constants.status.CONFIRM

        await device.save()
        await master.save()
        
        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

//----------------------------------------------

router.post('/devices', auth, async (req, res) => {
    try {
        const list = await deviceQueries.getDevices(req.user.userId)

        res.status(200).json(list.map((item) => { return { id: item._id, updatedAt: item.updatedAt } }))
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/auctions', auth, async (req, res) => {
    try {
        const list = await deviceQueries.getAuctions(req.user.userId)

        res.status(200).json(list.map((item) => { return { id: item._id, updatedAt: item.updatedAt } }))
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/orders', auth, async (req, res) => {
    try {
        const user = await userQueries.get(req.user.userId)
        console.log(user.type);
        if(user.type !== 'MASTER') { 
            return res.status(400).json({ message: "User is not master" }) 
        }
        
        const list = await deviceQueries.getOrders(user._id)

        res.status(200).json(list.map((item) => { return { id: item._id, updatedAt: item.updatedAt } }))
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/claims', auth, async (req, res) => {
    try {
        const user = await userQueries.get(req.user.userId)
        if(user.type !== 'MASTER') { 
            return res.status(400).json({ message: "User is not master" }) 
        }
        
        const list = await deviceQueries.getClaims(user._id)

        res.status(200).json(list.map((item) => { return { id: item._id, updatedAt: item.updatedAt } }))
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/lots', auth, async (req, res) => {
    try {
        const user = await userQueries.get(req.user.userId)
        if(user.type !== 'MASTER') { 
            return res.status(400).json({ message: "User is not master" }) 
        }

        const list = await deviceQueries.getLots(user.cases)

        res.status(200).json(list.map((item) => { return { id: item._id, updatedAt: item.updatedAt } }))
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/load', auth, async (req, res) => {
    try {
        const { id } = req.body
        
        const device = await deviceQueries.get(id)

        res.status(200).json(device)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/load-bets', auth, async (req, res) => {
    try {
        const { ids } = req.body

        const bets = await Bet.find({ _id: {$in: ids} })

        res.status(200).json(bets)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/send', auth,
    async (req, res) => {
    try {
        const { id, master } = req.body

        const device = await deviceQueries.get(id)
        if(!device) { return res.status(400).json({ message: "Device not search" }) }

        if(device.status !== constants.status.SEARCH && device.status !== constants.status.CANCLE) { 
            return res.status(400).json({ message: "Device not search" }) 
        }

        if(!userQueries.get(master)) { return res.status(400).json({ message: "Masters not search" }) }

        device.status = constants.status.CHECK
        device.master = master

        await device.save()

        res.status(200).json(device)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})


// ----- experements 


router.post('/list', auth, async (req, res) => {
    try {
        const list = (await deviceQueries.getList(req.user.userId)).map((item) => {
            return { id: item._id, updatedAt: item.updatedAt }
        })

        res.status(200).json(list)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})


module.exports = router;
