var results = 7;
var radius = 25;
var progressBar = 0;

var frontPageEl = $("#frontPage");
var trailsPageEl = $("#trailsPage");
var progressBarEl = $("#myProgress");

var placeholder = $(".placeholder");

var trailsListEl = $(".trails-list");
var imageDivEl = $(".image-div");
var trailNameEl = $(".trail-name");
var weatherEl = $("#weatherInfo");
var ratingsEl = $(".rating");


var footerEl = $('.footer')

// Weather Variables
var APIKey = "304328a5715add3e4e98ab718222d70d";

loadSplashPage()

function loadSplashPage() {
	frontPageEl.removeClass('hide');
	footerEl.removeClass('hide');
	$("#modal-pic").removeClass("is-active");
}

function loadTrialInfo() {
  frontPageEl.addClass("hide");
  trailsPageEl.removeClass("hide");
  imageDivEl.addClass("hide");
  trailNameEl.addClass("hide");
}

locale = function (callback) {

	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 11,
		center: {
			lat: 35.787743,
			lng: -78.644257
		},
	});
	var geocoder = new google.maps.Geocoder();
	var address = document.getElementById("address").value;

	geocoder.geocode({
		address: address
	}, (results, status) => {
		if (status === "OK") {
		
			var lat = results[0].geometry.location.lat()
			var lon = results[0].geometry.location.lng()
			var address = results[0].formatted_address.slice(0,-5)

			// add city and state to progress bar
			var trailName = $('<div>').text('Please wait while we search for trails in ' + address).addClass('py-3');;
			progressBarEl.append(trailName);

			callback(lat, lon);
			progressBarEl.removeClass('hide');
			loadingBar()
			getWeather(lat, lon);
		} else {
			//add alert modal if a city and state have not been entered
			$("#modal-geocode").addClass("is-active"); 
		}
	});

}


function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: {
      lat: 35.787743,
      lng: -78.644257,
    },
  });
  var geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener(
    "click",
    () => {
      geocodeAddress(geocoder, map);
      getTrails();
    },
    { once: true }
  );
}

function geocodeAddress(geocoder, resultsMap) {

	var address = document.getElementById("address").value;

	geocoder.geocode({
		address: address
	}, (results, status) => {
		if (status === "OK") {
			resultsMap.setCenter(results[0].geometry.location);
			new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location,

			});
		} else {
		}
	});
}

var getTrails = function () {

	locale(function (lat, lon) {

		setTimeout(function () {loadTrialInfo();}, 4000);

		var trailUrl = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?&per_page= " + results + "&radius=" + radius + "&lat=" + lat + "&lon=" + lon

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

					//get list of trails
					var trailName = $('<div>').text(data.name).attr('trail-id', data.id).addClass('info');
					trailsListEl.append(trailName);
					$(".trailsListEl").text(data.name)
				});

				//add placeholder image
				$(".placeholder").html("<div class=has-text-centered id=location>Select Trail to View Info</div><img src='./assets/birdBikeMap.png' alt='Bird with Map'> ");
	
				//show trail info on click
				$('.info').click(function () {
					var trailID = $(this).attr('trail-id');
					trailInfo(trailID)
					weatherEl.removeClass('hide');
				})
			});
	});
};

