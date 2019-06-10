var pokemonBag = [];
var encounteredPokemon = [];
function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
}

function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}



$(document).ready(function(){
    $('.capture-btn').hide();
  
    

    $('.regions-container').hide();
    $('.locations-container').hide();
    $('.game-container').hide();
 

    $('.landing-title').click(function(){
        $('.landing-container').fadeOut();
        $('.regions-container').fadeIn();
        clearStat();
        
    })

   
    $('.backtoMain').click(function(){
        $('.regions-container').fadeOut();
        $('.landing-container').fadeIn();
        clearStat();
        
    })

    $('.backtoRegion').click(function(){
        $('.locations-container').fadeOut();
        $('.region-display').fadeIn();
        clearStat();

    })
    
    $('.backtoLocation').click(function(){
        clearStat();
        $('.game-container').fadeOut();
        
        $('.regions-container').fadeIn();

        document.querySelector('body').className = '';
        
        let imgDisplay = document.querySelector('.img-display');
        imgDisplay.src = 'img/tumblr_nr8uncLPbG1scncwdo1_540.gif';

        $('.capture-btn').fadeOut();
        
        $('.stat-title').html('Unavailable');
        $('.text-display').html('Explore and Capture Pokemons');
    })


   getRegions('https://pokeapi.co/api/v2/region')
    .then(function(regions){
        let regionsArr = regions.results;


        regionsArr.reverse().forEach(element => {
            let region = element.name;
            let regionURL = element.url;
            let regionList = $(
                `<li class="list-group-item ${region}-name">`+
                    '<i class="fa fa-angle-right"></i>' +
                    region +
                '</li>'
            )

            $('.regions-group').prepend(regionList);

            $(`.${region}-name`).click(function(){
               
                $('.region-display').fadeOut();
                $('.locations-container').fadeIn();
                $('.stats-wrapper').empty();
                viewLocation(regionURL);

            })

        });
        
    })

})


function clearStat(){
    $('.stats-wrapper').html('');
    
}


function capturedPokemon (pokemonName , imgSrc){
  
    this.pokemonName = pokemonName;
    this.imgSrc = imgSrc;


}

function capture(pokemonName , imgSrc){
   
    let captureRand = 0;
    
    $('.stat-title').html(`<b>Capturing ${pokemonName}. Please wait!</b>`);
   
    $('.stats-wrapper').empty();
    $('.capture-btn').fadeOut();
    $('.explore-btn').fadeOut();
    
    captureRand = getRandomArbitrary(0 , 10);

    console.log(captureRand);
    setTimeout(function(){
        
        if(captureRand < 10){

          

            console.log(pokemonBag.length);
            

           if(pokemonBag.length < 6){
                $('.bag-title').html(`Pokemon ${pokemonBag.length + 1}/6`)
                $('.stat-title').html(`<b style="color:green">${pokemonName} succesfully captured</b>`);

                let insertPokemon = new capturedPokemon(pokemonName , imgSrc);

                pokemonBag.push(insertPokemon);
                let slotDisp = $(`
                        <div class="slot">
                            <img src="${imgSrc}">
                            <span class="pokemon-name">${pokemonName}</span>
                        </div>
                `)    

                $(`.slot-container`).prepend(slotDisp);

           }
           else{
            $('.stat-title').html(`<b style="color:orange">You cannot carry anymore!</b>`);

           }
     
         
         
        }
        else{
            $('.stat-title').html(`<b style="color:red">Failed to capture ${pokemonName} </b>`);
        }

     
        $('.explore-btn').fadeIn();
     
       
    } , 1000)

   



   
}

