

//global variables used 
var userForm = document.getElementById('userForm');
var userCity = document.getElementById('userCity');
var submitBtn = document.getElementById('submitbtn');
var userSearchTerm = document.getElementById('userSearchTerm');
var cityWeather = document.getElementById('cityWeather-container');
var userHistoryLoad = document.getElementById('userHistoryLoad');
var fiveDay = document.getElementById('fiveDay');
//creating a object to store an empty array in 
//this is so I could be able to access the user history 
 
//yt video reference here: https://www.youtube.com/watch?v=AUOzvFzdIk4
let myObj = {cityArray: []};


//user search history when loaded
window.onload = (event) => {
    let citHis = JSON.parse(localStorage.getItem('userCities'));
    console.log(citHis);
    for(var i = 0; i < citHis.cityArray.length; i++){
    var newEl= document.createElement('span');
    var breakEl = document.createElement('br');
    newEl.setAttribute('class', 'hisDisplay border-2');
    newEl.innerHTML =citHis.cityArray[i];
    userHistoryLoad.appendChild(newEl);
    newEl.append(breakEl);
    
    }
    
};



//created a function with the user input as a parameter when running fetch on the api
var getWeather = function(userCity) {
    var apiUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&APPID=b7f5bbcf25f5227f04a67e383665ed91");

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
            displayWeather(data, userCity);
            displayFiveDay(data,userCity);
        })
    })
}

//listen to when the user clicks the search button
var formSubmitHandler = function(event) 
{
    event.preventDefault();
var userInput = event.target.elements['userCity'].value;
//var userInput = userCity.value.trim();
userCity.textContent = ' ';
//validating the user input just in case user does not put anything 
if(userInput) {getWeather(userInput);}
   //maybe a warning statement whould go here like in the modules 
}

submitBtn.addEventListener('submit', formSubmitHandler);

var displayWeather = function (city){
   
    cityWeather.textContent= ' ';
    
    //i need to fix destination date
    //currently learning how to use moment time zome 
    var date = moment().format("MMMM Do YYYY");
    //C to F
    var currTemp = (city['main']['temp'] * .1) * (9/5) + 32;
    cityWeather.innerHTML = city['name'] + "  " + date + "<br> Temperature F: " + currTemp + '<br> Humidity: ' + city['main']['humidity']
    + '%<br> Wind Speed: ' + city['wind']['speed'] + 'mph<br> UV Index: '; 

    //entering data in local storage 
    myObj.cityArray.push(userCity.value);
  
    let myObj_str = JSON.stringify(myObj);
    localStorage.setItem('userCities', myObj_str);
   
}

//display five day forecast 

var displayFiveDay = function(city)
{
    console.log('working');
}

