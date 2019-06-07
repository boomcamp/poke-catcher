
//encounter

const encounter = (function() {
    function getRandomEncounter(possible) {
      if (!possible.length) {
        return false;
      }
  
      return possible[Math.floor(Math.random() * possible.length)]
    }
  
    return {
      getRandomEncounter,
    }
  })()

  //index.js

  const api = {
    pokemon,
    locations,
    regions,
  };
  
  const regionsSelect = document.getElementById('regions');
  const locationsSelect = document.getElementById('locations');
  const areasSelect = document.getElementById('areas');
  const exploreButton = document.getElementById('explore');
  const encounterDetails = document.getElementById('encounterDetails');
  
  const gameState = {
    possibleEncounters: [],
    currentEncounter: undefined,
    captured: [],
  };
  
  encounterDetails.addEventListener('click', function(e) {
    if (e.target.matches('.poke-button')) {
      updateCatchList(gameState.currentEncounter);
      encounterDetails.innerText = `Captured ${gameState.currentEncounter.name}, explore to find more pokemon`;
    }
  });
  
  regionsSelect.addEventListener('change', function(e) {
    api.regions.get(e.target.value).then(region => {
      locationsSelect.innerHTML = region.locations
        .map(loc => {
          return `<option value="${loc.name}">${loc.name}</option>`;
        })
        .join('');
      locationsSelect.dispatchEvent(new Event('change'));
    });
  });
  
  locationsSelect.addEventListener('change', function(e) {
    api.locations.get(e.target.value).then(location => {
      const areas = location.areas;
      if (!areas.length) {
        document.getElementById('message').innerText =
          'No areas to explore here! Select a different location';
        areasSelect.style.display = 'none';
        exploreButton.disabled = true;
        return;
      } else {
        areasSelect.style.display = '';
        exploreButton.disabled = false;
        areasSelect.innerHTML = areas
          .map(area => {
            return `<option value="${area.name}">${area.name}</option>`;
          })
          .join('');
        areasSelect.dispatchEvent(new Event('change'));
      }
    });
  });
  
  areasSelect.addEventListener('change', function(e) {
    encounterDetails.innerText = '';
    api.locations.getArea(e.target.value).then(area => {
      gameState.possibleEncounters = area.pokemon_encounters;
      if (gameState.possibleEncounters.length) {
        exploreButton.style.display = '';
      } else {
        exploreButton.style.display = 'none';
      }
    });
  });
  
  exploreButton.addEventListener('click', function(e) {
    const encountered = encounter.getRandomEncounter(
      gameState.possibleEncounters
    );
    updateEncounter(encountered);
  });
  
  regions.all().then(regions => {
    regionsSelect.innerHTML = regions
      .map(reg => {
        return `<option value="${reg.name}">${reg.name}</option>`;
      })
      .join('');
    regionsSelect.dispatchEvent(new Event('change'));
  });
  
  function updateEncounter({ pokemon, version_details }) {
    const encounterDetails = document.getElementById('encounterDetails');
    // catchButton.style.display = 'none';
    api.pokemon.get(pokemon.name).then(details => {
      gameState.currentEncounter = details;
      encounterDetails.innerHTML = renderEncounter(details);
      // catchButton.style.display = '';
    });
  }
  
  function renderEncounter(pokemon) {
    return `
      <fieldset>
        <legend>You Found A...</legend>
        <div class="found">
          <h3>${pokemon.name}</h3>
          <img src="${pokemon.sprites.front_default}" />
          <button class="poke-button">Capture</button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Details</legend>
        <ul>${pokemon.stats
          .map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`)
          .join('')}
      </fieldset>
      `;
  }
  
  function updateCatchList(pokemon) {
    if (gameState.captured.length === 6) return;
  
    gameState.captured.push(pokemon);
  
    document.getElementById('capturedTotal').innerText = `Captured ${
      gameState.captured.length
    } / 6`;
  
    const caught = document.getElementById('captureDetails');
    const newPokemon = document.createElement('li');
    const name = document.createElement('p');
    name.innerText = pokemon.name;
    const pokemonImg = document.createElement('img');
    pokemonImg.src = pokemon.sprites.front_default;
  
    newPokemon.appendChild(pokemonImg);
    newPokemon.appendChild(name);
  
    caught.appendChild(newPokemon);
  }

  
  // location

  const locations = (function() {
    function get(name) {
      return pokeAPI.get(`location/${name}`).catch(console.error);
    }
  
    function getArea(name) {
      return pokeAPI.get(`location-area/${name}`);
    }
  
    return {
      get,
      getArea,
    };
  })();

  
//poke API

const pokeAPI = (function() {
    const baseURL = 'https://pokeapi.co/api/v2';
  
    function handleErrors(res) {
      if (!res.ok) {
        throw Error(res.statusText);
      } else {
        return res;
      }
    }
  
    function get(path) {
      return fetch(`${baseURL}/${path}`)
        .then(handleErrors)
        .then(res => res.json());
    }
  
    return {
      get,
    };
  })();


//pokemon.js

const pokemon = (function() {
    function get(name) {
      return pokeAPI.get(`pokemon/${name}`)
    }
  
    return {
      get,
    }
  })();

  
//region.js

const regions = (function() {
    function all() {
      return pokeAPI
        .get('region')
        .then(data => data.results)
        .catch(console.error);
    }
  
    function get(name) {
      return pokeAPI.get(`region/${name}`);
    }
  
    return {
      all,
      get,
    };
  })();
  

