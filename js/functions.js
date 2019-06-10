//FORMAT NAMES

function replaceHyphen(name){
    return name.replace(/-/g, ' ');
  }
  
  //REGION ONLOAD EVENT
  
  function fetchRegions(){
    fetch(api)
    .then(res => {
      res.json()
      .then(region => {
        regions.push(...region.results)
        displayRegions(regions);
      })
    })
  }
  
  
  //LOCATION SELECT EVENT
  
  function changeLocSelect(locApi){
    locations = []
    fetch(locApi)
    .then(res => {
      res.json()
      .then(loc => {
        locations.push(...loc.locations)
        displayLoc(locations)
      })
    })
  }
  
  //AREA SELECT EVENT
  
  function changeAreaSelect(areaApi){
    areas = []
    fetch(areaApi)
    .then(res => {
      res.json()
      .then(area => {
        if(area.areas.length === 0){
          areas.push(area.name);
          displayEmptyArea(areas.join(''));
        }
        else{
          areas.push(...area.areas);
          displayArea(areas);
        }
      })
    })
  }
  
  //fetch Pokemons API
  
  function getPokemon(location_area){
    pokemons = []
    fetch(location_area)
    .then(res => {
      res.json()
      .then(poke => {
        pokemons.push(...poke.pokemon_encounters);
        pokemonEncounter(pokemons);
      })
    })
  }
  
  
  //DISPLAY REGIONS
  
  function displayRegions(regions) {
    const getNames = regions.map(reg => {
      return `
        <option value="${reg.url}">${reg.name}</option>
      `;
    }).join('')
    regionNames.insertAdjacentHTML('beforeend', getNames);
    regionNames.dispatchEvent(new Event('change'));
  }
  
  //DISPLAY LOCATIONS
  
  function displayLoc(locations) {
    const getLocs = locations.map(locat => {
      var name = replaceHyphen(locat.name)
      return `
        <option value="${locat.url}">${name}</option>
      `;
    }).join('')
    while (locationNames.childNodes.length > 2) {
      locationNames.removeChild(locationNames.lastChild);
    }
    locationNames.insertAdjacentHTML('beforeend', getLocs);
    locationNames.dispatchEvent(new Event('change'));
  }
  
  //DISPLAY LOCATION WHEN AREA IS EMPTY
  
  function displayEmptyArea(areas){
    var name = replaceHyphen(areas)
        getAreas = `<option>No areas to explore here!</option>`
    while (areaNames.childNodes.length > 2) {
      areaNames.removeChild(areaNames.lastChild);
    }
    Swal.fire({
    title: 'Oops...',
    text: "There are no areas to explore here!",
    type: 'warning',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Choose another location'
    })
    areaNames.insertAdjacentHTML('beforeend', getAreas);
  }
  
  //DISPLAY AREAS
  
  function displayArea(areas) {
    const getAreas = areas.map(are => {
      var name = replaceHyphen(are.name)
      return `
        <option value="${are.url}">${name}</option>
      `;
    }).join('')
    while (areaNames.childNodes.length > 2) {
      areaNames.removeChild(areaNames.lastChild);
    }
    areaNames.insertAdjacentHTML('beforeend', getAreas);
    areaNames.dispatchEvent(new Event('change'));
  }
  
  //POKEMON ENCOUNTER
  
  function pokemonEncounter(pokemons){
    var pokeArr = [];
    const pokemonDetails = pokemons.map(pokem => {
      pokeArr.push(pokem);
    })
    var randomPoke = pokeArr[Math.floor(Math.random()*pokeArr.length)];
    displayRandomPoke(randomPoke.pokemon.url);
  }
  
  
  //DISPLAY RANDOM POKEMON DETAILS
  
  function displayRandomPoke(pokeapi){
    pokemons = [];
    stats = [];
    fetch(pokeapi)
    .then(res => {
      res.json()
      .then(poke => {
        stats.push(...poke.stats);
        displaySprite(poke.sprites.front_default);
        displayName(...poke.forms);
        displayStats(stats);
      })
    })
  }
  
  //DISPLAY SPRITES
  
  function displaySprite(sprites) {
    randomSprite = sprites;
    const pokeSprite = `<img class = "sprite" src="${sprites}" alt="pokemon">`
    pokeModel.innerHTML = pokeSprite;
  }
  
  //DISPLAY NAME
  
  function displayName(forms) {
    randomName = forms.name;
    const name = `<p>${forms.name}</p>`
    pokeName.innerHTML = name;
  }
  
  //DISPLAY POKEMON STATS
  
  function displayStats(stats) {
    const getStats = stats.map(stat => {
      var newStat = replaceHyphen(stat.stat.name)
      return `
        <li>${newStat}: <b>${stat.base_stat}</b></li>
      `;
    }).join('')
    pokeStats.innerHTML = getStats;
  }
  