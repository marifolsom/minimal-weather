console.log('main.js is connected!');


// Make a variable to hold the zipcodeInput value, default: 10001
let zipcode = 10001;

// Make variables for city name, current temperature, weather description, min temp, max temp
let cityName, countryName, currentTemp, weatherDesc, minTemp, maxTemp;

// Make variables for each of the 5 day forecast elements
let day1, day2, day3, day4, day5, forecast1, forecast2, forecast3, forecast4, forecast5, temp1, temp2, temp3, temp4, temp5;


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
  // Add event listener to submit button that calls getFiveDay()
  submitButton.addEventListener('click', getFiveDay(zipcode));
  // Add event listener to submit button that calls makeUnitButtons()
  submitButton.addEventListener('click', makeUnitButtons());
}


// When the page loads, add an event listener to the submit button
let submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', getZipCode);


// Make a function that converts kevlin to celcius and uses Math.floor() to round up to a whole number
let convertToCelcius = (temp) => {
  celciusTemp = temp - 273.15;
  return Math.floor(celciusTemp);
}


// Make a function that converts kevlin to farenheit and uses Math.floor() to round up to a whole number
let convertToFarenheit = (temp) => {
  farenheitTemp = 1.9 * (temp - 273) + 32;
  return Math.floor(farenheitTemp);
}


// Make a function that creates buttons for the units and adds event listeners to them
let makeUnitButtons = () => {
  let $unitButtons = $('.unit-buttons');
  // Make and append the elements
  $unitButtons.html('<h2 class="button celcius">°C</h2><h2 class="button farenheit">°F</h2>');
  let celciusButton = document.querySelector('.celcius');
  let farenheitButton = document.querySelector('.farenheit');
  // Add event listeners to each button
  celciusButton.addEventListener('click', makeCelcius);
  farenheitButton.addEventListener('click', makeFarenheit);
}


// Make a function that creates an API request and returns a response in json
let getJSON = (url) => {
  return fetch(url).then(response => response.json());
}


