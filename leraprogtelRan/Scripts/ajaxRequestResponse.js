var BASE_URL = "https://ticketservice2018.herokuapp.com";

var registration_data = {
    honour:$(".hold-name-input").val,
    name:$("#input-reg2").val,
    surname:$("#input-reg3").val,
    company:$("#input-reg4").val,
    street:$("#input-reg5").val,
    house:$("#input-reg6").val,
    additionalInfo:$("#input-reg7").val,
    postcode:$("#input-reg8").val,
    city:$("#input-reg9").val,
    country:$("#input-reg10").val,
    email:$("#input-reg11").val,
    password:$("#input-reg12").val,
    phone:$("#input-reg14").val,
    additionalPhone:$("#input-reg15").val
};

var login_data = {
    email:$("#email-txt").val,
    password:$("#pass-txt").val
};

