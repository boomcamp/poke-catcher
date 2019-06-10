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
            $(regId).append('<option>Select Region</option>')
            for(let x in allResValue){
                $(regId).append(`
                <option value="${allResValue[x].url}">${allResValue[x].name}</option>`)
                }
            }
    
    //Setting Default Value
    // let locationURL = "https://pokeapi.co/api/v2/region/1/"
    // fetch(locationURL)
    //         .then(res => res.json())
    //         .then(function(locRes){
    //             locValue = locRes.locations;
    //             // console.log(locValue)
    //         for(let x in locValue){
    //          $(locId).append(`<option value="${locValue[x].url}">${locValue[x].name}</option>`)
    //         }    
    //         });

    // $(regId).html('')

    regId.on('change', function(){
        locationURL = this.value;
        // console.log(locationURL)
        $(locId).html('')
        $(areaId).html('')
        return fetch(locationURL)
            .then(res => res.json())
            .then(function(locRes){
                locValue = locRes.locations;
                // console.log(locValue)
            for(let x in locValue){
             $(locId).append(`<option value="${locValue[x].url}">${locValue[x].name}</option>`)
            }
                
            })

    }) ;


    locId.on('change', function(){
        areaURL = this.value;
        // currentId = this.id;
        // console.log(areaURL)
        areaId.html('');
        return fetch(areaURL)
            .then(res => res.json())
            .then(function(areaRes){
            
                areaVal = areaRes.areas;
            for(let x in areaVal){
             $(areaId).append(`<option value="${areaVal[x].url}">${areaVal[x].name}</option>`)
            } 
        })
        
    })
   
 
    areaId.on('change', function(){
        locAreaUrl = this.value;
        console.log(locAreaUrl);
       
    })

    // console.log(locationURL)
    exploreBtn.on('click', function(){
        return fetch(locAreaUrl)
        .then(res => res.json())
        .then(function(allPoke){
            var encounter = allPoke.pokemon_encounters;
            var randomNum = Math.floor(Math.random()*(encounter.length-1));
            $('#founded-text').text(encounter[randomNum].pokemon.name)  
        })
    })

        
    })
}

fetchLocation('region')

    console.log( "ready" );
});