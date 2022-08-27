const express = require('express')
const router = express.Router()
const tripController = require('../controllers/TripController')

router.get('/', tripController.scheduleTrip)

module.exports = router