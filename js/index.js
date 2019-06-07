const regionSelect = document.getElementById('region');
const locationSelect = document.getElementById('location');
const areaSelect = document.getElementById('area');
const pokemonSelect = document.getElementById('pokemonName');
const explorebutton = document.getElementById('explorePokemon');


const fetchAPI = (path) => {
    const baseURL = `https://pokeapi.co/api/v2/`;

    return fetch(`${baseURL}${path}`)
        .then(res => res.json())
        .then(function (posts)  {
            var postsValue = posts.results;
            
            if(path === 'region'){
                regionSelect.innerHTML = postsValue.map(function(arrValue){
                    
                    if(postsValue.indexOf(arrValue) == 0){
                         return `
                         <option value=""  selected ">Select Region</option>
                         <option value="${arrValue.url}"   >${arrValue.name}</option>`;
                    }else{
                        return `<option value="${arrValue.url} ">${arrValue.name}</option>`;
                    }  
                 })
            }

            region.addEventListener('change', function() {
                let locationUrl = this.value;
                //console.log(locationUrl);
                return fetch(`${locationUrl}`)
                .then(res => res.json())
                .then(function (posts)  {
                    var postsValue = posts.locations;

                    locationSelect.innerHTML = postsValue.map(function(arrValue){
                        if(postsValue.indexOf(arrValue) == 0){
                            return `
                            <option value=""  selected ">Select Region</option>
                            <option value="${arrValue.url}"   >${arrValue.name}</option>`;
                       }else{
                           return `<option value="${arrValue.url} ">${arrValue.name}</option>`;
                       } 

                    })
                })
            
            });

            locationSelect.addEventListener('change', function() {
                let areaURL = this.value;
                
                return fetch(`${areaURL}`)
                .then(res => res.json())
                .then(function (posts)  {
                    var postsValue = posts.areas;

                    areaSelect.innerHTML = postsValue.map(function(arrValue){

                        if(postsValue.indexOf(arrValue) == 0){
                            return `
                            <option value=""  selected ">Select Region</option>
                            <option value="${arrValue.url}"   >${arrValue.name}</option>`;
                       }else{
                           return `<option value="${arrValue.url} ">${arrValue.name}</option>`;
                       } 

                    })
                })
            
            });

            areaSelect.addEventListener('change', function() {
                let pokemonURL = this.value;
                // console.log(pokemon.pokemon_encounters);
                return fetch(`${pokemonURL}`)
                .then(res => res.json())
                .then(function (data)  {
                    var encounters = data.pokemon_encounters;
                    var randomNumber = Math.floor(Math.random()*(encounters.length-1));
                    var pokemonName = encounters[randomNumber].pokemon.name;
                    
                    // console.log(encounters);
                    pokemonSelect.innerHTML =  encounters.map(function(arrValue){
                        
                        if(encounters.indexOf(arrValue) == randomNumber){
                            
                            return `<option value="${pokemonName}"  selected >${pokemonName}</option>`
                        }else{
                            
                        }

                    });

                   
                })
            
            });

            explorebutton.addEventListener('click', function() {
                console.log(pokemonSelect.value);
            });

            
            
 
        })
        .catch(console.error);
        
}

fetchAPI('region');



