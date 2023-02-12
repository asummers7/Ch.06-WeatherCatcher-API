var apiKey = "7bf26e19ed8bc5e82daa1204d19e541e";
var button = document.getElementById('submit');
var cityList = document.getElementById('citySearch')

function submit (event) {
  event.preventDefault();
  coordinates();
  weatherApi();
}


function coordinates() {
  var cityName = document.getElementById("city-input").value;
  console.log(cityName);
  var citySearch = document.createElement('button');
  citySearch.value = cityName;
  citySearch.textContent = cityName;
  localStorage.setItem('city', cityName);
  cityList.append(citySearch);
  var coordinatesUrl =`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=2&appid=7bf26e19ed8bc5e82daa1204d19e541e`;
  fetch(coordinatesUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat);
      console.log(lon);
     localStorage.setItem("lat", lat);
     localStorage.setItem("lon", lon);
    })
    .catch(function(error){
        console.log("error message below")
        console.log(error);
    });
}

function weatherApi () {
  var lat = localStorage.getItem('lat');
  console.log(lat);
  var lon = localStorage.getItem('lon');
  console.log(lon);
  var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch (weatherUrl)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
  })
  .catch(function(error){
    console.log(error);
  })
}

button.addEventListener("click", submit);