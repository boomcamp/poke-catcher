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
        $("#region-select").val($("#region-select:first").val());  
        return response
    })
    .then((response) => { // on region name get url for the city dropdown
        var regionUrl; 
        $('#region-select').on('change', function() {
            var getUrl; // passes it outside of scope
            var regionName = this.value;
            response.forEach(element => {
                if (regionName == element.name){ 
                   fetch(element.url)
                   .then((response => response.json()))
                   .then((response => response.locations))  
                   .then((response) => { 
                    // add all the cities dropdown
                    console.log('locations in region');
                    console.log(response);

                    $('#city-select').find('option').remove(); //cleans the city dropdown for previous populations  //fixes bug where selecting regions keeps adding the cities
                    response.forEach(element => {
                        $('#city-select').append(`
                        <option>
                        ${element.name}
                        </option>
                        `);
                        });                 
                    })
                    .catch(function(err) {
                    console.error(err);
                    });
                    
                    var getTheUrl = element.url;
                    console.log('getTheUrl ' + getTheUrl); 

                getUrl = getTheUrl; // passes it outside of scope
                console.log('getURL' +getUrl); //debugger    
                }
                
            });  
      
        regionUrl = getUrl; // gets the region url from inner scopes
        console.log(regionUrl + 'region url');
        });
        
        $('#city-select').on('change', function (){
            fetch(regionUrl)
            .then((response => response.json()))
            .then((response) => response.locations)
            .then((response) => {
                response.forEach(element =>{
                    //gets areas from url of city 
                 
                    if (this.value == element.name){
                        
                        fetch(element.url)
                        .then((response => response.json()))
                        .then(response => response.areas)
                        .then(response => {
                           
                            $('#area-select').find('option').remove(); //cleans the city dropdown for previous populations  //fixes bug where selecting regions keeps adding the cities
                            response.forEach(element => {
                                $('#area-select').append(`
                                <option>
                                ${element.name}
                                </option>
                                `);
                                
                                }); 
                            
                        })
                        .catch(function(err) {
                            console.error(err);
                            });
                    
                    }  
                 
                }) 
            })


            .catch(function(err) {
                console.error(err);
            }); 
            
           
        })

        $('#explore').on('click', function(){
            var loc = 'https://pokeapi.co/api/v2/location-area/?limit=700';
            fetch(loc)
            .then((response => response.json())) 
            .then(response => console.log(response))
            .then(response => {
                // get selected area, compare to array
            })
        })


     
    })
    
  
    .catch(function(err) {
        console.error(err);
});
  







