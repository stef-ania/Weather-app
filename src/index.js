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

  let hours = date.getHours();
  if (hours < 10) {
    hours = "0".concat(hours);
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  return ""
    .concat(day, ", ")
    .concat(month, " ")
    .concat(dateOfMonth, ", ")
    .concat(year, " - h")
    .concat(hours, ":")
    .concat(minutes);
}

// Current Date:
let currentDate = document.querySelector("#date");
var currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

// Weather
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
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
