export default function GetEncounters(area) {
    fetch(`https://pokeapi.co/api/v2/location-area/${area}`)
    .then(data=>data.json())
    .then(showEncounterable)
    .catch(e=>console.info(e));

}

function showEncounterable(area){
    
    let encount = '';

    pokemons = area.pokemon_encounters;
    
    pokemons = pokemons.map(poke=>{
        return poke.pokemon.name;
    });
}


export function randomEncounter(){
        
    pokename = pokemons[Math.floor(Math.random() * pokemons.length)];

    getPokemon(pokename);
}


function getPokemon(pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(data=>data.json())
    .then(showPokemon)
    .catch(e=>console.log(e));
}

function showPokemon(pokemon){
    
    let pokestat = '';

    pokestat += `<h1 class="name-poke" data-name='${pokename}'>${pokename.toString().toUpperCase()}</h1>`

    pokemon.stats.map(pstat =>{
        pokestat += `<h3 class="hp">${pstat.stat.name.toString().toUpperCase()} : ${pstat.base_stat.toString().toUpperCase()}</h3>`
    });

    pokeSprite = pokemon.sprites.front_default;

    document.querySelector('.pf-pokemon').setAttribute('src', pokeSprite);
    document.querySelector('.pokemon-name-stat').innerHTML = pokestat;

}

export function catchPokemon(){

    let newcatched = {
        name: pokename,
        sprite : pokeSprite
    }

    if(catched.length < 6)
        catched.push(newcatched);

    let catchedisplay = '';

    
    catched.map(pokemon=>{
        catchedisplay += `<div class="poke-container" data-name='${pokemon.name}'>
        <img src="${pokemon.sprite}" class="pf-pokemon-c" alt="" width="200px">
        <h3 class="poke-name">${pokemon.name}</h3>
    </div>`
    });

    document.querySelector('.pokemons-here').innerHTML = catchedisplay;

}

var pokemons = '';
var pokename = '';
var pokeSprite = '';
var catched = [];