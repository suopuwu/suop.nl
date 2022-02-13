const API_KEY = 'ce15dc2767c60126d92a5533a2264b18';
var searchTimer;

function dayParser(day) {
  var returnValue;
  switch (day % 6) {
    case 0:
      returnValue = 'Sunday';
      break;
    case 1:

      returnValue = 'Monday';
      break;
    case 2:
      returnValue = 'Tuesday';

      break;
    case 3:
      returnValue = 'Wednesday';

      break;
    case 4:
      returnValue = 'Thursday';

      break;
    case 5:
      returnValue = 'Friday';

      break;
    case 6:
      returnValue = 'Saturday';

      break;
  }
  return returnValue;
}

function getWeather(city, callback) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`)
    .then(res => res.json())
    .then(function (json) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${json[0].lat}&lon=${json[0].lon}&units=imperial&appid=${API_KEY}`)
        .then(res => res.json())
        .then(function (json) {
          callback(json);
        });
    });
}

function createWeatherCard(data, time) {
  return `
  <span class="weather-tile rounded-card">
    <span class="temperature">${data.temp}</span>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
    <span class="feels-like">${data.feels_like}</span>
    <span class="wind"><i class="material-icons">air</i>${data.wind_speed}mph</span>
    <span class="time">${time}</span>
  </span>
  `;
}

function createWeatherCardDay(data, time) {
  return `
  <span class="weather-tile rounded-card">
    <span class="temperature">${data.temp.day}</span>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
    <span class="feels-like">${data.feels_like.day}</span>
    <span class="wind"><i class="material-icons">air</i>${data.wind_speed}mph</span>
    <span class="time">${time}</span>
  </span>
  `;
}

$('.city-text-box').on('keydown', function (e) {
  var element = $(this)[0];
  if (e.which === 13) { //enter
    e.preventDefault();
  }
  clearTimeout(searchTimer);
  searchTimer = setTimeout(function () {
    getWeather(element.innerHTML, (json) => {
      console.log(json);
      $('.weather-display').empty()
        .append(createWeatherCard(json.current, "Today"));
      $('.hour-display').empty();
      $('.day-display').empty();
      $('h3').css('display', 'block');
      for (let i = 1; i <= 3; i++) {
        $('.hour-display').append(createWeatherCard(json.hourly[i], i + " Hour"));
      }
      for (let i = 0; i < 5; i++) {
        var temp = new Date();
        console.log((temp.getDay() + i) % 6);
        $('.day-display').append(createWeatherCardDay(json.daily[i], dayParser(temp.getDay() + i)));

      }
    });
  }, 500);
});