function viewPokemon(url , baseUrl ,areaName){

   
    return fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(pokemon){
            let imgDisplay = document.querySelector('.img-display');
            
            let pokemonImgSrc = pokemon.sprites.front_default;
            let randTime = getRandomArbitrary(1000 , 2000)
           
            pokemonStats = pokemon.stats;
            imgDisplay.src = '';

            imgDisplay.src = 'img/lg.searching-for-loading-icon.gif';
           
            $('.explore-btn').fadeOut();
            $('.text-display').empty();
            $('.capture-btn').fadeOut();
            $('.stats-wrapper').empty();

            $('.stat-title').html('Searching for Pokemon')
            setTimeout(function(){
                
                
                $('.capture-btn').fadeIn();
               
                $('.explore-btn').fadeIn();
            
                console.log(randTime , pokemonImgSrc);  
            
                $('.stats-wrapper').empty();


                $('.text-display').html(`You found a ${pokemon.name}`);
                pokemonStats.forEach(element => {
                    let stats = element.stat;
                    let displayStats = $(`
                        <div class="stat">
                            <span>${stats.name}</span>
                            <span class="float-right">${element.base_stat}</span>
                        </div>
                    `);

                    $('.stats-wrapper').append(displayStats);
                    $('.stat-title').html('Statistics')

               
                    imgDisplay.src = `${pokemonImgSrc}`;
                });
             
            } , randTime)
       
           
            
          
              
            
        
        })
       
      
   


}
function explore(url , areaName){
    
    $(`.regions-container`).fadeOut();
    $(`.game-container`).fadeIn();
    $(`.area-name`).html(areaName);
    
    
    
    $('body').addClass(`background` , {duration:500});
    

    return fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(area){
            let pokemonEncounters = area.pokemon_encounters;
            let randNum = 0;
           
            $('.explore-btn').click(function(){
               
               
                randNum = getRandomArbitrary(0 , pokemonEncounters.length);
                
                // setTimeout(function(){
                //     console.log(pokemonEncounters[randNum]);
                // } , randTime)
               
                encounteredPokemon = pokemonEncounters[randNum].pokemon.url
                viewPokemon(encounteredPokemon , url , areaName)
                
            })
            
            $('.capture-btn').click(function(){
           
                capturePokemon(encounteredPokemon)
                // capture(pokemon.name , pokemonImgSrc);
                
            })
            
           
        })


}

function capturePokemon(encounteredPokemon){
    return fetch(encounteredPokemon)
        .then(function(response){
            return response.json();
        })
        .then(function(pokemon){
            capture(pokemon.name , pokemon.sprites.front_default);
            console.log(pokemon.sprites.front_default);
            console.log(pokemon.name);
            
        })
}

function viewArea(url){
    
    return fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(location){
            let locationArea = location.areas;
            let locationName = location.name;
          
            
            if(locationArea.length > 0){
                locationArea.reverse().forEach(element => {
                    let displayArea = $(`

                        <li class="list-group-item-area ${element.name}-pokeArea">${element.name}</li>

                    `);

                    $(`.${locationName}-area`).prepend(displayArea);

                   
                   $(`.${element.name}-pokeArea`).click(function(){
                        explore(element.url , location.name);
                   })


                });
            }
            else{
            
                let noArea = $(
                    `<li class="list-group-item-area">No available area</li>`
                )
                
                $(`.${locationName}-area`).html(noArea);

            }

        })
}


function viewLocation(region){
    return fetch(region)
        .then(function(response){
            return response.json();
        })
        .then(function(region){

        
            let regionName = region.name;
            let locationsArr = region.locations;
            $('.region-name').html(jsUcfirst(regionName));
            locationsArr.reverse().forEach(element => {
               
                let locationList = $(
                    `<li class="list-group-item ${element.name}-location">
                        <i class="fa fa-angle-right"></i>
                        ${element.name}     
                    </li>


                    <ul class="list-group location-area ${element.name}-area remove-display">
                         
                    </ul>
                    
                    `

                    
                )

                $('.locations-group').prepend(locationList);


                viewArea(element.url);

                $(`.${element.name}-location`).click(function(){
                    
                    $('.stats-wrapper').empty();
                    $(`.${element.name}-area`).toggle();
                })
            });
          
          
        })
}

function getRegions(url){
    
    
    return fetch(url)
        .then(function(response){
            return response.json()
        })
    
}