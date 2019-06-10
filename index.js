const regSelect = document.querySelector("#reg");
const locSelect = document.querySelector("#loc");
const areaSelect = document.querySelector("#area");
const hidSelect = document.querySelector("#hid");
const buttonExplore = document.querySelector("#explore");
const imgContainer = document.querySelector("#pokemon-img");
const pokemonName = document.querySelector("#poke-name");
const stats = document.querySelector(".stats");
const catchButton = document.querySelector(".catch-button");
const pokeball = document.querySelector(".pokeball");
const captured = document.querySelector("#captured");
const pokemonCaptured = document.querySelector(".captured-pokemon");
var catchedPokemons = [
  document.getElementById('pokebox1'),
  document.getElementById('pokebox2'),
  document.getElementById('pokebox3'),
  document.getElementById('pokebox4'),
  document.getElementById('pokebox5'),
  document.getElementById('pokebox6'),
];
document.querySelector('#pokemon-img').style.visibility='hidden';
document.querySelector('.ufound').style.visibility='hidden';
document.querySelector('.details').style.visibility='hidden';
buttonExplore.setAttribute('disabled',true);
var q=0;
const fetchAPI = function() {
  const pokeUrl = "https://pokeapi.co/api/v2";
  function getReg(path) {
    // region select
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
        // region select end
        // location select
        var areaUrl = locSelect.value;
        locSelect.addEventListener("change", function(e) {
          areaUrl = e.target.value;

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
        // location select end
        // area select
        var pokeEncounter = areaSelect.value;
        
        areaSelect.addEventListener("change", function(e) {
          
          pokeEncounter = e.target.value;
          
          if(pokeEncounter!='Select Area'){
            buttonExplore.removeAttribute('disabled');
             
          }
          else{
            buttonExplore.setAttribute('disabled',true); 
          }
          return fetch(`${pokeEncounter}`)
            .then(res => res.json())
            .then(function(data) {
              // area select end
              //button explore
              buttonExplore.addEventListener("click", function(e) {
                document.querySelector('#pokemon-img').style.visibility='visible';
                document.querySelector('.ufound').style.visibility='visible';
                document.querySelector('.details').style.visibility='visible';
                pokeball.removeAttribute("hidden");
                let pokemonRes = data.pokemon_encounters;
                //console.log(pokemonRes)
                var length = pokemonRes.length;
                var randNumber = Math.floor(Math.random() * length);
                var pokemons = pokemonRes[randNumber].pokemon.name;
                hidSelect.innerHTML = pokemonRes.map(pkmn => {
                  if (pokemonRes.indexOf(pkmn) == randNumber) {
                    return `<option value="${pokemons}">${pokemons}</option>`;
                  }
                });
                var encounterUrl = pokeUrl + `/pokemon/${hidSelect.value}`;

                return fetch(`${encounterUrl}`)
                  .then(res => res.json())
                  .then(function(pokes) {
                    var pokeStats = pokes.stats;
                    var pokeImg = pokes.sprites.front_default;
                    imgContainer.innerHTML = `<img id='image' src="${pokeImg}" height="250px" width="250px"/>`;
                    name = hidSelect.value.toString().toUpperCase();
                    pokemonName.textContent = name;
                    document.querySelector(
                      ".ufound"
                    ).textContent = `You Found ${name}`;
                    //console.log(imgContainer);
                    stats.innerHTML = `<label>S T A T S</label>
                          <br>
                        <span>SPEED: ${pokeStats[0].base_stat}</span>
                        <span>SPECIAL DEFENSE: ${pokeStats[1].base_stat}</span>
                        <span>SPECIAL ATTACK: ${pokeStats[2].base_stat}</span>
                        <span>DEFENSE: ${pokeStats[3].base_stat}</span>
                        <span>ATTACK: ${pokeStats[4].base_stat}</span>
                        <span>HP: ${pokeStats[5].base_stat}</span>
                        `;
                  });
              });
            });
        });
      });
  }
  return getReg("region");
};

fetchAPI();
var ctr=0;
pokeball.addEventListener("click", function() {
  var getImage = document.getElementById("image").src;
  var getName = document.getElementById('poke-name').innerText;
  // catchedPokemons.push(getImage)
  console.log(getName);
  catchedPokemons[ctr].innerHTML = 
  `<img src=${getImage} height=100% width=100%>
  <span class='captured-name'>${getName}</span>`

  ctr++;
  document.querySelector('.catched').textContent=`(${ctr}/6)`;
  if(ctr===6){
    pokeball.setAttribute('disabled',true)
  }
  document.querySelector('#pokemon-img').style.visibility='hidden';
  document.querySelector('.ufound').style.visibility='hidden';
  document.querySelector('.details').style.visibility='hidden';
  document.querySelector('#poke-name').textContent=`You have captured ${getName}`
});