// Make a function that creates the main weather icon
let makeIcons = (zipcode) => {
  // Make a variable for the main icon element
  let $mainIcon = $('.icon');
  let $weatherIcon;
  // Add icon depending on current weather
  switch (weatherDesc) {
    case 'Clear':
      $weatherIcon = $(`<svg class="sun-icon" viewBox="0 0 100 100"><path d="M50.2,72.4c11.7,0,21.2-9.5,21.2-21.2c0-11.7-9.5-21.2-21.2-21.2s-21.2,9.5-21.2,21.2C29.1,62.9,38.6,72.4,50.2,72.4z M50.2,32.1c10.6,0,19.2,8.6,19.2,19.2s-8.6,19.2-19.2,19.2s-19.2-8.6-19.2-19.2S39.7,32.1,50.2,32.1z"/><path d="M51.2,24.4v-9.3c0-0.6-0.4-1-1-1s-1,0.4-1,1v9.3c0,0.6,0.4,1,1,1S51.2,25,51.2,24.4z"/><path d="M37,28.9c0.2,0,0.3,0,0.5-0.1c0.5-0.3,0.6-0.9,0.4-1.4l-4.6-8.1c-0.3-0.5-0.9-0.6-1.4-0.4c-0.5,0.3-0.6,0.9-0.4,1.4l4.6,8.1 C36.3,28.7,36.6,28.9,37,28.9z"/><path d="M18.7,33.7l8,4.7c0.2,0.1,0.3,0.1,0.5,0.1c0.3,0,0.7-0.2,0.9-0.5c0.3-0.5,0.1-1.1-0.4-1.4l-8-4.7c-0.5-0.3-1.1-0.1-1.4,0.4 C18,32.8,18.2,33.4,18.7,33.7z"/><path d="M14.1,51.6l9.3,0.2c0,0,0,0,0,0c0.5,0,1-0.4,1-1c0-0.6-0.4-1-1-1l-9.3-0.2c0,0,0,0,0,0c-0.5,0-1,0.4-1,1 C13.1,51.1,13.6,51.6,14.1,51.6z"/><path d="M26.3,63.2l-8.2,4.5c-0.5,0.3-0.7,0.9-0.4,1.4c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1l8.2-4.5 c0.5-0.3,0.7-0.9,0.4-1.4C27.4,63.1,26.7,63,26.3,63.2z"/><path d="M30.8,82.8c0.2,0.1,0.3,0.1,0.5,0.1c0.3,0,0.7-0.2,0.9-0.5l4.9-7.9c0.3-0.5,0.1-1.1-0.3-1.4c-0.5-0.3-1.1-0.1-1.4,0.3 l-4.9,7.9C30.2,81.9,30.3,82.5,30.8,82.8z"/><path d="M49.4,77c-0.5,0-1,0.4-1,1L48,87.3c0,0.6,0.4,1,1,1c0,0,0,0,0,0c0.5,0,1-0.4,1-1l0.3-9.3C50.4,77.5,49.9,77,49.4,77z"/><path d="M62.3,74c-0.5,0.3-0.7,0.9-0.4,1.4l4.3,8.2c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1c0.5-0.3,0.7-0.9,0.4-1.4l-4.3-8.2 C63.4,74,62.8,73.8,62.3,74z"/><path d="M80.2,71.5c0.2,0.1,0.4,0.2,0.5,0.2c0.3,0,0.7-0.2,0.8-0.5c0.3-0.5,0.2-1.1-0.3-1.4l-7.8-5c-0.5-0.3-1.1-0.2-1.4,0.3 c-0.3,0.5-0.2,1.1,0.3,1.4L80.2,71.5z"/><path d="M76,52.5c0,0.6,0.4,1,0.9,1l9.3,0.5c0,0,0,0,0.1,0c0.5,0,1-0.4,1-1c0-0.6-0.4-1-0.9-1l-9.3-0.5C76.5,51.5,76,52,76,52.5z"/><path d="M73.3,39.6c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1l8.3-4.2c0.5-0.2,0.7-0.9,0.4-1.3C83.1,34,82.5,33.8,82,34l-8.3,4.2 C73.2,38.5,73,39.1,73.3,39.6z"/><path d="M65,29.9c0.3,0,0.6-0.2,0.8-0.4l5.1-7.8c0.3-0.5,0.2-1.1-0.3-1.4s-1.1-0.2-1.4,0.3l-5.1,7.8c-0.3,0.5-0.2,1.1,0.3,1.4 C64.7,29.8,64.8,29.9,65,29.9z"/></svg>`);
      $mainIcon.html($weatherIcon);
      break;
    case 'Clouds':
      $weatherIcon = $(`<svg class="cloud-icon" viewBox="0 0 100 100"><path d="M24.6,66.8c2.8,0,5.6-0.9,7.8-2.6c2.8,6.7,9.4,11.1,16.8,11.1c7.7,0,14.5-4.8,17.1-11.9c2.5,2.7,6,4.3,9.7,4.3 c7.2,0,13.1-5.9,13.1-13.1c0-5.8-3.8-10.8-9.2-12.5c-0.2-9.1-7.7-16.5-16.9-16.5c-6,0-11.6,3.2-14.6,8.4c-2.8-3.5-7-5.6-11.5-5.6 c-7.1,0-13.2,5.1-14.4,12.1C16,41.6,11.3,47,11.3,53.6C11.3,60.9,17.3,66.8,24.6,66.8z M23.4,42.4c0.5,0,0.8-0.4,0.9-0.9 c0.8-6.3,6.2-11.1,12.6-11.1c4.4,0,8.4,2.3,10.8,6c0.2,0.3,0.5,0.5,0.9,0.5c0.4,0,0.7-0.2,0.8-0.6c2.4-5.3,7.7-8.7,13.6-8.7 c8.2,0,14.9,6.7,14.9,14.9l0,0.1c0,0.1,0,0.1,0,0.2c0,0.5,0.3,0.9,0.8,1c5,1.2,8.5,5.7,8.5,10.8c0,6.1-5,11.1-11.1,11.1 c-3.7,0-7.2-1.9-9.2-5c-0.2-0.3-0.6-0.5-1-0.4c-0.4,0.1-0.7,0.4-0.8,0.7c-1.8,7.2-8.3,12.3-15.7,12.3c-7,0-13.2-4.5-15.4-11.1 c-0.1-0.3-0.4-0.6-0.7-0.7c-0.1,0-0.2,0-0.2,0c-0.2,0-0.5,0.1-0.7,0.3c-2.1,1.9-4.8,2.9-7.6,2.9c-6.2,0-11.2-5-11.2-11.2 C13.3,47.8,17.6,43,23.4,42.4z"/></svg>`);
      $mainIcon.html($weatherIcon);
      break;
    case 'Rain':
      $weatherIcon = $(`<svg class="rain-icon" viewBox="0 0 100 100"> <path class="rain cloud" d="M22.6,53.5c2.8,0,5.6-0.9,7.8-2.6c2.8,6.7,9.4,11.1,16.8,11.1c7.7,0,14.5-4.8,17.1-11.9c2.5,2.7,6,4.3,9.7,4.3 c7.2,0,13.1-5.9,13.1-13.1c0-5.8-3.8-10.8-9.2-12.5c-0.2-9.1-7.7-16.5-16.9-16.5c-6,0-11.6,3.2-14.6,8.4c-2.8-3.5-7-5.6-11.5-5.6 c-7.1,0-13.2,5.1-14.4,12.1c-6.4,1.1-11.1,6.5-11.1,13.1C9.4,47.6,15.3,53.5,22.6,53.5z M21.4,29.1c0.5,0,0.8-0.4,0.9-0.9 c0.8-6.3,6.2-11.1,12.6-11.1c4.4,0,8.4,2.3,10.8,6c0.2,0.3,0.5,0.5,0.9,0.5c0.4,0,0.7-0.2,0.8-0.6c2.4-5.3,7.7-8.7,13.6-8.7 c8.2,0,14.9,6.7,14.9,14.9l0,0.1c0,0.1,0,0.1,0,0.2c0,0.5,0.3,0.9,0.8,1c5,1.2,8.5,5.7,8.5,10.8c0,6.1-5,11.1-11.1,11.1 c-3.7,0-7.2-1.9-9.2-5c-0.2-0.3-0.6-0.5-1-0.4c-0.4,0.1-0.7,0.4-0.8,0.7c-1.8,7.2-8.3,12.3-15.7,12.3c-7,0-13.2-4.5-15.4-11.1 c-0.1-0.3-0.4-0.6-0.7-0.7c-0.1,0-0.2,0-0.2,0c-0.2,0-0.5,0.1-0.7,0.3c-2.1,1.9-4.8,2.9-7.6,2.9c-6.2,0-11.2-5-11.2-11.2 C11.4,34.5,15.7,29.7,21.4,29.1z"/> <path class="rain drop" d="M68.6,59.5c-0.6,0-1,0.4-1,1v18.3c0,0.6,0.4,1,1,1s1-0.4,1-1V60.5C69.6,60,69.2,59.5,68.6,59.5z"/> <path class="rain drop" d="M67.6,87.3c0,0.6,0.4,1,1,1s1-0.4,1-1V83c0-0.6-0.4-1-1-1s-1,0.4-1,1V87.3z"/> <path class="rain drop" d="M21.1,87.3c0,0.6,0.4,1,1,1s1-0.4,1-1v-8.7c0-0.6-0.4-1-1-1s-1,0.4-1,1V87.3z"/> <path class="rain drop" d="M60,87.3c0,0.6,0.4,1,1,1s1-0.4,1-1v-8.7c0-0.6-0.4-1-1-1s-1,0.4-1,1V87.3z"/> <path class="rain drop" d="M28.5,87.3c0,0.6,0.4,1,1,1s1-0.4,1-1V74.9c0-0.6-0.4-1-1-1s-1,0.4-1,1V87.3z"/> <path class="rain drop" d="M29.5,72c0.6,0,1-0.4,1-1V60.5c0-0.6-0.4-1-1-1s-1,0.4-1,1V71C28.5,71.6,29,72,29.5,72z"/> <path class="rain drop" d="M45.8,73.9c0.6,0,1-0.4,1-1v-4.3c0-0.6-0.4-1-1-1s-1,0.4-1,1v4.3C44.8,73.4,45.3,73.9,45.8,73.9z"/> <path class="rain drop" d="M44.8,87.3c0,0.6,0.4,1,1,1s1-0.4,1-1V76.8c0-0.6-0.4-1-1-1s-1,0.4-1,1V87.3z"/> <path class="rain drop" d="M61,75.6c0.6,0,1-0.4,1-1V64.2c0-0.6-0.4-1-1-1s-1,0.4-1,1v10.5C60,75.2,60.5,75.6,61,75.6z"/> <path class="rain drop" d="M22.1,75.6c0.6,0,1-0.4,1-1V61.1c0-0.6-0.4-1-1-1s-1,0.4-1,1v13.6C21.1,75.2,21.6,75.6,22.1,75.6z"/> <path class="rain drop" d="M53.4,66.9c-0.6,0-1,0.4-1,1v19.4c0,0.6,0.4,1,1,1s1-0.4,1-1V67.9C54.4,67.3,54,66.9,53.4,66.9z"/> <path class="rain drop" d="M76.6,60.1c-0.6,0-1,0.4-1,1v26.2c0,0.6,0.4,1,1,1s1-0.4,1-1V61.1C77.6,60.5,77.1,60.1,76.6,60.1z"/> <path class="rain drop" d="M38,87.3v-22c0-0.6-0.4-1-1-1s-1,0.4-1,1v22c0,0.6,0.4,1,1,1S38,87.8,38,87.3z"/> </svg>`);
      $mainIcon.html($weatherIcon);
      break;
    case 'Snow':
      $weatherIcon = $(`<svg class="snow-icon" viewBox="0 0 100 100"><path d="M79.4,29.1c-0.2-9.1-7.7-16.5-16.9-16.5c-6,0-11.6,3.2-14.6,8.4c-2.8-3.5-7-5.6-11.5-5.6c-7.1,0-13.2,5.1-14.4,12.1 c-6.4,1.1-11.1,6.5-11.1,13.1c0,7.3,5.9,13.2,13.2,13.2c2.8,0,5.6-0.9,7.8-2.6c2.8,6.7,9.4,11.1,16.8,11.1c7.7,0,14.5-4.8,17.1-11.9 c2.5,2.7,6,4.3,9.7,4.3c7.2,0,13.1-5.9,13.1-13.1C88.7,35.9,84.9,30.8,79.4,29.1z M75.5,52.8c-3.7,0-7.2-1.9-9.2-5 c-0.2-0.3-0.6-0.5-1-0.4c-0.4,0.1-0.7,0.4-0.8,0.7c-1.8,7.2-8.3,12.3-15.7,12.3c-7,0-13.2-4.5-15.4-11.1c-0.1-0.3-0.4-0.6-0.7-0.7 c-0.1,0-0.2,0-0.3,0c-0.2,0-0.5,0.1-0.7,0.3c-2.1,1.9-4.8,2.9-7.6,2.9c-6.2,0-11.2-5-11.2-11.2c0-5.8,4.3-10.6,10-11.2 c0.5,0,0.8-0.4,0.9-0.9c0.8-6.3,6.2-11.1,12.6-11.1c4.4,0,8.4,2.3,10.8,6c0.2,0.3,0.6,0.5,0.9,0.5c0.4,0,0.7-0.2,0.8-0.6 c2.4-5.3,7.7-8.7,13.6-8.7c8.2,0,14.9,6.7,14.9,14.9l0,0.3c0,0.5,0.3,0.9,0.8,1c5,1.2,8.5,5.7,8.5,10.8 C86.7,47.8,81.7,52.8,75.5,52.8z"/><path d="M75.7,65.5c0-2-1.6-3.6-3.6-3.6s-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6S75.7,67.5,75.7,65.5z M70.5,65.5c0-0.9,0.7-1.6,1.6-1.6 s1.6,0.7,1.6,1.6s-0.7,1.6-1.6,1.6S70.5,66.4,70.5,65.5z"/><path d="M31.9,59.4c-2,0-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6s3.6-1.6,3.6-3.6S33.8,59.4,31.9,59.4z M31.9,64.5c-0.9,0-1.6-0.7-1.6-1.6 s0.7-1.6,1.6-1.6s1.6,0.7,1.6,1.6S32.7,64.5,31.9,64.5z"/><path d="M29.9,82.3c0,2,1.6,3.6,3.6,3.6s3.6-1.6,3.6-3.6s-1.6-3.6-3.6-3.6S29.9,80.3,29.9,82.3z M35,82.3c0,0.9-0.7,1.6-1.6,1.6 s-1.6-0.7-1.6-1.6s0.7-1.6,1.6-1.6S35,81.4,35,82.3z"/><path d="M83.1,80.3c0-2-1.6-3.6-3.6-3.6s-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6S83.1,82.3,83.1,80.3z M77.9,80.3c0-0.9,0.7-1.6,1.6-1.6 s1.6,0.7,1.6,1.6s-0.7,1.6-1.6,1.6S77.9,81.2,77.9,80.3z"/><path d="M67.7,77.7c0-2.7-2.2-4.9-4.9-4.9c-2.7,0-4.9,2.2-4.9,4.9c0,2.7,2.2,4.9,4.9,4.9C65.4,82.6,67.7,80.4,67.7,77.7z M59.8,77.7 c0-1.6,1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9s-1.3,2.9-2.9,2.9S59.8,79.3,59.8,77.7z"/><path d="M27.1,73.7c0-2.7-2.2-4.9-4.9-4.9c-2.7,0-4.9,2.2-4.9,4.9c0,2.7,2.2,4.9,4.9,4.9C24.9,78.7,27.1,76.5,27.1,73.7z M19.3,73.7 c0-1.6,1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9s-1.3,2.9-2.9,2.9S19.3,75.4,19.3,73.7z"/><path d="M50.4,72.1c0-2.7-2.2-4.9-4.9-4.9c-2.7,0-4.9,2.2-4.9,4.9c0,2.7,2.2,4.9,4.9,4.9C48.2,77,50.4,74.8,50.4,72.1z M42.5,72.1 c0-1.6,1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S47.1,75,45.5,75S42.5,73.7,42.5,72.1z"/></svg>`);
      $mainIcon.html($weatherIcon);
      break;
    case 'Mist':
      $weatherIcon = $(`<svg class="mist-icon" viewBox="0 0 100 100"> <g> <path class="mist" d="M85.23,64.78c-0.092,0.141-0.188,0.278-0.285,0.416c-3.553,4.939-10.438,6.064-15.379,2.512 c-6.514-4.684-15.293-4.684-21.808,0c-3.843,2.764-9.021,2.764-12.864,0c-7.019-5.045-16.581-4.617-23.119,1.035 c-0.801,0.691-0.889,1.9-0.197,2.701s1.9,0.889,2.701,0.197c5.198-4.494,12.801-4.835,18.379-0.823 c5.178,3.724,12.158,3.724,17.336,0c5.18-3.724,12.159-3.724,17.338,0c6.656,4.786,15.936,3.271,20.723-3.388 c0.131-0.184,0.26-0.37,0.383-0.56c0.578-0.886,0.328-2.072-0.559-2.649C86.994,63.644,85.807,63.894,85.23,64.78z"/> </g> <g> <path class="mistt" d="M85.23,45.822c-0.092,0.141-0.188,0.279-0.285,0.416c-3.553,4.94-10.438,6.066-15.379,2.514 c-6.514-4.684-15.293-4.684-21.808,0c-3.843,2.764-9.021,2.764-12.864,0c-7.019-5.046-16.581-4.618-23.119,1.035 c-0.801,0.691-0.889,1.9-0.197,2.7s1.9,0.888,2.701,0.196c5.198-4.494,12.801-4.834,18.379-0.822 c5.178,3.724,12.158,3.724,17.336,0c5.18-3.725,12.159-3.725,17.338,0c6.656,4.786,15.936,3.271,20.723-3.387 c0.131-0.184,0.26-0.371,0.383-0.561c0.578-0.887,0.328-2.072-0.559-2.65C86.994,44.686,85.807,44.938,85.23,45.822z"/> </g> <g> <path class="mist" d="M85.23,26.865c-0.092,0.141-0.188,0.279-0.285,0.416c-3.553,4.94-10.438,6.066-15.379,2.514 c-6.514-4.686-15.293-4.686-21.808,0c-3.843,2.763-9.021,2.763-12.864,0c-7.019-5.047-16.581-4.617-23.119,1.034 c-0.801,0.692-0.889,1.901-0.197,2.701s1.9,0.888,2.701,0.196c5.198-4.494,12.801-4.834,18.379-0.823 c5.178,3.724,12.158,3.724,17.336,0c5.18-3.724,12.159-3.724,17.338,0c6.656,4.788,15.936,3.271,20.723-3.387 c0.131-0.183,0.26-0.37,0.383-0.56c0.578-0.887,0.328-2.073-0.559-2.65C86.994,25.729,85.807,25.979,85.23,26.865z"/> </g> </svg>`);
      $mainIcon.html($weatherIcon);
      break;
    case 'Thunderstorm':
      $weatherIcon = $(`<svg class="thunder-icon" viewBox="0 0 100 90"><g><path d="M33.0854492,92.4589844c-0.2358398,0-0.4736328-0.0556641-0.6938477-0.1699219   c-0.6298828-0.3291016-0.9428711-1.0556641-0.7485352-1.7392578l10.347168-36.4658203H23.84375   c-0.4790039,0-0.9291992-0.2285156-1.2119141-0.6162109c-0.2822266-0.3867188-0.362793-0.8857422-0.2163086-1.3417969   L36.3666992,8.5839844c0.1992188-0.6210938,0.7768555-1.0424805,1.4287109-1.0424805h23.5444336   c0.4794922,0,0.9296875,0.2290039,1.2119141,0.6157227c0.2822266,0.387207,0.3623047,0.8857422,0.2167969,1.3417969   l-8.7607422,27.3393555H76.15625c0.5800781,0,1.1074219,0.3339844,1.3554688,0.8579102s0.1728516,1.1435547-0.1943359,1.5922852   L34.246582,91.9091797C33.9536133,92.2666016,33.5234375,92.4589844,33.0854492,92.4589844z M25.8994141,51.0839844h18.0756836   c0.4702148,0,0.9130859,0.2207031,1.1967773,0.5957031c0.2832031,0.375,0.3745117,0.8613281,0.2460938,1.3134766   l-8.9169922,31.4248047l36.4892578-44.5795898H51.9521484c-0.4794922,0-0.9296875-0.2290039-1.2119141-0.6157227   c-0.2822266-0.387207-0.362793-0.8857422-0.2163086-1.3417969l8.7602539-27.3393555h-20.394043L25.8994141,51.0839844z"/></g></svg>`);
      $mainIcon.html($weatherIcon);
      break;
    case 'Drizzle':
    $weatherIcon = $(`<svg class="rain-icon" viewBox="0 0 100 100"> <path class="rain cloud" d="M22.6,53.5c2.8,0,5.6-0.9,7.8-2.6c2.8,6.7,9.4,11.1,16.8,11.1c7.7,0,14.5-4.8,17.1-11.9c2.5,2.7,6,4.3,9.7,4.3 c7.2,0,13.1-5.9,13.1-13.1c0-5.8-3.8-10.8-9.2-12.5c-0.2-9.1-7.7-16.5-16.9-16.5c-6,0-11.6,3.2-14.6,8.4c-2.8-3.5-7-5.6-11.5-5.6 c-7.1,0-13.2,5.1-14.4,12.1c-6.4,1.1-11.1,6.5-11.1,13.1C9.4,47.6,15.3,53.5,22.6,53.5z M21.4,29.1c0.5,0,0.8-0.4,0.9-0.9 c0.8-6.3,6.2-11.1,12.6-11.1c4.4,0,8.4,2.3,10.8,6c0.2,0.3,0.5,0.5,0.9,0.5c0.4,0,0.7-0.2,0.8-0.6c2.4-5.3,7.7-8.7,13.6-8.7 c8.2,0,14.9,6.7,14.9,14.9l0,0.1c0,0.1,0,0.1,0,0.2c0,0.5,0.3,0.9,0.8,1c5,1.2,8.5,5.7,8.5,10.8c0,6.1-5,11.1-11.1,11.1 c-3.7,0-7.2-1.9-9.2-5c-0.2-0.3-0.6-0.5-1-0.4c-0.4,0.1-0.7,0.4-0.8,0.7c-1.8,7.2-8.3,12.3-15.7,12.3c-7,0-13.2-4.5-15.4-11.1 c-0.1-0.3-0.4-0.6-0.7-0.7c-0.1,0-0.2,0-0.2,0c-0.2,0-0.5,0.1-0.7,0.3c-2.1,1.9-4.8,2.9-7.6,2.9c-6.2,0-11.2-5-11.2-11.2 C11.4,34.5,15.7,29.7,21.4,29.1z"/> <path class="rain drop" d="M68.6,59.5c-0.6,0-1,0.4-1,1v18.3c0,0.6,0.4,1,1,1s1-0.4,1-1V60.5C69.6,60,69.2,59.5,68.6,59.5z"/> <path class="rain drop" d="M21.1,87.3c0,0.6,0.4,1,1,1s1-0.4,1-1v-8.7c0-0.6-0.4-1-1-1s-1,0.4-1,1V87.3z"/> <path class="rain drop" d="M29.5,72c0.6,0,1-0.4,1-1V60.5c0-0.6-0.4-1-1-1s-1,0.4-1,1V71C28.5,71.6,29,72,29.5,72z"/> <path class="rain drop" d="M44.8,87.3c0,0.6,0.4,1,1,1s1-0.4,1-1V76.8c0-0.6-0.4-1-1-1s-1,0.4-1,1V87.3z"/> <path class="rain drop" d="M53.4,66.9c-0.6,0-1,0.4-1,1v19.4c0,0.6,0.4,1,1,1s1-0.4,1-1V67.9C54.4,67.3,54,66.9,53,66.9z"/> </svg>`);
    $mainIcon.html($weatherIcon);
    break;
  }
}


