const regionURL = 'https://pokeapi.co/api/v2/region';

var regions = [];
var locations = [];
var areas = [];
var areasPokemons = [];

//Region fetch and Display
fetch(regionURL)
    .then(regions => regions.json())
    .then(data => regions.push(...data.results))
    .then(displayRegions);
  
function displayRegions() {
    var input = document.getElementById('regions');
    const html = regions.map(region => {
        return `<option value="${region.name}">${region.name}</option>`;
    }).join('');
    input.innerHTML = html;
 }
 
//Getting the selected region
document.getElementById('regions').addEventListener('change', 
function selectedRegion(){  
    var regionDrop = document.getElementById("regions");
    var regionVal = regionDrop.options[regionDrop.selectedIndex].value; 
    var locationURL = `https://pokeapi.co/api/v2/region/${regionVal}`;
    
    displayLocation(locationURL);
});

//Location by Region Display
function displayLocation(locURL) {
    locations = [];
    var locationURL = locURL;
    fetch(locationURL)
        .then(locData => locData.json())
        .then(secArea1 =>  locations.push(...secArea1.locations))
        .then(function(){
            var input = document.getElementById('locations');
            var html = locations.map(locData => {
            return `
            <option value="${locData.name}" >${locData.name}</option>
            `;
            })
    input.innerHTML = html;
    }) 
}

//URL of selected Location
document.getElementById('locations').addEventListener('change', 
function selectedLocation(){    
   var option = document.getElementById('locations').selectedIndex;
    for(let c=0; c<locations.length; c++){
        if(option === c){
            var locaAreaURL = locations[c].url;            
            displayArea(locaAreaURL);
        }
    }       
   });

//Area by Location Display
function displayArea(arURL) { 
    areas = [];
    var areaURL = arURL;
    fetch(areaURL)
        .then(area => area.json())
        .then(area =>  areas.push(...area.areas))
        .then(function(){
            var input = document.getElementById('areas');
            var html = areas.map(area => {
            return `<option value="${area.name}">${area.name}</option>`;
            })
    input.innerHTML = html;
    })
}

//Error handling for Location with No Area
document.getElementById('areas').addEventListener('click', 
function noneArea(){    
   var option = document.getElementById('areas').length;
    if(option === 0){
       document.getElementById('message')
            .innerHTML = "Awwww :( No areas to explore here! Select a different location";
    }
});

//Pokemon per Area
document.getElementById('explore').addEventListener('click', 
function selectedArea(){    
    var eID = document.getElementById("areas");
    var Val = eID.options[eID.selectedIndex].value; 
    var areaPokeURL = `https://pokeapi.co/api/v2/location-area/${Val}`;
   areasPokemon(areaPokeURL);
});

//Generating and Getting Random Pokemon
function areasPokemon(areaPoke){
    areasPokemons = [];
    var areasPokemoURL = areaPoke;
  
    fetch(areasPokemoURL)
    .then(poke => poke.json())
    .then(data => areasPokemons.push(...data.pokemon_encounters))
    .then(
        function(){
            var randomNum = Math.floor((Math.random() * areasPokemons.length) + 1);
            var pokemonURL = areasPokemons[randomNum].pokemon.url;
            var pokemonName = areasPokemons[randomNum].pokemon.name;
             displayStats(pokemonURL); 
             displayImage(pokemonURL, pokemonName); 
             displayOtherDetail(randomNum);

            //other details
            var div = document.querySelector('#messageCapture');
            div.innerHTML = ``;
           
            var divfound = document.querySelector('#youFound');
            divfound.innerHTML = `<p class="ecounterTitle">Awesome! You Found A...</p>`;

            //detail border style
            document.querySelector('#detail').setAttribute("class", "det");

            //remove class disable
            var divImg = document.querySelector('#imgDiv');
            var det = document.querySelector('#detail-div');
           
            divImg.classList.remove('disabled');
            det.classList.remove('disabled');
            });
}

