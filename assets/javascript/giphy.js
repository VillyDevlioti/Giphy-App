$(document).ready(function() {

    var topics = ["cat", "dog", "otter", "kitten", "puppy", "elephant"];

    function renderButtons(){
        $("#buttons-view").empty();
        $.each(topics, function(index, value){
            var a = $("<button>").addClass("gif-preset").attr("data-name", value).text(value);
            $("#buttons-view").append(a);
        });
            console.log(topics);
    }

    function displayGifs (obj) {
        var gifQuery = $(this).attr("data-name");
        console.log(gifQuery);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q="+gifQuery+"&limit=10";
        console.log(queryURL); 

    // Creates AJAX call for the specific gif button being clicked
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        $("#gifs-view").empty();
        $("#gifs-view").append($("<img>").attr("src",response.data.images.downsized.url));
        });

    }



    $("#add-gif").on("click", function(e) {
        e.preventDefault(); //prevent re-initializing the screen! It happens when we have a submit button
        var newButton = $("#gif-input").val(); // or $("#gif-input").val().trim(); to get rid of the spaces in between
        //console.log(newButton+",");
        topics.push(newButton);
        console.log(topics);
        renderButtons();
    });

/*     $(".gif-preset").on("click", function() {
        var gifQuery = $(this).attr("data-name");
        console.log(gifQuery);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q="+gifQuery+"&limit=10";

    // Creates AJAX call for the specific gif button being clicked
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        $("#gifs-view").empty();
        response.data.forEach(displayGifs);
    });  */

    $(document).on("click", ".gif-preset", displayGifs);
    renderButtons();
});