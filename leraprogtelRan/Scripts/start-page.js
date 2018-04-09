var BASE_URL = "https://ticketservice2018.herokuapp.com";


$(document).ready(function () {
    console.log(userMail)
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
    loadEvents(events)
}

function loadEvents(events) {
    let columnEvent;
    let holdEvent;
    for (let i = 0; i < events.length; i++) {
        if (i % 2 == 0) {
            columnEvent = $(`<div class="row" id="events11"></div>`);
            $("#second").append(columnEvent);
        }
        holdEvent = $(`<div class=" col-sm-6  container-fluid" id="event1">`);
        if (columnEvent) columnEvent.append(holdEvent);
        let holdArtist = $(`<p></p>`)
        holdArtist.text(events[i].artist);
        holdEvent.append(holdArtist);
        let holdData = $(`<p></p>`)
        holdData.text(events[i].data);
        holdEvent.append(holdData);
        let holdTitle = $(`<p></p>`)
        holdTitle.text(events[i].title);
        holdEvent.append(holdTitle);
        let holdImg = $(`<img>`)
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

    let containerImage = $(`<div class="container" style="margin: 0; padding: 0"></div>`);
    columnImage.append(containerImage);

    let theImage = $(`<img src="Images/div/event1.jpg" style="height: 34vw">`);
    containerImage.append(theImage);
    theImage.attr("src", event.imageUrl);

    let columnDescription = $(`<div class="col-sm-6 " id="event-user-description"></div>`);
    $("#second1").append(columnDescription);

    let artistH = $(`<h3 id="event-user-h3"></h3>`);
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
    showViews(["#second1", "#events"]);
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
    openEvent(data)
}

function ev_error() {
    alert("error")
}

function event_error() {
    alert("error")
}