var movie = "";
var genre = "";
$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    movie = urlParams.get('movie');
    genre = urlParams.get('genre');

    $.ajax({
        url: "/movies/search" + movie,
        method: "post"
    }).done(
        function (data) {
            $('#search').val(data);
            

        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

});