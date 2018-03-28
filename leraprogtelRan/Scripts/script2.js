$().ready(function () {


    $('.the-name').on('click',
        function () {
            $('.hold-options div').css({'width': $('.the-name').css('width')});
            $('.hold-options div').css({'height': $('.the-name').css('height')});
            $('.hold-options').css('display') == 'none' ?
                $('.hold-options').css({'display': 'block'}) :
                $('.hold-options').css({'display': 'none'});
            // $('.name-in-option').text($('.name-m').val());
        })

    $('.hold-options div').on('click',
        function () {
            $('.span-m').text(this.childNodes[0].innerText);
            $('.hold-options').css({'display': 'none'});
        }
    )

});

