const express = require('express')
const { registerUser, login, getAllUsers, getUser } = require('../controllers/user')
const { protect } = require('../middlewares/userAuth')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', login)
router.get('/:userId', getUser)
router.get('/', protect, getAllUsers)

module.exports = router