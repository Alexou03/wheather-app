function formatDate(dates) {
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];
  return `${day}  ${date} ${month} ${year} , ${hours}:${minutes}`;
}

let now = new Date();
let currentTime = document.querySelector("#time");

currentTime.innerHTML = formatDate(currentTime);

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let apiKey = "5779b9efe682cbd7772ff1fe36bcdf5f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  let h1 = document.querySelector("#city-input");
  h1.innerHTML = `${searchInput.value}`;
  fetch(apiUrl)
    .then((r) => r.json())
    .then(showTemperature);
}

let form = document.querySelector("#form");

form.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log("res", response);
  if (response.cod < 200 || response.cod >= 300) {
    alert("No city found");
  } else {
    let cityEl = document.getElementById("city");
    let tempEl = document.getElementById("temp");
    cityEl.innerText = response.name;
    let temperature = Math.round(response.main.temp);
    tempEl.innerText = temperature;
  }
}

function showCurrentLocationTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let currentLocationTemperature = document.querySelector("#temperature");
  let currentLocation = document.querySelector("#city");
  currentLocationTemperature.innerHTML = temp;
  currentLocation.innerHTML = response.data.name;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5779b9efe682cbd7772ff1fe36bcdf5f";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiLocationUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  fetch(apiLocationUrl)
    .then((r) => r.json())
    .then(showCurrentLocationTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#btn-current");
button.addEventListener("click", getCurrentPosition);
