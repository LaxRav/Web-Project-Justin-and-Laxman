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
    var feedback = {
        movie: $("#movie").val(),
        subject: $("#subject").val(),
        reviewcomment: $("#comment").val(),

       
       
    };

    $.ajax(
        {
            url: "/api/sendReview?token="+sessionStorage.authToken,
            method: 'POST',
            data: feedback
            
        }
    ) .done(function(data){
        $(".statusMessage").text(data);
        setTimeout(function(){
            location.reload();
        },3000);
    })
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
