const express = require('express')
const router = express.Router()
const { register, deposit, withdrawal } = require('../controllers/userController')
router.post('/register', register)
router.post('/deposit', deposit)
router.post('/withdrawal', withdrawal)
module.exports = router
