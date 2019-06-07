$(document).ready(function(){

    setTimeout(function() { 
        $('body').animate({
            opacity: 1,
        }, 'slow');
    }, 500);
    setTimeout(function() { 
        $('.poke-logo').fadeIn();
    }, 1000);
 
    $('.poke-logo').click(function(){
        $('.start-screen').fadeOut();
        setTimeout(function() { 
            $(".center-top").css('background-image', 'none');
            $(".center-top").css('background-color', '#fff');
        }, 500);
        setTimeout(function() { 
            $('.start-screen').remove();
            $( ".main-game" ).removeClass( "hide" ).addClass( "show" );
        }, 600);
      
    });
  });


  //fetch

  fetch('https://pokeapi.co/api/v2/region/')
  .then((response => response.json())) // Call the fetch function passing the url of the API as a parameter
  .then(function(response) {
      // Your code for handling the data you get from the API
      
      for(x = 0; x <= response.results.length; x++){
        console.log(response.results[x].name);
        $('#region-select').append($(`<option>${response.results[x].name}</option>`));
      }
      
  })
  .catch(function() {
      // This is where you run code if the server returns any errors
  });
  
  