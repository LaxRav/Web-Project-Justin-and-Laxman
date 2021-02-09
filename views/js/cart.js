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


var accountId = "";
$(document).ready(function () {
 accountId = res.locals.account._id;
    $.ajax({
        url: "/api/carts/" + accountId ,
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (cart) {
                    $(".cart").append(`
                    <article>
                
                        <div>
                           Cart: ${cart.movie}<br>
                           Genre : ${cart.price}<br>
                            Quantity: ${cart.quantity}<br>
                            Timestamp: ${cart.timestamp}<br>
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