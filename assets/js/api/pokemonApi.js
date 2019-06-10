import all from './fetchApi.js';
import PokemonDom from './PokemonDom.js';

//pokemon fetching
function getPokemonObject(areaUrl){
    if(areaUrl!=0){ 
    const areaLocationObject = all.get(areaUrl);
    areaLocationObject
    .then(pokemonAreaObject => {
        //passes the object to passPokemonObject function to get the url of each pokemon
        PokemonDom.passPokemonObject(pokemonAreaObject.pokemon_encounters);
    })
    }else{
        PokemonDom.passPokemonObject('none');
    }
}
function getPokemonDetailsObject(pokemonObject){
    const pokemonUrl = all.get(pokemonObject);
    pokemonUrl
    .then(pokemonDetailsObject => 
        {
            PokemonDom.showPokemonDetailsObject(pokemonDetailsObject);
        })
}
function PokemonAreaUrl(pokemonareaUrl){
    const PokemonAreaObject = all.get(pokemonareaUrl);
    PokemonAreaObject
    .then(PokemonAreaObjectArr =>   
       PokemonDom.passPokemonUrl(PokemonAreaObjectArr.pokemon_encounters)
    )
}

function getCaptureRate(url){
    const RateUrl = all.get(url);
    RateUrl
    .then(Url => console.log(Url));
    
}


export default{
    getPokemonObject,
    getPokemonDetailsObject,
    PokemonAreaUrl,getCaptureRate,
}