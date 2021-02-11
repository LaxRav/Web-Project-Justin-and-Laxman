var movieId = 0;
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');
    $.ajax({
        url: "/movies/" + movieId,
        method: "get"
    })
        .done(
            function (data) {
                
                $('#movie').val(data.movie);
                $('.movie').text(data.movie);
                $('.price').text(data.price);
                $('.description').text(data.description);
                $('.genre').text(data.genre);
                $('.release').text(data.release);
                $('.distributor').text(data.distributor);
                $('.language').text(data.language);
            }


        )

        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

});



function addreview() {
    var newreview = {
        movie: $("#movie").val(),
        subject: $("#subject").val(),
        reviewcomment: $("#reviewcomment").val(),
        rating: $("#rating").val(),

       
       
    };

    $.ajax(
        {
            url: "/api/sendReview?token="+sessionStorage.authToken,
            method: 'POST',
            data: newreview
            
        }
    ) .done(function(data){
        $(".statusMessage").text(data);
        alert("Your review has been recorded");
        window.location.href = "/";
    }
    
    
    )
    .fail(
        function (err) {
            console.log(err.responseText);
        }
    );
    
    return false;
}

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