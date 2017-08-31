
	var topics = ["cat", "dog", "ferret", "raccoon", "sloth"];
	
	
	

//Declare an array of pre-defined buttons, and dynamically create buttons for each index
	for (var i = 0; i < topics.length; i++) {
		$("#buttons").append('<button class="topic-button btn btn-primary" topic="' + topics[i] + '">' + topics[i] + '</button>');

	}

//Take user inputs as a search term

//Send a user input as a searcha request to the giphy API, return 10 gif JSON objects
$(document).on("click", ".topic-button", function(){
	$("#gifs").empty();
	var search = $(this).attr("topic");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cb04bd6c938f44708d8dd7cbbefb25ad&q=" + search + "&limit=10&offset=0&rating=G&lang=en";

	$.ajax({
		url: queryURL, 
		method: "GET"
	}).done(function(response){

		var result = response.data

		for (var i = 0; i < 10; i++) {

			var animate = result[i].images.fixed_height.url;
			var still = result[i].images.fixed_height_still.url;
			var rating = result[i].rating;

			var gifDiv = $("<div>")
			var gifImg = $("<img>")
			var p = $("<p>");

			p.html("rating: " + rating);
			gifImg.attr("src", still).attr("still", still).attr("animate", animate).attr("state", "still");

			gifDiv.append(p).append(gifImg);
			$("#gifs").prepend(gifDiv);
		}
	});
});

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
	console.log("test");

	event.preventDefault();

	console.log($("#search-term").val().trim());

	// console.log(searchTerm);
});
//Display gifs with their ratings, and add funtionaality to play/pause on click

//Create a button for the user input


