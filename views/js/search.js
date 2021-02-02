$(document).ready(function () {
    $.ajax({

        url: "/genre/search",
        method: "POST"

        url:"/genre/search",
        method:"post",
        data: genre
    })
    .done(function(data){
        data.forEach(function (movies) {
            $(".superman").append(`
            <h2>These are the movies  based on your preferred genre type: </h2>
            <article>
                <h2>${movies.movie}</h2>
                <div>
                   Description: ${movies.description}<br>
                   Genre : ${movies.genre}<br>
                    Price: ${movies.price}<br>
                    Release: ${movies.release}<br>
                    Language: ${movies.language}<br>
                </div>
                <button><a href="/addtocart?id=${movies._id}"> Order Movie </a><button>                       

            </article>
        `);
                    

    })
        .done(
            function (data) {
                data.forEach(function (movies) {
                    $(".superman").append(`
                    <article>
                       <div>
                           Genres that are available : ${movies.genre}
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

});

$(document).ready(function () {
    $.ajax({
        url: "/movies/search",
        method: "POST"
    })
        .done(
            function (data) {
                data.forEach(function (movies) {
                    $(".luthor").append(`
                    <article>
                    <div>
                        <h2>Title: ${movies.movie}</h2>
                        
                           Description: ${movies.description}<br>
                         
                       </div>
                    </article>
                `);
                });
            }
        )

        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

        $(".genre").on('click', function () {
            $(".superman").show();
        });
        

    

    //These are the newly added codes, jsutin, pls do cross check and help me out on this. Thank You..

      

