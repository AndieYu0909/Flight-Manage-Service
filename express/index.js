// index.js

const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const cors = require('cors');
require('dotenv').config();

//web application
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(logger);

//Bind a router object to the url /flightInfo, all HTTP request starting with /flightInfo will come here
//const flightInfo = require('./model/flightInfo.model.js');

app.use('/flightInfos', require('./routes/flightInfo.route'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB!'); //Send log if connected to the database
    })
    .catch(err => {
        console.error(err);
        process.exit(1); // Terminate process if not connected to the database
    });


//run server on a port
app.listen(PORT,() => {
    //call back
    console.log(`Server is up and running on port ${PORT}`);
});