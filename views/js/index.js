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
                        <h2><a href="/edit?id=${event._id}">${movies.movie}</a></h2>
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


$(document).ready(function() {
    var token = sessionStorage.authToken;

    if(token==undefined) {
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
        })
        .fail(function (err) {
            $(".statusMessage").text(err.responseText);
        })
    return false;
}


$(".logoutBtn").click(function(){
    $.ajax({
        url: "/logout?token="+sessionStorage.authToken,
        method:"get"
    })
    .done(function(data){
        sessionStorage.removeItem("authToken");
        location.reload();
    })
    .fail(function(err){
        console.log(err.responseText);
    })
});



