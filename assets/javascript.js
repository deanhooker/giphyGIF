// set global variables
var APIKey = "x4EzZdrAesHdJHMXbiEQQhSJBvCBg4tl";

var topics = ["james franco", "seth rogen", "arnold schwarzenegger", "hot rod", "tenacious d", "neil degrasse tyson", "carl sagan", "hamilton"];
var returnQty = 10;

// create function to render search buttons
function renderButtons() {

    $("#buttons").empty();

    for (i = 0; i < topics.length; i++) {

        var btn = $("<button>");
        btn.addClass("gif-button");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        $("#buttons").append(btn);

    }
}

// create function to search and display gifs
function displayGifs() {
    var searchTerm = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKey + "&limit=" + returnQty;

    //make sure div is empty before new results are shown
    $("#gifs").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);

        // loop through show every response shows
        for (i = 0; i < returnQty; i++) {
            //create variable of image url
            var stillUrl = response.data[i].images.original_still.url;
            var animatedUrl = response.data[i].images.original.url;
            var imageRating = response.data[i].rating;

            //use jquery to create a html element of type image
            var gifImage = $("<img>");

            //set the source and alt of our image
            gifImage.attr("src", stillUrl);
            gifImage.attr("alt", "gif image");
            gifImage.attr("gif-still", stillUrl);
            gifImage.attr("gif-animated", animatedUrl);
            gifImage.attr("gif-state", "still");

            //Prepend returned image to images div
            $("#gifs").append(gifImage);
            $("#gifs").append("<p>Rating: " + imageRating + "</p>");

        }
    });
}

function animate() {

    var state = $(this).attr("gif-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("gif-animated"));
        $(this).attr("gif-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("gif-still"));
        $(this).attr("gif-state", "still");
      }
}

// on click function to run displayGifs
$(document).on("click", ".gif-button", displayGifs);

// on click animate a gif
$(document).on("click", "img", animate);

// render buttons on initial page load
renderButtons();