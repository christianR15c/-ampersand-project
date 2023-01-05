const express = require('express')
const { assignUserToBattery } = require('../controllers/assignUserToBattery')

const router = express.Router()

router.put('/', assignUserToBattery)

module.exports = router