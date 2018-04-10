$.ajax({
    headers: {Accept: "application/json", "Content-Type": "application/json"},
    type: "GET",
    dataType: "json",
    url: (BASE_URL + "/types"),
    success: types_success
});

function types_success(data) {
    for(let i = 0; i < data.length; i++){
        var elem = $("<li></li>").text(data[i]);
        $("#drop-select-option").append(elem)

    }
    $('#drop-select').append(data[0]);
}

$("#drop-select").on("click", function () {
    if($('#drop-select-option').css('display') == 'block') {
        $("#drop-select-option").css({"display": "none"});

    }

        $("#drop-select-option").css({"display": "block"});
        $('#drop-select-option li').on('click', function () {
            console.log(this);
            $('#drop-select').text(this.textContent);
            $('#drop-select-option').css({'display': "none"});
            
            $.ajax({
                headers: {Accept: "application/json", "Content-Type": "application/json"},
                type: "GET",
                dataType: "json",
                url: (BASE_URL + "/events/type?type=" + this.textContent + "&city="),

            }).then(function (datas) {
                $("#second").empty();

                loadEvents(datas.events)

            });
        });

});



