const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const props = require('../config/properties')
const errorHandler = require('../utils/handlerErrors')

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                id: candidate._id
            }, props.JWT, {expiresIn: 60 * 30})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: `Passwords are different. Please verify data and try login again`
            })
        }
    } else {
        res.status(404).json({
            message: `User by email - ${req.body.email} not found...`
        })
    }
}

module.exports.register = async (req, res) => {

    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        res.status(409).json({
            message: 'User already exists . . '
        })
    } else {
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(e, res)
        }
    }
}


