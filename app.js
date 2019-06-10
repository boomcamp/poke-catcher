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
  var arrRegions = [];
  fetch('https://pokeapi.co/api/v2/region/')
    .then((response => response.json())) 
    .then((response) => {
        console.log('1');
        return response.results
        })
    .then((response) => { 
        // add all the regions dropdown
        console.log(response);
        response.forEach(element => {
            $('#region-select').append(`
            <option>
            ${element.name}
            </option>
            `);
            });
        return response
    })
    .then((response) => { // on region name get url for the city dropdown
        $('#region-select').on('change', function() {
            console.log(this.value)
            var regionName = this.value;
            response.forEach(element => {
                if (regionName == element.name){
                   fetch(element.url)
                   .then((response => response.json()))
                   .then((response => response.locations))  
                   .then((response) => { 
                    // add all the cities dropdown
                    console.log(response);
                    response.forEach(element => {
                        $('#city-select').append(`
                        <option>
                        ${element.name}
                        </option>
                        `);
                        });
                    return response
                    })
                    .catch(function(err) {
                    console.error(err);
            });
                
                }
            });      
        });
    })
    .then((url) => console.log(url) )
    .catch(function(err) {
        console.error(err);
});
  




// .then((response) => { // on region name get url for the city dropdown
//     $('#region-select').on('change', function() {
//         console.log(this.value)
//         var regionName = this.value;
//         response.forEach(element => {
//             if (regionName == element.name){
//                 $('#city-select').append(`
//                 <option>
//                 ${element.url}
//                 </option>
//                 `);
//                 console.log('ye')
//             }
//         });      
//     });
// })
  