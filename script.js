var results = 8;
var radius = 50;

var locale = function (callback) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      callback(lat, lon);
    getWeather(lat,lon);
    },
    function (error) {
      showError(error);
      callback();
    }
  );
};

var getPosition = function () {
  locale(function (lat, lon) {
    var trailUrl =
      "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?page=3&per_page= " +
      results +
      "&radius=" +
      radius +
      "&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      async: true,
      crossDomain: true,
      url: trailUrl,
      headers: {
        "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
        "x-rapidapi-key": "aa1f2dda11msh22ea2d650da7d5fp193f76jsn94dfb4977b89",
      },
      method: "GET",
    })
    .then(function (response) {
      var results = response.data;

      results.forEach((data) => {
        console.log("name :", data.name, " ID: ", data.id);
      });
    });
  });
};

// Weather Variables
var APIKey = "304328a5715add3e4e98ab718222d70d";

// Weather api call

function getWeather(lat, lon) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=" +
    // { part } +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //Log the queryURL
    console.log("queryURL:", queryURL);
    
    // var weatherInfo = $("#weatherInfo");
    // weatherInfo.append(weather);
    // var uvi = $("<li>").text(response.current.uvi);
    // weatherInfo.append(uvi);
        $("#weather").text("today's weather: " + response.current.weather[0].main);
      $("#uvi").html("Today's UVI:" + response.current.uvi);
      $("#temp").text("today's temperature in kelvin: " + response.current.temp);
      $("#humidity").text("today's humdity percentage: " + response.current.humidity);
    // log the resulting object
    console.log("weather response:", response);
  });
}
