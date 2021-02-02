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
    email: data.email,
    name: $("#name").val(),
    email: $("#email").val(),
    namechoice: $("#namechoice").val(),
    namebest: $("#namebest").val(),
    scale: $("#scale").val(),
    recommendation: $("#recommendation").val(),
}
}