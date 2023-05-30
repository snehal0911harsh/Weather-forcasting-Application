// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherAPI = {
  key: "360914319ad5b025f0fc900a6f800d20",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

//Even listener function to check the event of the keypress

const searchbox = document.getElementById('input-box');
searchbox.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    console.log(searchbox.value);
    getweatherdetails(searchbox.value);
    document.querySelector('.weather-details').style.display = "block";
  }
});

//Function for getting the weather details from the API
function getweatherdetails(city) {
  fetch(`${weatherAPI.baseUrl}?q=${city}&appid=${weatherAPI.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    }).then(showweatherdetails);
}

//Function for showing the weather report
function showweatherdetails(weather) {
  console.log(weather);

  let city = document.getElementById('city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temperature = document.getElementById('temp');
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minmaxtemp = document.getElementById('min-max');
  minmaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

  let weathertype = document.getElementById('weather');
  weathertype.innerText = `${weather.weather[0].main}`;

  let date = document.getElementById('date');
  let todaydate = new Date();
  date.innerText = datemanage(todaydate);

  if(weathertype.textContent == 'Clear') {
    document.body.style.backgroundImage = "url('images/clear.jpg')";
    
  } else if(weathertype.textContent == 'Clouds') {

    document.body.style.backgroundImage = "url('images/cloud.jpg')";
    
  } else if(weathertype.textContent == 'Haze') {

    document.body.style.backgroundImage = "url('images/haze.jpg')";
    
  } else if(weathertype.textContent == 'Rain') {
    
    document.body.style.backgroundImage = "url('images/rain.jpg')";
    
  } else if(weathertype.textContent == 'Snow') {
    
    document.body.style.backgroundImage = "url('images/snow.jpg')";

  } else if(weathertype.textContent == 'Thunderstorm') {

    document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    
  } else if(weathertype.textContent == 'Fog') {

    document.body.style.backgroundImage = "url('images/fog.jpg')";
    
  }
}

//Function for date and day management
function datemanage(datearg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  let year = datearg.getFullYear();
  let month = months[datearg.getMonth()];
  let date = datearg.getDate();
  let day = days[datearg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
