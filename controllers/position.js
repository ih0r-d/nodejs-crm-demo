const Position = require('../models/Position')
const errorHandler = require('../utils/handlerErrors')

module.exports.getAll = (req, res) => {
    try {
        res.status(200).json({
            getAll: "Successfully"
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) => {
    try {
        const newPosition = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
        res.status(201).json(newPosition)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async (req, res) => {
    try {
        await Position.remove({id: req.params.id})
        res.status(204).json({
            message: `Position by id = ${req.params.id} was deleted`
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) => {
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getByCategoryId = async (req, res) => {
    try {
        const position = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}
