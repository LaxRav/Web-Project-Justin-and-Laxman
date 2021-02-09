var email = "";
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    email = urlParams.get('email'); 
    $.ajax({
        url: "/movies" + email,
        method: "get"
    })
        .done(
            function (data) {
                
                $('#name').val(data.name);
                $('#email').val(data.email);
                $('#namechoice').val(data.namechoice);
                $('#namebest').val(data.namebest);
                $('#scale').val(data.scale);
                $('#recommendation').val(data.recommendation);
            }
        )

        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

});



function review() {
    var feedback = {
        name: $("#name").val(),
        email: $("#email").val(),
        movie: $("#namechoice").val(),
        namebest: $("#namebest").val(),
        scale: $("#scale").val(),
        recommendation: $("#recommendation").val(),
    };

    $.ajax(
        {
            url: "/sendreview",
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
