
import pokemonApi from './pokemonApi.js';

const Pokemon_encounter = document.querySelector('.pokemons');

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
    )   
    }else{
        Pokemon_encounter.innerHTML = `<div class="row" > 
        <span id="" ></span>No Pokemon Here</div>`;
    }
}


function showPokemonDetailsObject(pokemonObject){
    
    const pokemonDetails = document.querySelector(`#${pokemonObject.name}`);
    pokemonDetails.innerHTML = ` 
        <img src="${pokemonObject.sprites.front_default}">
        `
}

export default{
    passPokemonObject,
    showPokemonDetailsObject,
}