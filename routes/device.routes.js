const {Router} = require('express')
const {check, validationResult, body} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const file = require('../middleware/file.middleware')
const deviceQueries = require('../queries/device.queries')
const userQueries = require('../queries/user.queries')
const constants = require('../constants')
const Bet = require('../models/Bet')
const Contract = require('../models/Contract')
const Device = require('../models/Device')
const errors = require('../errors')

const UserController = require('../controllers/user.controller')
const DeviceController = require('../controllers/device.controller')
const BetController = require('../controllers/bet.controller')


const router = Router()

router.post('/create',
    file.array('images', 6),
    [
        check('model', 'incorectModel').isString(),
        check('description', 'minLengthDeviceDesc').isLength({min: 25}),
    ], 
    auth,
    async (req, res) => {
    try {
        const error = validationResult(req).array().pop()
        if(error) { throw errors[error.msg] }

        const images = req.files.map((file) => file.filename)

        const device = await DeviceController.create(req.body, images, req.user.userId)

        await device.save()

        res.status(200).json(device)
    } catch(error) {
        if(error.custom) { return res.status(400).json(error) }
        res.status(500).json(errors.unknown)
    }
})

router.post('/set-bet', auth, async (req, res) => {
    try {
        const { deviceId, price, description } = req.body

        const master = await UserController.getMaster(req.user.userId)
        const device = await DeviceController.get(deviceId)
        const bet = await BetController.create(price, description, device, master)

        device.bets.push(bet._id)

        await bet.save()
        await device.save()

        res.status(200).json(true)
    } catch(error) {
        if(error.custom) { return res.status(400).json(error) }
        res.status(500).json(errors.unknown)
    }
})

router.post('/get-bet', auth, async (req, res) => {
    try {
        const { id } = req.body

        const bet = await BetController.get(id)

        res.status(200).json(bet)
    } catch(error) {
        if(error.custom) { return res.status(400).json(error) }
        res.status(500).json(errors.unknown)
    }
})

router.post('/accept-bet', auth, async (req, res) => {
    try {
        // client= getUser(id)
        // bet = getBet(id)
        // device = getFevice(bet.deivce)
        // contract = createContract(bet, device, client)
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

//--------

router.post('/push-auction', auth,
    async (req, res) => {
    try {
        const { id } = req.body

        const device = await deviceQueries.get(id)
        if(!device) { return res.status(400).json({ message: "Такое устройство не найдено" }) }

        if(device.status !== constants.status.CANCLE) { 
            return res.status(400).json({ message: "Это устройство нельзя выставить на аукцион" }) 
        }
        if(device.owner != req.user.userId) { 
            return res.status(400).json({ message: "Это устройство не принадлежит вам" }) 
        }

        device.status = constants.status.SEARCH
        device.master = null

        await device.save()

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/get-contract', auth, async (req, res) => {
    try {
        const { id } = req.body

        const contract = await Contract.findOne({ _id: id })

        if(!contract) { return res.status(400).json({ message: "Такого контракта не существует" }) }
        if(contract.client != req.user.userId && contract.master != req.user.userId) {
            return res.status(400).json({ message: "Вы не держатель этого контракта" })
        }
        
        res.status(200).json(contract)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/accept-contract', auth, async (req, res) => {
    try {
        const { id, price, data } = req.body

        const device =  await deviceQueries.get(id)
        if(!device) { return res.status(400).json({ message: "Такого дивайса не существует" }) }
        if(device.status !== constants.status.RESERVE) { 
            return res.status(400).json({ message: "На этот девайс невозможно заключить контракт" }) 
        }

        const contract = await Contract.findOne({_id: device.contract})
        if(!contract) { return res.status(400).json({ message: "Такого контракта не существует" }) }

        if(contract.clientAccept && contract.masterAccept) { 
            return res.status(400).json({ message: "Контракт уже заключен" }) 
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
        else { 
            return res.status(400).json({ message: "Вы не держатель этого контракта" })  
        }

        if(!isEdit) {  device.status = constants.status.PACT }

        await contract.save()        
        await device.save()
        
        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/cancel-claim', auth,
    async (req, res) => {
    try {
        const { id } = req.body

        const device = await deviceQueries.get(id)
        if(!device) { return res.status(400).json({ message: "Устройство не найдено" }) }

        if(device.status !== constants.status.CHECK) { 
            return res.status(400).json({ message: "Утройство не находиться в рассмотрении" }) 
        }
        if(device.master != req.user.userId) { 
            return res.status(400).json({ message: "Устройсто отправлено не вам" }) 
        }

        device.status = constants.status.CANCLE
        device.master = null

        await device.save()

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/accept-claim', auth,
    async (req, res) => {
    try {
        const { id } = req.body

        const device = await deviceQueries.get(id)
        if(!device) { return res.status(400).json({ message: "Устройство не найдено" }) }

        if(device.status !== constants.status.CHECK) { 
            return res.status(400).json({ message: "Утройство не находиться в рассмотрении" }) 
        }
        if(device.master != req.user.userId) { 
            return res.status(400).json({ message: "Устройсто отправлено не вам" }) 
        }

        const contract = new Contract({ 
            price: 0,
            data: '',
            device: device._id, 
            client: device.owner, 
            master: device.master
        })

        await contract.save()

        device.status = constants.status.RESERVE
        device.contract = contract._id

        await device.save()

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/change-status', auth,
    async (req, res) => {
    try {
        const { id, status } = req.body

        const device = await deviceQueries.get(id)
        if(!device) { return res.status(400).json({ message: "Устройство не найдено" }) }

        if(device.status !== constants.status.PACT) { 
            return res.status(400).json({ message: "Утройство не находиться в работе" }) 
        }
        if(device.master != req.user.userId) { 
            return res.status(400).json({ message: "Устройсто находиться не у вас" }) 
        }

        device.workStatus = status
        await device.save()

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/change-notes', auth,
    async (req, res) => {
    try {
        const { id, notes } = req.body

        const device = await deviceQueries.get(id)
        if(!device) { return res.status(400).json({ message: "Устройство не найдено" }) }

        // if(device.status !== constants.status.PACT) { 
        //     return res.status(400).json({ message: "Утройство не находиться в работе" }) 
        // }
        // if(device.master != req.user.userId) { 
        //     return res.status(400).json({ message: "Устройсто находиться не у вас" }) 
        // }

        device.notes = notes
        await device.save()

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

module.exports = router;
