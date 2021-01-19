var movieId = 0;
$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');

    $.ajax({
        url: "/movies/" + movieId,
        method: "get"
    }).done(
        function (data) {
            $('.movie').text(data.movie);
            $('.price').text(data.price);
            $('.description').text(data.description);
            $('.genre').text(data.genre);
            $('.release').text(data.release);
            $('.distributor').text(data.distributor);
            $('.language').text(data.language);
            $('.image').text(data.image);

        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

});