const selectRegion = document.querySelector("#regions");
const selectLoc = document.querySelector("#locations");
const selectAreas = document.querySelector("#areas");
const explore = document.querySelector("#exploreit");
const pokeball = document.querySelector(".captureBtn");
const givenUrl = "https://pokeapi.co/api/v2/";

var regionlist = [];
var mypoke = [];
fetch(`${givenUrl}region`)
  .then(response => response.json())
  .then(function(data) {
    regionlist.push(...data.results);
    display(regionlist, selectRegion);
    listLocation();
  });

function listLocation() {
  fetch(selectRegion.value)
    .then(response => response.json())
    .then(function(data) {
      display([...data.locations], selectLoc);
      listArea();
    });
}
function listArea() {
  fetch(selectLoc.value)
    .then(response => response.json())
    .then(function(data) {
      display([...data.areas], selectAreas);
    });
}

selectRegion.addEventListener("change", function() {
  fetch(this.value)
    .then(response => response.json())
    .then(function(data) {
      listLocation([...data.locations]);
    });
});

selectLoc.addEventListener("change", function() {
  fetch(this.value)
    .then(response => response.json())
    .then(function(data) {
      listArea([...data.areas]);
    });
});

explore.addEventListener("click", function() {
  if (selectAreas.value != "") {
    fetch(selectAreas.value)
      .then(response => response.json())
      .then(function(data) {
        addPokemons([...data.pokemon_encounters]);
      });
  } else {
    alert("No area selected");
  }
});
document.addEventListener("click", function(e) {
  if (e.target.className == "captureBtn") {
    const name = document.querySelector(".pokemon-name").innerText;
    const imgUrl = document.querySelector(".pokemon-image").getAttribute("src");
    const stat = newPokemon(name, imgUrl);
    var pokeCounter = `<p>BAG ( ${mypoke.length} / 6 )</p>`;
    var newHtml = mypoke
      .map(value => {
        return `<div class="poke-div"><img class="poke-img" src="${value.img}"></img><span>${value.name}</span></div>`;
      })
      .join("");
    document.querySelector(".encounter-con").innerHTML = stat;
    document.querySelector(".status").innerHTML = "";
    document.querySelector(".poke-cont").innerHTML = pokeCounter;
    document.querySelector(".pokemon").innerHTML = newHtml;
  }
});
function Pokemon(name, img) {
  this.name = name;
  this.img = img;
}

function newPokemon(name, imgUrl) {
  const newPoke = new Pokemon(name, imgUrl);
  let randomNum = Math.floor(Math.random() * 10);
  if (mypoke.length < 6) {
    if (randomNum >= 5) {
      mypoke.push(newPoke);
      return "<p>Caught successfully!</p>";
    } else {
      return "<p>FAILED!</p>";
    }
  } else {
    return "<p>No more slot!</p>";
  }
}

function fetchPokemonImg(url) {
  fetch(url)
    .then(response => response.json())
    .then(function(data) {
      const html = `<h1 class="pokemon-name">${data.species.name[0].toUpperCase() +
        data.species.name.slice(1)}</h1><img class="pokemon-image" src="${
        data.sprites.front_default
      }"></img>
        <img class="captureBtn" draggable="true" src="./img/pokeball.gif" alt="pokeball">`;
      document.querySelector(".encounter-con").innerHTML = html;
      document.querySelector(".status").innerHTML = `${generateStat(
        data.stats
      )}`;
      document.querySelector(".encounter-con").removeAttribute("style");
      document.querySelector(".status").removeAttribute("style");
    })
    .catch(error => console.error(error));
}
function display(arr, target) {
  target.innerHTML = arr.map(
    r =>
      `<option value="${r.url}">${r.name[0].toUpperCase() +
        r.name.slice(1)}</option>`
  );
}
function addPokemons(pokemons) {
  let randomNum = Math.floor(Math.random() * pokemons.length);
  fetchPokemonImg(pokemons[randomNum].pokemon["url"]);
}
function generateStat(statsArr) {
  return statsArr
    .map(value => {
      return `<p><span>${value.stat["name"].toUpperCase()}</span>: ${
        value.base_stat
      }</p>`;
    })
    .join("");
}
