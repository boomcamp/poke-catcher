$( document ).ready(function() {

const pokeapiURL = "https://pokeapi.co/api/v2/"

const regId = $('#region-inp')
const locId = $('#loc-inp')
const areaId = $('#area-inp')
const exploreBtn = $('#explore-btn')

const fetchLocation = (path)=>{
    return fetch(`${pokeapiURL}${path}`)
    .then(res => res.json())
    .then(function(allRes){
        var allResValue = allRes.results;
        
        if(path ==='region'){
            $(regId).append('<option>- select region -</option>')
            for(let x in allResValue){
                $(regId).append(`
                <option value="${allResValue[x].url}">${allResValue[x].name}</option>`)
                }
            }
    

    regId.on('change', function(){
        locationURL = this.value;
        $(locId).html('')
        $(areaId).html('')
        return fetch(locationURL)
            .then(res => res.json())
            .then(function(locRes){
                locValue = locRes.locations;
            $(locId).append('<option>- select location -</option>')
            for(let x in locValue){
             $(locId).append(`<option value="${locValue[x].url}">${locValue[x].name}</option>`)
            }
                
            })

    }) ;


    locId.on('change', function(){
        areaURL = this.value;
        areaId.html('');
        return fetch(areaURL)
            .then(res => res.json())
            .then(function(areaRes){
            areaVal = areaRes.areas;
            $(areaId).append('<option>- select area -</option>')
            for(let x in areaVal){
             $(areaId).append(`<option value="${areaVal[x].url}">${areaVal[x].name}</option>`)
            } 
        })
        
    })
   
 
    areaId.on('change', function(){
        locAreaUrl = this.value;    
    })

    var pokeName;
  
    exploreBtn.on('click', function(){
        $('.found-cont').removeClass('hide')
        fetch(locAreaUrl)
        .then(res => res.json())
        .then(function(allPoke){
            encounter = allPoke.pokemon_encounters;
            var randomNum = Math.floor(Math.random()*(encounter.length-1));
            console.log(randomNum)
            pokeName = encounter[randomNum].pokemon.name ;
            console.log(pokeName)
            pokeUrl = encounter[randomNum].pokemon.url ;
            console.log(pokeUrl)
            $('#founded-text').text(pokeName)
            if(pokeUrl){
            fetch(pokeUrl)
            .then(res => res.json())
            .then(function(details){
                pokePics = details.sprites.front_default;
                $('#poke-image').attr('src', pokePics);
                $('#speed').text(details.stats[0].base_stat)  
                $('#sp-defense').text(details.stats[1].base_stat);
                $('#sp-attack').text(details.stats[2].base_stat);
                $('#defense').text(details.stats[3].base_stat);
                $('#attack').text(details.stats[4].base_stat)
                $('#hp').text(details.stats[5].base_stat);


            })
            }
        })
    
    })

    $('#catch-btn').on('click', function(){
        $('.found-cont').addClass('hide')
        $('.found-cont-captured').removeClass('hide')
        $('.capture-text').text(`YOU'VE CAPTURED ${pokeName}`)



    })
        
    })
}

fetchLocation('region')

});