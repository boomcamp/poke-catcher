// Default
const regionURL   = "https://pokeapi.co/api/v2/region";
let locationURL = "https://pokeapi.co/api/v2/region/1";
let areaURL     = "https://pokeapi.co/api/v2/location/67/";

var region = document.getElementById('region');
var regLoc = document.getElementById('location');
var locArea = document.getElementById('area');

var explore = document.getElementById('explore');
var pName = document.querySelector('.pokemon-name');
var pImg = document.querySelector('.pokemon-img');
var pStats = document.querySelector('.details ul');
var capture = document.querySelector('#capture');
var captured = document.querySelector('.pokemons');

function fetchJSON(url,get) {
    return fetch(url)
        .then(result => result.json())
        .then(data => data[get]);
}

// Options
function options(opt,optURL,get){
    fetchJSON(optURL,get).then(data => {
        opt.innerHTML = data.map(reg => `
            <option value="${reg.url}">${reg.name}</option>
        `).join('');
    });
}

// Options
window.onload = options(region,regionURL,'results');
window.onload = options(regLoc,locationURL,'locations');
window.onload = options(locArea,areaURL,'areas');


region.addEventListener('change', regionLoc);
regLoc.addEventListener('change', regionLocAreas);

function regionLoc(){
    locationURL = region.options[region.selectedIndex].value;
    options(regLoc,locationURL,'locations');

    fetchJSON(locationURL,'locations').then(data => 
        options(locArea,data[0].url,'areas')
    );
}

function regionLocAreas(){
    areaURL = regLoc.options[regLoc.selectedIndex].value;
    options(locArea,areaURL,'areas');
}

// Pokemons
explore.addEventListener('click',explorePokemon);

function explorePokemon(){
    areaURL = locArea.options[locArea.selectedIndex].value;
    fetchJSON(areaURL,'pokemon_encounters')
        .then( data => {
            const rand = Math.floor(Math.random() * data.length);
            pName.innerHTML = data[rand].pokemon.name;
            fetchJSON(data[rand].pokemon.url,'sprites')
                .then(pic => {
                    pImg.setAttribute('src', pic.front_default);
                });
            fetchJSON(data[rand].pokemon.url,'stats')
                .then(stats => {
                    pStats.innerHTML = stats.map( stat =>`
                        <li>${stat.stat.name} : ${stat.base_stat}</li>
                    `).join('');
                });
        });
}

capture.addEventListener('click',capturePokemon);

function capturePokemon(){
    let exploredName = document.querySelector('.pokemon-name').textContent;
    let exploredImg = document.querySelector('.pokemon-img').getAttribute('src');
    captured.insertAdjacentElement = `
        <div class="poke">
            <span class="pokemon-name">${exploredName}</span>
            <img src="${exploredImg}" class="pokemon-img"/>
        </div>`;
}