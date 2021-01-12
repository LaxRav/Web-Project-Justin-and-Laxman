$(document).ready(function () {
    $.ajax({
        url: "/movies",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (movies) {
                    $(".movies").append(`
                    <article>
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

function login() {
    var credentials = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    $.ajax({
        url: "/login",
        method: "post",
        data: credentials
    })
        .done(function (data) {
            $(".statusMessage").text(data.message);
            //stores the token returned from the server, if successful login
            sessionStorage.authToken = data.token;
        })
        .fail(function (err) {
            $(".statusMessage").text(err.responseText);
        })
    return false;
}
