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
  // // Add event listener to submit button that calls getFiveDay()
  // submitButton.addEventListener('click', getFiveDay(zipcode));
}


// When the page loads, add an event listener to the submit button
let submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', getZipCode);


// Make a function that converts kevlin to celcius
let convertToCelcius = (temp) => {
  celciusTemp = temp - 273.15;
  return celciusTemp;
}


// Make a function that creates an API request and returns a response in json
let getJSON = (url) => {
  return fetch(url).then(response => response.json());
}


// Make variables for city name, current temperature, weather description, min temp, max temp
let cityName, countryName, currentTemp, weatherDesc, minTemp, maxTemp;


// Make a function that creates the main weather icon
let makeIcons = (zipcode) => {
  // Add icon depending on current weather
  switch (weatherDesc) {
    case 'Clear':
      document.querySelector('.icon').innerHTML = '<svg viewBox="0 0 100 100"><path d="M50.2,72.4c11.7,0,21.2-9.5,21.2-21.2c0-11.7-9.5-21.2-21.2-21.2s-21.2,9.5-21.2,21.2C29.1,62.9,38.6,72.4,50.2,72.4z   M50.2,32.1c10.6,0,19.2,8.6,19.2,19.2s-8.6,19.2-19.2,19.2s-19.2-8.6-19.2-19.2S39.7,32.1,50.2,32.1z"/><path d="M51.2,24.4v-9.3c0-0.6-0.4-1-1-1s-1,0.4-1,1v9.3c0,0.6,0.4,1,1,1S51.2,25,51.2,24.4z"/><path d="M37,28.9c0.2,0,0.3,0,0.5-0.1c0.5-0.3,0.6-0.9,0.4-1.4l-4.6-8.1c-0.3-0.5-0.9-0.6-1.4-0.4c-0.5,0.3-0.6,0.9-0.4,1.4l4.6,8.1  C36.3,28.7,36.6,28.9,37,28.9z"/><path d="M18.7,33.7l8,4.7c0.2,0.1,0.3,0.1,0.5,0.1c0.3,0,0.7-0.2,0.9-0.5c0.3-0.5,0.1-1.1-0.4-1.4l-8-4.7c-0.5-0.3-1.1-0.1-1.4,0.4  C18,32.8,18.2,33.4,18.7,33.7z"/><path d="M14.1,51.6l9.3,0.2c0,0,0,0,0,0c0.5,0,1-0.4,1-1c0-0.6-0.4-1-1-1l-9.3-0.2c0,0,0,0,0,0c-0.5,0-1,0.4-1,1  C13.1,51.1,13.6,51.6,14.1,51.6z"/><path d="M26.3,63.2l-8.2,4.5c-0.5,0.3-0.7,0.9-0.4,1.4c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1l8.2-4.5  c0.5-0.3,0.7-0.9,0.4-1.4C27.4,63.1,26.7,63,26.3,63.2z"/><path d="M30.8,82.8c0.2,0.1,0.3,0.1,0.5,0.1c0.3,0,0.7-0.2,0.9-0.5l4.9-7.9c0.3-0.5,0.1-1.1-0.3-1.4c-0.5-0.3-1.1-0.1-1.4,0.3  l-4.9,7.9C30.2,81.9,30.3,82.5,30.8,82.8z"/><path d="M49.4,77c-0.5,0-1,0.4-1,1L48,87.3c0,0.6,0.4,1,1,1c0,0,0,0,0,0c0.5,0,1-0.4,1-1l0.3-9.3C50.4,77.5,49.9,77,49.4,77z"/><path d="M62.3,74c-0.5,0.3-0.7,0.9-0.4,1.4l4.3,8.2c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1c0.5-0.3,0.7-0.9,0.4-1.4l-4.3-8.2  C63.4,74,62.8,73.8,62.3,74z"/><path d="M80.2,71.5c0.2,0.1,0.4,0.2,0.5,0.2c0.3,0,0.7-0.2,0.8-0.5c0.3-0.5,0.2-1.1-0.3-1.4l-7.8-5c-0.5-0.3-1.1-0.2-1.4,0.3  c-0.3,0.5-0.2,1.1,0.3,1.4L80.2,71.5z"/><path d="M76,52.5c0,0.6,0.4,1,0.9,1l9.3,0.5c0,0,0,0,0.1,0c0.5,0,1-0.4,1-1c0-0.6-0.4-1-0.9-1l-9.3-0.5C76.5,51.5,76,52,76,52.5z"/><path d="M73.3,39.6c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1l8.3-4.2c0.5-0.2,0.7-0.9,0.4-1.3C83.1,34,82.5,33.8,82,34l-8.3,4.2  C73.2,38.5,73,39.1,73.3,39.6z"/><path d="M65,29.9c0.3,0,0.6-0.2,0.8-0.4l5.1-7.8c0.3-0.5,0.2-1.1-0.3-1.4s-1.1-0.2-1.4,0.3l-5.1,7.8c-0.3,0.5-0.2,1.1,0.3,1.4  C64.7,29.8,64.8,29.9,65,29.9z"/></svg>';
      break;
    case 'Clouds':
      document.querySelector('.icon').innerHTML = '<svg viewBox="0 0 100 100"><path d="M24.6,66.8c2.8,0,5.6-0.9,7.8-2.6c2.8,6.7,9.4,11.1,16.8,11.1c7.7,0,14.5-4.8,17.1-11.9c2.5,2.7,6,4.3,9.7,4.3  c7.2,0,13.1-5.9,13.1-13.1c0-5.8-3.8-10.8-9.2-12.5c-0.2-9.1-7.7-16.5-16.9-16.5c-6,0-11.6,3.2-14.6,8.4c-2.8-3.5-7-5.6-11.5-5.6  c-7.1,0-13.2,5.1-14.4,12.1C16,41.6,11.3,47,11.3,53.6C11.3,60.9,17.3,66.8,24.6,66.8z M23.4,42.4c0.5,0,0.8-0.4,0.9-0.9  c0.8-6.3,6.2-11.1,12.6-11.1c4.4,0,8.4,2.3,10.8,6c0.2,0.3,0.5,0.5,0.9,0.5c0.4,0,0.7-0.2,0.8-0.6c2.4-5.3,7.7-8.7,13.6-8.7  c8.2,0,14.9,6.7,14.9,14.9l0,0.1c0,0.1,0,0.1,0,0.2c0,0.5,0.3,0.9,0.8,1c5,1.2,8.5,5.7,8.5,10.8c0,6.1-5,11.1-11.1,11.1  c-3.7,0-7.2-1.9-9.2-5c-0.2-0.3-0.6-0.5-1-0.4c-0.4,0.1-0.7,0.4-0.8,0.7c-1.8,7.2-8.3,12.3-15.7,12.3c-7,0-13.2-4.5-15.4-11.1  c-0.1-0.3-0.4-0.6-0.7-0.7c-0.1,0-0.2,0-0.2,0c-0.2,0-0.5,0.1-0.7,0.3c-2.1,1.9-4.8,2.9-7.6,2.9c-6.2,0-11.2-5-11.2-11.2  C13.3,47.8,17.6,43,23.4,42.4z"/></svg>';
      break;
    case 'Rain':
      document.querySelector('.icon').innerHTML = '<svg viewBox="0 0 100 100"><path d="M22.5,53.5c2.8,0,5.6-0.9,7.8-2.6c2.8,6.7,9.4,11.1,16.8,11.1c7.7,0,14.5-4.8,17.1-11.9c2.5,2.7,6,4.3,9.7,4.3  c7.2,0,13.1-5.9,13.1-13.1c0-5.8-3.8-10.8-9.2-12.5c-0.2-9.1-7.7-16.5-16.9-16.5c-6,0-11.6,3.2-14.6,8.4c-2.8-3.5-7-5.6-11.5-5.6  c-7.1,0-13.2,5.1-14.4,12.1c-6.4,1.1-11.1,6.5-11.1,13.1C9.2,47.6,15.2,53.5,22.5,53.5z M21.3,29.1c0.5,0,0.8-0.4,0.9-0.9  c0.8-6.3,6.2-11.1,12.6-11.1c4.4,0,8.4,2.3,10.8,6c0.2,0.3,0.5,0.5,0.9,0.5s0.7-0.2,0.8-0.6c2.4-5.3,7.7-8.7,13.6-8.7  c8.2,0,14.9,6.7,14.9,14.9l0,0.3c0,0.5,0.3,0.9,0.8,1c5,1.2,8.5,5.7,8.5,10.8c0,6.1-5,11.1-11.1,11.1c-3.7,0-7.2-1.9-9.2-5  c-0.2-0.3-0.6-0.5-1-0.4c-0.4,0.1-0.7,0.4-0.8,0.7C61,55,54.5,60.1,47.1,60.1c-7,0-13.2-4.5-15.4-11.1c-0.1-0.3-0.4-0.6-0.7-0.7  c-0.1,0-0.2,0-0.2,0c-0.2,0-0.5,0.1-0.7,0.3c-2.1,1.9-4.8,2.9-7.6,2.9c-6.2,0-11.2-5-11.2-11.2C11.2,34.5,15.6,29.7,21.3,29.1z"/><path d="M66.9,60.3c-0.1-0.5-0.7-0.9-1.2-0.7c-0.5,0.1-0.8,0.7-0.7,1.2l4.9,18.3c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0  c0.5-0.1,0.8-0.7,0.7-1.2L66.9,60.3z"/><path d="M71.7,82c-0.5,0.1-0.8,0.7-0.7,1.2l1.1,4.3c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0c0.5-0.1,0.8-0.7,0.7-1.2l-1.1-4.3  C72.8,82.2,72.2,81.9,71.7,82z"/><path d="M24,77.6c-0.5,0.1-0.8,0.7-0.7,1.2l2.3,8.7c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0c0.5-0.1,0.8-0.7,0.7-1.2l-2.3-8.7  C25.1,77.7,24.5,77.4,24,77.6z"/><path d="M62.9,77.6c-0.5,0.1-0.8,0.7-0.7,1.2l2.3,8.7c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0c0.5-0.1,0.8-0.7,0.7-1.2l-2.3-8.7  C63.9,77.7,63.4,77.4,62.9,77.6z"/><path d="M30.4,73.9c-0.5,0.1-0.8,0.7-0.7,1.2L33,87.5c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0c0.5-0.1,0.8-0.7,0.7-1.2l-3.3-12.3  C31.5,74.1,30.9,73.8,30.4,73.9z"/><path d="M27.8,60.3c-0.1-0.5-0.7-0.9-1.2-0.7c-0.5,0.1-0.8,0.7-0.7,1.2l2.8,10.5c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0  c0.5-0.1,0.8-0.7,0.7-1.2L27.8,60.3z"/><path d="M46.2,68.3c-0.1-0.5-0.7-0.9-1.2-0.7c-0.5,0.1-0.8,0.7-0.7,1.2l1.1,4.3c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0  c0.5-0.1,0.8-0.7,0.7-1.2L46.2,68.3z"/><path d="M46.5,77l2.8,10.5c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0c0.5-0.1,0.8-0.7,0.7-1.2l-2.8-10.5c-0.1-0.5-0.7-0.9-1.2-0.7  C46.7,76,46.4,76.5,46.5,77z"/><path d="M60.2,63.9c-0.1-0.5-0.7-0.9-1.2-0.7c-0.5,0.1-0.8,0.7-0.7,1.2l2.8,10.5c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0  c0.5-0.1,0.8-0.7,0.7-1.2L60.2,63.9z"/><path d="M20.5,60.8c-0.1-0.5-0.7-0.9-1.2-0.7c-0.5,0.1-0.8,0.7-0.7,1.2l3.6,13.6c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0  c0.5-0.1,0.8-0.7,0.7-1.2L20.5,60.8z"/><path d="M52.4,66.9c-0.5,0.1-0.8,0.7-0.7,1.2l5.2,19.4c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0c0.5-0.1,0.8-0.7,0.7-1.2l-5.2-19.4  C53.5,67.1,53,66.8,52.4,66.9z"/><path d="M81,88.3c0.1,0,0.2,0,0.3,0c0.5-0.1,0.8-0.7,0.7-1.2l-7-26.2c-0.1-0.5-0.7-0.9-1.2-0.7c-0.5,0.1-0.8,0.7-0.7,1.2l7,26.2  C80.2,88,80.6,88.3,81,88.3z"/><path d="M36.5,65c-0.1-0.5-0.7-0.8-1.2-0.7c-0.5,0.1-0.8,0.7-0.7,1.2l5.9,22c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0  c0.5-0.1,0.8-0.7,0.7-1.2L36.5,65z"/></svg>';
      break;
    case 'Snow':
      document.querySelector('.icon').innerHTML = '<svg viewBox="0 0 100 100"><path d="M79.4,29.1c-0.2-9.1-7.7-16.5-16.9-16.5c-6,0-11.6,3.2-14.6,8.4c-2.8-3.5-7-5.6-11.5-5.6c-7.1,0-13.2,5.1-14.4,12.1  c-6.4,1.1-11.1,6.5-11.1,13.1c0,7.3,5.9,13.2,13.2,13.2c2.8,0,5.6-0.9,7.8-2.6c2.8,6.7,9.4,11.1,16.8,11.1c7.7,0,14.5-4.8,17.1-11.9  c2.5,2.7,6,4.3,9.7,4.3c7.2,0,13.1-5.9,13.1-13.1C88.7,35.9,84.9,30.8,79.4,29.1z M75.5,52.8c-3.7,0-7.2-1.9-9.2-5  c-0.2-0.3-0.6-0.5-1-0.4c-0.4,0.1-0.7,0.4-0.8,0.7c-1.8,7.2-8.3,12.3-15.7,12.3c-7,0-13.2-4.5-15.4-11.1c-0.1-0.3-0.4-0.6-0.7-0.7  c-0.1,0-0.2,0-0.3,0c-0.2,0-0.5,0.1-0.7,0.3c-2.1,1.9-4.8,2.9-7.6,2.9c-6.2,0-11.2-5-11.2-11.2c0-5.8,4.3-10.6,10-11.2  c0.5,0,0.8-0.4,0.9-0.9c0.8-6.3,6.2-11.1,12.6-11.1c4.4,0,8.4,2.3,10.8,6c0.2,0.3,0.6,0.5,0.9,0.5c0.4,0,0.7-0.2,0.8-0.6  c2.4-5.3,7.7-8.7,13.6-8.7c8.2,0,14.9,6.7,14.9,14.9l0,0.3c0,0.5,0.3,0.9,0.8,1c5,1.2,8.5,5.7,8.5,10.8  C86.7,47.8,81.7,52.8,75.5,52.8z"/><path d="M75.7,65.5c0-2-1.6-3.6-3.6-3.6s-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6S75.7,67.5,75.7,65.5z M70.5,65.5c0-0.9,0.7-1.6,1.6-1.6  s1.6,0.7,1.6,1.6s-0.7,1.6-1.6,1.6S70.5,66.4,70.5,65.5z"/><path d="M31.9,59.4c-2,0-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6s3.6-1.6,3.6-3.6S33.8,59.4,31.9,59.4z M31.9,64.5c-0.9,0-1.6-0.7-1.6-1.6  s0.7-1.6,1.6-1.6s1.6,0.7,1.6,1.6S32.7,64.5,31.9,64.5z"/><path d="M29.9,82.3c0,2,1.6,3.6,3.6,3.6s3.6-1.6,3.6-3.6s-1.6-3.6-3.6-3.6S29.9,80.3,29.9,82.3z M35,82.3c0,0.9-0.7,1.6-1.6,1.6  s-1.6-0.7-1.6-1.6s0.7-1.6,1.6-1.6S35,81.4,35,82.3z"/><path d="M83.1,80.3c0-2-1.6-3.6-3.6-3.6s-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6S83.1,82.3,83.1,80.3z M77.9,80.3c0-0.9,0.7-1.6,1.6-1.6  s1.6,0.7,1.6,1.6s-0.7,1.6-1.6,1.6S77.9,81.2,77.9,80.3z"/><path d="M67.7,77.7c0-2.7-2.2-4.9-4.9-4.9c-2.7,0-4.9,2.2-4.9,4.9c0,2.7,2.2,4.9,4.9,4.9C65.4,82.6,67.7,80.4,67.7,77.7z M59.8,77.7  c0-1.6,1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9s-1.3,2.9-2.9,2.9S59.8,79.3,59.8,77.7z"/><path d="M27.1,73.7c0-2.7-2.2-4.9-4.9-4.9c-2.7,0-4.9,2.2-4.9,4.9c0,2.7,2.2,4.9,4.9,4.9C24.9,78.7,27.1,76.5,27.1,73.7z M19.3,73.7  c0-1.6,1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9s-1.3,2.9-2.9,2.9S19.3,75.4,19.3,73.7z"/><path d="M50.4,72.1c0-2.7-2.2-4.9-4.9-4.9c-2.7,0-4.9,2.2-4.9,4.9c0,2.7,2.2,4.9,4.9,4.9C48.2,77,50.4,74.8,50.4,72.1z M42.5,72.1  c0-1.6,1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S47.1,75,45.5,75S42.5,73.7,42.5,72.1z"/></svg>';
      break;
    case 'Mist' || 'Haze':
      document.querySelector('.icon').innerHTML = '<svg viewBox="0 0 100 100"><g><path d="M85.23,64.78c-0.092,0.141-0.188,0.278-0.285,0.416c-3.553,4.939-10.438,6.064-15.379,2.512   c-6.514-4.684-15.293-4.684-21.808,0c-3.843,2.764-9.021,2.764-12.864,0c-7.019-5.045-16.581-4.617-23.119,1.035   c-0.801,0.691-0.889,1.9-0.197,2.701s1.9,0.889,2.701,0.197c5.198-4.494,12.801-4.835,18.379-0.823   c5.178,3.724,12.158,3.724,17.336,0c5.18-3.724,12.159-3.724,17.338,0c6.656,4.786,15.936,3.271,20.723-3.388   c0.131-0.184,0.26-0.37,0.383-0.56c0.578-0.886,0.328-2.072-0.559-2.649C86.994,63.644,85.807,63.894,85.23,64.78z"/></g><g><path d="M85.23,45.822c-0.092,0.141-0.188,0.279-0.285,0.416c-3.553,4.94-10.438,6.066-15.379,2.514   c-6.514-4.684-15.293-4.684-21.808,0c-3.843,2.764-9.021,2.764-12.864,0c-7.019-5.046-16.581-4.618-23.119,1.035   c-0.801,0.691-0.889,1.9-0.197,2.7s1.9,0.888,2.701,0.196c5.198-4.494,12.801-4.834,18.379-0.822   c5.178,3.724,12.158,3.724,17.336,0c5.18-3.725,12.159-3.725,17.338,0c6.656,4.786,15.936,3.271,20.723-3.387   c0.131-0.184,0.26-0.371,0.383-0.561c0.578-0.887,0.328-2.072-0.559-2.65C86.994,44.686,85.807,44.938,85.23,45.822z"/></g><g><path d="M85.23,26.865c-0.092,0.141-0.188,0.279-0.285,0.416c-3.553,4.94-10.438,6.066-15.379,2.514   c-6.514-4.686-15.293-4.686-21.808,0c-3.843,2.763-9.021,2.763-12.864,0c-7.019-5.047-16.581-4.617-23.119,1.034   c-0.801,0.692-0.889,1.901-0.197,2.701s1.9,0.888,2.701,0.196c5.198-4.494,12.801-4.834,18.379-0.823   c5.178,3.724,12.158,3.724,17.336,0c5.18-3.724,12.159-3.724,17.338,0c6.656,4.788,15.936,3.271,20.723-3.387   c0.131-0.183,0.26-0.37,0.383-0.56c0.578-0.887,0.328-2.073-0.559-2.65C86.994,25.729,85.807,25.979,85.23,26.865z"/></g></svg>';
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
    document.querySelector('.current-temp').textContent = Math.floor(convertToCelcius(currentTemp)) + '°';
    document.querySelector('.weather-desc').textContent = weatherDesc;
    document.querySelector('.min-temp').textContent = Math.floor(convertToCelcius(minTemp)) + '°';
    document.querySelector('.max-temp').textContent = Math.floor(convertToCelcius(maxTemp)) + '°';
    document.querySelector('.label-1').textContent = 'MIN';
    document.querySelector('.label-2').textContent = 'MAX';
    // Call makeIcons()
    makeIcons(zipcode);
  });
}
