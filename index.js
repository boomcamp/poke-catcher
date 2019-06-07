const regSelect = document.querySelector("#reg");
const locSelect = document.querySelector("#loc");
const areaSelect = document.querySelector("#area");
const hidSelect = document.querySelector("#hid");
const buttonExplore = document.querySelector("#explore");
const fetchAPI = function() {
  const pokeUrl = "https://pokeapi.co/api/v2";
  function getReg(path) {
    return fetch(`${pokeUrl}/${path}`)
      .then(res => res.json())
      .then(function(data) {
        let results = data.results;

        regSelect.innerHTML = results.map(region => {
          if (results.indexOf(region) == 0) {
            return `<option value="" selected>Select Region</option>
            <option value="${region.url}">${region.name}</option>`;
          } else {
            return `<option value="${region.url}">${region.name}</option>`;
          }
        });
        regSelect.dispatchEvent(new Event("change"));
        var locUrl = regSelect.value;
        regSelect.addEventListener("change", function(e) {
          locUrl = e.target.value;
          console.log(e.target.value);

          return fetch(`${locUrl}`)
            .then(res => res.json())
            .then(function(data) {
              let resultsLoc = data.locations;
              locSelect.innerHTML = resultsLoc.map(location => {
                if (resultsLoc.indexOf(location) == 0) {
                  return `<option value="" selected>Select Location</option>
                <option value="${location.url}">${location.name}</option>`;
                } else {
                  return `<option value="${location.url}">${
                    location.name
                  }</option>`;
                }
              });
            });
        });
        var areaUrl = locSelect.value;
        locSelect.addEventListener("change", function(e) {
          areaUrl = e.target.value;
          console.log(e.target.value);

          return fetch(`${areaUrl}`)
            .then(res => res.json())
            .then(function(data) {
              let resultsArea = data.areas;
              areaSelect.innerHTML = resultsArea.map(area => {
                if (resultsArea.indexOf(area) == 0) {
                  return `<option value="" selected>Select Area</option>
                <option value="${area.url}">${area.name}</option>
                        `;
                } else {
                  return `<option value="${area.url}">${area.name}</option>`;
                }
              });
              
            });
        });
        var pokeEncounter= areaSelect.value;
       areaSelect.addEventListener("change", function(e){
         pokeEncounter = e.target.value;
         console.log(pokeEncounter)

         return fetch(`${pokeEncounter}`)
                  .then(res => res.json())
                  .then(function(data){
                    let pokemonRes = data.pokemon_encounters;
                    var length = pokemonRes.length
                    var randNumber = Math.floor(Math.random() * length);
                    var pokemons =  pokemonRes[randNumber].pokemon.name;
                    hidSelect.innerHTML = pokemonRes.map(pkmn => {
                      if(pokemonRes.indexOf(pkmn) == randNumber){
                        //console.log(pokemons)
                        return `<option value="${pokemons}">${pokemons}</option>`
                      }
                      
                    })
                  })
       })
       
       buttonExplore.addEventListener('click', function(e){
        console.log(hidSelect.value);
        
       })

      });
  }
  return getReg("region");
};

fetchAPI();
