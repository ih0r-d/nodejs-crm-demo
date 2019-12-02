const express = require('express')

const mongoose = require('mongoose')
const parser = require('body-parser')

const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

const props = require('./config/properties')

const app = express()

mongoose.connect(props.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => console.log('Connected to MongoDb successfully'
    )).catch(e => console.log(e))

app.use(require('morgan')('dev'))
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(require('cors')())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/analytics', analyticsRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/position', positionRoutes)

module.exports = app
