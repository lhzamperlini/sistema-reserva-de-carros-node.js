const express = require('express')
const router = express.Router()
const tripController = require('../controllers/TripController')
const checkAuth = require('../helpers/auth').checkAuth

router.get('/dashboard', checkAuth, tripController.dashboard)
router.get('/', tripController.scheduleTrip)
router.post('/', tripController.scheduleTripPost)
router.get('/pending', checkAuth, tripController.showPendingTrip)
router.get('/reprove/:id', checkAuth, tripController.reproveTrip)
router.post('/reprove', checkAuth, tripController.reproveTripPost)
router.get('/aprove/:id', checkAuth, tripController.aproveTrip)
router.post('/aprove', checkAuth, tripController.aproveTripPost)
router.get('/aproved', checkAuth, tripController.showAprovedTrip)
router.get('/aproved-edit/:id', checkAuth, tripController.editAprovedTrip)
router.post('/aproved-edit', checkAuth, tripController.editAprovedTripPost)
router.post('/aproved-cancel', checkAuth, tripController.cancelTrip)
module.exports = router