// Make a function that creates the small weather icons in the 5 day forecast
let makeSmallIcons = (zipcode) => {
  let $icon1 = $('.icon-1');
  let $icon2 = $('.icon-2');
  let $icon3 = $('.icon-3');
  let $icon4 = $('.icon-4');
  let $icon5 = $('.icon-5');
  let $weatherIcon;
  // For day 1 forecast
  switch (forecast1) {
    case 'Clear':
      $weatherIcon = $('<img src="./icons/sun.svg" />');
      $icon1.html($weatherIcon);
      break;
    case 'Clouds':
      $weatherIcon = $('<img src="./icons/cloud.svg" />');
      $icon1.html($weatherIcon);
      break;
    case 'Rain':
      $weatherIcon = $('<img src="./icons/rain.svg" />');
      $icon1.html($weatherIcon);
      break;
    case 'Snow':
      $weatherIcon = $('<img src="./icons/snow.svg" />');
      $icon1.html($weatherIcon);
      break;
    case 'Mist':
      $weatherIcon = $('<img src="./icons/mist.svg" />');
      $icon1.html($weatherIcon);
      break;
    case 'Thunderstorm':
      $weatherIcon = $('<img src="./icons/thunder.svg" />');
      $icon1.html($weatherIcon);
      break;
    case 'Drizzle':
      $weatherIcon = $('<img src="./icons/drizzle.svg" />');
      $icon1.html($weatherIcon);
      break;
  }
  // For day 2 forecast
  switch (forecast2) {
    case 'Clear':
      $weatherIcon = $('<img src="./icons/sun.svg" />');
      $icon2.html($weatherIcon);
      break;
    case 'Clouds':
      $weatherIcon = $('<img src="./icons/cloud.svg" />');
      $icon2.html($weatherIcon);
      break;
    case 'Rain':
      $weatherIcon = $('<img src="./icons/rain.svg" />');
      $icon2.html($weatherIcon);
      break;
    case 'Snow':
      $weatherIcon = $('<img src="./icons/snow.svg" />');
      $icon2.html($weatherIcon);
      break;
    case 'Mist':
      $weatherIcon = $('<img src="./icons/mist.svg" />');
      $icon2.html($weatherIcon);
      break;
    case 'Thunderstorm':
      $weatherIcon = $('<img src="./icons/thunder.svg" />');
      $icon2.html($weatherIcon);
      break;
    case 'Drizzle':
      $weatherIcon = $('<img src="./icons/drizzle.svg" />');
      $icon2.html($weatherIcon);
      break;
  }
  // For day 3 forecast
  switch (forecast3) {
    case 'Clear':
      $weatherIcon = $('<img src="./icons/sun.svg" />');
      $icon3.html($weatherIcon);
      break;
    case 'Clouds':
      $weatherIcon = $('<img src="./icons/cloud.svg" />');
      $icon3.html($weatherIcon);
      break;
    case 'Rain':
      $weatherIcon = $('<img src="./icons/rain.svg" />');
      $icon3.html($weatherIcon);
      break;
    case 'Snow':
      $weatherIcon = $('<img src="./icons/snow.svg" />');
      $icon3.html($weatherIcon);
      break;
    case 'Mist':
      $weatherIcon = $('<img src="./icons/mist.svg" />');
      $icon3.html($weatherIcon);
      break;
    case 'Thunderstorm':
      $weatherIcon = $('<img src="./icons/thunder.svg" />');
      $icon3.html($weatherIcon);
      break;
    case 'Drizzle':
      $weatherIcon = $('<img src="./icons/drizzle.svg" />');
      $icon3.html($weatherIcon);
      break;
  }
  // For day 4 forecast
  switch (forecast4) {
    case 'Clear':
      $weatherIcon = $('<img src="./icons/sun.svg" />');
      $icon4.html($weatherIcon);
      break;
    case 'Clouds':
      $weatherIcon = $('<img src="./icons/cloud.svg" />');
      $icon4.html($weatherIcon);
      break;
    case 'Rain':
      $weatherIcon = $('<img src="./icons/rain.svg" />');
      $icon4.html($weatherIcon);
      break;
    case 'Snow':
      $weatherIcon = $('<img src="./icons/snow.svg" />');
      $icon4.html($weatherIcon);
      break;
    case 'Mist':
      $weatherIcon = $('<img src="./icons/mist.svg" />');
      $icon4.html($weatherIcon);
      break;
    case 'Thunderstorm':
      $weatherIcon = $('<img src="./icons/thunder.svg" />');
      $icon4.html($weatherIcon);
      break;
    case 'Drizzle':
      $weatherIcon = $('<img src="./icons/drizzle.svg" />');
      $icon4.html($weatherIcon);
      break;
  }
  // For day 5 forecast
  switch (forecast5) {
    case 'Clear':
      $weatherIcon = $('<img src="./icons/sun.svg" />');
      $icon5.html($weatherIcon);
      break;
    case 'Clouds':
      $weatherIcon = $('<img src="./icons/cloud.svg" />');
      $icon5.html($weatherIcon);
      break;
    case 'Rain':
      $weatherIcon = $('<img src="./icons/rain.svg" />');
      $icon5.html($weatherIcon);
      break;
    case 'Snow':
      $weatherIcon = $('<img src="./icons/snow.svg" />');
      $icon5.html($weatherIcon);
      break;
    case 'Mist':
      $weatherIcon = $('<img src="./icons/mist.svg" />');
      $icon5.html($weatherIcon);
      break;
    case 'Thunderstorm':
      $weatherIcon = $('<img src="./icons/thunder.svg" />');
      $icon5.html($weatherIcon);
      break;
    case 'Drizzle':
      $weatherIcon = $('<img src="./icons/drizzle.svg" />');
      $icon5.html($weatherIcon);
      break;
  }
}


