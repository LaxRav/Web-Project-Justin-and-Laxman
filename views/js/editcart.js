var cartId = 0;
$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    cartId = urlParams.get('id');

    $.ajax({
        url: "/cartitem/" + cartId,
        method: "get"
    }).done(
        function (data) {
            $('.moviename').text(data.movie);
            $('#quantity').val(data.quantity);
            $('.price').text(data.price);
            $('.timestamp').text(data.timestamp);
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    $(".deleteEventBtn").on('click', function() {
        $.ajax(
            {
                url: '/cart/'+cartId+"?token="+sessionStorage.authToken,
                method: 'delete'
            }
        ).done(
            function (data) {
                alert("Event deleted!");
                window.location.href = "/";
            }
        ).fail(
            function (err) {
                console.log(err.responseText);
            }
        );
    });
});

function editCart() {
    var cart = {
        id: eventId,
        movie: $("#movie").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        account: $("#account").val(),
        timestamp: Date.now.val()

    };
    $.ajax(
        {
            url: "/api/addtoCart?token="+sessionStorage.authToken,
            method: 'PUT',
            data: cart
        }
    ).done(
        function (data) {
            alert("Cart updated!");
        }
    ).fail(
        function (err) {
           console.log(err.responseText);
        }
    );
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
        location.url("/index");
    })
    .fail(function(err){
        console.log(err.responseText);
    })
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
