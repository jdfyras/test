/* eslint-disable no-unused-vars */
const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const { env } = require('process')
const userRoute = require('./routes/userRoute')
const app = express()

require('./config/mongoDBConfig')
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.send('Hello')
})
app.use('/user', userRoute)

app.use((err, req, res, next) => {
    console.error(err)
    res.json({ success: false, status: err.status || 500, message: err.message })
    next()
})
const { PORT, NODE_ENV } = env
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`NODE ENVIRONNEMENT : ${NODE_ENV}`)
})
