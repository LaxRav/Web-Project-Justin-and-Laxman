var movieId = 0;
$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');

    $.ajax({
        url: "/movies/" + movieId,
        method: "get"
    }).done(
        function (data) {
            $('#movie').val(data.movie);
            $('#price').val(data.price);

            $('#description').val(data.description);
            $('.description').text(data.description);

            $('#genre').val(data.genre);
            $('.genre').text(data.genre);

            $('#release').val(data.release);
            $('.release').text(data.release);

            $('#distributor').val(data.distributor);
            $('.distributor').text(data.distributor);

            $('#language').val(data.language);
            $('.language').text(data.language);

            $('.image').val(data.image);

        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

});


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


function additem() {
    var newCartitem = {
        movie: $("#movie").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
      
    };

    $.ajax({
        url:"/addtoCart?token="+sessionStorage.authToken,
        method:"POST",
        data:  newCartitem

    })
    .done(function(data){
        $(".statusMessage").text(data);
        setTimeout(function(){
            location.reload();
        },3000);
    })
    .fail(function(err){
        $(".statusMessage").text("Unable to add item to cart");
    })
    return false;
}


function addToCart() {
    $.ajax(
        {
            url: "////?token="+sessionStorage.authToken,
            method: '',
            data: {}
        }
    ).done(
        function (data) {

        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    return false;
}