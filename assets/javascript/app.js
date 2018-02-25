// Initial array of fun
var as = ['Dubstep', 'Rap', 'Metal', 'Disco'];

// ========================================================

// Code to disply the Gifs
function displayGif() {

    // Pulling info from giphy.com
    var gif = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=7VkpZVzbFGWuwxC0kkLIA0yn4aIVPTYl&limit=10&rating=pg";

    // Jqury to run the API on the page
    $.ajax({ url: queryURL, method: 'GET' }).done(function (response) {
        console.log(response);
        $("#asView").empty();
        for (var i = 0; i < response.data.length; i++) {

            var rating = response.data[i].rating;
            var imageUrl = response.data[i].images.fixed_height.url;
            var imageStillUrl = response.data[i].images.fixed_height_still.url;

            var image = $("<img>");
            var ratingText = $("<p id='rating'>" + "Rated: " + rating + "</p>");


            image.attr('src', imageStillUrl);
            image.attr('alt', 'gif');
            image.attr('data-state', 'still');
            image.attr('data-still', imageStillUrl);
            image.attr('data-animate', imageUrl);


            $('#asView').prepend(image, ratingText);
            checkState();
        }
    });
}

// Code for the new search buttons 
function renderButtons() {

    $('#buttonsView').empty();

    for (var i = 0; i < as.length; i++) {

        var newButton = $('<button class="btn btn-danger">') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        newButton.addClass('a'); // Added a class 
        newButton.attr('data-name', as[i]); // Added a data-attribute
        newButton.text(as[i]); // Provided the initial button text
        $('#buttonsView').append(newButton); // Added the button to the HTML
    }
}

// User input
$('#addA').on('click', function () {

    var a = $('#a-input').val().trim();

    as.push(a);

    renderButtons();

    return false;
})


$(document).on('click', '.a', displayGif);

renderButtons();

function checkState() {
    $('img').on('click', function () {
        var state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });
};