const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/handlerErrors')

module.exports.getAll = async (req, res) => {

    try {
        const categories = await Category.find({user: req.user.id})
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.deleteById = async (req, res) => {
    res.status(200).json({
        deleteById: "Successfully"
    })
    try {
        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) => {
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''

    })
    try {
        await category.save()
        res.status(210).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}



