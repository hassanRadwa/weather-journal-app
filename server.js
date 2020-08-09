// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port   = 8000;
const server = app.listen(port,listening);

function listening(){
    console.log(`server running on port ${port}`);
}

// ROUTES!
app.get('/get',getData);
function getData(req,res){
    // console.log('get request from server');
    // console.log('postData get');
    // console.log(projectData.temp);
    res.send(projectData);
}

app.post('/add', postData);
function postData (req,res){
    let data = req.body; 
    //if the weather api return valid data
    if (data.hasOwnProperty('main')){
        projectData.temp        = data.main.temp;
        projectData.feelings    = data.feelings;
        projectData.date        = data.date;
    }
    //if the weather api return error
    else{
        projectData.temp        = '';
        projectData.feelings    = '';
        projectData.date        = '';
    }
    //projectData["temp"]= data.temp;
    //console.log(projectData["temp"]);
    // console.log('postData add');
    // console.log(projectData.temp);
    // console.log(projectData.feelings);
    // console.log(projectData.date);
    res.end();
}