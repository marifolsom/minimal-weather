console.log('main.js is connected!');


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


// Make a function that converts kevlin to celcius
let convertToCelcius = (temp) => {
  celciusTemp = temp - 273.15;
  return celciusTemp;
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
    currentTemp = json.main.temp;
    weatherDesc = json.weather[0].main;
    minTemp = json.main.temp_min;
    maxTemp = json.main.temp_max;
    // Update the text content of each html element
    document.querySelector('.city').textContent = cityName;
    document.querySelector('.current-temp').textContent = Math.floor(convertToCelcius(currentTemp)) + '°';
    document.querySelector('.weather-desc').textContent = makeFirstLetterCapital(weatherDesc);
    document.querySelector('.min-temp').textContent = Math.floor(convertToCelcius(minTemp)) + '°';
    document.querySelector('.max-temp').textContent = Math.floor(convertToCelcius(maxTemp)) + '°';
    document.querySelector('.temps1').textContent = 'MIN';
    document.querySelector('.temps2').textContent = 'MAX';
    // Add icon depending on current weather
    switch (weatherDesc) {
      case 'Clear':
        document.querySelector('.icon').innerHTML = '<i class="fas fa-sun fa-8x"></i>';
        break;
      case 'Clouds':
        document.querySelector('.icon').innerHTML = '<i class="fas fa-cloud fa-8x"></i>';
        break;
      case 'Rain':
        document.querySelector('.icon').innerHTML = '<i class="fas fa-tint fa-8x"></i>';
        break;
      case 'Mist':
        document.querySelector('.icon').innerHTML = '<i class="fas fa-tint fa-8x"></i>';
        break
      case 'Snow':
        document.querySelector('.icon').innerHTML = '<i class="far fa-snowflake fa-8x"></i>';
        break;
    }
  });
}
