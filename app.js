const express = require('express')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

const app = express()

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/analytics', analyticsRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/position', positionRoutes)

module.exports = app
