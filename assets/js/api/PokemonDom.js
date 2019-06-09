
import pokemonApi from './pokemonApi.js';

const Pokemon_encounter = document.querySelector('.pokemons');
const BtnExplore = document.querySelector('.btn-explore');
const MapRegion = document.querySelector('img#map-region');
const PokemonEncounters = document.querySelector('#encountered');
const PokemonEncounter = document.querySelector('img#pokemon-encounter');
const SelectArea = document.querySelector('.area');

BtnExplore.addEventListener('click',searchPokemon);
//triggers the explore button
function searchPokemon(){
    MapRegion.classList.add('hide');
    PokemonEncounters.classList.remove('flex');
    PokemonEncounters.classList.add('hide');
    PokemonEncounter.classList.remove('hide');
    PokemonEncounter.setAttribute('src','./assets/img/encounter.gif');
    BtnExplore.disabled = true;
    var milliseconds = 2500;
    wait(milliseconds).then(PokemonEncountered);
}

//prints the pokemons in the pokemon in the area
function passPokemonObject(pokemonObject){
    if(pokemonObject!='none'){ 
    Pokemon_encounter.innerHTML = ` 
    ${pokemonObject
    .map(pokemonArrObject => {
        return `
        <div class="row" > 
        <span id="${pokemonArrObject.pokemon.name}" ></span>
        ${pokemonArrObject.pokemon.name}</div>`
    })
    .join('')} 
    `;
    pokemonObject
    .map(pokemonArrObject =>
        pokemonApi.getPokemonDetailsObject(pokemonArrObject.pokemon.url)
        //pass the pokemon url to fetch the image of pokemon
    )   
    }else{
        Pokemon_encounter.innerHTML = `<div class="row" > 
        <span id="" ></span>No Pokemon Here</div>`;
    }
}

//prints the img from the object that was fetched in the pokemon url
function showPokemonDetailsObject(pokemonObject){
    
    const pokemonDetails = document.querySelector(`#${pokemonObject.name}`);
    pokemonDetails.innerHTML = ` 
        <img src="${pokemonObject.sprites.front_default}">
        `
}

function passPokemonUrl(pokemonObject){
    var pokemonDiv = document.querySelector('.pokemon');
    var PokemonAllArray = [];
    pokemonObject
    .map(pokemonUrl => passPokemonEncounter(pokemonUrl.version_details[0],pokemonUrl.pokemon.name,PokemonAllArray))
    const index = (Math.floor((Math.random()*411)+1));
    pokemonDiv.innerHTML = `${PokemonAllArray[index]}`;

    
}
//push the name of pokemon in array depending on their chance rate (ex. name: poliwag, chance: 2 result would be array[poliwag,poliwag])
function passPokemonEncounter(pokemonEncounter,name,Arr){
    const pokemonUrlobj = pokemonEncounter;
    const max_chance = pokemonUrlobj.max_chance;
    var pokemonArr = [];
    for(var i=0;i<max_chance;i++){
        pokemonArr.push(name);
    }
    JoinAllArr(pokemonArr,Arr);
}

//push all the pokemon array into one big array
function JoinAllArr(pokemonArr,PokemonAllArray){
    pokemonArr
    .map(Arr => PokemonAllArray.push(Arr))
}


function wait(ms) {
        return new Promise(function(resolve){
        window.setTimeout(function() {
            resolve();
        }, ms);
    });
};

function PokemonEncountered() {
    PokemonEncounters.classList.remove('hide');
    PokemonEncounters.classList.add('flex');
    PokemonEncounter.classList.add('hide');
    BtnExplore.disabled = false;
    PokemonEncounter.removeAttribute('src');
    pokemonApi.PokemonAreaUrl(`https://pokeapi.co/api/v2/location-area/${SelectArea.value}`);
    
};

export default{
    passPokemonObject,
    showPokemonDetailsObject,
    passPokemonUrl,
}