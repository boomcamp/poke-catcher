const pokemon = (function() {
  function getPokemonUrl(url) {
    fetch(url)
      .then(response => response.json())
      .then(pokemon => {
        getPokemon(pokemon.pokemon_encounters);
      });
  }
  var picUrl = "";
  function getPokemonDetails(url) {
    fetch(url)
      .then(response => response.json())
      .then(detail => {
        var stats = detail.stats;
        details.innerHTML += stats
          .map(x => `<span>○ ${x.stat.name} : ${x.base_stat}</span><br>`)
          .join("");
        pokemonCont.innerHTML = `
          <img src="${detail.sprites.front_default}">
          <button class="pokeball" onclick="pokemonBtn()"></button>`;
        picUrl = detail.sprites.front_default;
        var type = detail.types[0].type.name;
        if (type == "water") {
          pokemonCont.style.backgroundImage = "url('../img/beach.jpg')";
        } else if (type == "rock") {
          pokemonCont.style.backgroundImage = "url('../img/forest.png')";
        } else if (type == "ground") {
          pokemonCont.style.backgroundImage = "url('../img/forest.png')";
        } else if (type == "grass") {
          pokemonCont.style.backgroundImage = "url('../img/forest.png')";
        } else if (type == "normal") {
          pokemonCont.style.backgroundImage = "url('../img/forest.png')";
        } else if (type == "bug") {
          pokemonCont.style.backgroundImage = "url('../img/forest.jpg')";
        } else if (type == "ghost") {
          pokemonCont.style.backgroundImage = "url('../img/haunted.jpg')";
        } else {
          pokemonCont.style.backgroundImage = "url('../img/forest.png')";
        }
      });
  }
  var pokemon = "";
  function getPokemon(list) {
    let a = Math.floor(Math.random() * list.length);
    details.innerHTML = `<p>You found . . . <span class="pokename">${list[a].pokemon.name}</span></p>`;
    pokemon = list[a].pokemon.name;
    getPokemonDetails(list[a].pokemon.url);
  }
  function pokename() {
    return pokemon;
  }
  function pokepic() {
    return picUrl;
  }
  return {
    getPokemonUrl,
    pokename,
    pokepic
  };
})();
