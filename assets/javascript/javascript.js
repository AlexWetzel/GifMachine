//Take user inputs as a search term
function addButton(topic) {
	$("#buttons").append('<button class="topic-button btn btn-primary" topic="' + topic + '">' + topic + '</button>');
}

//Function that sends a request to the giphy API
function APIrequest(search) {	
	$("#gifs").empty();
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cb04bd6c938f44708d8dd7cbbefb25ad&q=" + search + "&limit=10&offset=0&lang=en";

	$.ajax({
		url: queryURL, 
		method: "GET"
	}).done(function(response){

		var result = response.data

		//This will display 10 gifs with their ratings
		for (var i = 0; i < 10; i++) {

			var animate = result[i].images.fixed_height.url;
			var still = result[i].images.fixed_height_still.url;
			var rating = result[i].rating;

			var gifDiv = $("<div>").addClass("gif-div");
			var gifImg = $("<img>");
			var p = $("<p>");

			p.html("rating: " + rating);
			gifImg.attr("src", still).attr("still", still).attr("animate", animate).attr("state", "still");

			gifDiv.append(gifImg).append(p);
			$("#gifs").prepend(gifDiv);
		}
	});
}
//Declare an array of pre-defined buttons
var topics = ["cat", "dog", "ferret", "raccoon", "sloth"];

//A button is made for each topic
for (var i = 0; i < topics.length; i++) {
	addButton(topics[i]);
}

//When a button is clicked, a request will be sent to the giphy API to search whatever topic it has
$(document).on("click", ".topic-button", function(){	
	var topic = $(this).attr("topic");	
	APIrequest(topic);
});

//When a gif is displayed, it will toggle from a till image to an animated image on click
$(document).on("click", "img", function(){
	var image = $(this)
	var state = image.attr("state");
	if (state === "still") {
		image.attr("src", image.attr("animate"));
		image.attr("state", "animate");
	}
	if (state === "animate") {
		image.attr("src", image.attr("still"));
		image.attr("state", "still");
	}
});

$(document).on("click", "#search-button", function(event){
	event.preventDefault();

	var search = $("#search-term").val().trim()

	if (search === "") {
		//Does nothing if nothing is typed in the form
	}
	else {
		//When the user does a search, it is sent to the giphy API, and 10 gifs are returned
		APIrequest(search);
		//A button is added for every search
		addButton(search);
	}
});


//Create a button for the user input


