var email = "";
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    email = urlParams.get('email'); 
    $.ajax({
        url: "/movies",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (movies) {
                    $(".movies").append(`
                    <article>
                        <h2>${movies.movie}</a></h2>
                        <div>
                           Description: ${movies.description}<br>
                           Genre : ${movies.genre}<br>
                            Price: ${movies.price}<br>
                            Release: ${movies.release}<br>
                            Language: ${movies.language}<br>
                        </div>

                        <button><a href="/addtocart?id=${movies._id}">Rent movie here</a></button>

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