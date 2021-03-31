var getWeather = function(userCity) {
    var apiUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&APPID=b7f5bbcf25f5227f04a67e383665ed91");

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        })
    })
}

var userForm = document.querySelector('#userForm');
var userCity = document.querySelector('#userCity');
var btnClick = document.querySelector('#btnClick');



//listen to when the user clicks the search button
var formSubmitHandler = function(event) 
{
    event.preventDefault();

var userInput = userCity.value.trim();

if(userInput) {
    getWeather(userInput);
}
else{
    alert('Please enter a city');
}
}

btnClick.addEventListener('click', formSubmitHandler);
