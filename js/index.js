import get from "./pokeApi.js";

let captured = 1;

const regionSelect = document.querySelector("#region");
const locationSelect = document.querySelector("#location");
const areaSelect = document.querySelector("#area");
const explore_btn = document.querySelector("#explore");
// const explored_pokemon = document.querySelector(".explored_pokemon");
// const captured_pokemon = document.querySelector(".captured_pokemon");
const pokeImg = document.createElement("img");
const statText = document.createElement("p");
const captureBtn = document.createElement("button");
pokeImg.setAttribute("class", "pokeImg");
statText.setAttribute("class", "stat");
captureBtn.setAttribute("class", "captureBtn");
captureBtn.textContent = "CAPTURE";

get(`region/`).then(data => {
  var regions = data.results;
  regionSelect.innerHTML = regions.map(
    (x, i) => `<option value="${regions[i].name}">${regions[i].name}</option>`
  );
  regionSelect.dispatchEvent(new Event("change"));
});

regionSelect.addEventListener("change", function() {
  get(`region/${regionSelect.value}`).then(data => {
    var locations = data.locations;
    locationSelect.innerHTML = locations.map(
      (x, i) =>
        `<option value="${locations[i].name}">${locations[i].name}</option>`
    );
    locationSelect.dispatchEvent(new Event("change"));
  });
});

locationSelect.addEventListener("change", function() {
  get(`location/${locationSelect.value}`).then(data => {
    var areas = data.areas;
    areaSelect.innerHTML = areas.map(
      (x, i) => `<option value="${areas[i].name}">${areas[i].name}</option>`
    );
    areaSelect.dispatchEvent(new Event("change"));
  });
});

areaSelect.addEventListener("change", function() {
  if (areaSelect.value == "") {
    explore_btn.disabled = true;
    explore_btn.className = "explore_btn_disabled";
  } else {
    explore_btn.disabled = false;
    explore_btn.className = "explore_btn";
  }
});

// -------------------------- EXPLORE EVENT -------------------------- //
explore_btn.addEventListener("click", function() {
  get(`location-area/${areaSelect.value}`).then(data => {
    var encounter = data.pokemon_encounters;
    explored_pokemon.innerHTML = `<p class="explored_txt">${encounter[Math.floor(Math.random() * (0 + encounter.length))].pokemon.name}</p>`;

    get(`pokemon/${explored_pokemon.textContent}`).then(data => {
      var stats = data.stats;
      pokeImg.setAttribute("src", `${data.sprites.front_default}`);
      statText.innerHTML = `Speed: ${stats[0].base_stat}<br>
                Special-Defense: ${stats[1].base_stat}<br>
                Special-Attack: ${stats[2].base_stat}<br>
                Defense: ${stats[3].base_stat}<br>
                Attack: ${stats[4].base_stat}<br>
                Hp:${stats[5].base_stat}`;

      explored_pokemon.prepend(pokeImg);
      explored_pokemon.appendChild(statText);
      explored_pokemon.appendChild(captureBtn);
    });
  });
});

// -------------------------- CAPTURE EVENT -------------------------- //
captureBtn.addEventListener("click", function() {
  if (captured <= 6) {
    var poke_name = document.querySelector(".explored_txt").textContent;
    var pokeball = document.createElement("img");
    var center = document.createElement("center");
    explored_pokemon.innerHTML = "";
    pokeball.setAttribute("src", "../img/pokeball.gif");
    center.append(pokeball);
    explored_pokemon.append(center);

    // var pokeball = document.getElementsByClassName("pokeball");
    // console.log(pokeball)
    // pokeball.setAttribute("style", "display:block;");

    setTimeout(() => {
      // explored_pokemon.removeChild(center);
      var capturedPoke = document.createElement("div");
      var capturePokeImg = document.createElement("img");
      var capturePoketext = document.createElement("p");

      capturePokeImg.setAttribute("src", pokeImg.src);
      capturePoketext.innerHTML = poke_name;

      capturedPoke.append(capturePokeImg);
      capturedPoke.append(capturePoketext);
      captured_pokemon.append(capturedPoke);
      document.querySelector(
        ".captured_header"
      ).innerHTML = `Captured ${captured}/6`;

      explored_pokemon.innerHTML = `<p class="success_captured">You've Successfully Captured ${poke_name}</p>`;
      captured++;
    }, 3000);
  }
});
