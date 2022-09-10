const pendingTrip = require('../models/PendingTrip')
const aprovedTrip = require('../models/ApprovedTrip')

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

    static showPendingTrip(req, res) {
        pendingTrip.findAll({ raw: true })
            .then((data) => {
                res.render('trips/pending', { trips: data })
            })
            .catch((err) => console.log(err))
    }

    static reproveTrip(req, res) {
        const id = req.body.id

        pendingTrip.destroy({ where: { id: id } })
            .then(() => {
                req.flash('message', 'A viagem foi reprovada com sucesso!')
                res.render('trips/dashboard')
            })
            .catch((err) => console.log(err))
    }

    static aproveTrip(req, res) {
        const id = req.params.id

        pendingTrip.findOne({ where: { id: id }, raw: true })
            .then((trip) => {
                res.render('trips/toAprove', { trip })
            })
            .catch((err) => console.log())
    }

    static aproveTripPost(req, res) {
        const id = req.body.id
        const trip = {
            passenger: req.body.passenger,
            email: req.body.email,
            departurePlace: req.body.departure_place,
            destiny: req.body.destiny,
            travelData: req.body.data,
            departureTime: req.body.departure_time,
            returnTime: req.body.return_time,
            driver: req.body.driver,
            car: req.body.car
        }

        aprovedTrip.create(trip)
            .then((trip) => {
                pendingTrip.destroy({ where: { id: id } })
                    .then(() => {
                        // Aqui será inserida uma parte para enviar um email ao requerente confirmando a solicitação
                        // Só tenho que aprender como se faz isso.        
                        req.flash('message', 'A viagem foi aprovada, um email de confirmação foi enviado ao requerente!')
                        res.render('trips/dashboard')
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    static showAprovedTrip(req, res) {
        aprovedTrip.findAll({ raw: true })
            .then((data) => {
                res.render('trips/aproved', { trips: data })
            })
            .catch((err) => console.log(err))
    }
}