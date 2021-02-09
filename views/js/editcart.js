var cartId = 0;
$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    cartId = urlParams.get('id');

    $.ajax({
        url: "/cart/" + cartId,
        method: "get"
    }).done(
        function (data) {
            $('.company').text(data.movie);
            $('#name').val(data.quantity);
            $('.description').val(data.price);
            $('.timestamp').val(data.timestamp);
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    $(".deleteEventBtn").on('click', function() {
        $.ajax(
            {
                url: '/cart/'+cartId+"?token="+sessionStorage.authToken,
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