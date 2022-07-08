const router = require('express').Router();
const {createFlightInfo, findAllFlightInfo, findFlightById, deleteFlightInfo, updateFlightInfo} = require('../controller/flightInfo.controller');

//get method: return all of the flight info
router.get('/', async (req, res) => {
    const flightInfo = await findAllFlightInfo();
    res.status(200).json(flightInfo);
});

//post method: create new flight info
router.post('/', async (req, res) => {
    try {
        const _id = await createFlightInfo(req.body);
        res.status(201).json({_id});
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const flight = await findFlightById(req.params.id);
        res.json(flight);
    } catch(err) {
        res.status(err?.status || 400).json(err);
    }
    
});

//put method: update flight info

router.put('/', async (req, res) => {
    try {
        const updatedFlight = await updateFlightInfo(req.body);
        res.status(200).json({ updatedFlight });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
})

//delete method: delete flight info from the database
router.delete('/:flightNo', async (req, res) => {
    try {
        const deletedFlight = await deleteFlightInfo(req.params.flightNo);
        res.status(200).json({ deletedFlight });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});
module.exports = router;