function myWeather(local)
{
    //WEATHER
    $.simpleWeather({
        location: local,
        woeid: '',
        unit: 'f',
        success: function(weather)
        {

            // Display Current Data
            $('.temp').text(weather.temp+'\xB0'+weather.units.temp);
            $('.city').text(weather.city);
            $('.details').text('High: '+weather.high+' / Low: '+weather.low);
            $('img').attr('src', weather.thumbnail);

            // Forcast
            for(var i=1; i<5; i++)
            {
                $('.d'+(i+1) +' .day').text(weather.forecast[i].day+': '+weather.forecast[i].high); console.log(weather.forecast[i].day+':'+weather.forecast[i].high);
                $('.d'+(i+1)+' img').attr('src', weather.forecast[i].thumbnail);
            }
        },
        error: function(error)
        {
            // Show if weather cannot be retreived
            $('body').append('<p>Not connected</p>');
        }
    });
}

// GET LOCATION MANUALLY
$('.manual').click( function() 
{
  
    var local = prompt("Please enter location");
    myWeather(local);
});

//GEOLOCATION
/* Does your browser support geolocation? */
if ("geolocation" in navigator)
{
    $('.js-geolocation').show(); 
}
else
{
    $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function()
{
    navigator.geolocation.getCurrentPosition(function(position)
    {
        //load weather using your lat/lng coordinates
        loadWeather(position.coords.latitude+','+position.coords.longitude); 
    });
});

function loadWeather(location, woeid)
{
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'f',
        success: function(weather)
        {
            $.simpleWeather({
                location: location,
                woeid: '',
                unit: 'f',
                success: function(weather)
                {

                    myWeather(location);
                },
                error: function(error)
                {
                    // Show if weather cannot be retreived
                    $('body').append('<p>Not connected</p>');
                }

            });
        },
        error: function(error)
        {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
};

// Test Location
$(document).ready(function()
{
    navigator.geolocation.getCurrentPosition(function(position)
    {
        //load weather using your lat/lng coordinates
        loadWeather(position.coords.latitude+','+position.coords.longitude); 
    });
});