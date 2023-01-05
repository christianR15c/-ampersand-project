const express = require('express')
const { registerBattery, getAllBatteries, updateBattery } = require('../controllers/battery')
const { protect } = require('../middlewares/userAuth')

const router = express.Router()

router.post('/', registerBattery)
router.get('/', protect, getAllBatteries)
router.put('/update', updateBattery)

module.exports = router