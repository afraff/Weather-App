const loc = document.getElementById("location");
const temNum = document.getElementById("temperature-num");
const temScale = document.getElementById("temperature-scale");
const weatherCon = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    loc.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getWeather(lat, long) {
  const api = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${api}lat=${lat}&lon=${long}`, { method: "get" })
    .then(resp => resp.json())
    .then(data => {
      updateDataToUI(data.name, data.weather, data.main.temp);
    })
    .catch(function(err) {
      console.error(err);
    });
}

// update the data from API to DOM
function updateDataToUI(location, weather, temp) {
  weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
  weatherCon.innerHTML = weather[0].main;
  loc.innerHTML = location;
  temNum.innerHTML = `${temp}`;
}

window.onload = function() {
  getLocation();
};

function toFahrenheit(celsius) {
  return celsius * 1.8 + 32;
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) / 1.8;
}

function toggleScale() {
  if (temScale.innerHTML === "C") {
    temNum.innerHTML = toFahrenheit(temNum.innerHTML).toFixed(2);
    temScale.innerHTML = "F";
  } else if (temScale.innerHTML === "F") {
    temNum.innerHTML = toCelsius(temNum.innerHTML).toFixed(2);
    temScale.innerHTML = "C";
  }
}

temScale.addEventListener("click", toggleScale);
