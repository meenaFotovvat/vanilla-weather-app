function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let today = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${days[today]} ${hours}:${minutes}`;
}

function displayWeatherInfo(response) {
  let tempElement = document.querySelector("#temp-value");
  let userSearchedElement = document.querySelector("#user-searched");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  centigradeValue = Math.round(response.data.temperature.current);
  tempElement.innerHTML = centigradeValue;
  userSearchedElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = "a04fbba2a8fa1f08939o6f7002ft58e8";
  let baseURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(baseURL).then(displayWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function convertToFahrenheit(event) {
  event.preventDefault();

  centigradeLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = Math.round((centigradeValue * 9) / 5 + 32);
  let tempValue = document.querySelector("#temp-value");
  tempValue.innerHTML = fahrenheitTemp;
}

function convertTocentigrade(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  centigradeLink.classList.add("active");
  let tempValue = document.querySelector("#temp-value");
  tempValue.innerHTML = centigradeValue;
}

function dispalyForecastSection() {
  let forecastElement = document.querySelector("#forecast");
  let forecastContent = "";
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach((item) => {
    forecastContent =
      forecastContent +
      `<div>
        <div>${item}</div>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII="
              alt=""
              id="icon"
            /><span></span>
    <div><span class="weather-forecast-temp-max">18°</span> <span class="weather-forecast-temp-min">12°</span></div></div>`;
  });
  console.log(forecastContent);
  forecastElement.innerHTML = forecastContent;
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let centigradeValue = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let centigradeLink = document.querySelector("#centigrade-link");
centigradeLink.addEventListener("click", convertTocentigrade);

search("Mashhad");
dispalyForecastSection();
