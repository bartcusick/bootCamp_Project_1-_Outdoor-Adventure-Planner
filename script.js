var results = 10
var radius = 25

//get page IDs
var frontPageEl = $('#frontPage');
var trailsPageEl = $('#trailsPage');


var trailsListEl = $('.trails-list')
var imageDivEl = $('.image-div');


loadSplashPage()

function loadSplashPage() {
	frontPageEl.removeClass('hide');
}

function loadTrialInfo() {
	frontPageEl.addClass('hide');
	trailsPageEl.removeClass('hide');
	imageDivEl.addClass('hide')
}


locale = function (callback) {
	navigator.geolocation.getCurrentPosition(
		function (position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			callback(lat, lon);

			// getWeather(lat, lon);
		},
		function (error) {
			showError(error);
			callback();		
		
		}
	);
};

var getTrails = function () {

	locale(function (lat, lon) {

		setTimeout(function () {loadTrialInfo();}, 2000);

		var trailUrl = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?page=3&per_page= " + results + "&radius=" + radius + "&lat=" + lat + "&lon=" + lon

		$.ajax({
				url: trailUrl,
				headers: {
					'x-rapidapi-host': 'trailapi-trailapi.p.rapidapi.com',
					'x-rapidapi-key': 'aa1f2dda11msh22ea2d650da7d5fp193f76jsn94dfb4977b89',
				},
				method: 'GET',
			})

			.then(function (response) {
				var results = response.data;

				results.forEach((data) => {

					var trailName = $('<div>').text(data.name).attr('trail-id', data.id).addClass('info');
					trailsListEl.append(trailName);
					$(".trailsListEl").text(data.name)
				});

				$('.info').click(function () {
					var trailID = $(this).attr('trail-id');
					trailInfo(trailID)
				})
			});
	});
};


var trailInfo = function (trailID) {

	var trailInfo = "https://rapidapi.p.rapidapi.com/trails/" + trailID
	$.ajax({
			url: trailInfo,
			headers: {
				'x-rapidapi-host': 'trailapi-trailapi.p.rapidapi.com',
				'x-rapidapi-key': 'aa1f2dda11msh22ea2d650da7d5fp193f76jsn94dfb4977b89',
			},
			method: 'GET',
		})
		.then(function (response) {
			var results = response.data;


			results.forEach((data) => {
				$(".trail-name").text(data.name)
				$(".trail-name").addClass('title is-4')
				$(".description").html("<span class=has-text-weight-bold>Trail Description:</span>  " + data.description)

				//check to see if lenght is null
				if (data.length != 0) {
					$(".length").html("<br><span class=has-text-weight-bold>Trail Length:</span>  " + data.length + " miles");
				} else {
					$(".length").html("<br><span class=has-text-weight-bold>Trail Length:</span> <i>not available</i> ");
				}

				//check to see if rating is null
				if (data.rating != 0) {
					$(".rating").html("<br><span class=has-text-weight-bold>Rating:</span>  " + data.rating);
				} else {
					$(".rating").html("<br><span class=has-text-weight-bold>Rating:</span> <i>not available</i><br>");
				}

				$(".more-info").html("<br><span class=has-text-weight-bold>Detailed Info:</span> <a href='" + data.url + "' target=_blank>Click to find out more about this trail.</a>")

				//check to see if thumbnail is null
				if (data.thumbnail != null) {

					$(".image-div").attr('src', data.thumbnail)
					$(".image-div").height(300).width(300);
					$(".image-div").addClass('pt-3')
					$(".image-div").addClass('show')
				} else {
					var imgUrl = "./assets/default.png"
					$(".image-div").attr('src', imgUrl)
					$(".image-div").height(300).width(300);
					$(".image-div").addClass('pt-3')
					$(".image-div").addClass('show')
				}
			});
		});
}

// Weather Variables
var APIKey = "304328a5715add3e4e98ab718222d70d";

// Weather api call

function getWeather(lat, lon) {
	var queryURL =
		"https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=" + // { part } +
		"&appid=" +
		APIKey;
	$.ajax({
		url: queryURL,
		method: "GET",
	}).then(function (response) {
		//Log the queryURL
		console.log("queryURL:", queryURL);

		var weatherInfo = $("#weatherInfo");
		weatherInfo.append(weather);
		var uvi = $("<li>").text(response.current.uvi);
		weatherInfo.append(uvi);

		$("#weather").text("today's weather: " + response.current.weather[0].main);
		$("#uvi").html("Today's UVI:" + response.current.uvi);
		$("#temp").text("today's temperature in kelvin: " + response.current.temp);
		$("#humidity").text("today's humdity percentage: " + response.current.humidity);
		// log the resulting object
		console.log("weather response:", response);
	});
}