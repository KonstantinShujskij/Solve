const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const file = require('../middleware/file.middleware')
const userQueries = require('../queries/user.queries')
const fs = require("fs")
const path = require('path')


const router = Router()

router.post('/set-info-client',
    file.none(),
    [
        check('phone', 'Incorect phone').isMobilePhone(),
        check('name', 'Min len of name is 3 symbols').isLength({min: 3}),
        check('whatsapp', 'Incorect whatchapp').optional({checkFalsy: true}).isMobilePhone()
    ], 
    auth,
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().pop().msg })
        }

        const { name, phone, telegram, instagram, facebook, whatsapp } = req.body

        const error = await userQueries.setInfo(req.user.userId, { name, phone, telegram, instagram, 
            facebook, whatsapp, type: 'CLIENT' })

        if(error) { return res.status(400).json({ message: "Incorect data" }) }

        res.status(200).json({ edit: true })

    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/set-info-master',
    file.array('images', 6),
    [
        check('phone', 'Incorect phone').isMobilePhone(),
        check('name', 'Min len of name is 3 symbols').isLength({min: 3}),
        check('cases', "Not select any categories").isArray().isIn(config.get('categories')),
        check('lat', 'Incorect position').isFloat(),
        check('lng', 'Incorect Position').isFloat(),
        check('whatsapp', 'Incorect whatchapp').optional({checkFalsy: true}).isMobilePhone()
    ], 
    auth,    
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().pop().msg })
        }

        const {name, cases, lat, lng, phone, telegram, instagram, facebook, whatsapp} = req.body
        const images = req.files.map((file) => file.filename)

        const error = await userQueries.setInfo(req.user.userId, { name, cases, lat, lng, phone, 
            telegram, instagram, facebook, whatsapp, images, type: 'MASTER' })

        if(error) { return res.status(400).json({ message: "Incorect data" }) }

        res.status(200).json({ edit: true })
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/get', auth, async (req, res) => {
    try {
        const user = await userQueries.get(req.user.userId)
        if(!user) { return res.status(400).json({ message: "User not find" }) }

        res.status(200).json(user)

    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/info', async (req, res) => {
    try {
        const { id } = req.body

        const user = await userQueries.get(id)
        if(!user) { return res.status(400).json({ message: "User not find" }) }

        res.status(200).json({ name: user.name, phone: user.phone, _id: user._id, avatar: user.avatar, 
            telegram: user.telegram, whatsapp: user.whatsapp, viber: user.viber, instagram: user.instagram, reviews: user.reviews })
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/set-contacts', 
    [
        check('whatsapp', 'Incorect whatchapp').optional({checkFalsy: true}).isMobilePhone()
    ], 
    auth, 
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().pop().msg })
        }

        const {telegram, instagram, facebook, whatsapp} = req.body

        const error = await userQueries.setInfo(req.user.userId, { telegram, instagram, facebook, whatsapp })

        if(error) { return res.status(400).json({ message: "Incorect data" }) }

        res.status(200).json({ edit: true })
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})


router.post('/get-masters', auth, async (req, res) => {
    try {
        const masters = await userQueries.getMasters()

        res.status(200).json(masters.map(master => master._id))
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/set-avatar', file.single('avatar'), auth, 
    async (req, res) => {
    try {
        const user = await userQueries.get(req.user.userId)
        const avatar = req.file.filename

        const error = await userQueries.setAvatar(req.user.userId, avatar)
        if(error) { return res.status(400).json({ message: "Incorect data" }) }

        if(user.avatar) {
            const src = path.join(__dirname, `../store/images/${user.avatar}`)
            fs.unlink(src, (err) => { console.log(err) })
        }

        res.status(200).json({ edit: true })
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/set-phone', 
    [ check('phone', 'Incorect phone').isMobilePhone() ], 
    auth, 
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().pop().msg })
        }

        const { phone } = req.body

        const error = await userQueries.setPhone(req.user.userId, phone)
        if(error) { return res.status(400).json({ message: "Error" }) }

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})



module.exports = router;
