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
        // console.log('1');
        return response.results
        })
    .then((response) => { 
        // add all the regions dropdown
        // console.log(response);
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
                    // console.log('locations in region');
                    // console.log(response);

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
                    // console.log('getTheUrl ' + getTheUrl); 

                getUrl = getTheUrl; // passes it outside of scope
                // console.log('getURL' +getUrl); //debugger    
                }
                
            });  
      
        regionUrl = getUrl; // gets the region url from inner scopes
        // console.log(regionUrl + 'region url');
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
     
    })
    .then(() => {
        $('#explore').on('click', function(){
            //check if area is empty
            var selectedArea = $('#area-select').children("option:selected").val();
            if (typeof selectedArea == 'undefined'){
                // console.log('no area');
            }
            else{
                var loc = 'https://pokeapi.co/api/v2/location-area/?limit=700';
                fetch(loc)
                .then((response => response.json())) 
                .then(response => response.results)
                .then(response => {
                    // console.log(selectedArea);
                    var getUrl ; 
                    response.forEach(element => {
                        if(selectedArea == element.name){
                            getUrl = element.url
                        }
                        });
                    return getUrl            
                })
                .then((url) => { //pokemons
                    fetch(url)
                    .then((response => response.json()))
                    .then(response => response.pokemon_encounters)
                    .then(response => { // get rand pokemon
                            var min = 0; 
                            var max = response.length;  
                            var random =Math.floor(Math.random() * (+max - +min)) + +min; 
                            return JSON.stringify(response[random].pokemon)
                    })
                    .then((response)=>{
                        data = JSON.parse(response);
                        // console.log(response + 'the king is here')
                        x = response;
                        //insert pokename
                        $('#poke-name').html(data.name)
                   
                        //insert capture button, remove previous if it exists
                        if ($("#capture")){
                            $("#capture").remove();
                        }
                        $(".left-box").append("<button id='capture'>Capture</button>");
                        
                        $("#capture").click(() => { // when a pokemon gets captured
                            // console.log('capture')
                            $('#poke-name').html('CAPTURED!!! <br> <br> CLICK EXPLORE TO FIND MORE POKEMON')
                            $("#poke-sprite").attr("src",'#');
                            $(".right-box").empty();
                            $(".right-box").append("<h4>Details</h4>");
                            $("#capture").remove();
                            $("#add-pokemon").attr("src",response.front_default);
                            
                        })
                        return data.url
                    })
                    .then(url => { // get sprites
                        fetch(url)
                        .then((response => response.json()))
                        .then(response => { // insert stats

                            //remove previous stats if it exists
                            $(".right-box").empty();
                            $(".right-box").append("<h4>Details</h4>");
                            // console.log('stats');
                            var stats = response.stats;
                            stats.map( element => {
                                $(".right-box").append(`<span>${element.stat.name}: </span>${element.base_stat} <br>`);
                                // console.log(element.base_stat, element.stat.name )
                            })
                            
                            return response
                        })
                        .then(response => response.sprites)
                        .then(response => {// places image in DOM
                            $("#poke-sprite").attr("src",response.front_default);
                            // console.log(response.back_default);
                          
                            $("#capture").click(() => {
                                var count = $(".background-pokemon").children().length;
                                $(".bottom").append(`<img src="${response.front_default}" alt="" id="add-pokemon">`);
                                var uniqueID = count.toString();
                                $(".background-pokemon").append(`<div class='bg-pokemon-child' id='${uniqueID}'><div>`);
                                var imageUrl = response.front_default;
                                $(`#${uniqueID}`).css("background-image", "url(" + imageUrl + ")");
                                // console.log('loop'); 
                                function loop() { // floating pokemon
                                    $('#add-pokemon').css({'margin-top':0});
                                    $('#add-pokemon').animate ({
                                        'margin-top': '+=5',
                                    }, 1000, 'linear', function() {
                                        {
                                            $('#add-pokemon').animate ({
                                                'margin-top': '-=5',
                                            }, 1000, 'linear', function() {
                                                
                                                loop();
                                            });
                                        }
                                        loop();
                                    });
                                }
                                loop();
                                                        
                            })
                            
                            return response
                        })
                       
                    })  
                })
                .catch(err => console.log(err))
            }

          
        })
        
    })
    
    
    .catch(function(err) {
        console.error(err);
});
  







