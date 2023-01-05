const express = require('express')
const { registerSwapStation, getAllSwapStations } = require('../controllers/swapStation')

const router = express.Router()

router.post('/', registerSwapStation)
router.get('/', getAllSwapStations)

module.exports = router