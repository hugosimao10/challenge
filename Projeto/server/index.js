const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());

let port = process.env.PORT || 4001;

// Library to register Logs
let winston = require('winston');

const logger = winston.createLogger({       
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: './server/usersRequests.log', level: 'info' }),
                ],
  });

// OpenWeatherMap
const APIKEY = "5547bc50a806aa9cca442f3eb31c6fb2";

app.listen(port, () => {
    console.log(`App running on port ${port} `);
});

let apiUrl;
let cityToSearch;

app.post('/search-location', (req, res) => {
    console.log(req.body)
    cityToSearch =  req.body.insertedCity

    // Register the requests made by users
    logger.log({
        level: 'info',
        message: cityToSearch
    });

    apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${APIKEY}`;
    console.log(apiUrl)
    axios.get(apiUrl)
        .then(response => {
            res.json(response.data);
            console.log("Response (/search-location) - SUCCESS - Server,Index.js");
            
        })
        .catch(error => {
            console.log(error);
            res.send(error);
            console.log("Error catch(/search-location) - Server,Index.js");
            
        });
});

app.get('/weather', (req, res) => {
    axios.get(apiUrl)
        .then(response => {
            res.json(response.data);
            console.log("Response (/weather) - SUCCESS - Server,Index.js");
        })
        .catch(error => {
            console.log(error);
            console.log('Error catch(/weather) - Server,Index.js');
        });
});