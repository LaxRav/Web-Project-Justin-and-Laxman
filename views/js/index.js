$(document).ready(function () {
    $.ajax({
        url: "/",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (movies) {
                    $(".movies").append(`
                    <article>
                        <h2>${ovies.movie}</h2>
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
