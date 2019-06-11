var regions = [];
var myPokemons = [];
const battleField = document.querySelector('.battlefield');
const selectRegion = document.querySelector('#select-region');
const selectLocation = document.querySelector('#select-location');
const selectArea = document.querySelector('#select-area');
const exploreBtn = document.querySelector('.pokeball');
const pokemonList = document.querySelector('.pokemon');
const introDiv = document.querySelector('.intro-box');
const captureDiv = document.querySelector('.captured');
const statDiv = document.querySelector('.stats');
const statList = document.querySelector('.statsList');
const captureList = document.querySelector('.capture-list');
const captureBtn = document.querySelector('.capture-ball');
const capturedDetails = document.querySelector('.captured-details');
const maxCapture = document.querySelector('.max-capture');


fetch('https://pokeapi.co/api/v2/region')
    .then(response => response.json())
    .then(function(data) {
        regions.push(...data.results)
        addRegions(regions);
        fetchLocations();
    })

/* SELECT FUNCTIONS */
function addRegions(arr){
  const html = arr.map(function (region){
      return `<option value="${region.url}">${region.name}</option>`
  }).join('');
  selectRegion.innerHTML = html;
}
  
function addLocations(arr){
  const html = arr.map(function (loc){
    return `<option value="${loc.url}">${loc.name}</option>`
  }).join('');
  selectLocation.innerHTML = html;
  fetchAreas();
}
  
function addAreas(areas){
  const html = areas.map(function (area){
      return `<option value="${area.url}">${area.name}</option>`
  }).join('');
  selectArea.innerHTML = html;
}

function fetchAreas(){
  fetch(selectLocation.value)
  .then(response => response.json())
  .then(function(data) {
      addAreas([...data.areas])
  }).catch(error => console.error(error));
}

function fetchLocations(){
  fetch(selectRegion.value)
  .then(response => response.json())
  .then(function(data) {
      addLocations([...data.locations])
  })
}

selectRegion.addEventListener('change', function(){
  fetch(this.value)
  .then(response => response.json())
  .then(function(data) {
      addLocations([...data.locations])
  })
})  

selectLocation.addEventListener('change', function(){
  fetch(this.value)
  .then(response => response.json())
  .then(function(data) {
      addAreas([...data.areas])
  })
})

/* ADD POKEMON */
function addPokemons(pokemons){
  let randomNum = Math.floor(Math.random() * pokemons.length);
  fetchPokemonImg(pokemons[randomNum].pokemon['url']);
}


exploreBtn.addEventListener('click', function(){
  if(selectArea.value != ''){
      fetch(selectArea.value)
      .then(response => response.json())
      .then(function(data) {
          addPokemons([...data.pokemon_encounters])
      })
  }else{
      alert('No area selected');
  } 
})



function fetchPokemonImg(url){
  fetch(url)
  .then(response => response.json())
  .then(function(data) {
      captureDiv.style.display = "none";
      captureBtn.style.display = "block";

      if (data.types[0].type.name == 'water') {
        battleField.style.backgroundImage = "url(assets/images/battlefield-2.png)";
      } else if (data.types[0].type.name == 'poison') {
        battleField.style.backgroundImage = "url(assets/images/battlefield-4.png)";
      } else {
        battleField.style.backgroundImage = "url(assets/images/battlefield-3.png)";
      }

      const html = `
      <img class="pokemon-img" src="${data.sprites.front_default}" alt="pokemon">
      <img class="shadow" src="assets/images/shadow.png" alt="shadow">

      <div class="lifebar">
        <label class="pokemon-label pokemon-name">${data.species.name}</label>
        <label class="pokemon-label pokemon-hp">${data.stats[5].base_stat}</label>
      </div>`;
      pokemonList.innerHTML = html;

      $('#ash').fadeOut();
      $('#ash').fadeIn();

      $('.pokemon').fadeOut();
      $('.pokemon').fadeIn();

      introDiv.style.display = "none";
      $('.stats').fadeOut();
      $('.stats').fadeIn();
      statDiv.style.display = "block";
      statList.innerHTML = `${generateStat(data.stats)}`;
  }).catch(error => console.error(error));
}

function generateStat(statsArr){
  console.log(statsArr)
  return statsArr.map(value => {
      if (value.stat["name"] != 'hp') {
       return `<li>${value.stat["name"]} : ${value.base_stat}</li>`;
      }
  }).join('');
}

captureBtn.addEventListener('click', function(){
  if (statDiv.style.display == 'block') {
    const name = document.querySelector('.pokemon-name').innerText;
    const img = document.querySelector('.pokemon-img').getAttribute('src');
    const li = document.createElement('li');
    const newPokemon = new Pokemon(name, img);
    myPokemons.push(newPokemon);

    captureDiv.style.display = "block";

    if (myPokemons.length <= 6) {
      li.innerHTML = `<img class="pokemon-item-img" src="${img}" alt="ash"><p>${name}</p>`;
      li.classList.add('pokemon-item');
      captureList.append(li);
      maxCapture.innerHTML = `${myPokemons.length}/6`;
    } else {
      capturedDetails.innerHTML = 'Ohh noo, no more space!';
    }

    statDiv.style.display = "none";
    pokemonList.style.display = "none";
  }
});

function Pokemon(name, img){
  this.name = name;
  this.img = img;
}