const selectRegion = document.querySelector('.region')
const selectLocation = document.querySelector('.location')
const selectArea = document.querySelector('.area')
const selectPokemon = document.querySelector('.pokemon')
const exploreBtn = document.querySelector('.explore')
const captureBtn = document.querySelector('.capture')
const pokeStats = document.querySelector('.pokeStats')
const encounter = document.querySelector('.encounter')
let captureHtml = '';
let count = 0;
encounter.style.display = 'none';


function checkBtn(){
    if(selectArea.value){
        exploreBtn.disabled = false;
    }
    else{
        exploreBtn.disabled = true;
    }
}

fetch('https://pokeapi.co/api/v2/region')
    .then(response => response.json())
    .then(region => {
        getRegion(region.results);   
        getLocUrl(region.results[0].url); 
    })

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
            checkBtn();
        })
}

function getBackground(type){  
    console.log(type);
    if(type == 'water'){
        document.querySelector('.poke').style.backgroundImage = "url('img/water.png')";
    }
    else if(type == 'rock'){
        document.querySelector('.poke').style.backgroundImage = "url('img/cave.png')";
    }
    else if(type == 'ground'){
        document.querySelector('.poke').style.backgroundImage = "url('img/ground.png')";
    }
    else if(type == 'grass'){
        document.querySelector('.poke').style.backgroundImage = "url('img/grass.png')";
    }
    else if(type == 'normal'){
        document.querySelector('.poke').style.backgroundImage = "url('img/normal.png')";
    }
    else if(type == 'bug'){
        document.querySelector('.poke').style.backgroundImage = "url('img/background.jpg')";
    }
    else{
        document.querySelector('.poke').style.backgroundImage = "url('img/city.png')";
    }

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
            pokemonPic(details.sprites.front_default);
            pokemonStats(details.stats);
            getBackground(details.types[0].type.name);
        })
}

function pokemonStats(stats){
    pokeStats.innerHTML = `
        <p>${stats[0].stat.name} : ${stats[0].base_stat}</p>
        <p>${stats[1].stat.name} : ${stats[1].base_stat}</p>
        <p>${stats[2].stat.name} : ${stats[2].base_stat}</p>
        <p>${stats[3].stat.name} : ${stats[3].base_stat}</p>
        <p>${stats[4].stat.name} : ${stats[4].base_stat}</p>
        <p>${stats[5].stat.name} : ${stats[5].base_stat}</p>
    `;
}

function pokemonPic(url){
    document.querySelector('.pokePic').innerHTML = `<img src="${url}">`;
}

function getPokemon(poke){
    let i = Math.floor(Math.random() * poke.length)
    //console.log(poke[i].pokemon.url);
    selectPokemon.innerHTML = `<p value=${poke[i].pokemon.url}>${poke[i].pokemon.name}</p>`;
    getPokemonDetails(poke[i].pokemon.url);
}

function getRegion(region){
    let html = region.map(r => {
        return `<option value=${r.url}>${r.name}</option>`
    }).join('')
    selectRegion.innerHTML = html;
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

selectRegion.addEventListener('change', function(event){
    getLocUrl(this.value);
})

selectLocation.addEventListener('change', function(event){
    getAreaUrl(this.value);
})

exploreBtn.addEventListener('click', function(event){
    getPokemonUrl(selectArea.value);
    encounter.style.display = 'block';
    document.querySelector('.msg').style.display = 'none';
})

captureBtn.addEventListener('click', function(event){
    encounter.style.display = 'none';
    document.querySelector('.msg').style.display = '';

    if(count < 6){
        document.querySelector('.msg').innerHTML = `<p>Captured ${selectPokemon.innerText}, explore to find more pokemon</p>`;
        captureHtml += `<div class='mypoke'>${document.querySelector('.pokePic').innerHTML}${selectPokemon.innerHTML}</div>`;
        document.querySelector('.captured').innerHTML = captureHtml;

        count++;
        document.querySelector('.counter').innerText = `CAPTURED ${count}/6`;
    }
    else{
        document.querySelector('.msg').innerHTML = `<p>no more masterball</p>`;
    }
})

