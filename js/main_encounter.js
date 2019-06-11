
let list = document.getElementById('encounter-pokemonshow');


function consultpokemon(id, num){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (Response){
        Response.json()
         .then(function (pokemon){
            //console.log(pokemon)
            //console.log(pokemon.name);
            createPokemon(pokemon, num);
         });
    });
}

function createPokemon(pokemon, num){
    //
    let item = list.querySelector(`#pokemon-${num}`)
    //
    let imgpokemon=item.getElementsByTagName("img")[0]
    imgpokemon.setAttribute("src", pokemon.sprites.front_default)
    //
    let h3=item.getElementsByTagName("h3")[0]
    h3.textContent =pokemon.name;
}
//random wild pokemon in field;

let ran_pokemon = Math.round(Math.random()*150);

consultpokemon(ran_pokemon, 1)
