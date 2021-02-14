var movieId = 0;
$(document).ready(function () {
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
            $('.description').text(data.description);

            $('#genre').val(data.genre);
            $('#genre').text(data.genre);

            $('#release').val(data.release);
            $('#release').text(data.release);

            $('#distributor').val(data.distributor);
            $('#distributor').text(data.distributor);

            $('#language').val(data.language);
            $('#language').text(data.language);

            $('#image').val(data.image);

        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

});


$(document).ready(function () {
    $.ajax({
        url: "/viewmovie/movies/:" + movieId,
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (movies) {
                    $(".moviecomments").append(`
                    <article>
                        <h3>${moviecomments.subject}</h3>
                        <p>${moviecomments.message}</p>
                    </article>
                `);
                })
            }
        )

        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

})



