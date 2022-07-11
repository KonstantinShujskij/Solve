const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, callback) { callback(null, 'store/images/') },
    filename(req, file, callback) { 
        const name = (new Date().toISOString() + '-' + file.originalname).replace(/:/g, '-')
        callback(null, name) 
    }
})

const types = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, callback) => {
    if(types.includes(file.mimetype)) { callback(null, true) }
    else { callback(null, false) }
}

module.exports = multer({storage, fileFilter})