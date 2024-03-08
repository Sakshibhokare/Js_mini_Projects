const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".wather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchInput]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let currentTab = userTab;
const API_KEY = "398c5cf612e3ae6de6577bb64818caa3";
currentTab.classList.add("current-tab");

//this function will make sure that pehlese koi coordinates are present our not
getfromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");


        if(!searchForm.classList.contains("active")){
           userInfoContainer.classList.remove("active");
           grantAccessContainer.classList.remove("active");
           searchForm.classList.classList.add("active") 
        }
        else{
            //pehale se search weather pe the, ab your weather wala tab
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //automatically you are getting your weather so need to save coordinates in the session 
            // now we are in your weather tab , toh weather bhi display karna He  so lets check local storage coordinates 
            getfromSessionStorage();
        }
    }
}


userTab.addEventListener("click",()=>{
    //pass clicked tab as input paramter
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    //pass clicked tab as input paramter
    switchTab(searchTab);
})

//check if coordinates are alredy present in session storage
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        //agar no local coordinates present, need to take location permission
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchuserWeatherInfo(coordinates);
    }
}

//calling API
async function fetchuserWeatherInfo(coordinates){
    const {lat, lon}=coordinates;
    //make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    // API Call 
    try{
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const data = await response.json();
      loadingScreen.classList.remove("active");
      userInfoContainer.classList.add("active");
      renderWeatherInfo(data);
    }
    catch(err){
loadingScreen.classList.remove("active")
    }
}

function renderWeatherInfo(weatherInfo){
    //first we have to fetch the element 
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const windspeed = document.querySelector("[data-windspeed]");
    const temp = document.querySelector("[data-temp]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values from weather info object and put into ui elements 
    // usign optional chaining operator we can find required elements 
    // user?.address?.zip optional chaining operator = ?

    cityName.innerText=weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144*108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windspeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;


}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);

    }
    else{
         alert("No Geolocation support available")
    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
                                        //  object ko string me convert 
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));

    //show on UI
    fetchuserWeatherInfo(userCoordinates);
}

//grant access ke upper ak event lister lagao, so we can get current location lon and lat, and then we can save in session attributes 
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

//city ka name take as a input 
let searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e)=>{
    //default action remove karo
       e.preventDefault();

       let cityname = searchInput.value;
       //empty
       if(cityname === "")
          return;
        else 
      //non empty value ko pass karo
         fetchSearchWeatherInfo(searchInput.value);
})

     
async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response=await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        //data added to the frontend 
        renderWeatherInfo(data)
    }
    catch(err){
     alert("Error")
    }
}