$().ready(function () {

    $('.the-name').on('click',
        function () {
            $('.hold-options div').css({'width': $('.the-name').css('width')});
            $('.hold-options div').css({'height': $('.the-name').css('height')});
            $('.hold-options').css('display') == 'none' ?
                $('.hold-options').css({'display': 'block'}) :
                $('.hold-options').css({'display': 'none'});
            // $('.name-in-option').text($('.name-m').val());
        });

    $('.hold-options div').on('click',
        function () {
            $('.span-m').text(this.childNodes[0].innerText);
            $('.hold-options').css({'display': 'none'});
        }
    );
});

// $(document).ready(function () {
//     console.log("aaaaaaaaaaaaaaa")
//     $.ajax({
//         headers: {Accept: "application/json", "Content-Type": "application/json"},
//         type: "GET",
//         dataType: "json",
//         url: (BASE_URL + "/events/date?city="),
//         success: event_success,
//         error: event_error
//     })
//     ;
// });
//
// function event_success(data) {
//     console.log(data)
//     events=data.events;
//     loadEvents(events)
// }
//
// function loadEvents(events){
//     let columnEvent;
//     let holdEvent;
//     for(let i=0; i< events.length; i++){
//         if(i%2==0){
//             columnEvent = $(`<div class="row" id="events11"></div>`);
//             $("#second").append(columnEvent);
//         }
//         holdEvent = $(`<div class=" col-sm-6  ontainer-fluid" id="event1">`);
//         if(columnEvent) columnEvent.append(holdEvent);
//         let holdArtist = $(`<p></p>`)
//         holdArtist.text(events[i].artist);
//         holdEvent.append(holdArtist);
//         let holdData = $(`<p></p>`)
//         holdData.text(events[i].data);
//         holdEvent.append(holdData);
//         let holdTitle = $(`<p></p>`)
//         holdTitle.text(events[i].title);
//         holdEvent.append(holdTitle);
//         let holdImg = $(`<img></img>`)
//         holdImg.attr("src",events[i].imageUrl);
//         holdEvent.append(holdImg);
//         holdEvent.on("click",()=>{
//             eventClick(events[i].eventId);
//         })
//     }
// }
//
// function openEvent(event){
//
// }
//
// function eventClick(id){
//     let email = userMail?userMail:"";
//     $.ajax({
//         headers: {Accept: "application/json", "Content-Type": "application/json"},
//         type: "GET",
//         dataType: "json",
//         url: (BASE_URL + "/event?eventId="+id+"&email="+email),
//         success: ev_success,
//         error: ev_error
//     })
//     ;
// }
//
// function ev_success(data) {
//     console.log(data);
// }
//
// function ev_error() {
//     alert("error")
// }
//
// function event_error() {
//     alert("error")
// }









