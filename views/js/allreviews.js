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