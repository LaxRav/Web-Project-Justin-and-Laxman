var movieId = 0;
$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');

    $.ajax({
        url: "/movies/" + movieId,
        method: "get"
    }).done(
        function (data) {
            $('#movie').val(data.movie);
            $('#price').val(data.price);
            $('#description').val(data.description);
            $('#genre').val(data.genre);
            $('#release').val(data.release);
            $('#distributor').val(data.distributor);
            $('#language').val(data.language);
            $('#image').val(data.image);

        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

});