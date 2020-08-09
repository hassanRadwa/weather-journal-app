//const { json } = require("body-parser");

/* Global Variables */
const apiKey = '1a58db9f1916493e52f2a2f455947fc5';
//http://api.openweathermap.org/data/2.5/weather?units=metric&zip=94040&appid=1a58db9f1916493e52f2a2f455947fc5
let baseURL  = 'http://api.openweathermap.org/data/2.5/weather?units=metric';

const performAction = async () => {
    //get user data
    const zipcode  = document.getElementById('zip').value;
    console.log(zipcode);

    let projectData = {};
    if (zipcode == ""){
        projectData.date = "";  
        projectData.temp = "";
        document.getElementById('required').innerHTML     = " *";
        document.getElementById('required').style.display = "inline";
    }
    else{
        document.getElementById('required').style.display = "none";
        const feelings = document.getElementById('feelings').value;
    
        //set weather api url
        //http://api.openweathermap.org/data/2.5/weather?units=metric&zip=94040&appid=1a58db9f1916493e52f2a2f455947fc5
        const completeURL = `${baseURL}&zip=${zipcode}&appid=${apiKey}`;
        console.log(completeURL);
        let data = {};
        //get data from weather api
        data = await getApiData(completeURL);
        if (data.hasOwnProperty('main')){
            document.getElementById('required').style.display = "none";
            console.log('data has main');
        }
        else
        {
            console.log('data does not has main');
            // projectData.date = "";  
            // projectData.temp = "";
            document.getElementById('required').innerHTML     = " Invalid zipcode";
            document.getElementById('required').style.display = "inline";
        }
        data.feelings = feelings;
    
        // Create a new date instance dynamically with JS
        let d = new Date();
        let month = d.getMonth() +1;//0 is january
        let newDate = month +'.'+ d.getDate()+'.'+ d.getFullYear();
        data.date = newDate;
    
        //post data to server.js
        await postData('/add' , data)
    
        //get the posted data from server.js
        projectData = await getApiData('/get');
        console.log(projectData);
    }
    //update view
    if (projectData.date != "" &&   projectData.temp != ""){
        document.getElementById('date')   .innerHTML  = `Date       : ${projectData.date}`;
        document.getElementById('temp')   .innerHTML  = `Temperature: ${projectData.temp}&#8451;`;
        document.getElementById('content').innerHTML  = `You feel   : ${projectData.feelings}`;
    }
    else{
        
        document.getElementById('date')   .innerHTML  = '';
        document.getElementById('temp')   .innerHTML  = '';
        document.getElementById('content').innerHTML  = '';
    }
};



const getApiData = async (url = '') => {
    const res = await fetch(url);
    // try {
        const data = await res.json();
        console.log(data);
        console.log('in try api');
        return data;
    // }
    // catch(error) {
    //     console.log('in catch api');
    //     console.log("error", error);
    // }
};

// Async POST
const postData = async ( url = '', data = {}) => {
    console.log('postData');
    console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header        
  });
};

//add event listener click on generate button
document.getElementById('generate').addEventListener('click' , performAction);

