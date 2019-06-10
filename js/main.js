/** Pokeball effect */

var upClass = 'toggle-up';
var downClass = 'toggle-down';

function toggle() {
  var square = document.querySelector('.pokeball');
  
  if (~square.className.indexOf(downClass)) {
    square.className = square.className.replace(downClass, upClass);
  } else {
        square.className = square.className.replace(upClass, downClass);
  }
  
}

const selectRegion = document.querySelector('#region');
const selectLocation = document.querySelector('#location');
const selectArea = document.querySelector('#area');
const selectPokemon = document.querySelector('.name');
const exploreBtn = document.querySelector('#explore');
const captureBtn = document.querySelector('.capture');
const pokeDetails = document.querySelector('.details');
const pokemonPicture = document.querySelector('.align-center');
const pokemonDetails = document.querySelector('.details');


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
        })
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
    pokemonDetails.classList.remove('hide');
    pokemonPicture.classList.remove('hide');
    getPokemonUrl(selectArea.value);
    document.querySelector('.note').classList.add('hide');
})

function pokemonStats(details){
  pokeDetails.innerHTML = `
        <li>${details[0].stat.name}: ${details[0].base_stat}</li>
        <li>${details[1].stat.name}: ${details[1].base_stat}</li>
        <li>${details[2].stat.name}: ${details[2].base_stat}</li>
        <li>${details[3].stat.name}: ${details[3].base_stat}</li>
        <li>${details[4].stat.name}: ${details[4].base_stat}</li>
        <li>${details[5].stat.name}: ${details[5].base_stat}</li>
    `;
}

function pokemonPic(url){
    console.log(url);
    document.querySelector('.poke-pic').setAttribute('src', `${url}`);
    document.querySelector('.poke-pic').setAttribute('value', `${url}`);
}

function getPokemon(poke){
    let i = Math.floor(Math.random() * poke.length)

    selectPokemon.innerHTML =
    `${poke[i].pokemon.name}`;
    getPokemonDetails(poke[i].pokemon.url);
}

var catchPoke = document.querySelector('.catch');
var pokename = document.querySelector('.name');
var pokepic =  document.querySelector('.poke-pic');


var count = 0;

captureBtn.addEventListener('click', function(event) {
document.querySelector('.note').classList.remove('hide');
document.querySelector('.note').style.display = '';


  if(count < 6){

    document.querySelector('.note').innerHTML = `<p class="note">Captured ${selectPokemon.innerText}, click the pokeball to find more pokemon</p>`; 

    var variable = document.createElement('div');
    var name = document.createElement('p');
    var pic = document.createElement('img')
    name.innerHTML = pokename.innerHTML.trim();
    pic.setAttribute('src', `${pokepic.src}`);
    pic.setAttribute('width', `190px`);
    pic.setAttribute('height', `180px`);
    pic.setAttribute('style', 'margin:0 20px 0 20px');
    name.setAttribute('style', 'text-align:center;font-size:22px;margin-bottom:-30px;');

    variable.append(name);
    variable.append(pic);

    catchPoke.prepend(variable);
    pokemonPicture.classList.add('hide');

    count++;
    document.querySelector('.title-1').innerText = `Pokemons ${count}/6`;
  }
  else{
    pokemonPicture.classList.add('hide');
    document.querySelector('.note').innerHTML = `<p class="note">No more Pokeball</p>`;
  }
})
