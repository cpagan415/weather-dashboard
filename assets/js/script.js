
var searchHis = document.getElementById('searchHis');
let cityArray= [];

//created a function with the user input as a parameter when running fetch on the api
var getWeather = function(userCity) {
    var apiUrl = ('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&appid=b7f5bbcf25f5227f04a67e383665ed91');
    fetch(apiUrl).then(function(weatherResponse){
        return weatherResponse.json();
    })
    .then(function(weatherResponse){
        displayWeather(weatherResponse);
        //for the other api I took latitude and longitude from the first api to use as parameters 
        var lat = weatherResponse.coord.lat;
        var lon = weatherResponse.coord.lon;

        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=b7f5bbcf25f5227f04a67e383665ed91')
    })
    .then(function(fiveResponse){
        return fiveResponse.json();
    })
    .then(function(fiveResponse){
        //displaying current weather conditions under title
        currentWeather(fiveResponse);
        //displaying the five day weather forecast
        fiveDay(fiveResponse);
    })
}


    //adding a clearform after user submits 
    function clearForm()
    {
        var form = document.getElementById('userForm');
        form.reset();
    }

   //submit handler here 
   function formSubmitHandler(city){
       var weatherDisplay = document.getElementsByClassName('weatherDisplay');
       var titleIcon = document.getElementById('titleIcon');
       var locCity = document.getElementById('locCity').value;
       cityArray.push(locCity);
       weatherDisplay.textContent = ' ';
       titleIcon.textContent = ' ';
       var city = document.getElementById('locCity').value;
       getWeather(city);
       histSearchBtn(city);
       clearForm();
   }

   function displayWeather(weatherResponse)
   {
    var userCity = weatherResponse.name;
    //to display weather icon
    var imgIcon = document.createElement('img');
    imgIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + weatherResponse.weather[0].icon + '.png')
    //using moment unix time to display correct date, however this does not work still for world wide cities will fix this later 
    var unix = weatherResponse.dt;
    var date = moment.unix(unix).format('MMMM Do YYYY');
    var cityName = document.getElementById('titleIcon');
    cityName.append(userCity + ' ' + date);
    cityName.appendChild(imgIcon);
   }

   function currentWeather(fiveResponse)
   {
       //this will displaying the searched temp, wind, humidity, and UV Index
       var weatherDis = document.getElementById('weatherDis');
       var uvDisplay = document.createElement('span');
       //converting from kelvin to F 
       var tempF = 'Temp: ' + (Math.round(fiveResponse.current.temp - 273)*(9/5)+ 32).toFixed(2) + '˚F<br>';
       var wind = 'Wind Spd:' + fiveResponse.current.wind_speed + 'mph<br>';
       var humidity = 'Humidity: ' + fiveResponse.current.humidity + '%<br>';
       var uvIndex = 'UV Index: ';
       var uvWarning = fiveResponse.current.uvi;
       weatherDis.innerHTML = tempF + wind + humidity + uvIndex;
       uvDisplay.innerHTML = uvWarning;
       weatherDis.append(uvDisplay);

       //changes background color of uv index 
       if(uvWarning <= 3 ){
            uvDisplay.setAttribute('style','background-color:green; color:white;');
       }
       else if(uvWarning > 3 && uvWarning <=5)
       {
        uvDisplay.setAttribute('style','background-color:yellow; color:black;');
       }
       else if(uvWarning > 5 && uvWarning <=8)
       {
        uvDisplay.setAttribute('style','background-color:orange; color:black;');
       }
       else if(uvWarning > 8 && uvWarning <11)
       {
        uvDisplay.setAttribute('style','background-color:red; color:white;');
       }
       else if(uvWarning >= 11)
       {
        uvDisplay.setAttribute('style','background-color:violet; color:white;');
       }
   }

   function fiveDay(fiveResponse)
 {
    var displayFive = document.getElementById('fiveDay');
    displayFive.innerHTML ='<h5 class="mt-5"> Five Day Forecast </h5>';

    for(var i=1; i<6; i++)
   {
       //gather data from 2nd API, displaying it in five bootstrap cards
       var spanEl = document.createElement('span');
       var spanToo = document.createElement('span');
       var dates = moment.unix(fiveResponse.daily[i].dt).format('MMMM Do');
       var temp = fiveResponse.daily[i].temp.day;
       var tempF = 'Temp: ' + Math.round((temp -273) * (9/5) + 32).toFixed(2) + '˚F<br>';
       var wind = 'WindSpd: ' + fiveResponse.daily[i].wind_speed + ' mph<br>';
       var humidity= 'Humidity: '+ fiveResponse.daily[i].humidity +'%<br>';

       //display icon for each day
       var imgIcon = document.createElement('img');
        imgIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + fiveResponse.daily[i].weather[0].icon + '.png')
        imgIcon.setAttribute('height', '50px');
        //icon end 

       spanEl.setAttribute('class', 'fiveDay border-dark cards m-2');
       spanEl.setAttribute('style', 'width: 12rem');
       spanToo.innerHTML = dates; 
       spanEl.innerHTML = '<br>'+ tempF + wind+ humidity;
       displayFive.append(spanEl);
       spanEl.prepend(spanToo);
       spanToo.after(imgIcon);
        
 }
}
//storing data to local storage
var storeData = function()
{
    var userEntry = JSON.stringify(cityArray);
    localStorage.setItem('cities', userEntry);
}

//creating buttons when user submits form
var histSearchBtn = function()
{   
    var btnEl = document.createElement('button');
    btnEl.setAttribute('type', 'button');
    btnEl.setAttribute('style', 'width: 100%');
    btnEl.setAttribute('onclick', 'displayAgain(this)');
    btnEl.setAttribute('class', 'mt-3');
    btnEl.textContent = locCity.value;
    searchHis.appendChild(btnEl);
    storeData();

}

//this is for the onclick function to display weather data again
function displayAgain(objCity){
    var titleIcon = document.getElementById('titleIcon');
    titleIcon.textContent = ' ';
    getWeather(objCity.textContent);

}

//buttons from user search history will appear every time page is refreshed 

window.onload = () => {
    let cities = JSON.parse(localStorage.getItem('cities'));
    for(i=0; i<cities.length;i++){
        var newEl = document.createElement('button');
        newEl.setAttribute('style', 'width: 100%')
        newEl.setAttribute('id', 'btn');
        newEl.setAttribute('onclick', 'displayAgain(this)');
        newEl.setAttribute('class', 'mt-3');
        newEl.textContent = cities[i];
        searchHis.appendChild(newEl);
    }

}

