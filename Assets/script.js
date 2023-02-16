var apiKey = "7bf26e19ed8bc5e82daa1204d19e541e";
var button = document.getElementById('submit');
var cityList = document.getElementById('citySearch')
var jumboName = document.getElementById('name');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var icon = document.getElementById('icon')

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
  latLon(cityName);
  // var coordinatesUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  // fetch(coordinatesUrl)
  //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (data) {
      //     console.log(data);
      //     var lat = data.coord.lat;
      //     var lon = data.coord.lon;
      //     jumboDate(data);
      //    weatherApi(lat,lon,apiKey);
      //   })
      //   .catch(function(error){
        //       console.log("error message below")
        //       console.log(error);
        //   });
      }
      function latLon (cityName) {
        var coordinatesUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
      fetch(coordinatesUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var lat = data.coord.lat;
          var lon = data.coord.lon
          var name1 = data.name;
          jumboDate(data, name1);
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
    weatherCards(data.list);
  })
  .catch(function(error){
    console.log(error);
  })
}

function jumboDate (data, name1) {
  var currentDay = dayjs();
  console.log(currentDay.$d);
  var format = dayjs(currentDay.$d).format("M/D/YYYY")
  console.log(format);
  jumboName.textContent = `${name1} (${format})`;
  icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  temp.textContent = `Temp: ${data.main.temp} F`;
  wind.textContent = `Wind: ${data.wind.speed} MPH`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`

}

function weatherCards(data) {
  document.getElementById('cards').innerHTML=" ";
  for (let i = 0; i < data.length; i++) {
    if (data[i].dt_txt.includes("03:00:00")){
      var date = dayjs(data[i].dt_txt).format("M/D/YYYY");
      var card = `<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
      <div class="card-header"><h6>${date}</h6></div>
      <div class="card-body">
       <img src="https://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png">
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
function previous (event) {
  var el = event.target;
  console.log(el.value);
  latLon(el.value);
}

button.addEventListener("click", submit);
cityList.addEventListener('click', previous)