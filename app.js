$(document).ready(function(){

    setTimeout(function() { 
        $('body').animate({
            opacity: 1,
        }, 'slow');
        console.log('1');
    }, 500);
    setTimeout(function() { 
        $('.poke-logo').fadeIn();
        console.log('2');
    }, 1000);
 
    $('.poke-logo').click(function(){
       
        $('.start-screen').fadeOut();
        setTimeout(function() { 
            $(".center-top").css('background-image', 'none');
            $(".center-top").css('background-color', '#fff');
        }, 500);
        
        console.log('pokelogo');
    });

    
    
  });