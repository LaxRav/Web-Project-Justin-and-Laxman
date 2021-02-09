
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


var accountId = "5ffd1a1d1da1bb5168872dba";
$(document).ready(function () {
 //accountId = res.locals.account._id;
    $.ajax({
        url: "/cart/" + accountId ,
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (cart) {
                    
                    $(".cart").append(`
                    <article>
                        
                        <div>
                           Movie: ${cart.movie}<br>
                           Price : $${cart.price}<br>
                            Quantity: ${cart.quantity}<br>
                            Timestamp: ${cart.timestamp}<br>
                        </div>
                             <h3><a href="/editcart?id=${cart._id}" >Click here to edit your order</a></h3>
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
    })
    .fail(function(err){
        console.log(err.responseText);
    })
});