var trailInfo = function (trailID) {
  var trailInfo = "https://rapidapi.p.rapidapi.com/trails/" + trailID;
  $.ajax({
    url: trailInfo,
    headers: {
      "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
      "x-rapidapi-key": "aa1f2dda11msh22ea2d650da7d5fp193f76jsn94dfb4977b89",
    },
    method: "GET",
  }).then(function (response) {
    var results = response.data;
    console.log("results:", results);

    results.forEach((data) => {
      placeholder.addClass("hide");
      trailNameEl.removeClass("hide");

      $(".weatherBtn1").removeClass("hide");
      $(".weatherBtn2").removeClass("hide");
      $(".weatherBtn3").removeClass("hide");
      $(".weatherBtn4").removeClass("hide");

      $(".trail-name").text(data.name);
      $(".trail-name").addClass("title is-4");
      $(".description").html(
        "<span class=has-text-weight-bold>Trail Description:</span>  " +
          data.description
      );
      $(".directions").html(
        "<span class=has-text-weight-bold>Trail Directions:</span>  " +
          data.description
      );
      //check to see if length is null
      if (data.length != 0) {
        $(".length").html(
          "<br><span class=has-text-weight-bold>Trail Length:</span>  " +
            data.length +
            " miles"
        );
      } else {
        $(".length").html(
          "<br><span class=has-text-weight-bold>Trail Length:</span> <i>not available</i> "
        );
      }
      var roundRating = (Math.round(data.rating * 2) / 2).toFixed(1);
      console.log("original roundRating:", roundRating);
      //check to see if rating is null
      if (roundRating != 0) {
        console.log("if statement roundRating:", roundRating);
        $(function () {
          function addScore(roundRating, $domElement) {
            $(".rating").html(
              "<br><span class=has-text-weight-bold>Rating: </span>"
            );
            starRating = roundRating * 20;
            console.log("starRating:", starRating);
            $("<span class='stars-container'>")
              .addClass("stars-" + starRating.toString())
              .text("★★★★★")
              .appendTo($domElement);
          }
          console.log("in function roundRating:", roundRating);
          addScore(roundRating, $(".rating"));
        });
        // $(".rating").html("<br><span class=has-text-weight-bold>Rating:</span>  " +  roundRating);
        // $(".rating").addClass("stars-" + roundRating.toString());
      } else {
        $(".rating").html(
          "<br><span class=has-text-weight-bold>Rating:</span> <i>not available</i><br>"
        );
      }

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
				//show placeholder image and trailElement
				placeholder.addClass('hide')
				trailNameEl.removeClass('hide')

				//show weather buttons
				$(".weatherBtn1").removeClass('hide')
				$(".weatherBtn2").removeClass('hide')
				$(".weatherBtn3").removeClass('hide')
				$(".weatherBtn4").removeClass('hide')


				$(".trail-name").text(data.name)
				$(".trail-name").addClass('title is-4')
				$(".description").html("<span class=has-text-weight-bold>Trail Description:</span>  " + data.description)

				//check to see if lenght is null
				if (data.length != 0) {
					$(".length").html("<br><span class=has-text-weight-bold>Trail Length:</span>  " + data.length + " miles");
				} else {
					$(".length").html("<br><span class=has-text-weight-bold>Trail Length:</span> <i>not available</i> ");
				}
				
				var roundRating = (Math.round(data.rating * 2) / 2).toFixed(1);
				console.log("original roundRating:", roundRating);
				//check to see if rating is null
				if (roundRating != 0) {
				  console.log("if statement roundRating:", roundRating);
				  $(function () {
					function addScore(roundRating, $domElement) {
					  $(".rating").html(
						"<br><span class=has-text-weight-bold>Rating: </span>"
					  );
					  starRating = roundRating * 20;
					  console.log("starRating:", starRating);
					  $("<span class='stars-container'>")
						.addClass("stars-" + starRating.toString())
						.text("★★★★★")
						.appendTo($domElement);
					}
					console.log("in function roundRating:", roundRating);
					addScore(roundRating, $(".rating"));
				  });
				} else {
				  $(".rating").html(
					"<br><span class=has-text-weight-bold>Rating:</span> <i>not available</i><br>"
				  );
				}

				//more info URL
				$(".more-info").html("<br><span class=has-text-weight-bold>Detailed Info:</span> <a href='" + data.url + "' target=_blank>Click to find out more about this trail.</a>")

				//check to see if thumbnail is null
				if (data.thumbnail != null) {
					$(".image-div").attr('src', data.thumbnail)
					$(".image-div").height(300).width(300);
					$(".image-div").addClass('pt-3')
					$(".image-div").addClass('show')
					$(".image-div").addClass('round')
				} else {
					var imgUrl = "./assets/image_PlaceHolder.png"
					$(".image-div").attr('src', imgUrl)
					$(".image-div").height(300).width(300);
					$(".image-div").addClass('pt-3')
					$(".image-div").addClass('show')
					$(".image-div").addClass('round')
				}
			});			
		});
}


// Weather api call
function getWeather(lat, lon) {
	var queryURL =
		"https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=" + // { part } +
		"&appid=" +
		APIKey;
	$.ajax({
		url: queryURL,
		method: "GET",
	}).then(function (response) {
		console.log("queryURL:", queryURL);
		var iconID = response.current.weather[0].id;
		var iconCode = response.current.weather[0].icon;
		var iconURL= 'http://openweathermap.org/img/w/' + iconCode + '.png';
		var weatherAltTag = response.current.weather[0].main;

		console.log('iconURL:', iconURL)

		
		$("#weather").html('<img id = weatherIcon" src=' + iconURL + ' alt="' + weatherAltTag + '" height=20px width=20px>' );

		$("#uvi").html("UVI: " + response.current.uvi);
		$("#temp").html(response.current.temp + "°");
		$("#humidity").html("Humidity: " + response.current.humidity + "%");
	});
}


// Progress bar load
function loadingBar() {
  if (progressBar == 0) {
    progressBar = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 40);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        progressBar = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

// Modal Functions
$(".modal-close").click(function() {
	$(".modal-geocode").removeClass("is-active");
	location.reload();
 });
 
 $("#closebtn").click(function() {
	$(".modal-geocode").removeClass("is-active");
	location.reload();
 });

 $("#accept").click(function () {
   $(".modal-geocode").removeClass("is-active");
	location.reload();
	   });
