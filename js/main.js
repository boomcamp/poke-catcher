import {addRegions, addLocations, addAreas, addPokemons, fetchLocations} from './modules.js';

var regions = [];
var myPokemons = [];

fetch('https://pokeapi.co/api/v2/region')
    .then(response => response.json())
    .then(function(data) {
        regions.push(...data.results)
        addRegions(regions);
        fetchLocations();
    })

    document.querySelector('#select-region').addEventListener('change', function(){
    fetch(this.value)
    .then(response => response.json())
    .then(function(data) {
        addLocations([...data.locations])
    })
})

document.querySelector('#select-location').addEventListener('change', function(){
    fetch(this.value)
    .then(response => response.json())
    .then(function(data) {
        addAreas([...data.areas])
    })
})

document.querySelector('.explore').addEventListener('click', function(){
    if(document.querySelector('#select-area').value != ''){
        fetch(document.querySelector('#select-area').value)
        .then(response => response.json())
        .then(function(data) {
            addPokemons([...data.pokemon_encounters])
        })
    }else{
        alert('No area selected');
    }
    
})

document.addEventListener('click', function(e){
    if(e.target.className == 'captureBtn'){
        const name = document.querySelector('.pokemon-name').innerText;
        const imgUrl = document.querySelector('.pokemon-image').getAttribute('src');
        const stat = newPokemon(name, imgUrl);
        var pokeCounter= `<p>MY POKEMONS ( ${myPokemons.length} / 6 )</p>`;
        var newHtml = myPokemons.map( value => {
            return `<img src="${value.img}"></img><span>${value.name}</span>`
        }).join('');
        document.querySelector('.encounter-con').innerHTML = stat;
        document.querySelector('.stat-con').innerHTML = '';
        document.querySelector(".title").innerHTML = pokeCounter;
        document.querySelector(".caught").innerHTML = newHtml;
    }
})

function Pokemon(name, img){
    this.name = name;
    this.img = img;
}

function newPokemon(name, imgUrl){
    const newPoke = new Pokemon(name, imgUrl);
    let randomNum = Math.floor(Math.random() * 10);
    if(myPokemons.length<6){
        if(randomNum>=5){
            myPokemons.push(newPoke);
            return '<p>Caught successfully!</p>';
        }else {
            return '<p>Pokemon escaped!</p>';
        }
    }else{
        return '<p>No more slot!</p>'
    }
}