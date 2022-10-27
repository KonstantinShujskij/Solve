const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const file = require('../middleware/file.middleware')
const userQueries = require('../queries/user.queries')
const fs = require("fs")
const path = require('path')
const { generateCodeJwt, verifyCodeJwt } = require('../jwt')
const { sendCode } = require('../sms')



const router = Router()

router.post('/set-info-client',
    file.none(),
    [
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

        const { name, telegram, instagram, facebook, whatsapp } = req.body

        const error = await userQueries.setInfo(req.user.userId, { name, telegram, instagram, 
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

        const {name, cases, lat, lng, telegram, instagram, facebook, whatsapp} = req.body
        const images = req.files.map((file) => file.filename)

        const error = await userQueries.setInfo(req.user.userId, { name, cases, lat, lng,
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

router.post('/get-masters', auth, async (req, res) => {
    try {
        const masters = await userQueries.getMasters()

        res.status(200).json(masters.map(master => master._id))
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

// ----------

router.post('/set-avatar', file.single('avatar'), auth, 
    async (req, res) => {
    try {
        const avatar = req.file.filename
        const user = await userQueries.get(req.user.userId)

        if(user.avatar) { 
            const src = path.join(__dirname, `../store/images/${user.avatar}`)
            fs.unlink(src, (err) => {}) 
        }
        
        user.avatar = avatar
        await user.save()

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/set-phone', 
    [ check('phone', 'Некоректный номер телефона').isMobilePhone() ], 
    auth, 
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) { return res.status(400).json({ message: errors.array().pop().msg }) }

        const { phone } = req.body

        const user = await userQueries.get(req.user.userId)

        if(user.phone === phone) { return res.status(200).json({ exist: true }) }

        const code = parseInt(Math.random() * 1000000).toString()
        const token = generateCodeJwt({phone}, "000000") // its work, but need paid by sms service

        //sendCode(phone, code)

        res.status(200).json({token})
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/confirm-phone', auth, 
    async (req, res) => {
    try {
        const { token, code } = req.body
        const { error, data } = verifyCodeJwt(token, code)

        if(error) { return res.status(400).json({ message: error })}

        const phone = data.phone
        
        const user = await userQueries.get(req.user.userId)
        user.phone = phone
        await user.save()

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/set-contacts', 
    [
        check('whatsapp', 'Неверный формат whatchapp').optional({checkFalsy: true}).isMobilePhone()
    ], 
    auth, 
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) { return res.status(400).json({ message: errors.array().pop().msg }) }

        let { telegram, instagram, facebook, whatsapp } = req.body
        telegram = telegram.replaceAll('@', '')

        const error = await userQueries.setInfo(req.user.userId, { telegram, instagram, facebook, whatsapp })
        if(error) { return res.status(400).json({ message: "Такие социальные сети не поддерживаються" }) }

        res.status(200).json(true)
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})


module.exports = router;
