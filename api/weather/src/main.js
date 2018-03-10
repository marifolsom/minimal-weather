console.log('main.js is connected!');

/*

Here's an overview of the steps you'll follow to get your app to work...

STEPS

1. when the page loads
  - add an event listener to the button
2. When the button is clicked
  - grab the input
  - store the value
  - make an API request based on the input value
3. When the API response is returned
  - grab all the appropriate DOM elements
  - append the data to the DOM

*/


// Make a variable to hold the zipcodeInput value, default: 10001
let zipcode = 10001;


// Make a function for that grabs the user's input and stores the value
let getZipCode = (evt) => {
  // Prevent reload on submit default
  evt.preventDefault();
  // Update the zipcode variable with the user's input
  let zipcodeInput = document.querySelector('.input');
  zipcode = zipcodeInput.value;
  console.log(zipcode);
  // Add event listener to submit button that calls getWeather()
  let submitButton = document.querySelector('.submit');
  submitButton.addEventListener('click', getWeather(zipcode));
}


// When the page loads, add an event listener to the submit button
let submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', getZipCode);


// Make a function that capitalizes the firt letter of a string
let makeFirstLetterCapital = (string) => {
  return string[0].toUpperCase() + string.slice(1);
}


// Make a function that creates an API request and returns a response in json
let getJSON = (url) => {
  return fetch(url).then(response => response.json());
}


// Make a function that creates an API request with the user's input
let getWeather = (zipcode) => {
  // Make variables for city name, current temperature, weather description, min temp, max temp
  let cityName, countryName, currentTemp, weatherDesc, minTemp, maxTemp;
  // Make an API request with the user's inputted zipcode
  getJSON(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=cfe78bea462ec765e53c4ee7dc76d7ec`)
  .then(json => {
    console.log(json);
    // Assign a JSON value to each variable
    cityName = json.name;
    countryName = json.sys.country;
    currentTemp = json.main.temp;
    weatherDesc = json.weather[0].description;
    minTemp = json.main.temp_min;
    maxTemp = json.main.temp_max;
    // Update the text content of each html element
    document.querySelector('.city').textContent = cityName + ', ' + countryName;
    document.querySelector('.current-temp').textContent = currentTemp + ' °K';
    document.querySelector('.weather-desc').textContent = makeFirstLetterCapital(weatherDesc);
    document.querySelector('.min-temp').textContent = 'MIN ' + minTemp + ' °K';
    document.querySelector('.max-temp').textContent = 'MAX ' + maxTemp + ' °K';
  });
}
