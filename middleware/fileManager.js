const multer = require('multer')
const moment = require('moment')

const props = require('../config/properties')

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename(req, file, callback) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        callback(null, `${file.orginalName}-${date}`)
    }
})

const fileFilter = (req, file, callback) => {
    props.MIME_TYPES.includes(file.mimeType) ? callback(null, true) : callback(null, false)
}
const limits = {
    fileSize: 5 * 1024 * 1024
}

module.exports = multer({
    storage, fileFilter, limits
})
