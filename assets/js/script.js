


//created a function with the user input as a parameter when running fetch on the api
var getWeather = function(userCity) {
    var apiUrl = ('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&appid=b7f5bbcf25f5227f04a67e383665ed91');
    fetch(apiUrl).then(function(weatherResponse){
        return weatherResponse.json();
    })
    .then(function(weatherResponse){
        displayWeather(weatherResponse);
        console.log(weatherResponse);
        //for the other api I took lat and lon from the current 
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

    function clearForm()
    {
        var form = document.getElementById('userForm');
        form.reset();
    }
   
   function formSubmitHandler(city){
       var weatherDisplay = document.getElementsByClassName('weatherDisplay');
       var titleIcon = document.getElementById('titleIcon');
       weatherDisplay.textContent = ' ';
       titleIcon.textContent = ' ';
       var city = document.getElementById('locCity').value;
       getWeather(city);
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
       //converting from kelvin to F 
       var tempF = 'Temp: ' + (Math.round(fiveResponse.current.temp - 273)*(9/5)+ 32) + '˚F<br>';
       var wind = 'Wind Spd:' + fiveResponse.current.wind_speed + 'mph<br>';
       var humidity = 'Humidity: ' + fiveResponse.current.humidity + '%<br>';
       var uvIndex = 'UV Index: ' + fiveResponse.current.uvi;
       weatherDis.innerHTML = tempF + wind + humidity + uvIndex;
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
       var tempF = 'Temp: ' + Math.round((temp -273) * (9/5) + 32) + '˚F<br>';
       var wind = 'WindSpd: ' + fiveResponse.daily[i].wind_speed + ' mph<br>';
       var humidity= 'Humidity: '+ fiveResponse.daily[i].humidity +'%<br>';

       //display icon for each day
       var imgIcon = document.createElement('img');
        imgIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + fiveResponse.daily[i].weather[0].icon + '.png')
        imgIcon.setAttribute('height', '50px');
        //imgIcon.setAttribute('width', '5px');
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