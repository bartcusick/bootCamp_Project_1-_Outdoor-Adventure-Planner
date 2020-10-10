// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=35.1731712&lon=-80.99594239999999",
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
					"x-rapidapi-key": "aa1f2dda11msh22ea2d650da7d5fp193f76jsn94dfb4977b89"
				}
			}
			
			$.ajax(settings).done(function (response) {
				console.log(response);
			});
	
	// Weather Variables
    var APIKey = "304328a5715add3e4e98ab718222d70d";
	var cityName = "Bujumbura";
	var country = "," + "Burundi";
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",Burundi&appid=" + APIKey;
    
    // Weeather Call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Create CODE HERE to Log the queryURL
      console.log('queryURL:', queryURL)
      $('.city').html('<h1>'+ response.name + ' Weather Details</h1>')
      // Create CODE HERE to log the resulting object
      console.log('response:', response)
      // Create CODE HERE to calculate the temperature (converted from Kelvin)
    //   $('.temp').html('<h1>'+ 'wind speed:' + response.wind.speed)
    //   // Create CODE HERE to transfer content to HTML
    //   // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
    //   // Create CODE HERE to dump the temperature content into HTML
    //   $('.wind').html('<h1>'+ 'wind speed:' + response.wind.speed)
    });
	var button = document.getElementById('get_location');
        var get_it = document.getElementById("get_it");
        var latitude = document.getElementById('get_lat');
        var longitude = document.getElementById('get_lon');

        function getLoc() {
            var startLoc;
            var show_location = function() {
                get_it.style.display = "block";
            };
            var hide_location = function() {
                get_it.style.display = "none";
            };
            var getTime_value = setTimeout(show_location, 5000);

            var successMes = function(position) {
                hide_location();
                clearTimeout(getTime_value);
                startLoc = position;
                latitude.innerHTML = startLoc.coords.latitude;
                longitude.innerHTML = startLoc.coords.longitude;
            };

            var geoFail = function(error) {
                switch (error.code) {
                    case error.TIMEOUT:
                        show_location();
                        break;
                }
            };
            navigator.geolocation.getCurrentPosition(successMes, geoFail);
		};
	});
