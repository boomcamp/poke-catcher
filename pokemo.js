const areaURL = 'https://pokeapi.co/api/v2/region';
const areas = [];
fetch(areaURL)
    .then(area => area.json())
        .then(secArea => areas.push(...secArea.results))
            .then(displayAreas)
                .then(choose)
                    

var areas1 = [];
var areas2 = [];
var pokemonEncounters = [];
var baseStat = [];
var pokemonImage;

// function for displaying areas dropdown
function displayAreas() {
    var input = document.getElementById('area');
    const html = areas.map(area => {
        return `
      <option value="${area.name}" class="region">${area.name}</option>
    `;
    }).join('');
    input.innerHTML = html;
}

// when dropdown area is click choose will be our callback and select the url from the selected option
document.getElementById('area').addEventListener('change', choose);

function choose(){
    var option = document.getElementById('area').selectedIndex;
    for(let x=0; x<areas.length; x++){
        if(option === x){
            var optionClicked = areas[x].url;
            areaURL1 = optionClicked;
            displayLocation(areaURL1);
        }
    }
}

// function for displaying locations 
function displayLocation(yes) {
    areas1 = [];
    var areaURL1 = yes;
    fetch(areaURL1)
        .then(area1 => area1.json())
            .then(secArea1 =>  areas1.push(...secArea1.locations))
                .then(function(){
                    var input = document.getElementById('location');
                var html = areas1.map(area1 => {
                    return `
                <option value="${area1.name}" class="location">${area1.name}</option>
                `;
                })
                input.innerHTML = html; }) 
                    .then(chooseSpecificArea)
}

// when dropdown location is click, function below will run and look for the url in the selected option
document.getElementById('location').addEventListener('change', chooseSpecificArea);

function chooseSpecificArea(){
    var option = document.getElementById('location').selectedIndex;
    for(let x=0; x<areas1.length; x++){
        if(option === x){
            var optionClicked = areas1[x].url;
            areaURL1 = optionClicked;
            displaySpecificLoc(areaURL1);
        }
    }
}

// function for displaying specific location
function displaySpecificLoc(anotherYes) {
    areas2 = [];
    var areaURL2 = anotherYes;
    fetch(areaURL2)
        .then(area2 => area2.json())
            .then(secArea2 =>  areas2.push(...secArea2.areas))
                .then(function(){
                    var input = document.getElementById('specificArea');
                var html = areas2.map(area2 => {
                    return `
                <option value="${area2.url}" class="specificArea">${area2.name}</option>
                `;
                })
    input.innerHTML = html;
    }) 
}

// when dropdown location area are change, function below will run and store all the pokemon encounter on that location area
document.getElementById('specificArea').addEventListener('change', storePokemonEncounterOption);

// when explore button is click the function below will execute and prints the name, image and details of the pokemon
document.getElementById('explore').addEventListener('click', storePokemonEncounter);

// put all pokemon encounters in array
function storePokemonEncounterOption(){
    pokemonEncounters = [];
    var spf = document.getElementById("specificArea");
    var spfVal = spf.options[spf.selectedIndex].value;
    
    // fetch the api
    fetch(spfVal)
    .then(location => location.json())
        .then(location1 =>  pokemonEncounters.push(...location1.pokemon_encounters))   
}

// put all pokemon encounters in array
function storePokemonEncounter(){
    pokemonEncounters = [];
    baseStat = [];
    var spf = document.getElementById("specificArea");
    var spfVal = spf.options[spf.selectedIndex].value;
      
    // fetch the api
    fetch(spfVal)
    .then(location => location.json())
        .then(location1 =>  pokemonEncounters.push(...location1.pokemon_encounters))
            .then(function searchPokemonEncounter(){
                var randomNum = Math.floor(Math.random() * pokemonEncounters.length);
                var input = document.querySelector('.explored-poki');
                var html =  pokemonEncounters[randomNum].pokemon.name;
                var pokemonSprite = pokemonEncounters[randomNum].pokemon.url;
                input.innerHTML = html;
                getImage(pokemonSprite);
                
            })
}

function getImage(img){
    fetch(img)
    .then(sprite => sprite.json())
        .then(sprite1 =>  pokemonImage = sprite1.sprites.front_default)
            .then(function(){
                var imgContainer = document.querySelector('.explored-pokemon');
                imgContainer.src = pokemonImage;

                // show hidden elements
                document.querySelector('.noExplored').style.display = 'none';
                document.querySelector('.encounter-row1').style.display = 'block';
            })
    
    // fetch the base stats
    fetch(img)
        .then(stat => stat.json())
            .then(stat1 =>  baseStat.push(...stat1.stats))
                .then(function(){
                    var input = document.querySelector('.base-stat1');
                    input.innerHTML = '';
                    var html = baseStat.map(stat => {
                        return `<p> <span>${stat.stat.name}: </span> ${stat.base_stat} </p>`;
                    }).join('');

                    input.insertAdjacentHTML('beforeend', html);
                    }) 
}

// when capture button is click the function below will execute
document.getElementById('capture').addEventListener('click', capturedPokemon);

// print the captured pokemon on the captured panel
function capturedPokemon(){
    var input = document.getElementById('1row');
    var input2 = document.getElementById('2row');
    var count = document.getElementById('count');
    var image = document.querySelector('.explored-pokemon').src;
    var pokemon = document.querySelector('.explored-poki').innerText;

    if(input2.childElementCount < 3){

    if(input.childElementCount !== 3){
        var html = `<div class="capture-box"> 
                    <div class="deletebtn">x</div>
                    <img src="${image}">
                    <p class="title">${pokemon}</p>
                </div>`;  
        input.insertAdjacentHTML('beforeend', html); 
    }
    else{
        var html = `<div class="capture-box"> 
                    <div class="deletebtn">x</div>
                    <img src="${image}">
                    <p class="title">${pokemon}</p>
                </div>`;  
        input2.insertAdjacentHTML('beforeend', html);  
     }  

     count.innerHTML = input.childElementCount + input2.childElementCount;
    }

    else{
        alert('Maximum of 6 Pokemons!');
    }

    var boxes = document.getElementsByClassName('capture-box');
    for(let x=0; x<boxes.length; x++){
    if(x % 2 === 0){
        boxes[x].classList.add('green');
    }
    else{
        boxes[x].classList.add('red');
    }
}

deleteCaptured();

document.querySelector('.encounter-row1').style.display = 'none';
document.querySelector('.noExplored').style.display = 'flex';
document.querySelector('.base-stat1').innerHTML = '';
}

// delete capture pokemon
function deleteCaptured(){
    
    var count = document.getElementById('count');
    var deletebtn = document.getElementsByClassName('deletebtn');
    for(let x=0; x<deletebtn.length; x++){
    deletebtn[x].addEventListener('click', function(e){
        e.target.parentElement.remove();
        var input = document.getElementById('1row');
        var input2 = document.getElementById('2row');
        count.innerHTML = input.childElementCount + input2.childElementCount;
    })
}

}


// css styles
document.querySelector('.encounter-row1').style.display = 'none';


