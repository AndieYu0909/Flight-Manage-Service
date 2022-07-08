const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a flight schema
const flightInfoSchema = new Schema({
    flightNumber: {
        type: Number,
        unique: true,
        required: true
    },

    departureDate: {
        type: String,
        required:true,
    },

    arrivalDate: {
        type: String,
        required:true
    },

    departureTime: {
        type: String,
        required:true,
    },
 
    arrivalTime: {
        type: String,
        required: true,
    },
    departureAirport: {
        type: String,
        required: true,
    },
    arrivalAirport: {
        type: String,
        required: true,
    },
    currentPassengers: {
        type: Number,
        required: true,
        min: 0
    },
    passengerLimit: {
        type: Number,
        required: true,
        min: 1
    }

});



const FlightInfo = mongoose.model('FlightInfo', flightInfoSchema, 'FlightsInfo');
module.exports = FlightInfo; 