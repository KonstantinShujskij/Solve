const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const file = require('../middleware/file.middleware')
const userQueries = require('../queries/user.queries')


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
            return res.status(400).json({ errors: errors.array(), message: "Incorect data" })
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
            return res.status(400).json({ errors: errors.array(), message: "Incorect data" })
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

        res.status(200).json({ name: user.name, phone: user.phone, _id: user._id })
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
        const {telegram, instagram, facebook, whatsapp} = req.body

        const error = await userQueries.setInfo(req.user.userId, { telegram, instagram, facebook, whatsapp })

        if(error) { return res.status(400).json({ message: "Incorect data" }) }

        res.status(200).json({ edit: true })
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})



module.exports = router;
