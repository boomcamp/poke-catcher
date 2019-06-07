var regions = [];
var myPokemons = [];
const regionSelect = document.querySelector('#select-region');
const locationSelect = document.querySelector('#select-location');
const areaSelect = document.querySelector('#select-area');
const pokemonList = document.querySelector('.encounter-con');
pokemonList.classList.add('hide');
const statList = document.querySelector('.stat-con');
statList.classList.add('hide');
const exploreBtn = document.querySelector('.explore');
fetch('https://pokeapi.co/api/v2/region')
    .then(response => response.json())
    .then(function(data) {
        regions.push(...data.results)
        // console.log(data)
        addRegions(regions);
        fetchLocations();
    })

function addRegions(arr){
    const html = arr.map(function (region){
        return `<option value="${region.url}">${region.name}</option>`
    }).join('');
    regionSelect.innerHTML = html;
}
function addLocations(arr){
    const html = arr.map(function (loc){
        return `<option value="${loc.url}">${loc.name}</option>`
    }).join('');
    locationSelect.innerHTML = html;
    fetchAreas();
}

function addAreas(areas){
    const html = areas.map(function (area){
        return `<option value="${area.url}">${area.name}</option>`
    }).join('');
    areaSelect.innerHTML = html;
}
function addPokemons(pokemons){
    let randomNum = Math.floor(Math.random() * pokemons.length);
    fetchPokemonImg(pokemons[randomNum].pokemon['url']);
}

regionSelect.addEventListener('change', function(){
    // console.log(this.value)
    fetch(this.value)
    .then(response => response.json())
    .then(function(data) {
        addLocations([...data.locations])
    })
})
function fetchLocations(){
    fetch(regionSelect.value)
    .then(response => response.json())
    .then(function(data) {
        addLocations([...data.locations])
    })
}
function fetchAreas(){
    fetch(locationSelect.value)
    .then(response => response.json())
    .then(function(data) {
        addAreas([...data.areas])
    }).catch(error => console.error(error));
}
function fetchPokemonImg(url){
    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        // console.log(data.sprites.front_default)
        // const html = `<h1 class="pokemon-name">${data.species.name}</h1><img class="pokemon-image" src="${data.sprites.front_default}"></img>
                        // <button class="captureBtn">CAPTURE</button>${generateStat(data.stats)}`;
        const html = `<h1 class="pokemon-name">${data.species.name}</h1><img class="pokemon-image" src="${data.sprites.front_default}"></img>
                        <button class="captureBtn">CAPTURE</button>`
        pokemonList.innerHTML = html;
        statList.innerHTML = `${generateStat(data.stats)}`;
        pokemonList.removeAttribute('style');
        statList.removeAttribute('style');
    }).catch(error => console.error(error));
}
function generateStat(statsArr){
    console.log(statsArr)
    return statsArr.map(value => {
        return `<p><span>${value.stat["name"]}</span>: ${value.base_stat}</p>`;
    }).join('');
}
locationSelect.addEventListener('change', function(){
    // console.log(this.value)
    fetch(this.value)
    .then(response => response.json())
    .then(function(data) {
        addAreas([...data.areas])
    })
})

exploreBtn.addEventListener('click', function(){
    // console.log(this.value)
    if(areaSelect.value != ''){
        fetch(areaSelect.value)
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
        //console.log(myPokemons[0].name)
        var pokeCounter= `<p>MY POKEMON</p><p>( ${myPokemons.length} / 6 )</p>`;
        var newHtml = myPokemons.map( value => {
            return `<img src="${value.img}"></img><span>${value.name}</span>`
        }).join('');
        pokemonList.innerHTML = stat;
        statList.innerHTML = '';
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
        if(randomNum>5){
            myPokemons.push(newPoke);
            return '<p>Caught successfully!</p>';
        }else {
            return '<p>Pokemon escaped!</p>';
        }
    }else{
        return '<p>No more slot!</p>'
    }
    
    

}