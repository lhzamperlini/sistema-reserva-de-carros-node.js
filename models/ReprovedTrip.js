const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const ReprovedTrip = db.define('ReprovedTrip', {
    passenger: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
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
        type: DataTypes.DATEONLY,
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
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

module.exports = ReprovedTrip