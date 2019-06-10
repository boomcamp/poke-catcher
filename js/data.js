const data = (function (){
    fetch('https://pokeapi.co/api/v2/region')
    .then(response => response.json())
    .then(region => {
        getRegion(region.results);   
        getLocUrl(region.results[0].url); 
    })

    function getRegion(region){
        let html = region.map(r => {
            return `<option value=${r.url}>${r.name}</option>`
        }).join('')
        selectRegion.innerHTML = html;
    }

    function getLocUrl(url){
        fetch(url)
            .then(response => response.json())
            .then(loc => {
                getLocation(loc.locations);  
                getAreaUrl(loc.locations[0].url);
            })
    }

    function getAreaUrl(url){
        fetch(url)
            .then(response => response.json())
            .then(area => {
                getArea(area.areas);
                btn.checkBtn();
            })
    }

    function getLocation(loc){
        let html = loc.map(r => {
            return `<option value=${r.url}>${r.name}</option>`
        }).join('')
        selectLocation.innerHTML = html;
    }

    function getArea(area){
        let html = area.map(r => {
            return `<option value=${r.url}>${r.name}</option>`
        }).join('')
        selectArea.innerHTML = html;
    }

    function getPokemonUrl(url){
        fetch(url)
            .then(response => response.json())
            .then(pokemon => {
                getPokemon([...pokemon.pokemon_encounters]);
            })
    }

    function getPokemonDetails(url){
        fetch(url)
            .then(response => response.json())
            .then(details => {
                poke.pokemonPic(details.sprites.front_default);
                poke.pokemonStats(details.stats);
                poke.getBackground(details.types[0].type.name);
            })
    }

    function getPokemon(poke){
        let i = Math.floor(Math.random() * poke.length)
        //console.log(poke[i].pokemon.url);
        selectPokemon.innerHTML = `<p value=${poke[i].pokemon.url}>${poke[i].pokemon.name}</p>`;
        getPokemonDetails(poke[i].pokemon.url);
    }

    return {
        getLocUrl,
        getAreaUrl,
        getPokemonUrl,
        getPokemonDetails,
    }

})()