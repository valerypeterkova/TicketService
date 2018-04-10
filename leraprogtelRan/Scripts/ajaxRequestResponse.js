$('#reg-btn1').on('click', function () {

    var registration_data = {
        honour: $(".span-m").text(),
        name: $("#input-reg2").val(),
        surname: $("#input-reg3").val(),
        company: $("#input-reg4").val(),
        street: $("#input-reg5").val(),
        house: $("#input-reg6").val(),
        additionalInfo: $("#input-reg7").val(),
        postcode: $("#input-reg8").val(),
        city: $("#input-reg9").val(),
        country: $("#input-reg10").val(),
        email: $("#input-reg11").val(),
        password: $("#input-reg12").val(),
        phone: $("#input-reg14").val(),
        additionalPhone: $("#input-reg15").val()
    };

    console.log(registration_data);
    $.ajax({
        headers: {Accept: "application/json", "Content-Type": "application/json"},
        type: "POST",
        dataType: "json",
        url: (BASE_URL + "/client"),
        data: JSON.stringify(registration_data),
        success: reg_success,
        error: reg_error

    })
    ;
})
;


$('#log-btn-input').on('click', function () {


    var login_data = {
        email: $("#email-txt").val(),
        password: $("#pass-txt").val()
    };
    console.log(login_data);
    $.ajax({
        headers: {Accept: "application/json", "Content-Type": "application/json"},
        type: "POST",
        dataType: "json",
        url: (BASE_URL + "/login"),
        data: JSON.stringify(login_data),
        success: log_success,
        error: log_error

    })
    ;
})
;

$('#forgot-link').on('click', function () {
    $.ajax({
        headers: {Accept: "application/json", "Content-Type": "application/json"},
        type: "GET",
        dataType: "json",
        url: (BASE_URL + "/password" + "?email=" + $("#email-txt").val()),
        success: forgotPsw_success,
        error: forgotPsw_error

    })
    ;
});

function blurMain() {
    $("#main").css("filter", "blur(30px)");
    $('#back').css("filter", "blur(30px)")
}

function hideBlurMain() {
    $("#main").css("filter", "blur(0px)");
    $('#back').css("filter", "blur(0px)")
}

function reg_success(data) {
    console.log(data);
    if (data.success) {
        alert("A message with the confirmation code has been sent to your email");
        blurMain();
        $(".blur").css('display', 'flex');
    }
}


function reg_error(jqXHR) {
    if (jqXHR.status == 400) {
        alert("Invalid email")
    } else if (jqXHR.status == 500) {
        alert("Database Error”/”JSON parsing problem")
    } else if (jqXHR.status == 501) {
        alert("There is already a user with this email")
    } else {
        alert("Unknown exception")
    }
}

function forgotPsw_success(data) {
    alert("A message with new password has been sent to your email");
    loginPage();
}

function forgotPsw_error(jqXHR) {
    if (jqXHR.status == 400) {
        alert("Invalid email")
    } else if (jqXHR.status == 500) {
        alert("Database Error")
    } else if (jqXHR.status == 501) {
        alert("There is no user with this email")
    } else {
        alert("Unknown exception")
    }
}


function log_success(data) {
    alert("Login success");
    userMail = data.email;
    console.log(data);
    showViews(["#second", "#events"]);
}

function log_error(jqXHR) {
    if (jqXHR.status == 500) {
        alert("Database Error")
    } else if (jqXHR.status == 501) {
        alert("Wrong email/password")
    } else {
        alert("Unknown exception")
    }
}

$('#conf-code').on('click', function () {
    var code = $('#confir-code').val();
    $.ajax({
        headers: {Accept: "application/json", "Content-Type": "application/json"},
        type: "GET",
        dataType: "json",
        url: (BASE_URL + "/confirmation" + "?code=" + code),
        success: code_success,
        error: code_error
    })
    ;
});

function code_success(data) {
    hideBlurMain();
    $(".blur").css('display', 'none');
    alert("Congrats! Your registration is finished");
    loginPage();
}

function code_error(jqXHR) {
    if (jqXHR.status == 500) {
        alert("Database Error”/”JSON parsing problem")
    } else if (jqXHR.status == 501) {
        alert("Wrong confirmation code")
    } else {
        alert("Unknown exception")
    }
    hideBlurMain();
    $(".blur").css('display', 'none');
    loginPage();
}


$("#new-reg-btn2").on("click", function () {
    blurMain();
    $(".blur").css('display', 'flex');
    menuClose();
});

$('#search-img').on('click', function () {
    $.ajax({
        headers: {Accept: "application/json", "Content-Type": "application/json"},
        type: "GET",
        dataType: "json",
        url: (BASE_URL + "/search" +"?text="+ $("#search-input").val()),
        success: search_success,
        error: search_error
    });
    $('#search-input').val('');

});

function search_success(data) {
    hideBlurMain();
    $(".blur").css('display', 'none');
    search(data.events);
}

function search_error() {
    $("#search").append("<div></div>").text("No matches");
    showView("#search");
}

function  search(events) {
    if(events.events==0){
        $("#search").append("<div></div>").text("No matches found");
        showViews(["#events","#search"]);
    }
    $("#second").empty();
    loadEvents(events);
    showViews(["#events","#second"]);
    console.log(events)
}