//Pokemon Details(Stats)
function displayStats(url){
    var pokemonURL = url;
    var pokemonStat = [];
    
    fetch(pokemonURL)
        .then(poke => poke.json())
        .then(data => pokemonStat.push(...data.stats))
        .then(
            function(){
              var input = document.getElementById('detail');    
                 var det =  `
                            <label class="statVal">Speed:</label>   <span class="statVal"> ${pokemonStat[0].base_stat} </span> 
                            <label class="statVal">Special-defense:</label>  <span class="statVal"> ${pokemonStat[1].base_stat}</span> 
                            <label class="statVal">Special-attack:</label>  <span class="statVal">${pokemonStat[2].base_stat}</span> 
                            <label class="statVal">Defense:</label> <span class="statVal">${pokemonStat[3].base_stat}</span> 
                            <label class="statVal">Attack:</label> <span class="statVal">${pokemonStat[4].base_stat}</span> 
                            <label class="statVal">Hp:</label>   <span class="statVal">${pokemonStat[5].base_stat}</span> 
                            `;
            input.innerHTML = '<p class="detailTitle"><b>STATS: </b></p>' + det;       
        });
}

//Other Details (Ability/Short Effect)
function  displayOtherDetail(num){
    var url = `https://pokeapi.co/api/v2/ability/${num}`;
    var effect = [];
    
    fetch(url)
        .then(otherDet => otherDet.json())
        .then(otherDet =>  effect.push(...otherDet.effect_entries))
        .then(function(){
                var otherDetails = effect.map(otherDet => {
                return `
                <p class="abilityCon">${otherDet.effect}</p>
                <p class="abilityCon">Short Effect: ${otherDet.short_effect}</p>
                `;
                }).join('');
                var otherDetailDiv = document.getElementById('otherDetail');
                otherDetailDiv.innerHTML = '<p class="detailTitle"><b>ABILITY: </b></p>' + otherDetails;
            }) 
}

//Encounter Image Display
function displayImage(url, name){
    var pokemonName = name;
    var pokemonURL = url;
    
fetch(pokemonURL)
  .then(pokemonImg => pokemonImg.json())
  .then(sprite =>  pokemonImage = sprite.sprites.front_default)
  .then( 
    function(){
            var img = document.querySelector('.found');    
            var image =  `<img src="${pokemonImage}" alt="img" class="pokemon">`;
            img.innerHTML = image;
            var name = document.getElementById('name'); 
            var nameCOntent =  `<p style="color:blue" id = "nameOfPokemon" class="pokemonName"><i><b>${pokemonName}</b></i></p>`;
            name.innerHTML = nameCOntent;
        }
  );
}

//Capture Button Event Listener
document.getElementById('capture').addEventListener('click', capturedPokemon);

function capturedPokemon(){

//Adding of captured Pokemon
//Checking Number of Captured Pokemon
var matched = document.querySelectorAll(".pokemons div");

if(matched.length != 6){
    var image = document.querySelector('.pokemon').src;
    var pokemon = document.querySelector('#nameOfPokemon').innerText;

    var capturedPoke = document.querySelector('.pokemons');
    
    var capturedPokemon = 
                `<div id="div_pokemon">
                <img src="${image}" alt = "img" class = "captured" >
                <p style="margin-top: -30px;" class="pokNameCap">${pokemon}</p>
                </div>`;  
    capturedPoke.insertAdjacentHTML('beforeend', capturedPokemon);  


    //Message after capture
    var div = document.querySelector('#messageCapture');
    div.innerHTML = `<p style = "color: blue; font-size: 30px;" class="captureMes">AWESOME! You captured <span class="captureMes1" style="color: red">${pokemon}</span> ! Explore to find more pokemon!</p>`;
    var pokeBall =  `<img class="pokeBall" src="../images/pokeball.gif">`;    
    div.insertAdjacentHTML("beforeend", pokeBall);
    div.style.backgroundImage = "url('../images/confetti.gif')";
    
    //Clearing Encounter
    var divfound = document.querySelector('#youFound');
    divfound.innerHTML = ``;

    //remove class disable
    var divImg = document.querySelector('#imgDiv');
    var det = document.querySelector('#detail-div');

    divImg.classList.add('disabled');
    det.classList.add('disabled');
    
    //No. of captured pokemon
    var span = document.querySelector('#count');
    span.innerText = `${matched.length+1}/6`;
   

} else{
    alert("Opps! You already captured 6 pokemon.");
}
}
