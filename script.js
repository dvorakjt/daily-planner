function updateDay() {
    var today = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(today);
}

function renderTimeSlots() {
    for (let i = 9; i <= 17; i++) {
        var hour = $("#" + i);
        if (moment().hour() === i) $(hour).addClass("present");
        else if (moment().hour() > i) $(hour).addClass("past");
        else $(hour).addClass("future");
    }
}

updateDay();
renderTimeSlots();

$("button").on("click", function () {
    var button = this;
    $(button).empty();
    var icon = $("<i>");
    icon.addClass("far fa-save fa-spin");
    $(button).append(icon);
    var timer = setTimeout(function () {
        $(button).empty();
        var icon2 = $("<i>");
        icon2.addClass("fas fa-check-square");
        icon2.css("background-color", "white");
        icon2.css("color", "limegreen");
        icon2.css("padding-left", "1px");
        icon2.css("padding-right", "1px");
        $(button).append(icon2);
    }, 2000);
})