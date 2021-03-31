var getApi = function() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=orlando&APPID=b7f5bbcf25f5227f04a67e383665ed91").then(function(response){
        response.json().then(function(data){
            console.log(data);
        })
    })
}

getApi();