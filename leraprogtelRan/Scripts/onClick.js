var BASE_URL = "https://ticketservice2018.herokuapp.com";
var events;
var userMail;

var arr = ["#menu",
    "#about",
    "#about_us",
    "#map",
    "#data-search",
    "#root",
    "#root1",
    "#drop-select-option",
    "#second1",
    "#second",
    "#second2",
    "#tickets-p",
    "#cart-p",
    "#events",
    "#registration",
    "#registration1",
    "#success",
    // "#events-p-text",
    ".blur",
    ".blur1",
    "#search",
    "#second3"];

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

$("#logo1").on("click",function () {
    $("#second").empty();
    $("#second2").empty();
    showView("#second3");
    loadEvents(events);
    showViews(["#second", "#events"]);
    $("#events-p-text").css('display', 'block');
    $("#events-drop-menu").css({"display":"block"});
    $(".blur").css('display', 'none');
    hideBlurMain();
});

function loginPage() {
    showView("#registration");
    $(".blur").css('display', 'none');
    hideBlurMain();
    menuClose();
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
    $(".blur").css('display', 'none');
    hideBlurMain();
    menuClose();

});

$("#events-btn-menu").on("click", function () {
    $("#second").empty();
    loadEvents(events);
    showViews(["#events", "#second"]);
    $("#events-p-text").css('display', 'block');
    menuClose();
    $(".blur").css('display', 'none');
    hideBlurMain();
});

$("#new-reg-btn1").on("click",function () {
    showView("#registration1");
});

$(".data-prot").on("click",function () {
    showView("#root");
});

$(".data-prot1").on("click",function () {
    showView("#root1");
});
$(".stand-terms").on("click",function () {
    showView("#root");
});


$("#delete-section").on("click",function () {
    $("#second3").empty();
    $("#addKorz1").empty();
    $("#addKorz2").empty();
    // loadEvents(events);
    // showViews(["#second", "#events"]);
});

var pass = $('#input-reg12');
$('button.show-password').click(function() {
    pass.attr('type', pass.attr('type') === 'password' ? 'text' : 'password');
});


var pass1 = $('#input-reg13');
$('button.show-password1').click(function() {
    pass1.attr('type', pass1.attr('type') === 'password' ? 'text' : 'password');
});

// $("#buy-btn").on("click",function () {
//     $("events-p-text").css('display', 'none');
//     $("events-drop-menu").css('display', 'none');
//     showViews(["#tickets-p", "#second2"]);
// });

$("#shoppingcart-btn-menu").on("click", function () {
    $("#second").empty();
    $("#events-p-text").css('display', 'none');
    $("#events-drop-menu").css({"display":"none"});
    showViews(["#events", "#cart-p", "#second3"]);
    menuClose();
    $(".blur").css('display', 'none');
    hideBlurMain();
});

$('#proceed1').on('click', function () {
    $(".blur1").css('display', 'none');
    hideBlurMain();
    showViews(["#success", "#events"]);
    menuClose();

});

$("#congrats1").on("click",function () {
    $("#second").empty();
    $("#second2").empty();
    showView("#second3");
    loadEvents(events);
    showViews(["#second", "#events"]);
    $("#events-p-text").css('display', 'block');
    $("#events-drop-menu").css({"display":"block"});

});

$("#aboutus-btn-menu").on("click",function () {
    $(".blur1").css('display', 'none');
    hideBlurMain();
    showViews(["#about", "#about_us", "#events", "#map"]);
    $("#events-p-text").css('display', 'none');
    $("#events-drop-menu").css({"display":"none"});
    menuClose();

});