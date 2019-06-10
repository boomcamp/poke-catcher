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

selectRegion.addEventListener('change', function(event){
    data.getLocUrl(this.value);
})

selectLocation.addEventListener('change', function(event){
    data.getAreaUrl(this.value);
})

exploreBtn.addEventListener('click', function(event){
    data.getPokemonUrl(selectArea.value);
    encounter.style.display = 'block';
    document.querySelector('.msg').style.display = 'none';
})

captureBtn.addEventListener('click', function(event){
    encounter.style.display = 'none';
    document.querySelector('.msg').style.display = '';

    if(count < 6){
        document.querySelector('.msg').innerHTML = `<p>Captured ${selectPokemon.innerText}, explore to find more pokemon</p>`;
        captureHtml += `<div class='mypoke'>${selectPokemon.innerHTML}${document.querySelector('.pokePic').innerHTML}</div>`;
        document.querySelector('.captured').innerHTML = captureHtml;

        count++;
        document.querySelector('.counter').innerText = `CAPTURED ${count}/6`;
    }
    else{
        document.querySelector('.msg').innerHTML = `<p>NO MORE MASTERBALL</p>`;
    }
})