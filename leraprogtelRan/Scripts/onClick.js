var BASE_URL = "https://ticketservice2018.herokuapp.com";
var events;
var userMail;

var arr = ["#menu",
    "#root",
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




// $(".img-ev").on("click",function () {
//     showViews(["#second1", "#events"]);
// });

$("#logo1").on("click",function () {
    showViews(["#second", "#events"]);
    $("#events-drop-menu").css({"display":"block"});
});

function loginPage() {
    showView("#registration");
}

function menuClose() {
    $("#menu").css({"display":"none"});
}

$("#log-container").on("click",loginPage);

$("#loginout-btn-menu").on("click", function () {
    if(userMail){
        userMail = null;
        alert("Logout success");
    }else {
        loginPage();
    }
    menuClose();
});

$("#events-btn-menu").on("click", function () {
    showViews(["#events", "#second"]);
    menuClose();
});

$("#new-reg-btn1").on("click",function () {
    showView("#registration1");
});

$("#data-prot").on("click",function () {
    showView("#root");
});

$("#stand-terms").on("click",function () {
    showView("#root");
});

var pass = $('#input-reg12');
$('button.show-password').click(function() {
    pass.attr('type', pass.attr('type') === 'password' ? 'text' : 'password');
});


var pass1 = $('#input-reg13');
$('button.show-password1').click(function() {
    pass1.attr('type', pass1.attr('type') === 'password' ? 'text' : 'password');
});

