
$("#right-col-icon").on("click",function () {
    $("#menu").css({"display":"none"});
});
$("#menu-icon-btn").on("click",function () {
    $("#menu").css({"display":"block"});
});

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


$(".img-ev").on("click",function () {
    $("#second1").css({"display":"block"});
    $("#second").css({"display": "none"});

});
$("#logo1").on("click",function () {
    $("#second1").css({"display":"none"});
    $("#second").css({"display": "block"});
    $("#events").css({"display":"block"});
    $("#registration").css({"display": "none"});
    $("#registration1").css({"display":"none"});
});

$("#log-container").on("click",function () {
    $("#events").css({"display":"none"});
    $("#registration").css({"display": "block"});
    $("#registration1").css({"display":"none"});
});

$("#new-reg-btn1").on("click",function () {
    $("#registration1").css({"display":"block"});
    $("#registration").css({"display": "none"});
});


