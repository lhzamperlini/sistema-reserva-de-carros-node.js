const pendingTrip = require('../models/PendingTrip')
const aprovedTrip = require('../models/ApprovedTrip')
const reprovedTrip = require('../models/ReprovedTrip')
const { raw } = require('express')

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
        const id = req.params.id

        pendingTrip.findOne({where: {id:id}, raw: true})
            .then((trip)=>{
                res.render('trips/toReprove', {trip})
            })
            .catch((err)=>console.log(err))
    }

    static reproveTripPost(req, res){
        const id = req.body.id

        const trip = {
            passenger: req.body.passenger,
            email: req.body.email,
            departurePlace: req.body.departure_place,
            destiny: req.body.destiny,
            travelData: req.body.data,
            departureTime: req.body.departure_time,
            returnTime: req.body.return_time,
            reason: req.body.reason
        }       
        
        reprovedTrip.create(trip)
            .then(()=>{
                pendingTrip.destroy({where: {id: id}})
                    .then(()=>{
                        req.flash('message', 'A agenda foi cancelada com sucesso')
                        req.session.save(() => {
                            res.redirect('/trips')
                        })
                    })
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    static aproveTrip(req, res) {
        const id = req.params.id

        pendingTrip.findOne({ where: { id: id }, raw: true })
            .then((trip) => {
                res.render('trips/toAprove', { trip })
            })
            .catch((err) => console.log(err))
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

    static editAprovedTrip(req, res) {
        const id = req.params.id
        aprovedTrip.findOne({ where: { id: id }, raw: true })
            .then((trip) => {
                res.render('trips/toEdit', { trip })
            })
            .catch((err) => console.log(err))
    }
    static async editAprovedTripPost(req, res) {
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

        await aprovedTrip.update(trip, { where: { id: id } })
            .then(() => {
                req.flash('message', 'A agenda foi atualizada com sucesso!')
                req.session.save(() => {
                    res.redirect('/trips/aproved')
                })
            })

    }

    static async cancelTrip(req, res) {
        const id = req.body.id
        await aprovedTrip.destroy({ where: { id: id } })
            .then(() => {
                req.flash('message', 'A agenda foi cancelada com sucesso.')
                req.session.save(() => {
                    res.redirect('/trips/aproved')
                })
            })
    }
}