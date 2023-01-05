const express = require('express')
const logger = require('morgan')
const bodyparser = require('body-parser')
require('dotenv').config()
const cors = require('cors')

// routes
const batteryRoutes = require('./routes/battery')
const userRoutes = require('./routes/user')
const assignUserToBatteryRoutes = require('./routes/assignUserToBattery')
const swappStationRoutes = require('./routes/swapStation')

const app = express()
const PORT = process.env.PORT || 8000

app.use(logger('dev'))

// parse incoming requests
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use(cors())

// call routes
app.use('/api/battery', batteryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/assign', assignUserToBatteryRoutes)
app.use('/api/swap-station', swappStationRoutes)

// initialize backend
app.get('/', (req, res) => {
    message: 'Welcome to the default API route'
})

app.listen(PORT, console.log(`Server is listening on port ${PORT}`))