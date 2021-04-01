
//on load when page loads


window.onload = (event) => {
var userHistory = localStorage.getItem('userInput');
var userHistoryLoad = document.getElementById('userHistoryLoad');

console.log(userHistory);
for(var i = 0; i < userHistory.length; i++){
var historyEl = document.createElement('span');
historyEl.setAttribute('class', 'history');
 historyEl.append(userHistory[i]);
 userHistoryLoad.appendChild(historyEl);

}


};


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
//making an object to store an array in, i am hoping this would be easier to gather data from local storage 
//youtube video reference: 
var userCities  = {
    city: []
};

//listen to when the user clicks the search button
var formSubmitHandler = function(event) 
{
    event.preventDefault();

var userInput = userCity.value.trim();
userCity.textContent = ' ';
//validating the user input just in case user does not put anything 
if(userInput) {
    getWeather(userInput);
}

    cityArray.push(userInput);
    console.log(cityArray);
    localStorage.setItem('userInput', JSON.stringify(cityArray));


}

btnClick.addEventListener('click', formSubmitHandler);


//testing search here with new function

var displayWeather = function (city){
   
    cityWeather.textContent= ' ';
    userSearchTerm.textContent = userCity.value;
    //i need to fix destination date
    //currently learning how to use moment time zome 
    var date = moment().format("MMMM Do YYYY");
    //celcius to farenheit cnv
    var currTemp = (city['main']['temp'] * .1) * (9/5) + 32;
    cityWeather.innerHTML = city['name'] + "  " + date + "<br> Temperature F: " + currTemp + '<br> Humidity: ' + city['main']['humidity']
    + '%<br> Wind Speed: ' + city['wind']['speed'] + 'mph<br> UV Index: '; 
}

