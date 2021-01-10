$(document).ready(function () {
    $.ajax({
        url: "/movies",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach (function(movies) {
                    $(".movies").append(`
                    <article>
                    <div>
                    <p>${movies.image}<p>
                    <div>
                        <h2>${movies.movie}</h2>
                        <div>
                           Description: ${movies.description}<br>
                           Genre : ${movies.genre}<br>
                            Price: ${movies.price}<br>
                            Release: ${movies.release}<br>
                            Language: ${movies.language}
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


        })
