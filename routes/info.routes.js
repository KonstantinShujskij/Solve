const {Router} = require('express')
const config = require('config')

const router = Router()

router.post('/get-categories', async (req, res) => {
    try {
        const categories = config.get('categories')

        res.status(200).json({ categories })
    } catch(error) {
        res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})



module.exports = router;
