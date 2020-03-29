//sets the current day to today using moment.js
function updateDay() {
    var today = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(today);
}

//renders the time slots by using their section id and comparing it to moment().hour();
function renderTimeSlots() {
    for (let i = 9; i <= 17; i++) {
        var hour = $("#" + i + " textarea");
        if (moment().hour() === i) $(hour).addClass("present");
        else if (moment().hour() > i) $(hour).addClass("past");
        else $(hour).addClass("future");

        //for each hour, check if there is an item in local storage with that hour's key
        const stored = localStorage.getItem(i);
        //if there is, it will return true. Then update $(hour)'s value with the saved value
        if (stored) {
            $(hour).val(stored);
        }
    }
}

function loadSavedText() {
    for (let i = 9; i <= 17; i++) {
        var hour = $("#" + i + " textarea");
        //for each hour, check if there is an item in local storage with that hour's key
        const stored = localStorage.getItem(i);
        //if there is, it will return true. Then update $(hour)'s value with the saved value
        if (stored) {
            $(hour).val(stored);
        }
    }
}
//call these two functions
updateDay();
renderTimeSlots();
loadSavedText();

//when you load the page
var now = moment(); //get the exact moment
var nextHour = moment({ hour: (moment().hour() + 1), minute: 0, seconds: 0, milliseconds: 0 }); //find out what the next hour is by adding 1 to moment().hour()
var difference = nextHour.diff(now); //find out what the difference between the two is in milliseconds

var counter = setTimeout(function () { //set a timeout to re-render the time slots once the next hour has been reached
    renderTimeSlots(); //re-renderTimeSlots
    var counter2 = setInterval(renderTimeSlots(), 3600000) //now, set an interval to renderTimeSlots every hour
    clearTimeout(counter); //clear the initial timer
}, difference);

$("button").on("click", function () {
    var button = this;
    var sectionID = $(this).parent().attr("id"); //find the section to which this button belongs, and get its id.
    var textArea = $(this).prev().val(); //find the button's text area by finding its previous sibling, then get the corresponding value
    if (textArea) { //if there is nothing typed, this will return false and nothing will happen
        localStorage.setItem(sectionID, textArea); // save the contents of the text area to local storage with the key reflecting the hour
        $(button).empty(); //clear the button icon and add an animated one
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
    }
    $(button).prev().attr("data-saved", "true");
});

//when you type in each textarea, if the previous contents have been saved, it will change the check mark back to the save icon
$("textarea").on('input propertychange', function () {
    if ($(this).attr("data-saved")) {
        var saveBtn = $(this).next();
        $(saveBtn).empty();
        var icon = $("<i>");
        icon.addClass("far fa-save");
        $(saveBtn).append(icon);
        $(this).attr("data-saved", "false");
    }
})
