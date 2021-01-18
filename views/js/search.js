var movie = "";
var genre = "";
$(document).ready(function () {
    $.ajax({
        url: "/movies/search",
        method: "post"
    })
        .done(
            function (data) {
                data.forEach(function (movies) {
                    $(".superman").append(`
                    <article>
                        <h2>${movies.movie}</h2>
                        <div>
                           Description: ${movies.description}<br>
                           Genre : ${movies.genre}<br>
                            Price: ${movies.price}<br>
                            Release: ${movies.release}<br>
                            Language: ${movies.language}<br>
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
        );


});
