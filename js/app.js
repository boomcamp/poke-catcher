const selectRegion = document.querySelector("#regions");
const selectLocation = document.querySelector("#locations");
const selectArea = document.querySelector("#areas");
const explore = document.querySelector("#explore");
const details = document.querySelector(".encounter");
const status = document.querySelector(".stat");
const ball = document.querySelector(".ball");
const captured = document.getElementsByClassName("list");
const counter = document.querySelector(".counter");

let name = "";
let picture = "";
let count = 0;

regions("https://pokeapi.co/api/v2/region");

selectRegion.addEventListener("change", function(event) {
  locations(this.value);
});

selectLocation.addEventListener("change", function(event) {
  areas(this.value);
});

explore.addEventListener("click", function(event) {
  getPokemonUrl(selectArea.value);
  ball.style.display = "";
});

function regions(url) {
  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var list = data.results;
      selectRegion.innerHTML = data.results
        .map(data => `<option value="${data.url}">${data.name}</option>`)
        .join("");
      locations(list[0].url);
    });
}

function locations(url) {
  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var list1 = data.locations;
      selectLocation.innerHTML = data.locations
        .map(data => `<option value="${data.url}">${data.name}</option>`)
        .join("");
      areas(list1[0].url);
    });
}

function areas(url) {
  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      selectArea.innerHTML = data.areas
        .map(data => `<option value="${data.url}">${data.name}</option>`)
        .join("");
    });
}

function getPokemonUrl(url) {
  fetch(url)
    .then(res => res.json())
    .then(function(pokemon) {
      getPokemon(pokemon.pokemon_encounters);
    });
}

function getPokemon(pokemons) {
  let a = Math.floor(Math.random() * pokemons.length);
  name = pokemons[a].pokemon.name;

  details.innerHTML = `<p class="details" value=${pokemons[a].pokemon.url}>${pokemons[a].pokemon.name}</p>`;
  pokedetails(pokemons[a].pokemon.url);
}

function stats(stats) {
  status.innerHTML = stats
    .map(
      pokemon =>
        `<p class="stats">
        ${pokemon.stat.name} : ${pokemon.base_stat}
        </p>`
    )
    .join("");
}

function pokedetails(url) {
  fetch(url)
    .then(response => response.json())
    .then(function(sprite) {
      picture = sprite.sprites.front_default;

      details.innerHTML += `<img width="180" src="${sprite.sprites.front_default}">`;
      details.innerHTML += `<img type="image" class="ball" src="images/PixelArt.png" onclick="capture()" />`;
      stats(sprite.stats);
    });
}

function capture() {
  if (count < 6) {
    details.innerHTML = `<p class="msg-txt">Captured ${name}, explore to find more Pokemon</p>`;
    captured[
      count
    ].innerHTML += `<img src="${picture}"/><br><span>${name}</span>`;
    count++;
    counter.innerText = `Captured: ${count}/6`;
  } else {
    details.innerHTML = `<p class ="msg">NO MORE SLOT!!!<p>`;
  }
}