// Make a function that creates an API request with the user's input
let getWeather = (zipcode) => {
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
    document.querySelector('.current-temp').textContent = convertToFarenheit(currentTemp) + '°';
    document.querySelector('.weather-desc').textContent = weatherDesc;
    document.querySelector('.min-temp').textContent = convertToFarenheit(minTemp) + '°';
    document.querySelector('.max-temp').textContent = convertToFarenheit(maxTemp) + '°';
    document.querySelector('.label-1').textContent = 'MIN';
    document.querySelector('.label-2').textContent = 'MAX';
    // Call makeIcons() to get the main weather icon
    makeIcons(zipcode);
  });
}


// Make a function that creates a 5-day weather forecast
let getFiveDay = (zipcode) => {
  getJSON(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&APPID=cfe78bea462ec765e53c4ee7dc76d7ec`)
  .then(json => {
    // Assign a JSON value to each date variable
    let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    // For day 1
    day1 = days[new Date(json.list[0].dt_txt).getDay()]; // I looked at this stack overflow solution on how to convert a date into a day of the week using getDay(): https://stackoverflow.com/questions/24998624/day-name-from-date-in-js
    forecast1 = json.list[0].weather[0].main;
    temp1 = json.list[0].main.temp;
    // For day 2
    day2 = days[new Date(json.list[8].dt_txt).getDay()];
    forecast2 = json.list[8].weather[0].main;
    temp2 = json.list[8].main.temp;
    // For day 3
    day3 = days[new Date(json.list[16].dt_txt).getDay()];
    forecast3 = json.list[16].weather[0].main;
    temp3 = json.list[16].main.temp;
    // For day 4
    day4 = days[new Date(json.list[24].dt_txt).getDay()];
    forecast4 = json.list[24].weather[0].main;
    temp4 = json.list[24].main.temp;
    // For day 5
    day5 = days[new Date(json.list[32].dt_txt).getDay()];
    forecast5 = json.list[32].weather[0].main;
    temp5 = json.list[32].main.temp;
    console.log(day1, forecast1, convertToFarenheit(temp1) + '°');
    console.log(day2, forecast2, convertToFarenheit(temp2) + '°');
    console.log(day3, forecast3, convertToFarenheit(temp3) + '°');
    console.log(day4, forecast4, convertToFarenheit(temp4) + '°');
    console.log(day5, forecast5, convertToFarenheit(temp5) + '°');
    let $forecast = $('.forecast');
    let $fiveDays = $('<div class="five-days"><h2 class="label day">' + day1 + '</h2> <h2 class="label day">' + day2 + '</h2> <h2 class="label day">' + day3 + '</h2> <h2 class="label day">' + day4 + '</h2> <h2 class="label day">' + day5 + '</h2> <div class="small-icon icon-1"></div> <div class="small-icon icon-2"></div> <div class="small-icon icon-3"></div> <div class="small-icon icon-4"></div> <div class="small-icon icon-5"></div> <h2 class="label temp-1">' + convertToFarenheit(temp1) + '°' + '</h2> <h2 class="label temp-2">' + convertToFarenheit(temp2) + '°' + '</h2> <h2 class="label temp-3">' + convertToFarenheit(temp3) + '°' + '</h2> <h2 class="label temp-4">' + convertToFarenheit(temp4) + '°' + '</h2> <h2 class="label temp-5">' + convertToFarenheit(temp5) + '°' + '</h2> </div>');
    $forecast.html($fiveDays);
    makeSmallIcons();
  })
}


// Make a function that switches the all the temperatures to celcius
let makeCelcius = () => {
  // For the main temperature
  getJSON(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=cfe78bea462ec765e53c4ee7dc76d7ec`)
  .then(json => {
    currentTemp = json.main.temp;
    minTemp = json.main.temp_min;
    maxTemp = json.main.temp_max;
    document.querySelector('.current-temp').textContent = convertToCelcius(currentTemp) + '°';
    document.querySelector('.min-temp').textContent = convertToCelcius(minTemp) + '°';
    document.querySelector('.max-temp').textContent = convertToCelcius(maxTemp) + '°';
    makeIcons();
  });
  // For the 5 day forecast
  getJSON(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&APPID=cfe78bea462ec765e53c4ee7dc76d7ec`)
  .then(json => {
    temp1 = json.list[0].main.temp;
    temp2 = json.list[8].main.temp;
    temp3 = json.list[16].main.temp;
    temp4 = json.list[24].main.temp;
    temp5 = json.list[32].main.temp;
    $('.temp-1').html(convertToCelcius(temp1) + '°');
    $('.temp-2').html(convertToCelcius(temp2) + '°');
    $('.temp-3').html(convertToCelcius(temp3) + '°');
    $('.temp-4').html(convertToCelcius(temp4) + '°');
    $('.temp-5').html(convertToCelcius(temp5) + '°');
    makeSmallIcons();
  });
}


// Make a function that switches the main temperature to farenheit
let makeFarenheit = () => {
  // For the main temperature
  getJSON(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=cfe78bea462ec765e53c4ee7dc76d7ec`)
  .then(json => {
    currentTemp = json.main.temp;
    minTemp = json.main.temp_min;
    maxTemp = json.main.temp_max;
    document.querySelector('.current-temp').textContent = convertToFarenheit(currentTemp) + '°';
    document.querySelector('.min-temp').textContent = convertToFarenheit(minTemp) + '°';
    document.querySelector('.max-temp').textContent = convertToFarenheit(maxTemp) + '°';
    makeIcons();
  });
  // For the 5 day forecast
  getJSON(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&APPID=cfe78bea462ec765e53c4ee7dc76d7ec`)
  .then(json => {
    temp1 = json.list[0].main.temp;
    temp2 = json.list[8].main.temp;
    temp3 = json.list[16].main.temp;
    temp4 = json.list[24].main.temp;
    temp5 = json.list[32].main.temp;
    $('.temp-1').html(convertToFarenheit(temp1) + '°');
    $('.temp-2').html(convertToFarenheit(temp2) + '°');
    $('.temp-3').html(convertToFarenheit(temp3) + '°');
    $('.temp-4').html(convertToFarenheit(temp4) + '°');
    $('.temp-5').html(convertToFarenheit(temp5) + '°');
    makeSmallIcons();
  });
}
