const API_KEY = "398c5cf612e3ae6de6577bb64818caa3";


function renderWeatherInfo(data){
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} ℃`;
    document.body.appendChild(newPara);
}


async function fetchWeatherDetails(){

    try{
        let city='goa';

        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    
        const data=await response.json();
        console.log("Weather data:-> ", data);
    

        renderWeatherInfo(data);
        // let newPara = document.createElement('p');
        // newPara.textContent = `${data?.main?.temp.toFixed(2)} ℃`;
        // document.body.appendChild(newPara);
    }
    catch(err){
         //handle the error here

    }
    
}

async function getCustomWeatherDetails(){
    try{
        let lat=17;
        let lon = 18;
     
        let result =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    
        let data = await result.json();
    
        console.log(data)
    }
    catch(e){
        console.log("Error is occured", e);
    }
    
}

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } 
      else{
         console.log("No geoLocation Support");
      }
}

function showPosition(position){
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;

    console.log(lat);
    console.log(longi);
}
