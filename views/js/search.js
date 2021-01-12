$(document).ready(function () {
    $.ajax({
        url: "/movies/search",
        method: "post"
    })
        .done(
            function (data) {
                data.forEach (function (movies) {
                    $(".super").append(`
                    <article>
                        <h2>${movies.movie}</h2>
                        <div>
                           Price: ${movies.price}<br>
                           Description : ${movies.description}<br>
                            Release: ${movies.release}<br>
                            Distributor: ${movies.distributor}<br>
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
        //for button

        $(".search").on