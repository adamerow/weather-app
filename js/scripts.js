// WEATHER

$.simpleWeather({
    location: 'Spokane, WA',
    woeid: '',
    unit: 'f',
    success: function(weather)
    {
      
      // Display Data
      $('.temp').text(weather.temp);
      $('.city').text(weather.city);
      $('img').attr('src', weather.image);
  
      
      // Entire weather object
      console.log(weather);
    },
    error: function(error)
    {
        // Show if weather cannot be retreived
        $('body').append('<p>Not connected</p>');
    }
  
  });


