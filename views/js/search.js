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
            $(".superman").append(`
               <article>
                   <h2>Based on your seach we found : </h2>
              <div>
                Name: ${movies.movie}<br>
                Description: ${movies.description}<br>
                Genre : ${movies.genre}<br>
                Price: ${movies.price}<br>
                Release: ${movies.release}<br>
                Language: ${movies.language}<br>
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
}