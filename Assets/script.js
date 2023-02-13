var apiKey = "7bf26e19ed8bc5e82daa1204d19e541e";
var button = document.getElementById('submit');
var cityList = document.getElementById('citySearch')
var jumboName = document.getElementById('name');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');

function submit (event) {
  event.preventDefault();
  coordinates();
}


function coordinates() {
  var cityName = document.getElementById("city-input").value;
  console.log(cityName);
  var citySearch = document.createElement('button');
  citySearch.value = cityName;
  citySearch.textContent = cityName;

  localStorage.setItem('city', cityName);
  cityList.append(citySearch);
  var coordinatesUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  fetch(coordinatesUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data.coord.lat;
      var lon = data.coord.lon;
     weatherApi(lat,lon,apiKey);
    })
    .catch(function(error){
        console.log("error message below")
        console.log(error);
    });
}


function weatherApi (a,b,c) {
  var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${a}&lon=${b}&appid=${c}&units=imperial`;
  fetch (weatherUrl)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
    jumboDate();
    weatherCards(data.list);
  })
  .catch(function(error){
    console.log(error);
  })
}

function jumboDate () {
  var city = localStorage.getItem('city');
  var currentDay = dayjs();
  console.log(currentDay.$d);
  var format = dayjs(currentDay.$d).format("M/D/YYYY")
  console.log(format);
  jumboName.textContent = `${city} (${format})`

}

function weatherCards(data) {
  document.getElementById('cards').innerHTML=" ";
  for (let i = 0; i < data.length; i++) {
    if (data[i].dt_txt.includes("03:00:00")){
      var date = dayjs(data[i].dt_txt).format("M/D/YYYY");
      var card = `<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
      <div class="card-header"><h6>${date}</h6></div>
      <div class="card-body">
       <img src="http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png">
        <h5 class="card-title">Temp: ${data[i].main.temp} F</h5>
        <h5 class="card-title">Humidity: ${data[i].main.humidity} %</h5>
        <h5 class="card-title">Wind: ${data[i].wind.speed} MPH</h5>
        <p class="card-text"></p>
      </div>
    </div>`;
    document.getElementById('cards').innerHTML+=card;
    }
  }
}


button.addEventListener("click", submit);