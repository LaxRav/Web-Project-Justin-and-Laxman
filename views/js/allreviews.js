var movie = "";
$(document).ready(function () {
    $.ajax({
        url: "/allreviews/" + movie,
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



$(".logoutBtn").click(function(){
    $.ajax({
        url: "/logout?token="+sessionStorage.authToken,
        method:"get"
    })
    .done(function(data){
        sessionStorage.removeItem("authToken");
        location.reload();
        location.url("/index");
    })
    .fail(function(err){
        console.log(err.responseText);
    })
});

