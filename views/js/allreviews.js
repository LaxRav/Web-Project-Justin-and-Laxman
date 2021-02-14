
var movie = 0;
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('movie');


    $.ajax({
        url: "/allreviews/" + movieId,
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (review) {

                    $(".moviereviews").append(`
                    <article>
                       
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

