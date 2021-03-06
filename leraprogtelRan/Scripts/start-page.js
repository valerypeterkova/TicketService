var BASE_URL = "https://ticketservice2018.herokuapp.com";
var events;
$(document).ready(function () {
    $.ajax({
        headers: {Accept: "application/json", "Content-Type": "application/json"},
        type: "GET",
        dataType: "json",
        url: (BASE_URL + "/events/date?city="),
        success: event_success,
        error: event_error
    })
    ;
});

function event_success(data) {
    console.log(data);
    events = data.events;
    loadEvents(events);
    loadUpcomingEvents(events);
    $("#events-drop-menu").css({"display": "block"});
}


function loadEvents(events) {
    let columnEvent;
    let holdEvent;
    for (let i = 0; i < events.length; i++) {
        if (i % 2 == 0) {
            columnEvent = $(`<div class="row" id="events11"></div>`);
            $("#second").append(columnEvent);
        }
        holdEvent = $(`<div class=" col-sm-6  container-fluid eventsImage">`);
        if (columnEvent) columnEvent.append(holdEvent);
        let holdArtist = $(`<p class="holdArtist"></p>`)
        holdArtist.text(events[i].artist);
        holdEvent.append(holdArtist);
        let holdData = $(`<p class="dataTime"></p>`)
        holdData.text(events[i].date);
        holdEvent.append(holdData);
        let holdTitle = $(`<p class="holdTitle"></p>`)
        holdTitle.text(events[i].title);
        holdEvent.append(holdTitle);
        let holdImg = $(`<img>`);
        holdImg.attr("src", events[i].imageUrl);
        holdEvent.append(holdImg);
        holdEvent.on("click", () => {
            eventClick(events[i].eventId);
        })
    }
}


function openEvent(event) {
    $('#second1').empty();
    let columnImage = $(`<div class="col-sm-6 " id="event-user-photo"></div>`);
    $("#second1").append(columnImage);

    let containerImage = $(`<div class="container" style="margin: 0; padding: 0; overflow: hidden"></div>`);
    columnImage.append(containerImage);

    let theImage = $(`<img style="height: 34vw; position: relative; right: 50%; max-width: 200% !important;">`);
    containerImage.append(theImage);
    theImage.attr("src", event.imageUrl);

    let columnDescription = $(`<div class="col-sm-6 " id="event-user-description"></div>`);
    $("#second1").append(columnDescription);

    let artistH = $(`<h3 class="p"></h3>`);
    columnDescription.append(artistH);
    artistH.text(event.artist);

    let descrP = $(`<p id="description-txt"></p>`);
    columnDescription.append(descrP);
    descrP.text(event.description);

    let dateP = $(`<p class="p"></p>`);
    columnDescription.append(dateP);
    dateP.append("<span class='p'>Date: </span>" +
        "<span class='p1'>" + event.date + "</span>" +
        "<img src='Images/clock-circular-outline.png' style='margin: 0 0.5vw'>" +
        "<span class='p'>" + event.time + "</span>");

    let ticketP = $(`<p class="p"></p>`);
    columnDescription.append(ticketP);
    ticketP.append("<span class='p'>Tickets available - </span><span class='p1'>" + event.ticketCount + "</span>");

    let priceP = $(`<p class="p"></p>`);
    columnDescription.append(priceP);
    priceP.append("<span class='p'>Price range: </span><span class='p1'>" + event.priceRange + "</span>");

    let buyBtn = $(`<p class="p" id="buy-btn">BUY TICKETS</p>`);
    columnDescription.append(buyBtn);
    buyBtn.on("click", () => {
        if ($('#addKorz .mestoZanato').length > 0){
            alert("Pay your order")
            showViews(["#second3"]);
        }else{
            buyTickets(event.eventId);

        }
    });
    showViews(["#second1", "#events"]);
    $("#events-drop-menu").css({"display": "none"});
}

function eventClick(id) {
    let email = userMail ? userMail : "";
    $.ajax({
        headers: {Accept: "application/json", "Content-Type": "application/json"},
        type: "GET",
        dataType: "json",
        url: (BASE_URL + "/event?eventId=" + id + "&email=" + email),
        success: ev_success,
        error: ev_error
    })
    ;
}

function ev_success(data) {
    console.log(data);
    openEvent(data);
}

function ev_error() {
    alert("error")
}

