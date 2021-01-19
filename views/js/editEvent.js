var movieId = 0;
$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');

    $.ajax({
        url: "/movies/" + movieId,
        method: "get"
    }).done(
        function (data) {
            $('#movie').val(data.movie);

        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    $(".deleteEventBtn").on('click', function() {
        $.ajax(
            {
                url: '/events/'+eventId+"?token="+sessionStorage.authToken,
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

function editEvent() {
    var event = {
        id: eventId,
        name: $("#name").val(),
        description: $("#description").val(),
        startDate: $("#startDate").val(),
        startTime: $("#startTime").val(),
        endDate: $("#endDate").val(),
        endTime: $("#endTime").val()
    };
    $.ajax(
        {
            url: '/events?token='+sessionStorage.authToken,
            method: 'put',
            data: event
        }
    ).done(
        function (data) {
            alert("Event updated!");
        }
    ).fail(
        function (err) {
           console.log(err.responseText);
        }
    );
    return false;
}