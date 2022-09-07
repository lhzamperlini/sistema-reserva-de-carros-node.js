const pendingTrip = require('../models/PendingTrip')
const approvedTrip = require('../models/ApprovedTrip')

module.exports = class TripController {
    static dashboard(req, res) {
        res.render('trips/dashboard')
    }

    static scheduleTrip(req, res) {
        res.render('trips/schedule')
    }

    static async scheduleTripPost(req, res) {
        const trip = {
            passenger: req.body.passenger,
            email: req.body.email,
            departurePlace: req.body.departure_place,
            destiny: req.body.destiny,
            travelData: req.body.data,
            departureTime: req.body.departure_time,
            returnTime: req.body.return_time
        }

        await pendingTrip.create(trip)
        req.flash('message', 'Viagem solicitada, fique atento a sua caixa de emails, a confirmação será enviada por lá')
        res.render('trips/schedule')
    }

}