var movieId = 0;
$(document).ready(function () {
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

function addCart() {
    var newCartItem = {
        movie: $("#movie").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
    };

    $.ajax(
        {
            url: "/api/addtoCart?token=" + sessionStorage.authToken,
            method: 'POST',
            data: newCartItem

        }
    ).done(function (data) {
        $(".statusMessage").text(data);
        alert("You have just added movie to cart");
        window.location.href = "/";
    })
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        );

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