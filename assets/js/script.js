const pokeRegion = document.getElementById("selectRegion");
const pokeLocation = document.getElementById("selectLocation");
const pokeArea = document.getElementById("selectArea");
const exploreBtn = document.getElementById("explore-btn");
const captureBtn = document.getElementById("capture-btn");
const pokeDex = document.getElementById("pokedex");

const hidePokedexVar = document.querySelector(".pokedex");
const wildEncounter = document.querySelector(".encounter");
const wildPokeBattle = document.querySelector(".wild-pokemon-battle");
const wildPokeStats = document.querySelector(".wild-pokemon-stats");
const wildPokeCapt = document.querySelector(".wild-pokemon-catch");

const pokemonBG = document.getElementById("pokemon-music");

//Background Music
function pokemonBgIntro(){
  pokemonBG.src = "assets/bg-music/Pokemon Blue Red - Opening.mp3";
  pokemonBG.play();
}

function pokemonBgBattle(){
  pokemonBG.src = "assets/bg-music/pokemon-battle.mp3";
  pokemonBG.play();
}

function pokemonBgCaptured(){
  pokemonBG.removeAttribute('loop');
  pokemonBG.src = "assets/bg-music/06-caught-a-pokemon.mp3";
  pokemonBG.play();
  pokemonBG.addEventListener('ended', function(){
    pokemonBG.currentTime = 0;
    pokemonBgIntro();
  });
}

//append gonna catchem header
function headerCatchEm(){
  let catchEmHeader = document.createElement('h1');
  catchEmHeader.classList.add('gonnaCatchEm');
  wildEncounter.appendChild(catchEmHeader);
  catchEmHeader.innerText = 'Gonna catch \'em all!';
}

//remove gonna catchem header
function removeHeaderCatchEm(){
  if(wildEncounter.contains(document.querySelector('.gonnaCatchEm'))){
    let getCatchEmHeader = document.querySelector('.gonnaCatchEm');
    wildEncounter.removeChild(getCatchEmHeader);
  }
}

//hide encounter and pokedex
function hide(){
  headerCatchEm();
  wildPokeBattle.classList.add('hide');
  wildPokeStats.classList.add('hide');
  wildPokeCapt.classList.add('hide');
  hidePokedexVar.classList.add('hide');
  wildEncounter.classList.add('search');
  } hide();

//show ecounter and pokedex
function huntPokemon(){
  wildPokeBattle.classList.remove('hide');
  wildPokeStats.classList.remove('hide');
  wildPokeCapt.classList.remove('hide');
  hidePokedexVar.classList.remove('hide');
  wildEncounter.classList.remove('search');
}

//check pokemon Qty
function checkPokemonQty(){
  let trQty = pokeDex.getElementsByTagName("tr").length;
  document.getElementById('captured-num').innerText = trQty+'/6';
  if(trQty == 6){  
    captureBtn.setAttribute('disabled', true); 
    captureBtn.innerText = 'Pokedex is Full!';
  }
}

function capturedText(){
  captureBtn.innerText = 'CAPTURED!';
  captureBtn.setAttribute('disabled', true);
}

function removeCapturedText(){
  captureBtn.innerText = '> Attack!';
  captureBtn.removeAttribute('disabled');
}

function enableExploreBtn(){
  exploreBtn.removeAttribute('disabled');
}

//get Region

window.addEventListener('load', function(){
  fetch('https://pokeapi.co/api/v2/region')
    .then((response) => response.json())
    .then((fetchRegions)=> {
      let option=`<option disabled selected>Please Select a Region</option>`;
      fetchRegions.results.map((region) => {
        option += `
          <option value="${region.url}">${region.name}</option>
          `;
      });
      pokeRegion.innerHTML = option;
    })
});

//get Location

pokeRegion.addEventListener('change', function(){
  fetch(pokeRegion.value)
  .then((response) => response.json())
  .then((fetchedLocations) => {
    let option=`<option disabled selected>Please Select a Location</option>`;
    fetchedLocations.locations.map(location =>{
      option += `
      <option value="${location.url}">${location.name}</option>
      `;
    });
    pokeLocation.innerHTML = option;
  })
});

//get Area

pokeLocation.addEventListener('change', function(){
  fetch(pokeLocation.value)
  .then((response) => response.json())
  .then((fetchedAreas) => {
    let option=`<option disabled selected>Please Select a Area</option>`;
    fetchedAreas.areas.map(area =>{
      option += `
        <option value="${area.url}">${area.name}</option>
      `;
    });
    pokeArea.innerHTML = option;
  })
  enableExploreBtn();
});

//Find Some Pokemon

exploreBtn.addEventListener('click', function(){
    huntPokemon();
    removeHeaderCatchEm();
    fetch(pokeArea.value)
    .then((response) => response.json())
    .then((fetchedPokemon) => {
        let encounters = fetchedPokemon.pokemon_encounters;
        let randomIndex = Math.floor(Math.random() * (encounters.length));
        let pokemonName = encounters[randomIndex].pokemon.name;
        document.getElementById('wild-pokemon-name').innerText = `Wild ${pokemonName} appeared!`;
        fetch(encounters[randomIndex].pokemon.url)
        .then((response) => response.json())
        .then((fetchedPokemonDetails) => {
          let encounteredPokemonImg = fetchedPokemonDetails.sprites.front_default;
          let encounteredPokemonStats = fetchedPokemonDetails.stats;
          stat = '';
          encounteredPokemonStats.map((pokeStat) => {
            stat += `<li>${pokeStat.stat.name} - ${pokeStat.base_stat}</li>`;
          });
          document.getElementById('wild-pokemon-img').src = encounteredPokemonImg;
          document.getElementById('wild-pokemon-img').setAttribute('alt', pokemonName);
          document.getElementById('pokeStatList').innerHTML = stat;
        }) 
    });
    pokemonBgBattle();
    removeCapturedText();
});

//Capture pokemon

captureBtn.addEventListener('click', function(){
  capturedText();
  pokemonBgCaptured();
  
  let pokemonImg = document.getElementById('wild-pokemon-img').src;
  let pokemonName = document.getElementById('wild-pokemon-img').alt;

  document.getElementById('wild-pokemon-name').innerText = `Congratulations! \n You've caught ${pokemonName}!`;

  let tableRow = pokedex.insertRow();

  tableRow.setAttribute('id', pokemonName);
  let tableCell1 = tableRow.insertCell(0);
  let pokeImgElement = document.createElement('img');
  tableCell1.appendChild(pokeImgElement);

  pokeImgElement.setAttribute('src', pokemonImg);

  let tableCell2 = tableRow.insertCell(-1);
  tableCell2.innerText = pokemonName;
  checkPokemonQty();
  document.getElementById('wild-pokemon-img').src = "assets/img/386577_stardoge_8-bit-pokeball.png";
  document.getElementById('wild-pokemon-img').style.height = "100px";
  document.getElementById('wild-pokemon-img').style.margin = "11vh auto 0 44vh";

});





