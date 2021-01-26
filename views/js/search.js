$(document).ready(function () {
    $.ajax({
        url: "/genre/search",
        method: "POST"
    })
        .done(
            function (data) {
                data.forEach(function (movies) {
                    $(".superman").append(`
                    <article>
                       <div>
                           Genres that are available : ${movies.genre}
                        </div>

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

});

$(document).ready(function () {
    $.ajax({
        url: "/movies/search",
        method: "POST"
    })
        .done(
            function (data) {
                data.forEach(function (movies) {
                    $(".luthor").append(`
                    <article>
                    <div>
                        <h2>Title: ${movies.movie}</h2>
                        
                           Description: ${movies.description}<br>
                         
                       </div>
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

});

$(".genre").on('click', function () {
    $(".superman").show();
}),

 $(".movie").on('click', function () {
    $(".luthor").show();
})

