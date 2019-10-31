const regionsSelect = document.getElementById('regions');
const locationsSelect = document.getElementById('locations');
const areasSelect = document.getElementById('areas');
const exploreButton = document.getElementById('explore');
const encounterDetails = document.getElementById('encounterDetails');
const message = document.getElementById('message');
getFetch = path => fetch(`https://pokeapi.co/api/v2/${path}`).then(handleErrors).then(res => res.json());

handleErrors = res => {
  if(!res.ok) throw Error(res.statusText)
  else return res
};

  const pokemon = (function() {
    get = name => getFetch(`pokemon/${name}`)  
    return {
      get,
    }
  })();

  const api = {
    pokemon
  };
  
  let possibleEncounters = [],
      currentEncounter = undefined,
      captured = [];
  
  encounterDetails.addEventListener('click', function(e) {
    if (e.target.matches('.poke-button')) {
      if (captured.length === 6){ 
        message.innerText = 'You already captured 6 Pokemons!'; 
        return;
      }
      captured.push(currentEncounter);
      document.getElementById('capturedTotal').innerHTML = `Pokémon Catcher! ${captured.length}/6<span data-letters="Pokémon Catcher!"></span><span data-letters="Pokémon Catcher!"></span>`;    
      const caught = document.getElementById('captureDetails').children[captured.length-1];
      caught.innerHTML = `<p>${currentEncounter.name.charAt(0).toUpperCase() + currentEncounter.name.slice(1)}</p>
                            <div>
                              <figure>
                                <img src="${currentEncounter.sprites.front_default}">
                                <figcaption>Front</figcaption>
                              </figure>
                              <figure>
                                <img src="${currentEncounter.sprites.back_default}">
                                <figcaption>Back</figcaption>
                              </figure>
                            </div>`;
      message.innerText = `Captured ${currentEncounter.name.charAt(0).toUpperCase() + currentEncounter.name.slice(1)}, explore to find more pokemon`;
      encounterDetails.innerText = '';  
    }
  });
  
  regionsSelect.addEventListener('change', function(e) {
    getFetch(`region/${e.target.value}`).then(region => {
      locationsSelect.innerHTML = region.locations.map(loc => `<option value="${loc.name}">${loc.name}</option>`).join('');
      locationsSelect.dispatchEvent(new Event('change'));
    });
    if(e.target.selectedIndex == 0) document.body.style.backgroundImage = "url('images/0.jpg')"; 
    else if(e.target.selectedIndex == 1) document.body.style.backgroundImage = "url('images/1.png')"; 
    else if(e.target.selectedIndex == 2) document.body.style.backgroundImage = "url('images/2.jpg')"; 
    else if(e.target.selectedIndex == 3) document.body.style.backgroundImage = "url('images/3.jpg')"; 
    else if(e.target.selectedIndex == 4) document.body.style.backgroundImage = "url('images/4.jpeg')"; 
    else if(e.target.selectedIndex == 5) document.body.style.backgroundImage = "url('images/5.jpg')"; 
    else if(e.target.selectedIndex == 6) document.body.style.backgroundImage = "url('images/6.jpg')"; 
    else document.body.style.backgroundImage = "url('images/0.jpg')";   
  });
  
  locationsSelect.addEventListener('change', function(e) {
    getFetch(`location/${e.target.value}`).catch(console.error).then(location => {
      if (!location.areas.length) {
        message.innerText = 'No areas to explore here! Select a different location';
        areasSelect.style.display = 'none';
        exploreButton.disabled = true;
        return;
      } else {
        message.innerText = 'Click "Explore" to start searching for Pokemon';
        areasSelect.style.display = '';
        exploreButton.disabled = false;
        areasSelect.innerHTML = location.areas.map(area => `<option value="${area.name}">${area.name}</option>`).join('');
        areasSelect.dispatchEvent(new Event('change'));
      }
    });
  });
  
  areasSelect.addEventListener('change', function(e) {
    getFetch(`location-area/${e.target.value}`).then(area => {
      possibleEncounters = area.pokemon_encounters;
      if (possibleEncounters.length) exploreButton.style.display = '';
      else exploreButton.style.display = 'none';
    });
  });
  
  exploreButton.addEventListener('click', function() {
    possibleEncounters.length ? updateEncounter(possibleEncounters[Math.floor(Math.random() * possibleEncounters.length)]) : null;
  });
  
  getFetch('region').then(data => data.results).catch(console.error).then(regions => {
    regionsSelect.innerHTML = regions.map(reg => `<option value="${reg.name}">${reg.name}</option>`).join('');
    regionsSelect.dispatchEvent(new Event('change'));
  });

  function updateEncounter({pokemon}) {
    api.pokemon.get(pokemon.name).then(details => {
      currentEncounter = details;
      encounterDetails.innerHTML = `<div><h3>Encounter</h3></div>
                                      <div>
                                          <h6>You found a ${details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h6>
                                          <img src="${details.sprites.front_default}">
                                      </div>
                                      <div>
                                        <h6>Stats: </h6>
                                        <ul>${details.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('')}
                                        </ul>
                                        ${(details.abilities.length) ? `<h6>Abilities: </h6>
                                        <ul>${details.abilities.map(s => `<li>${s.ability.name}</li>`).join('')}
                                        </ul>` : ``}
                                        <button class="btn bttn btn-hover teal poke-button">Capture</button>
                                      </div>`;
    });
  }