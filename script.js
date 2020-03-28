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