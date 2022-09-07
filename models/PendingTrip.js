const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const PendingTrip = db.define('PendingTrip', {
    passenger: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    departurePlace: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    destiny: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    travelData: {
        type: DataTypes.DATE,
        allowNull: false,
        require: true
    },
    departureTime: {
        type: DataTypes.TIME,
        allowNull: false,
        require: true
    },
    returnTime: {
        type: DataTypes.TIME,
        allowNull: false,
        require: true
    }
})

module.exports = PendingTrip