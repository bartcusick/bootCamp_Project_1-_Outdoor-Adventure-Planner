var results = 8
var radius = 25
var trailsListEl = $('.trails-list');
var trailsInfoEl = $('.trails-info');


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


var getTrails = function () {

	locale(function (lat, lon) {

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
				console.log(response)
				var results = response.data;

				results.forEach((data) => {
					// console.log('name :', data.name, ' ID: ', data.id);

					var trailName = $('<div>')
						.text(data.name)


					var trailInfoButton = $('<button>')
						.text('more info')
						.attr('trail-id', data.id)
						.addClass('info');

					trailsListEl.append(trailName, trailInfoButton);


				});

				$('.info').click(function () {
					$( ".trail-info" ).empty();
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
			// console.log(response)
			var results = response.data;

			results.forEach((data) => {
				// console.log('name :', data.name, ' ID: ', data.id);

				var trailName = $('<div>').text(data.description)
				.addClass('trail-info');
				trailsInfoEl.append(trailName);


			});

		});




}
