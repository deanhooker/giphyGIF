// set global variables
var APIKey = "x4EzZdrAesHdJHMXbiEQQhSJBvCBg4tl";

var topics = ["james franco", "seth rogen", "arnold schwarzenegger", "hot rod", "tenacious d", "neil degrasse tyson", "carl sagan", "hamilton"];

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
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKey + "&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
            console.log(response);
        
        //create variable of image url
        var imageUrl = response.data[0].images.original.url;
        
                //use jquery to create a html element of type image
                var gifImage = $("<img>");
        
                //set the source and alt of our image
                gifImage.attr("src", imageUrl);
                gifImage.attr("alt", "gif image");
        
                //Prepend returned image to images div
                $("#gifs").prepend(gifImage);

        
    });
}

// on click function to run displayGifs
$(document).on("click", ".gif-button", displayGifs);

// render buttons on initial page load
renderButtons();