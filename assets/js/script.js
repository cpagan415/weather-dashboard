

//created a function with the user input as a parameter when running fetch on the api
var getWeather = function(userCity) {
    var apiUrl = ('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&appid=b7f5bbcf25f5227f04a67e383665ed91');
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayWeather(data);
            console.log(data);})})}

var fiveDayForecast = function(lat,lon)
{
    var apiUrl = ('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=b7f5bbcf25f5227f04a67e383665ed91');
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
            fiveDay(data);
        })
    })

}

//creating empty array to store user search history
var searchHis = document.getElementById('searchHis');
let cityArray= [];

window.onload = () => {
    let cities = JSON.parse(localStorage.getItem('cities'));
    for(i=0; i<cities.length;i++){
        var newEl = document.createElement('button');
        newEl.setAttribute('style', 'width: 100%')
        newEl.setAttribute('id', 'btn');
        newEl.setAttribute('onclick', 'displayAgain(this)');
        newEl.textContent = cities[i];
        searchHis.appendChild(newEl);
    }

}

function displayAgain(objCity){
    getWeather(objCity.textContent);
}
   


var formSubmitHandler = function()
{
    let locCity = document.getElementById('locCity').value.trim();
    locCity = locCity.charAt(0).toUpperCase() + locCity.substring(1, locCity.length);
    cityArray.push(locCity);
    histSearchBtn(locCity);
    getWeather(locCity);
    clearForm(locCity);
}
var clearForm = function()
{
    var form = document.getElementById('userForm');
    form.reset();
}
var histSearchBtn = function()
{
    
    var btnEl = document.createElement('button');
    btnEl.setAttribute('type', 'button');
    btnEl.setAttribute('style', 'width: 100%');
    btnEl.textContent = locCity.value;
    searchHis.appendChild(btnEl);
    storeData();

}


var storeData = function()
{
    var userEntry = JSON.stringify(cityArray);
    localStorage.setItem('cities', userEntry);
}

//displaying weather api
function displayWeather(weather){
    var weatherDis = document.getElementById('weatherDis');
    var tempF = 'Temp: ' + (Math.round(weather.main.temp - 273)*(9/5)+ 32) + '˚F<br>';
    var locDate = locCity.value+ ' ' + moment().format('MMMM Do YYYY') +'<br>';
    var lon = weather.coord.lon;
    var lat = weather.coord.lat;
    var wind = 'Wind Spd:' + weather.wind.speed + 'mph<br>';
    var humidity = 'Humidity: ' + weather.main.humidity + '%<br>';
    weatherDis.innerHTML = locCity.value + ' ' + locDate + tempF + wind + humidity;
    
    fiveDayForecast(lat,lon);
}

var fiveDay = function(info)
{
 var displayFiveDay = function()
 {
    var displayFive = document.getElementById('fiveDay');
    displayFive.innerHTML ='<h5> Five Day Forecast </h5>';
   for(var i=0; i<5; i++)
   {
       var create = document.createElement('span');
       var convUnix = info.daily[i].dt;
       var dates = moment.unix(convUnix).format('MMMM Do') + '<br>';
       var temp = info.daily[i].temp.day;
       var tempF = 'Temp: ' + Math.round((temp -273) * (9/5) + 32) + '˚F<br>';
       var wind = 'WindSpd: ' + info.daily[i].wind_speed + ' mph<br>';
       var humidity= 'Humidity: '+ info.daily[i].humidity +'%<br>';
       create.setAttribute('class', 'fiveDay cards m-2');
       create.setAttribute('style', 'width: 12rem')
       create.innerHTML = dates + tempF + wind+ humidity;
       displayFive.appendChild(create);
       
   }  
 }
 //var convUnix = moment.unix(unixTime).format('MMMM Do YYYY');

 displayFiveDay();

}

