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
                        <h2>${movies.movie}</a></h2>
                        <div>
                           Description: ${movies.description}<br>
                           Genre : ${movies.genre}<br>
                            Price: ${movies.price}<br>
                            Release: ${movies.release}<br>
                            Language: ${movies.language}<br>
                        </div>

                        <h3><a href="/addtocart?id=${movies._id}">Rent movie here</a></h3>
                        <h3><a href="/review?id=${movies._id}">Write a review here</a></h3>
                        <h3><a href="/allreviews?movie=${movies.movie}">Check out the movie reviews here</a></h3>

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


$(document).ready(function () {
    $.ajax({
        url: "/movietocart",
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
                            Language: ${movies.language}<br>
                        </div>
                        <button><a href="/addtocart?id=${movies._id}"> Order Movie </a><button>                       

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


$(document).ready(function () {
    var token = sessionStorage.authToken;

    if (token == undefined) {
        $(".protectedSection").hide();
        $(".unprotectedSection").show();
    } else {
        $(".protectedSection").show();
        $(".unprotectedSection").hide();
    }


});

function login() {
    var credentials = {
        email: $("#email").val(),
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
            alert("You have managed to log in");
            window.location.href = "/";
        })
        .fail(function (err) {
            $(".statusMessage").text(err.responseText);
        })
    return false;
}


$(".logoutBtn").click(function () {
    $.ajax({
        url: "/logout?token=" + sessionStorage.authToken,
        method: "get"
    })
        .done(function (data) {
            sessionStorage.removeItem("authToken");
            location.reload();
        })
        .fail(function (err) {
            console.log(err.responseText);
        })
});







function register() {
    var registrationdetails = {
        firstname: $("#firstname").val(),
        surname: $("#surname").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        dateofbirth: $("#dateofbirth").val()

    }
    $.ajax({
        url: "/registeraccount",
        method: "post",
        data: registrationdetails
    })
        .done(function (data) {
            $(".statusMessage").text(data.message);
            //stores the token returned from the server, if successful login
            sessionStorage.authToken = data.token;
            alert("You have managed to register. Please log in.");
            window.location.href = "/login";
        })
        .fail(function (err) {
            $(".statusMessage").text(err.responseText);
        })
    return false;
}


$(".logoutBtn").click(function () {
    $.ajax({
        url: "/logout?token=" + sessionStorage.authToken,
        method: "get"
    })
        .done(function (data) {
            sessionStorage.removeItem("authToken");
            location.reload();
            location.url("/index");
        })
        .fail(function (err) {
            console.log(err.responseText);
        })
});