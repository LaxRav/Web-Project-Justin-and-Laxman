function search() {
  //  var urlParams = new URLSearchParams(window.location.search);
   // movie = urlParams.get('movie');
    var movies = {
        movie: $("#search").val()
    };
    $.ajax(
        {
            url: "/movies/search",
            method: 'post',
            data: movies
        }
    ).done(
        function (data) {
            data.forEach(function (movies) {
                
            });
        }
    )
}