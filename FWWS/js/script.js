$(document).ready(function(){
    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('header').toggleClass('toggle');
    });


    $(window).on('scroll load', function(){
        $('#menu').removeClass('fa-times');
        $('header').removeClass('toggle');

    });

});



$('.search-btn').click(function(){
    let apiKey = '4ef20130ec445b8e8bc0a4b8e2b9bd7f';
    let cityName = $('.search-bar').val();
    callForToday(apiKey, cityName);
});


function callForToday(apiKey, cityName){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey,
        success: function(data){
            console.log('success', data);
            displayWeather(data);
            callForWeek(apiKey, data.coord.lon, data.coord.lat);
        }
    });

}

function callForWeek(apiKey, lon, lat){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=current,minutely,hourly,alerts&appid=" + apiKey,
        success: function(data){
            console.log('success', data);
            displayWeekWeather(data);
        }
    });
}


function loadPhotos(name){
    $(' #one').attr('src', "https://source.unsplash.com/1600x900/?" + name);
    $(' #two').attr('src', "https://source.unsplash.com/1600x900/?" + name);
    $(' #three').attr('src', "https://source.unsplash.com/1600x900/?" + name);
    $(' #four').attr('src', "https://source.unsplash.com/1600x900/?" + name);
}

function displayWeather(data){
    $('.today-forecast .heading').text("Weather in " + data.name + " now");
    $('#city-name span').text(data.name);

    $('.counter #temp span').text(data.main.temp + "°C");
    $('.counter #pressure span').text(data.main.pressure);
    $('.counter #wind-speed span').text(data.wind.speed);
    $('.counter #humidity span').text(data.main.humidity);


    loadPhotos(data.name);
};

function displayWeekWeather(data){
    $('#first-day span').text(new Date(data.daily[1].dt * 1000).toDateString());
    $('#first-day #temp').text(data.daily[1].temp.day);
    $('#first-day #wind-speed').text(data.daily[1].wind_speed);

    $('#second-day span').text(new Date(data.daily[2].dt * 1000).toDateString());
    $('#second-day #temp').text(data.daily[2].temp.day);
    $('#second-day #wind-speed').text(data.daily[2].wind_speed);

    $('#third-day span').text(new Date(data.daily[3].dt * 1000).toDateString());
    $('#third-day #temp').text(data.daily[3].temp.day);
    $('#third-day #wind-speed').text(data.daily[3].wind_speed);

    $('#fourth-day span').text(new Date(data.daily[4].dt * 1000).toDateString());
    $('#fourth-day #temp').text(data.daily[4].temp.day);
    $('#fourth-day #wind-speed').text(data.daily[4].wind_speed);

    $('#fifth-day span').text(new Date(data.daily[5].dt * 1000).toDateString());
    $('#fifth-day #temp').text(data.daily[5].temp.day);
    $('#fifth-day #wind-speed').text(data.daily[5].wind_speed);

}
