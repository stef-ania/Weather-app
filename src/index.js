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
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#sunrise-time").innerHTML = formatSunriseTimestamp(response);
  document.querySelector("#sunset-time").innerHTML = formatSunsetTimestamp(response);
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

function convertToCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#temperature");
  celsiusTemperature.innerHTML = 22;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#temperature");
  fahrenheitTemperature.innerHTML = 78;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
