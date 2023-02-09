var apiKey = "7bf26e19ed8bc5e82daa1204d19e541e";
var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`;
var coordinatesUrl =
  "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=7bf26e19ed8bc5e82daa1204d19e541e";
var button = document.getElementById('submit');

function getApi() {
  fetch(coordinatesUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function(error){
        console.log("error message below")
        console.log(error);
    });
}

button.addEventListener("click", getApi);