function event_error() {
    alert("error")
}

function buyTickets(id) {

    $.ajax({
        headers: {Accept: "application/json", "Content-Type": "application/json"},
        type: "GET",
        dataType: "json",
        url: (BASE_URL + "/event/hall?eventId=" + id),
        success: buy_success,
        error: buy_error
    })
    ;
}

function buy_success(data) {
    console.log(data);
    holle(data)

}

function buy_error() {
    alert("error")
}


function holle(rowHole) {
    var MestoZanaqto = document.getElementsByClassName('mestoZanato');
    var ZanatoMesto = document.getElementsByClassName("mesta");
    $('#second2').empty();
    $('#second2').append($("<div class=' col-sm-8' id='mest'></div>"));
    $('#mest').append($("<div id='title'> </div>").text(rowHole.hallName));
    var mesta = document.getElementsByClassName("mesta");
    for (let i = 0; i < rowHole.hallScheme.seats.length; i++) {


        $('#mest').append($("<div class='mesta'> </div>").text(i + 1)
            .data('price', rowHole.hallScheme.seats[i].price)
            .data('row', rowHole.hallScheme.seats[i].row)
            .data('place', rowHole.hallScheme.seats[i].place)
            .data('id', rowHole.hallScheme.seats[i].id));
        if (rowHole.hallScheme.seats[i].isTaken == true) {
            $(ZanatoMesto[i]).addClass("zanatoMesto")

        }
        $((mesta)[i]).css({"background-color": "#" + getHexColor(rowHole.hallScheme.seats[i].colour)})
    }
    for (let i = 0; i < rowHole.hallScheme.seats.length; i++) {
        console.log("#" + getHexColor(rowHole.hallScheme.seats[i].colour))
    }

    function getHexColor(number) {
        if (number < 0) {
            number = 0xFFFFFFFF + number + 1;
        }
        return number.toString(16).toUpperCase();
    }

    $('#second2').append($("<div class='col-sm-4' id='priceTicket'></div>"));
    $("#priceTicket").append("<div style='margin-top: 3vw; display: inline-block'></div>")
        .append("<span></span>").text("Row Place");


    var ars = [];
    $("#second3").append($("<p id='alert-txt'>The tickets shown here have now been reserved for you for 20 minutes.</p>"));
    $("#second3").append($("<div class='clearfix'></div>"));
    $("#second3").append($("<div class='row' id='addKorzina11' style='border: #868685 solid 1px'></div>"));
    $("#addKorzina11").append($("<div class='col-sm-4' id='addKorz1'></div>"));
    $("#addKorzina11").append($("<div class='col-sm-8' id='addKorz2'></div>"));
    $("#addKorz1").append($("<div id='addKorz11'></div>"));
    $("#addKorz11").append($("<div id='addKorz'></div>"));
    $('.mesta').on("click", function (e) {

        let taget = e.target;
        var rrs = [];
        rrs = $(taget).data("id");
        taget.classList.add("zanato");
        /* console.log($(taget).data("row"))*/
        taget.setAttribute("data-row", $(taget).data("row"));
        taget.setAttribute("data-place", $(taget).data("place"));
        taget.setAttribute("data-id", $(taget).data("id"));
        taget.setAttribute("data-price", $(taget).data("price"));

        if (taget.className === "mesta") {
            $(this).unbind()
            /* console.log(taget.lastChild.remove())*/

        }
        else {
            let deleteAdress = $("<span class='delete'>x</span>");
            let adress = $("<div class='mestoZanato'></div>").data("id", $(taget).data("id")).data('price', $(taget).data("price"));
            let p1 = $("<p style='display: inline-block;padding-right: 5px' id='row'> </p>").text($(taget).data("row"));
            let p2 = $("<p style='display: inline-block;' id='cols'></p>").text($(taget).data("place"));

            adress.append(p1);
            adress.append(p2);
            adress.append(deleteAdress);
            $("#priceTicket").append(adress);


            var counter1 = 0;
            for (let i = 0; i < ($('.mestoZanato')).length; i++) {
                counter1 += $(MestoZanaqto[i]).data('price')
            }

            $('#summary').text(counter1);


            $(".delete").on("click", function () {
                var arrS = [];
                for (let i = 0; i < $(".delete").length; i++) {
                    arrS[i] = $(".delete")[i]
                }
                $(this).closest(".mestoZanato").remove();
                var counter1 = 0;
                for (let i = 0; i < ($('.mestoZanato')).length; i++) {
                    counter1 += $(MestoZanaqto[i]).data('price')
                }

                $('#summary').text(counter1);

                /*console.log(arrS.indexOf(this))*/
                taget.classList.remove("zanato")[arrS]
            })
        }

    });
    $(".zanatoMesto").unbind();
    $('#priceTicket').append($('<div id="summary"></div>'));

    $("#priceTicket").append($("<div id='addKorzina'>TO THE CART</div>"));
    $('#addKorzina').on("click", function () {

        // $(".delete").css({"display": "none"});
        $("#addKorz1").append($("<div id='sshopping-cart-info'></div>"));
        $('#sshopping-cart-info').text(rowHole.artist + "|" + rowHole.eventTitle + "|" + rowHole.date);
        // $('#ticket-info').css({'display':'none'});
        // $('#events').css({'display':'block'});
        // showViews(["#events", "#cart-p", "#second2"]);
        // $('#shopping-cart-info').empty();
        // $('#shopping-cart-info').text(rowHole.artist + "|" + rowHole.eventTitle + "|" + rowHole.date);



        /*console.log(new Date().getMinutes())
        function deleteTicket() {
        $("#second3").empty()
        }
        setTimeout(deleteTicket, 600000);*/


        /* let p3 = $("<p style='display: inline-block;'></p>").text(rowHole.artist + '-');*/


        var arrs = [];
        // $("#addKorz").append("<div style='margin-top: 3vw; display: inline-block'></div>")
        //     .append("<span></span>").text("Row Place");
        // var counter2 = 0;
        // for (let i = 0; i < ($('.mestoZanato')).length; i++) {
        //     counter2 += $(MestoZanaqto[i]).data('price')
        // }
        //
        // $('#summary').text(counter2);
        //
        //
        // $(".delete").on("click", function () {
        //     var arrS = [];
        //     for (let i = 0; i < $(".delete").length; i++) {
        //         arrS[i] = $(".delete")[i]
        //     }
        //     $(this).closest(".mestoZanato").remove();
        //     var counter1 = 0;
        //     for (let i = 0; i < ($('.mestoZanato')).length; i++) {
        //         counter1 += $(MestoZanaqto[i]).data('price')
        //     }
        //
        //     $('#summary').text(counter2);
        //
        //     /*console.log(arrS.indexOf(this))*/
        //     taget.classList.remove("zanato")[arrS]
        // })

        $("#addKorz").append($(".mestoZanato"));
        // $('#addKorz').append($('<div id="summary"></div>'));


        var mestZ = document.getElementsByClassName("mestoZanato");

        for (let i = 0; i < mestZ.length; i++) {
            arrs[i] = $(mestZ[i]).data("id")


        }


        var NewObj = {
            "email": "",
            "eventSeatIds": arrs,
            "isBooked": true
        }


        $.ajax({
            headers: {Accept: "application/json", "Content-Type": "application/json"},
            type: "POST",
            dataType: "json",
            url: (BASE_URL + "/booking"),
            data: JSON.stringify(NewObj),
            success: eventsa_success,

        })

        function eventsa_success(data) {
            sucsesfulTickets(data)
        }

        // showViews(["#second3"]);
        showViews(["#events", "#cart-p", "#second3"]);


    });
    $('#addKorz').append("<div id='btn-oplata'>PAY</div>");

    $('#addKorz2').append("<div id='terms-and-cond1' style='position: absolute; bottom: 0; right: 3vw;'></div>");
    $('#addKorz2').append("<div id='delete-section' style='position: absolute;top: 2vw; right: 3vw;color: #ffc800; font-family: FuturaFuturisC-Bold; cursor: pointer;'>Delete section</div>");
    $('#terms-and-cond1').append("<input type='checkbox' checked='checked' required id='terms-and-cond11' style='display: inline-block; margin: 0.3vw 0.5vw 2vw 0; float: left;'>");
    $('#terms-and-cond1').append("<p style='display: inline-block; font-family: FuturaFuturisLightC; color: #868685; font-size: 1vw;'>I have read <span class='data-prot1'>The Terms and Conditions</span> and fully agree with them</p>");
    $("#delete-section").on("click",function () {
        $("#second3").empty();
    });

    $(".data-prot1").on("click",function () {
        showView("#root1");
    });


    function sucsesfulTickets(IdZakaz) {


        $("#btn-oplata").on("click", function () {
            $('#addKorz').append("<input type='email' id='mail' placeholder='Enter your email'>")
            $('#addKorz').append("<div id='addmail'>Confirm Email</div>");
            $("#addmail").on("click", function () {
                $("#btn-oplata").css('display', 'none');
                $.ajax({
                    headers: {Accept: "application/json", "Content-Type": "application/json"},
                    type: "GET",
                    dataType: "json",
                    url: (BASE_URL + '/email?email=' + $("#mail").val() + "&ticketId=" + IdZakaz.ticketId),

                    success: eventsa_successw,
                })

            });


            function eventsa_successw(data) {
                console.log(data);
                $.ajax({
                    headers: {Accept: "application/json", "Content-Type": "application/json"},
                    type: "GET",
                    dataType: "json",
                    url: (BASE_URL + "/payment/finish?ticketId=" + IdZakaz.ticketId),

                    success: eventsas,

                });

                function eventsas(data) {
                    // $('#addKorz2').empty();
                    // $("#addKorz1").empty();
                    // showViews(["#second", "#events"]);
                    blurMain();
                    $(".blur1").css('display', 'flex');
                }

            }


        })
    }

    // $("#second2 #priceTicket").append("<input type='button' id='to-cart-btn' value='TO THE CART'>");

    // $("#events-drop-menu").css('display', 'none');
    showViews(["#events", "#tickets-p", "#second2"]);
    $("#events-p-text").css('display', 'none');
    $('#ticket-info').empty();
    $('#ticket-info').text(rowHole.artist + "|" + rowHole.eventTitle + "|" + rowHole.date);
    // showViews(['#events', "#second2"]);
}

