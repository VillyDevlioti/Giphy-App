$(document).ready(function() {

    var topics = ["cat", "dog", "otter", "kitten", "puppy", "elephant"];

    //rendering my buttons
    function renderButtons(){
        $("#buttons-view").empty();
        $.each(topics, function(index, value){
            var a = $("<button>").addClass("gif-preset").attr("data-name", value).text(value);
            $("#buttons-view").append(a);
        });
            console.log(topics);
    }

    //function to display gifs
    function displayGifs (obj) {
        var gifQuery = $(this).attr("data-name");
        console.log(gifQuery);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q="+gifQuery+"&limit=10";
        console.log(queryURL); 
        $("#gifs-view").empty();

        // Creates AJAX call for the specific gif button being clicked
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        
        .then(function(response) {
            console.log(response);
            console.log(response.data);
            $.each(response.data, function(index,value) {
                console.log(index,value, value.images.fixed_height.url);
                $("#gifs-view").append($("<img>").attr("src",value.images.original_still.url));
            });
        });

    }
    
    //this handles the submit button
    $("#add-gif").on("click", function(e) {
        e.preventDefault(); //prevent re-initializing the screen! It happens when we have a submit button
        var newButton = $("#gif-input").val(); // or $("#gif-input").val().trim(); to get rid of the spaces in between
        topics.push(newButton);
        console.log(topics);
        renderButtons();
    });

    //calls the display function, each time a button is clicked
    $(document).on("click", "button", displayGifs);

    //this pretty much starts it all
    renderButtons();
});