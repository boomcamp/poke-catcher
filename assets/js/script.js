const pokeRegion = document.getElementById("selectRegion");
const pokeLocation = document.getElementById("selectLocation");
const pokeArea = document.getElementById("selectArea");
const exploreBtn = document.getElementById("explore-btn");
const captureBtn = document.getElementById("capture-btn");
const pokeDex = document.getElementById("pokedex");

function checkPokemonQty(){
  
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
});

//Find Some Pokemon

exploreBtn.addEventListener('click', function(){
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
});

//Capture pokemon

captureBtn.addEventListener('click', function(){
  let pokemonImg = document.getElementById('wild-pokemon-img').src;
  let pokemonName = document.getElementById('wild-pokemon-img').alt;
  let tableRow = pokedex.insertRow();

  console.log(document.getElementById('wild-pokemon-img'));
  tableRow.setAttribute('id', pokemonName);
  let tableCell1 = tableRow.insertCell(0);
  let pokeImgElement = document.createElement('img');
  tableCell1.appendChild(pokeImgElement);

  pokeImgElement.setAttribute('src', pokemonImg);

  let tableCell2 = tableRow.insertCell(-1);
  tableCell2.innerText = pokemonName;


});




