const pokemon = (function() {
  function pokemonSprite(sprite) {
    pokeSprite.innerHTML = `<img class="pokeMove" width="300" src="${sprite}">`;
  }

  function pokemonStats(stats) {
    encounterDetails.innerHTML = stats
      .map(
        pokemon =>
          ` <div class="stats-text">
          <p>${pokemon.stat.name} </p>
          <div class="w3-container w3-blue w3-round-xlarge" style="width:${(pokemon.base_stat /
            120) *
            100}%">${pokemon.base_stat}</div>
        </div>`
      )
      .join("");
  }

  function battleBackground(type) {
    if (type == "water") {
      encounterHud.style.backgroundImage = "url('images/water.png')";
    } else if (type == "rock") {
      encounterHud.style.backgroundImage = "url('images/rock.png')";
    } else if (type == "ground") {
      encounterHud.style.backgroundImage = "url('images/grass.png')";
    } else if (type == "grass") {
      encounterHud.style.backgroundImage = "url('images/grass.png')";
    } else if (type == "normal") {
      encounterHud.style.backgroundImage = "url('images/city.png')";
    } else if (type == "bug") {
      encounterHud.style.backgroundImage = "url('images/grass.png')";
    } else {
      encounterHud.style.backgroundImage = "url('images/flying.png')";
    }
  }

  return {
    pokemonSprite,
    pokemonStats,
    battleBackground
  };
})();
