

var seaEl = $('.seaCit');
var seaHisAr = ["New York", "Los Angeles", "Chicago", "Houston", "Pheonix", "San Fransisco"];
var city;
var liStr;
var liEl;
var seaInp;
var seaInpLow;
var iconUrl;

seaEl.keypress(function (event) {
    if (event.originalEvent.keyCode === 13) {
        seaInp = $(seaEl).val();
        his();
        search();

    }
});
function his() {
    seaHisAr.unshift(seaInp);
    seaHisAr.pop();
    for (i = 0; i < seaHisAr.length; i++) {
        city = seaHisAr[i];
        liEl = eval("document.getElementById('li" + [i + 1] + "')");
        liEl.innerHTML = city;
    }
}

function search() {
    $.ajax({
        type: "Get",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + seaInp + "&units=imperial&APPID=2e39d2f153ebc4b5c6bc32bbf26581d0",

    }).then(function (response) {
        for(var i = 0; i < response.list.length; i += 8){
            var element = response.list[i];
            var temp = element.main.temp;
            var wind =  element.wind.speed;
            var humi = element.main.humidity;
            var icon = element.weather[0].icon;
            iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(iconUrl)
            console.log(temp, wind, humi)
             var info = $("<h1>").text("Temperature: " + temp + "\xB0F   WindSpeed:" + wind + "MPH    Humidity:" + humi +"%");
             $(".infoHead").empty();
             var imgEl = $("<img>").attr("src",iconUrl)
             $(".infoHead").append(info).append(imgEl);
        }
        

       

    });
}

$(".list-group-item").on("click", function () {
    seaInp = $(this).text();
    console.log(seaInp);
    search();
});
