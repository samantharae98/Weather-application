let rightNow = document.querySelector(".current-time");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

rightNow.innerHTML = `${days[dayIndex]} ${hours}:${minutes}`;

//Weather API
//city search
function weatherResult(response) {
  console.log(response.data);
  document.querySelector(".current-city").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(".humidity-value").innerHTML =
    response.data.main.humidity;

  document.querySelector(".windspeed-value").innerHTML =
    response.data.wind.speed;

  document.querySelector(".current-weather").innerHTML =
    response.data.weather[0].description;
}

function search(event) {
  let searchInput = document.querySelector(".form-control");
  let cityName = document.querySelector(".current-city");
  event.preventDefault();
  cityName.innerHTML = searchInput.value;
  let apiKey = `53a5399d05cd6183c0c1185c64d7a560`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(weatherResult);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  let temperatureToday = document.querySelector(".current-temp");
  temperatureToday.innerHTML = `${temperature}`;

  let cityName = document.querySelector(".current-city");
  cityName.innerHTML = response.data.name;
}

let searchForm = document.querySelector("#searching");
searchForm.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
fahrenheitLink.addEventListener("click", convertToCelsius);

//Current location display

function currentTemp(response) {
  console.log(response.data);

  let currentTemp = Math.round(response.data.main.temp);

  let currentHeading = document.querySelector(".current-temp");
  currentHeading.innerHTML = `${currentTemp}`;

  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = response.data.name;

  let currentDescription = document.querySelector(".current-weather");
  currentDescription.innerHTML = response.data.weather[0].description;

  let currentHumidity = document.querySelector(".humidity-value");
  currentHumidity.innerHTML = response.data.main.humidity;

  let currentWindspeed = document.querySelector(".windspeed-value");
  currentWindspeed.innerHTML = response.data.wind.speed;
}

function currentLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=836945bb1ae780c68d086d693cfcb666&units=imperial`;

  axios.get(apiCurrentUrl).then(currentTemp);
}

navigator.geolocation.getCurrentPosition(currentLocation);
