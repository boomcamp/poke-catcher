const regionSelect = document.getElementById('region');
const locationSelect = document.getElementById('location');
const areaSelect = document.getElementById('area');
const pokemonSelect = document.getElementById('pokemonName');
const explorebutton = document.getElementById('explorePokemon');
const pokeImage = document.getElementById('poke-img');
const pokeCard = document.getElementById('poke-card');
const pokeStatsUpper = document.getElementById('poke-stats1');
const pokeStatsLower = document.getElementById('poke-stats2');
const capturePokemon = document.getElementById('btn-capture');


var pokeEmpty = [
    document.getElementById('pokecon1'),
    document.getElementById('pokecon2'),
    document.getElementById('pokecon3'),
    document.getElementById('pokecon4'),
    document.getElementById('pokecon5'),
    document.getElementById('pokecon6')
];
var pokeContainer = [
    document.getElementById('captured-box1'),
    document.getElementById('captured-box2'),
    document.getElementById('captured-box3'),
    document.getElementById('captured-box4'),
    document.getElementById('captured-box5'),
    document.getElementById('captured-box6')
];
var pokeCatchName = [];

var counter = 0;



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
                            <option value=""  selected ">Select Location</option>
                            <option value="${arrValue.url}"  >${arrValue.name}</option>`;
                       }else{
                           return `<option value="${arrValue.url} ">${arrValue.name}</option>`;
                       } 

                    })
                })
            
            });/* region select end */

            locationSelect.addEventListener('change', function() {
                let areaURL = this.value;
                
                return fetch(`${areaURL}`)
                .then(res => res.json())
                .then(function (posts)  {
                    var postsValue = posts.areas;

                    areaSelect.innerHTML = postsValue.map(function(arrValue){
                        
                        if(postsValue.indexOf(arrValue) == 0){
                            return `
                            <option value=""  selected ">Select Area</option>
                            <option value="${arrValue.url}"  >${arrValue.name}</option>`;
                           
                       }else{
                           return `<option value="${arrValue.url} ">${arrValue.name}</option>`;
                       } 
                       
                        
                    })
                    
                    
                })
                
            });/* location select end */
        
            areaSelect.addEventListener('change', function() {
                let pokemonURL = this.value;
                // console.log(pokemonURL);
                return fetch(`${pokemonURL}`)
                .then(res => res.json())
                .then(function (data)  {
                    explorebutton.removeAttribute('disabled');

                    explorebutton.addEventListener('click', function() {
                        if(counter < 6){
                            capturePokemon.removeAttribute('disabled');
                        }
                        
                        pokeCard.classList.remove('hide');
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
                        let specificPokemonURL = baseURL.concat("pokemon/").concat(pokemonSelect.value);
                        var pokemonName = pokemonSelect.value;
                        // console.log(specificPokemonURL);


                        return fetch(`${specificPokemonURL}`)
                        .then(res => res.json())
                        .then(function (pokemonData)  {
                            var pokeDisplay = pokemonData.sprites.front_default;
                            var pokemonStats = pokemonData.stats;
                            // console.log(pokemonData)
                             console.log(pokeDisplay);
                            // console.log(pokemonStats);
                            var speed = pokemonStats[0].base_stat;
                            var specialDefense =pokemonStats[1].base_stat;
                            var specialAttack =pokemonStats[2].base_stat;
                            var defense = pokemonStats[3].base_stat;
                            var hp=pokemonStats[4].base_stat;
                            var attack= pokemonStats[5].base_stat;

                            pokeImage.innerHTML = `
                                <img id="imgCatch" src="${pokeDisplay}" height="200px" width="200px"  /> 
                                <p id="nameCatch" class="poke-name-size">${pokemonName.toString().toUpperCase()}</p>
                                `;
                            pokeStatsUpper.innerHTML= `
                                    <p>HP: ${hp}</p>
                                    <p>DEFENSE: ${defense}</p>
                                    <p>ATTACK: ${attack}</p>
                                    `;
                            pokeStatsLower.innerHTML= `
                            <p>SPEED: ${speed}</p>
                            <p>SPECIAL DEFENSE: ${specialDefense}</p>
                            <p>SPECIAL ATTACK: ${specialAttack}</p>
                            `;  
                        })
                    }); /* button end */ 
                })
            });/* area select end */
        })
        .catch(console.error);
}

fetchAPI('region');


capturePokemon.addEventListener('click', function(){
    pokeEmpty[counter].setAttribute('hidden',true);
    var getImage = document.getElementById('imgCatch').src;
    var getName = pokemonName.value;
    capturePokemon.setAttribute('disabled',true);
    // explorebutton.setAttribute('disabled',true);
    pokeCard.classList.add('hide');
    pokeContainer[counter].innerHTML = `<img src="${getImage}" height="50%" width="70%"  /> 
    <p>${getName.toString().toUpperCase()}</p>`;
   
    counter++;
    document.getElementById('catchCount').textContent = `CAPTURED (${counter}/6)`;
})
