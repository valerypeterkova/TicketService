$("#input-reg13").on("keyup", function () {
    var value_input1 = $("#input-reg12").val();
    var value_input2 = $(this).val();
    if (value_input1 != value_input2) {
        $(".error").html("You entered two different passwords. Please try again.");
        $("#reg-btn1").attr("disabled", "disabled");
    } else {
        $("#reg-btn1").removeAttr("disabled");
        $(".error").html("");
    }
});
