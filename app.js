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