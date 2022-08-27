const pendingTrip = require('../models/PendingTrip')
const approvedTrip = require('../models/ApprovedTrip')
const user = require('../models/User')

module.exports = class TripController {
    static scheduleTrip(req, res) {
        res.render('trips/schedule')
    }

}