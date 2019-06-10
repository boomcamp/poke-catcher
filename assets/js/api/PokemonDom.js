
import all from './fetchApi.js';
import pokemonApi from './pokemonApi.js';

const Pokemon_encounter = document.querySelector('.pokemons');
const BtnExplore = document.querySelector('.btn-explore');
const MapRegion = document.querySelector('img#map-region');
const PokemonEncounters = document.querySelector('#encountered');
const PokemonEncounter = document.querySelector('img#pokemon-encounter');
const locationDiv = document.querySelector('#location-div');
const bagPokemonDiv = document.querySelector('#bag-pokemon-div');
var SelectArea = document.querySelector('.area');
var showOptions = document.querySelector('.catch-option');
const exploreClick = document.querySelector('#explore-click');
const mapClick = document.querySelector('#map-click');
const catchClick = document.querySelector('#catch-click');
const catchBall = document.querySelector('#catch-ball')
const catchPokemons = document.querySelector('.pokemon')
const pokeCatch = document.querySelector('#poke-catch')

exploreClick.addEventListener('click',searchPokemon);
BtnExplore.addEventListener('click',searchPokemon);
mapClick.addEventListener('click',backDefault);
catchClick.addEventListener('click',CatchPokemon);

function CatchPokemon(){
    catchBall.classList.remove('hide');
    catchPokemons.classList.remove('flex');
    catchPokemons.classList.add('hide');
    catchClick.disabled = true;
    var milli = 3500;
    waitCatch(milli).then(PokemonCatch);
}
function PokemonCatch(){
    const pokemonFound = document.querySelector('#FoundPoke');
    var pokemoninbag = document.querySelector('#pokemon-in-bag');
    var bagPokemon = document.querySelector('.pokemons-here');
    var Pokemon_Pic = document.querySelector('#pokemon_pic');
    const Foundpokemon = document.querySelector('.span');
    Foundpokemon.innerHTML = `Pokemon <h2 id="FoundPoke">${(pokemonFound.innerHTML).trim()}</h2> Captured!`;
    var pokemonCount = parseInt((pokemoninbag.innerHTML).trim());
    pokemonCount++;
    var pokemonHere = document.createElement('div');
    pokemonHere.style = "margin-top:10px"
    Pokemon_Pic.setAttribute('width','100px');
    Pokemon_Pic.setAttribute('height','100px');
    pokemonHere.innerHTML = `${(pokemonFound.innerHTML).trim()}`;
    pokemonHere.prepend(Pokemon_Pic);
    bagPokemon.append(pokemonHere);
    pokemoninbag.innerHTML = `${pokemonCount}`;
    catchBall.classList.add('hide');

}

function backDefault(){
    bagPokemonDiv.classList.add('hide');
    locationDiv.classList.remove('hide');
    PokemonEncounters.classList.add('hide');
    PokemonEncounters.classList.remove('flex');
    showOptions.classList.add('hide');
    showOptions.classList.remove('flex');
    BtnExplore.classList.remove('hide');
    MapRegion.classList.remove('hide');
    BtnExplore.disabled = false;
    PokemonEncounter.classList.add('hide');
}

//triggers the explore button
function searchPokemon(){ 
    catchClick.disabled = false;
    catchBall.classList.add('hide');
    catchPokemons.classList.add('flex');
    catchPokemons.classList.remove('hide');
    SelectArea = document.querySelector('.area');
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
function showPokemonPicObject(pokemonObject){
       return `<img id="pokemon_pic" width="400px" height="550px" src="${pokemonObject.sprites.front_default}">`;
}
function showPokemonDetailObject(pokemonObject){
    console.log(pokemonObject.stats);  
    return pokemonObject.name;  
}
function showPokemonStatsObject(pokemonObject){
    var statsDiv = document.createElement('div');
    statsDiv.innerHTML = 
    (pokemonObject.stats)
    .map(stats => {
        return `<p style="font-size:10px">${stats.stat.name} : ${stats.base_stat}</p>`
    }).join('');
    return statsDiv.innerHTML;
}

function passPokemonUrl(pokemonObject){
    var pokemonDiv = document.querySelector('.pokemon');
    var pokemonDivDetails = document.querySelector('.span');
    var PokemonAllArray = [];
    pokemonObject
    .map(pokemonUrl => passPokemonEncounter(pokemonUrl.version_details[0],pokemonUrl.pokemon.name,PokemonAllArray))
    const index = (Math.floor((Math.random()*PokemonAllArray.length)+1));
    all.get(`https://pokeapi.co/api/v2/pokemon/${PokemonAllArray[index]}`)
    .then(objects => { 
        pokemonDiv.innerHTML = `
        ${showPokemonPicObject(objects)}
        `;
        pokemonDivDetails.innerHTML = ` Pokemon <h2 id="FoundPoke">
        ${showPokemonDetailObject(objects)} </h2>appeared! <br><br><br><br>
        ${showPokemonStatsObject(objects)}
        `;
        
        }
        )

    
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

function waitCatch(ms) {
    return new Promise(function(resolve){
    window.setTimeout(function() {
        resolve();
    }, ms);
});
};
function PokemonEncountered() {
    bagPokemonDiv.classList.remove('hide');
    locationDiv.classList.add('hide');
    PokemonEncounters.classList.remove('hide');
    PokemonEncounters.classList.add('flex');
    showOptions.classList.remove('hide');
    showOptions.classList.add('flex');
    BtnExplore.classList.add('hide');
    PokemonEncounter.classList.add('hide');
    PokemonEncounter.removeAttribute('src');
    pokemonApi.PokemonAreaUrl(`https://pokeapi.co/api/v2/location-area/${SelectArea.value}`);
    
};

export default{
    passPokemonObject,
    showPokemonDetailsObject,
    passPokemonUrl,
}