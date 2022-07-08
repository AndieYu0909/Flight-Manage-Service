const FlightInfo = require('../model/flightInfo.model');

const createFlightInfo = async({flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, currentPassengers, passengerLimit}) => {
    try {
        const flightInfo = new FlightInfo({
            flightNumber, 
            departureDate, 
            arrivalDate, 
            departureTime, 
            arrivalTime, 
            departureAirport, 
            arrivalAirport, 
            currentPassengers, 
            passengerLimit
        });

        await flightInfo.save();
        
        return flightInfo._id; //return the newly created id
    }

    catch(err){
        console.error(err);
        throw { status: 400, message: error};
    }
}


const findAllFlightInfo = async () => {
    const flightInfos = await FlightInfo.find(); 
    return flightInfos;
}

const findFlightById = async id => {
    try {
        const flight = await FlightInfo.findOne({flightNumber:id});
        if (flight == null) {
            throw `No flight with the id of ${id} found.`;
        }
        return flight; 
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; 
    }
}

const deleteFlightInfo = async flightNumber => {
    try {
        const deleteFlightInfo = await FlightInfo.deleteOne({ flightNumber });
        if (deleteFlightInfo.deletedCount === 0) throw ({message: 'Flight not found'});
        return deleteFlightInfo;
    } catch (err) {
        throw { status: 400, message: err.message };
    }
}

const updateFlightInfo = async (updatedFlight) =>{
    try{
        const updateFlight = await FlightInfo.findOneAndUpdate({flightNumber : updatedFlight.flightNumber}, updatedFlight, {new : true});
        if (updateFlight == null){ 
            throw `The flight id ${ id } does not exist, please create it first!`
        }
        return updateFlight; 
    }catch (err){
        console.error(err);
        throw { status: 404, message: err };
    }
}


module.exports = {createFlightInfo, findAllFlightInfo, findFlightById, deleteFlightInfo, updateFlightInfo};