// Formatting date:
function formatDate(date) {
  let dayIndex = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[dayIndex];
  let dateOfMonth = date.getDate();
  let year = date.getFullYear();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return "".concat(day, ", ").concat(month, " ").concat(dateOfMonth, ", ").concat(year, "");
}

// Current Date:
let currentDate = document.querySelector("#date");
var currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

// Current hours:
function formatHour(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let timeSuffix = "AM";

  if (hours >= 12) {
    timeSuffix = "PM";
    hours = hours - 12;
  }

  if (hours === 0) {
    hours = 12;
  }

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const formattedTime = ", " + hours + ":" + minutes + " " + timeSuffix;
  return formattedTime;
}

// Format Sunrise Unix timestamp
function formatSunriseTimestamp(response) {
  let sunriseTime = response.data.sys.sunrise;
  const sunrise = new Date(sunriseTime * 1000);

  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const sunriseTimeString = sunrise.toLocaleTimeString("en-US", options);
  return sunriseTimeString;
}

// Format Sunset Unix timestamp
function formatSunsetTimestamp(response) {
  let sunsetTime = response.data.sys.sunset;
  const sunset = new Date(sunsetTime * 1000);

  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const sunsetTimeString = sunset.toLocaleTimeString("en-US", options);
  return sunsetTimeString;
}

// Weather
function displayWeather(response) {
  let currentHour = response.data.dt * 1000;
  let formattedHour = formatHour(currentHour);
  document.querySelector("#current-hour").textContent = formattedHour;

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let sunriseElement = document.querySelector("#sunrise-time");
  let sunsetElement = document.querySelector("#sunset-time");
  let currentWeatherIcon = document.querySelector("#current-weather-icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = capitalizeFirstLetter(response.data.weather[0].description);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  sunriseElement.innerHTML = formatSunriseTimestamp(response);
  sunsetElement.innerHTML = formatSunsetTimestamp(response);
  currentWeatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`);
  currentWeatherIcon.setAttribute("alt", capitalizeFirstLetter(response.data.weather[0].description));
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Search Engine:
function searchCity(city) {
  var apiKey = "f4d1475cfe015c4c50b2300aa82dd590";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showCitySearched(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCitySearched);

// Temperature unit conversion:
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// Creamos una variable global para que después podamos acceder a ella almacenando el real valor de celsius que nos ofrece la API dentro de displayWeather(response)
let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
