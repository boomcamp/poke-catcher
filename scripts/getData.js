const getData = (function() {
  fetch("https://pokeapi.co/api/v2/region")
    .then(url_result => url_result.json())
    .then(function(regionDetails) {
      getRegion(regionDetails.results);
      getLocationUrl(regionDetails.results[0].url);
    });

  function getRegion(regionDetails) {
    let regionOption = regionDetails
      .map(function(result) {
        return `<option value=${result.url}>${result.name}</option>`;
      })
      .join("");
    selectRegion.innerHTML = regionOption;
  }

  function getLocationUrl(url) {
    fetch(url)
      .then(url_result => url_result.json())
      .then(function(locationDetails) {
        getLocation(locationDetails.locations);
        getAreaUrl(locationDetails.locations[0].url);
      });
  }

  function getLocation(locationDetails) {
    let locationOption = locationDetails
      .map(function(result) {
        return `<option value=${result.url}>${result.name}</option>`;
      })
      .join("");
    selectLocation.innerHTML = locationOption;
  }

  function getAreaUrl(url) {
    fetch(url)
      .then(url_result => url_result.json())
      .then(function(areaDetails) {
        getArea(areaDetails.areas);
      });
  }

  function getArea(areaDetails) {
    let areaOption = areaDetails
      .map(function(result) {
        return `<option value=${result.url}>${result.name}</option>`;
      })
      .join("");
    selectArea.innerHTML = areaOption;
  }

  function getPokemonUrl(url) {
    fetch(url)
      .then(response => response.json())
      .then(function(pokemon) {
        getPokemon(pokemon.pokemon_encounters);
      });
  }

  function getPokemon(pokemons) {
    let a = Math.floor(Math.random() * pokemons.length);
    pokeName.innerHTML = `<p class="pokename" value=${pokemons[a].pokemon.url}>${pokemons[a].pokemon.name}</p>`;
    selectPokemon.innerHTML = `<p class="pokename" value=${pokemons[a].pokemon.url}>${pokemons[a].pokemon.name}</p>`;
    getPokemonDetails(pokemons[a].pokemon.url);
  }

  function getPokemonDetails(url) {
    fetch(url)
      .then(response => response.json())
      .then(function(pokeDetails) {
        pokeSpriteList.innerHTML = `<img width="150" src="${pokeDetails.sprites.front_default}">`;
        pokemon.pokemonSprite(pokeDetails.sprites.front_default);
        pokemon.pokemonStats(pokeDetails.stats);
        pokemon.battleBackground(pokeDetails.types[0].type.name);
      });
  }

  return {
    getLocationUrl,
    getAreaUrl,
    getPokemonUrl,
    getPokemonDetails
  };
})();
