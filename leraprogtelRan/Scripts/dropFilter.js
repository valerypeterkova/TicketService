var data = [{name: ["CONCERTS", "SHOWS", "MUSICALS"]}];
for(var i = 0; i < data[0]["name"].length; i++){
    var elem = $("<li></li>").text(data[0]["name"][i]);
    $("#drop-select-option").append(elem);
}


$('#drop-select').append(data[0]["name"][0]);


$("#drop-select").on("click", function () {
    if($('#drop-select-option').css('display') == 'block') {
        $("#drop-select-option").css({"display": "none"});

    }else{
        $("#drop-select-option").css({"display": "block"});
        $('#drop-select-option li').on('click', function () {
            $('#drop-select').text(this.textContent);
            $('#drop-select-option').css({'display': "none"});
        });
    }
});