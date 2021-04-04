

//created a function with the user input as a parameter when running fetch on the api
var getWeather = function(userCity) {
    var apiUrl = ('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&appid=b7f5bbcf25f5227f04a67e383665ed91');
    fetch(apiUrl).then(function(response){
        if(response.ok){
        response.json().then(function(data){
            displayWeather(data,userCity);
            console.log(data);
            });
        }else {
            alert(response.statusText);
        }
        })
    }

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

   


var formSubmitHandler = function()
{
    let locCity = document.getElementById('locCity').value.trim();
    locCity = locCity.charAt(0).toUpperCase() + locCity.substring(1, locCity.length);
    cityArray.push(locCity);
    histSearchBtn(locCity);
    getWeather(locCity);
    clearForm();
    
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
    btnEl.setAttribute('onclick', 'displayAgain(this)');
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
function displayWeather(weatherInfo,locCity){

    var weatherDis = document.getElementById('weatherDis');
   //Api Info
    var tempF = 'Temp: ' + (Math.round(weatherInfo.main.temp - 273)*(9/5)+ 32) + '˚F<br>';
    var locDate = moment().format('MMMM Do YYYY');
    locCity = locCity.slice(0,1).toUpperCase() + locCity.substring(1, locCity.length);
  //title with icon display
  var titleIcon = document.getElementById('titleIcon');
  var img = document.createElement('img');
  img.setAttribute('src', 'http://openweathermap.org/img/wn/' + weatherInfo.weather[0].icon + '.png');
  
    var lon = weatherInfo.coord.lon;
    var lat = weatherInfo.coord.lat;
    var wind = 'Wind Spd:' + weatherInfo.wind.speed + 'mph<br>';
    var humidity = 'Humidity: ' + weatherInfo.main.humidity + '%<br>';
    //Uv Index: error with displaying uv index 
    titleIcon.textContent = locCity + ' ' + locDate;
    titleIcon.append(img);
    weatherDis.innerHTML = tempF + wind + humidity;
  
    
    fiveDayForecast(lat,lon);
}

var fiveDay = function(info)
{
 var displayFiveDay = function()
 {
    var displayFive = document.getElementById('fiveDay');
    displayFive.innerHTML ='<h5 class="mt-5"> Five Day Forecast </h5>';
   for(var i=0; i<5; i++)
   {
       var create = document.createElement('span');
       var convUnix = info.daily[i].dt;
       var dates = moment.unix(convUnix).format('MMMM Do') + '<br>';
       var temp = info.daily[i].temp.day;
       var tempF = 'Temp: ' + Math.round((temp -273) * (9/5) + 32) + '˚F<br>';
       var wind = 'WindSpd: ' + info.daily[i].wind_speed + ' mph<br>';
       var humidity= 'Humidity: '+ info.daily[i].humidity +'%<br>';

       //icon not displaying for 5 day weather
       /*
       var wIcon = document.getElementById('wIcon');
        var img2 = document.createElement('img2');
        img2.setAttribute('src', 'http://openweathermap.org/img/wn/' + info.daily[i].weather[0].icon + '.png');
        */
       create.setAttribute('class', 'fiveDay border-dark cards m-2');
       create.setAttribute('style', 'width: 12rem');
      
       create.innerHTML = dates + tempF + wind+ humidity;
       displayFive.appendChild(create);
       
   }  
 }
 

 displayFiveDay();

}

function displayAgain(objCity){
    getWeather(objCity.textContent);
}
