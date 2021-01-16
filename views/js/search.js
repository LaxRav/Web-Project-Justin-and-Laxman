
  var genre = "";
  var movie = "";
  $(document).ready(function() {
   var urlParams = new URLSearchParams(window.location.search);
   genre = urlParams.post('genre');
   movie = urlParams.post('movie');

   $.ajax({
      url: "/movies/search" + movie,
      method: "post"
   }).done(
     function (data) {
       $('')
     }
   )
   });


    
        //for button

        $(".search").on