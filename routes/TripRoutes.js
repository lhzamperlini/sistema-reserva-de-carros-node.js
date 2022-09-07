const express = require('express')
const router = express.Router()
const tripController = require('../controllers/TripController')
const checkAuth = require('../helpers/auth').checkAuth


router.get('/dashboard', checkAuth, tripController.dashboard)
router.get('/', tripController.scheduleTrip)
router.post('/', tripController.scheduleTripPost)

module.exports = router