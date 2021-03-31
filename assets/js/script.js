



//stored user search input in a function to get the fetch request 
var getWeather = function(userCity) {
    var apiUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&APPID=b7f5bbcf25f5227f04a67e383665ed91");

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayWeather(data, userCity);
        })
    })
}

var userForm = document.querySelector('#userForm');
var userCity = document.querySelector('#userCity');
var btnClick = document.querySelector('#btnClick');
var userSearchTerm = document.querySelector('#userSearchTerm');
var cityWeather = document.querySelector('#cityWeather-container');





//listen to when the user clicks the search button
var formSubmitHandler = function(event) 
{
    event.preventDefault();

var userInput = userCity.value.trim();


//validating the user input just in case user does not put anything 
if(userInput) {
    getWeather(userInput);
}
else{
    alert('Please enter a city');
}
}

btnClick.addEventListener('click', formSubmitHandler);


//testing search here with new function

var displayWeather = function (city, weatherInfo){
   
    cityWeather.textContent= ' ';
    userSearchTerm.textContent = userCity.value;
    //i need to fix destination date
    //currently learning how to use moment time zome 
    var date = moment().format("MMMM Do YYYY");
    

    cityWeather.innerHTML = city['name'] + "  " + date + "<br> Temperature C:" + city['main']['temp'] + '<br> Humidity: ' + city['main']['humidity']
    + '%<br> Wind Speed: ' + city['wind']['speed'] + 'mph<br> UV Index: '; 
    

    
}

var tempConv = function(userCity) {

}