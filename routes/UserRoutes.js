const { Router } = require('express')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

router.get('/login', userController.login)
router.get('/register', userController.register)
router.post('/register', userController.registerPost)

module.exports = router