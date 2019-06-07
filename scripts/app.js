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

    
    $('.regions-container').hide();
    $('.locations-container').hide();
    $('.game-container').hide();
    $('.magnify').hide();


    $('.landing-title').click(function(){
        $('.landing-container').fadeOut();
        $('.regions-container').fadeIn();
    })

   
    $('.backtoMain').click(function(){
        $('.regions-container').fadeOut();
        $('.landing-container').fadeIn();
    })

    $('.backtoRegion').click(function(){
        $('.locations-container').fadeOut();
        $('.region-display').fadeIn();
    })
    
    $('.backtoLocation').click(function(){
        $('.game-container').fadeOut();
        $('.regions-container').fadeIn();
        document.querySelector('body').className = '';

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
                
                viewLocation(regionURL);

            })

        });
        
    })

})

function viewPokemon(url){
    return fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(pokemon){
            let randTime = getRandomArbitrary(3000 , 10000)
            let pokemonImgSrc = pokemon.sprites.front_default;
            
            $('.magnify').fadeIn();
            $('.explore-btn-wrapper').fadeOut();
            $('.pokemon-display').fadeOut();
            setTimeout(function(){
              
                $('.pokemon-display').fadeIn();
                $('.magnify').fadeOut();
                $('.explore-btn-wrapper').fadeIn();

                let pokemonImg = $(
                    `
                    <img src="${pokemonImgSrc}" width="200">
                     
                    `
                )

                $('.pokemon-display').html(pokemonImg);


             
            } , randTime)

        })
      
   


}


function explore(url , areaName){
 
    $(`.regions-container`).fadeOut();
    $(`.game-container`).fadeIn();
    $(`.area-name`).html(areaName);
    var randomNum = getRandomArbitrary(1 ,6);

    
    $('body').addClass(`background` , {duration:500});


    return fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(area){
            let pokemonEncounters = area.pokemon_encounters;

            $('.explore-btn').click(function(){
                let randNum = getRandomArbitrary(0 , pokemonEncounters.length);

                // setTimeout(function(){
                //     console.log(pokemonEncounters[randNum]);
                // } , randTime)
                viewPokemon(pokemonEncounters[randomNum].pokemon.url)
            })


           
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