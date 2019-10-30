export default function GetEncounters(area) {
    // console.log(location)
    fetch(`https://pokeapi.co/api/v2/location-area/${area}`)
    .then(data=>data.json())
    .then(showEncounterable)
    .catch(e=>alert(e));

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
    document.querySelector('.pokename').innerHTML = pokename;
}


function getPokemon(pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(data=>data.json())
    .then(showPokemon)
    .catch(e=>console.log(e));
}

function showPokemon(pokemon){
    
    let pokestat = '';

    pokemon.stats.map(pstat =>{
        pokestat += `<h3 class="hp">${pstat.stat.name} : ${pstat.base_stat}</h3>`
    });

    pokeSprite = pokemon.sprites.front_default;

    document.querySelector('.pf-pokemon').setAttribute('src', pokeSprite);
    document.querySelector('.pokestats').innerHTML = pokestat;

    // console.log(pokemon.sprites.front_default);
}

export function catchPokemon(){
    let newcatched = {
        name: pokename,
        sprite : pokeSprite
    }

    catched.push(newcatched);

    let catchedisplay = '';

    catched.map(pokemon=>{
        catchedisplay += `<div class="poke-container" data-name='${pokemon.name}'>
        <img src="${pokemon.sprite}" class="pf-pokemon-c" alt="" width="200px">
        <h3 class="poke-name">${pokemon.name}</h3>
    </div>`
    });

    document.querySelector('.catched').innerHTML = catchedisplay;
}

var pokemons = '';
var pokename = '';
var pokeSprite = '';
var catched = [];