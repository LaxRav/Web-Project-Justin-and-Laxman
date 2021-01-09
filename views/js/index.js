$(document).ready(function () {
    $.ajax({
        url: "/",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (Movies) {
                    $(".movies").append(`
                    <article>
                        <h2>${Movies.movie}</h2>
                        <div>
                           Description: ${Movies.description}<br>
                           Genre : ${Movies.genre}<br>
                            Price: ${Movies.price}<br>
                            Release: ${Movies.release}<br>
                            Language: ${Movies.language}
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
