var getWeather = function(userCity) {
    var apiUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&APPID=b7f5bbcf25f5227f04a67e383665ed91");

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        })
    })
}

getWeather('Orlando');