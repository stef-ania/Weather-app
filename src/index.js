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
    hour: "2-digit",
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
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const sunsetTimeString = sunset.toLocaleTimeString("en-US", options);
  return sunsetTimeString;
}

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// HTML for Forecast section
function displayForecast(response) {
  let forecastArray = response.data.daily;

  let forecastElement = document.querySelector("#daily-forecast");

  let forecastHTML = "";

  forecastArray.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
              <div class="weather-forecast">
                <div class="forecast-time">${formatDayForecast(forecastDay.dt)}</div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                alt=""
                width="48"
                />
                
                <div class="forecast-temperature">
                  <span class="forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span><span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
              </div>
            </div>
    `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

// Forecast prediction

function getForecast(coordinates) {
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
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

  getForecast(response.data.coord);
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Search Engine:
function searchCity(city) {
  let apiKey = "f4d1475cfe015c4c50b2300aa82dd590";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

function showCitySearched(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCitySearched);

// Creamos una variable global para que después podamos acceder a ella almacenando el real valor de celsius que nos ofrece la API dentro de displayWeather(response)
let celsiusTemperature = null;

// Set up a default city
searchCity("Florence");
