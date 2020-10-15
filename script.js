var results = 8
var radius = 50


var locale = function (callback) {
	navigator.geolocation.getCurrentPosition(function (position) {
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		callback(lat, lon);
	}, function (error) {
		showError(error);
		callback();
	});
};

var getPosition = function () {
	locale(function (lat, lon) {
	
		var trailUrl = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?page=3&per_page= " + results + "&radius=" + radius + "&lat=" + lat + "&lon=" + lon

		$.ajax({
				async: true,
				crossDomain: true,
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
					console.log('name :', data.name, ' ID: ', data.id);
				});
			});
	});
};
