var arr = ["#menu",
    "#drop-select-option",
    "#second1",
    "#second",
    "#events",
    "#registration",
    "#registration1"];

function showView(elem) {
    for(i = 0; i < arr.length; i++){
        if(arr[i] == elem){
            $(arr[i]).css({"display":"block"});
        }else{
            $(arr[i]).css({"display":"none"});
        }
    }
}

function showViews(elems) {
    for(i = 0; i < arr.length; i++){
        if(elems.includes(arr[i])){
            $(arr[i]).css({"display":"block"});
        }else{
            $(arr[i]).css({"display":"none"});
        }
    }
}

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
    showView("#second1");

});
$("#logo1").on("click",function () {
    showViews(["#second", "#events"]);
});



function loginPage() {
    showView("#registration");
}

function menuClose() {
    $("#menu").css({"display":"none"});
}

$("#log-container").on("click",loginPage);

$("#loginout-btn-menu").on("click", function () {
    loginPage();
    menuClose();
});

$("#events-btn-menu").on("click", function () {
    showViews(["#events", "#second"]);
    menuClose();
});

$("#new-reg-btn1").on("click",function () {
    showView("#registration1");
});


