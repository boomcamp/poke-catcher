const pokeAPI = pokemonAPI();
const encounter = encounterFunc();
const locations = locationsFunc();
const pokemon = pokemonFunc();
const regions = regionsFunc();

const api = {
   pokemon,
   locations,
   regions
};

const game = {
   posEncounters: [],
   currentEncounter: undefined,
   captured: []
};

const regionsSelect = document.getElementById("regions");
const locationsSelect = document.getElementById("locations");
const areasSelect = document.getElementById("areas");
const exploreButton = document.getElementById("explore");
const encounterDetails = document.getElementById("encounterDetails");

encounterDetails.addEventListener("click", encounterClick);
regionsSelect.addEventListener("change", regionChange);
locationsSelect.addEventListener("change", locationChange);
areasSelect.addEventListener("change", areaChange);
exploreButton.addEventListener("click", clickExplore);

var button = document.querySelector(".poke-button");

//API

function pokemonAPI() {
   const apiURL = "https://pokeapi.co/api/v2";

   function errorHandler(response) {
      if (!response.ok) {
         throw Error(response.statusText);
      } else {
         return response;
      }
   }

   function get(path) {
      return fetch(`${apiURL}/${path}`)
         .then(errorHandler)
         .then(response => response.json());
   }

   return {
      get
   };
}

// ENCOUNTER

function encounterFunc() {
   function randomPoke(pokeEncounter) {
      if (!pokeEncounter.length) {
         return false;
      }

      return pokeEncounter[Math.floor(Math.random() * pokeEncounter.length)];
   }

   return {
      randomPoke
   };
}

//LOCATIONS

function locationsFunc() {
   function get(name) {
      return pokeAPI.get(`location/${name}`).catch(console.error);
   }

   function getArea(name) {
      return pokeAPI.get(`location-area/${name}`);
   }

   return {
      get,
      getArea
   };
}

//POKEMON

function pokemonFunc() {
   function get(name) {
      return pokeAPI.get(`pokemon/${name}`);
   }

   return {
      get
   };
}

//REGION

function regionsFunc() {
   function all() {
      return pokeAPI
         .get("region")
         .then(data => data.results)
         .catch(console.error);
   }

   function get(name) {
      return pokeAPI.get(`region/${name}`);
   }

   return {
      all,
      get
   };
}

// main

function encounterClick(e) {
   if (e.target.matches(".poke-button img")) {
      CatchList(game.currentEncounter);
      encounterDetails.innerHTML = `<p class="captured-text">Captured <span class="poke-name">${game.currentEncounter.name}</span>, explore to find more pokemon<p><img src="../assets/images/ash1.png" class="ash-1">`;
   }
}

function regionChange(e) {
   api.regions.get(e.target.value).then(region => {
      locationsSelect.innerHTML = region.locations
         .map(loc => {
            return `<option value="${loc.name}">${loc.name}</option>`;
         })
         .join("");
      locationsSelect.dispatchEvent(new Event("change"));
   });
}

function locationChange(e) {
   api.locations.get(e.target.value).then(location => {
      const areas = location.areas;
      if (!areas.length) {
         document.getElementById("message").innerText = "No areas to explore here! Select a different location";
         areasSelect.style.display = "none";
         exploreButton.disabled = true;
         return;
      } else {
         areasSelect.style.display = "";
         exploreButton.disabled = false;
         areasSelect.innerHTML = areas
            .map(area => {
               return `<option value="${area.name}">${area.name}</option>`;
            })
            .join("");
         areasSelect.dispatchEvent(new Event("change"));
      }
   });
}

function areaChange(e) {
   encounterDetails.innerText = "";
   api.locations.getArea(e.target.value).then(area => {
      game.posEncounters = area.pokemon_encounters;
      if (game.posEncounters.length) {
         exploreButton.style.display = "";
      } else {
         exploreButton.style.display = "none";
      }
   });
}

function clickExplore(e) {
   const encountered = encounter.randomPoke(game.posEncounters);
   updateEncounter(encountered);
}

regions.all().then(regions => {
   regionsSelect.innerHTML = regions
      .map(reg => {
         return `<option value="${reg.name}">${reg.name}</option>`;
      })
      .join("");
   regionsSelect.dispatchEvent(new Event("change"));
});

function updateEncounter({ pokemon, version_details }) {
   const encounterDetails = document.getElementById("encounterDetails");
   api.pokemon.get(pokemon.name).then(details => {
      game.currentEncounter = details;
      encounterDetails.innerHTML = renderEncounter(details);
   });
}

function renderEncounter(pokemon) {
   return `
    <fieldset class="bg">
      <legend>You Found A...</legend>
      <div class="found">
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.sprites.front_default}" class="bg-image"/>
        <button class="poke-button margin"><img src="../assets/images/poke-ball.gif" style="width: 60px;"></button>
      </div>   
    </fieldset>
    <fieldset class="bg2">
      <legend>Stats</legend>
      <ul>${pokemon.stats.map(s => `<li class="li-style">${s.stat.name}: ${s.base_stat}</li>`).join("")}</li>
    </fieldset>
    `;
}

function CatchList(pokemon) {
   if (game.captured.length === 6) return disabled;

   game.captured.push(pokemon);

   document.getElementById("capturedTotal").innerText = `Captured ${game.captured.length} / 6`;

   const caught = document.getElementById("captureDetails");
   const newPokemon = document.createElement("li");
   const name = document.createElement("p");
   name.innerText = pokemon.name;
   const pokemonImg = document.createElement("img");
   pokemonImg.src = pokemon.sprites.front_default;

   newPokemon.appendChild(pokemonImg);
   newPokemon.appendChild(name);

   caught.appendChild(newPokemon);
}
