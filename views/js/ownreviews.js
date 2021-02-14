var accountId = "";
$(document).ready(function () {
    $.ajax({
        url: "/api/reviews?token=" + sessionStorage.authToken,
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (review) {

                    $(".reviews").append(`
                    <article>
                       
                    <h2>${review.movie}</h2>
                    <h3>${review.subject}</h3>
                        <div>
                         Rating: ${review.rating}/5 <br>
                         <p>${review.reviewcomment}</p>
                        Timestamp: ${review.timestamp}<br>
                        </div>
                    </article>
                    <br>
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

