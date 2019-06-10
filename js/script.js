// Default
const regionURL   = "https://pokeapi.co/api/v2/region";
let locationURL = "https://pokeapi.co/api/v2/region/1";
let areaURL     = "https://pokeapi.co/api/v2/location/67/";

var region = document.getElementById('region');
var regLoc = document.getElementById('location');
var locArea = document.getElementById('area');

var explore = document.getElementById('explore');

var pFound = document.querySelector('.pokemon-found');
var pName = document.querySelector('.pokemon-name');
var pImg = document.querySelector('.pokemon-img');
var pStats = document.querySelector('.details ul');
var msg = document.querySelector('.pokemon h1');
var capture = document.querySelector('#capture');

var captured = document.querySelector('.pokemons');
var maxCapture = 6;
var captureCount = 0;
var pokeCounter = document.querySelector('.counter');

pokeCounter.innerHTML = `Captured: ${captureCount}/${maxCapture}`;

// Options
window.onload = API.options(region,regionURL,'results');
window.onload = API.options(regLoc,locationURL,'locations');
window.onload = API.options(locArea,areaURL,'areas');

region.addEventListener('change', regionLoc);
regLoc.addEventListener('change', regionLocAreas);

function regionLoc(){
    locationURL = region.options[region.selectedIndex].value;
    API.options(regLoc,locationURL,'locations');

    
    API.fetchJSON(locationURL,'locations')
        .then(data => API.options(locArea,data[0].url,'areas'));
    
    API.hideShow('add','remove');
}

function regionLocAreas(){
    regLoc = document.querySelector('#location');
    areaURL = regLoc.options[regLoc.selectedIndex].value;
    API.options(locArea,areaURL,'areas');
    API.hideShow('add','remove');
}

// Pokemons
explore.addEventListener('click',explorePokemon);

function explorePokemon(){
    if(locArea.firstChild === null){
        msg.innerHTML = "No Pokemon can be found <br/>in this area! <br/>Please Select a different location.";
        API.hideShow('add','remove');
    }else{
        pImg.setAttribute('src', '');
        areaURL = locArea.options[locArea.selectedIndex].value;
        API.fetchJSON(areaURL,'pokemon_encounters')
            .then( data => {
                const rand = Math.floor(Math.random() * (data.length-1));
                pName.innerHTML = data[rand].pokemon.name.toUpperCase();

                API.fetchJSON(data[rand].pokemon.url,'sprites')
                    .then(pic => pImg.setAttribute('src', pic.front_default));

                API.fetchJSON(data[rand].pokemon.url,'stats')
                    .then(stats => pStats.innerHTML = stats.map( stat =>
                        `<li>${stat.stat.name} : ${stat.base_stat}</li>`)
                        .join(''));
            });
        msg.textContent = "Please Click Explore Button to Search a Pokemon!";
        API.hideShow('remove','add');
    }
}

// Capture Pokemon
capture.addEventListener('click',capturePokemon);

function capturePokemon(){
    let exploredName = document.querySelector('.pokemon-name').textContent;
    let exploredImg = document.querySelector('.pokemon-img').getAttribute('src');
    
    let newCapture = document.createElement('div');
    let newCapturedName = document.createElement('span');
    let newCapturedImg = document.createElement('img');

    API.hideShow('add','remove');

    newCapture.classList.add('poke');
    newCapturedName.classList.add('mypokemon-name');
    newCapturedImg.classList.add('mypokemon-img');

    newCapturedName.textContent = exploredName;
    newCapturedImg.setAttribute('src',exploredImg)

    newCapture.appendChild(newCapturedName);
    newCapture.appendChild(newCapturedImg);
    captured.appendChild(newCapture);

    captureCount++;
    pokeCounter.innerHTML = `Captured: ${captureCount}/${maxCapture}`;

    if(captureCount === 6){
        let searhPoke = document.querySelector('.pokemon-search');
        searhPoke.classList.add('hide');
        return;
    }
}