var BASE_URL = "https://ticketservice2018.herokuapp.com";


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


function reg_success(data) {
    if (data.success) {
        console.log("ok");
        //TODO
    } else {
        console.log("error_500+");
    }
}

function reg_error() {
    console.log("error");
}

function forgotPsw_success(data) {
    console.log(data);
    if (data.success) {
        console.log("ok");
        //TODO
    } else {
        console.log("error_500+");
    }
}

function forgotPsw_error() {
    console.log("error");
}


function log_success(data) {
    console.log(data);
    if (data.success) {
        console.log("ok");
        //TODO
    } else {
        console.log("error_500+");
    }
}

function log_error() {
    console.log("error");
}
