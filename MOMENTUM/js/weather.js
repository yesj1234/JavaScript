"use strict";

const API_KEY = "c52264dc075d7cdbd1d4c81b341836da";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;
  const weather = document.querySelector("#weather span:first-child");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weather.innerText = `${data.name},${data.sys.country} : ${data.weather[0].main}`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