function loadUpcomingEvents(events) {
    // let upEvent;
    let holdEvent;

    for (let i = 0; i < events.length - 1; i++) {
        // upEvent = $(`<div class="container up-ev"></div>`);
        // $("#up-ev1").append(upEvent);
        (function (i) {
            window.setInterval(function () {
                $("#up-ev1").empty()
                /*if(i%3==0){
                    $("#up-ev1").empty()
                }*/
                holdEvent = $(`<div class=" eventsImage1">`);
                $("#up-ev1").append(holdEvent);
                let holdArtist = $(`<p class="holdArtist1"></p>`);
                holdArtist.text(events[i].artist);
                holdEvent.append(holdArtist);
                let holdData = $(`<p class="dataTime1"></p>`);
                holdData.text(events[i].date);
                holdEvent.append(holdData);
                // let holdTitle = $(`<p class="holdTitle1"></p>`)
                // holdTitle.text(events[i].title);
                // holdEvent.append(holdTitle);
                let holdImg = $(`<img class="holdImg">`);
                holdImg.attr("src", events[i].imageUrl);
                holdEvent.append(holdImg);
                holdEvent.on("click", () => {
                    eventClick(events[i].eventId);
                })
            }, 3000 * (i + 1))
        })(i)
        //     setInterval (function() {alert("1")}, 3000)
    }
}


$('.contentDate tr td').on('click', function () {
    var datval = $("#thisMonthAndYear");
    var month_this = datval.data("month");
    var day_this = parseInt(this.textContent) ;
    var seconda = Date.parse(datval.data("year") + "." + (month_this +1)+ "." + (day_this + 1));

    console.log(datval.data("year") + "." + datval.data("month") + "." + (day_this + 1));

          $.ajax({
              headers: {Accept: "application/json", "Content-Type": "application/json"},
              type: "GET",
              dataType: "json",
              url: (BASE_URL + "/events/on/date" + "?date=" + seconda),
              success: cal_success,
              error: cal_error
          })
          ;
          function cal_success(data) {
              hideBlurMain();
              $(".blur").css('display', 'none');
              data_search(data.events);
              console.log(data);

          }

          function cal_error() {
              $("#data-search").append("<div></div>").text("No matches");
              showView("#data-search");
          }

    function  data_search(events) {
        if(events.events==0){
            $("#data-search").append("<div></div>").text("No matches found");
            showViews(["#events","#data-search"]);
        }
        $("#second").empty();
        loadEvents(events);
        showViews(["#events","#second"]);
        console.log(events)
    }
});


