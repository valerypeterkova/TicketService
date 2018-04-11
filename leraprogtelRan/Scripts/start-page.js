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
    console.log(data)
    events = data.events;
    loadEvents(events);
    $("#events-drop-menu").css({"display":"block"});
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
    buyBtn.on("click", ()=>{

        buyTickets(event.eventId);
    });
    showViews(["#second1", "#events"]);
    $("#events-drop-menu").css({"display":"none"});
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
    $('#second2').empty();
    $('#second2').append($("<div id='mest'></div>"))
    for (let i=0;i<rowHole.hallScheme.seats.length;i++){

        $('#mest').append($("<div class='mesta'  style='border: 2px solid black;width: 30px;height: 30px;display: inline-block;cursor: pointer' > </div>").text(i+1).data('price',rowHole.hallScheme.seats[i].price).data('row',rowHole.hallScheme.seats[i].row).data('place',rowHole.hallScheme.seats[i].place));

    }

    $('#second2').append($("<div id='priceTicket'></div>"))




    $('.mesta').on("click", function () {
        $(this).toggleClass("zanato")
        console.log($(this).data())
        if(this.className==="mesta"){
            $("#priceTicket").remove(this)
        }else {
            $("#priceTicket").append($(this).data("price"))
        }



    })

    showViews(["#second2", "#events"]);
}




