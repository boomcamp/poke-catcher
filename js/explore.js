const data = (function() {
  fetch("https://pokeapi.co/api/v2/region")
    .then(response => response.json())
    .then(region => {
      getRegion(region.results);
      getLocationUrl(region.results[0].url);
    });

  function getRegion(region) {
    let html = region
      .map(r => {
        return `<option value=${r.url}>${r.name}</option>`;
      })
      .join("");
    Region.innerHTML = html;
  }

  function getLocationUrl(url) {
    fetch(url)
      .then(response => response.json())
      .then(loc => {
        getLocation(loc.locations);
        getAreaUrl(loc.locations[0].url);
      });
  }

  function getAreaUrl(url) {
    fetch(url)
      .then(response => response.json())
      .then(area => {
        getArea(area.areas);
      });
  }

  function getLocation(loc) {
    let html = loc
      .map(r => {
        return `<option value=${r.url}>${r.name}</option>`;
      })
      .join("");
    Location.innerHTML = html;
  }

  function getArea(area) {
    let html = area
      .map(r => {
        return `<option value=${r.url}>${r.name}</option>`;
      })
      .join("");
    Area.innerHTML = html;
  }

  function getPokemonUrl(url) {
    fetch(url)
      .then(response => response.json())
      .then(pokemon => {
        getPokemon(pokemon.pokemon_encounters);
      });
  }

  function getPokemon(pokemon) {
    let i = Math.floor(Math.random() * pokemon.length);
    Detail.innerHTML = `<p value=${pokemon[i].pokemon.url}>${pokemon[i].pokemon.name}</p>`;
    getPokemonInfos(pokemon[i].pokemon.url);
  }

  function getPokemonInfos(url) {
    fetch(url)
      .then(response => response.json())
      .then(details => {
        pokemon.Sprite(details.sprites.front_default);
        pokemon.Stats(details.stats);
      });
  }

  return {
    getLocationUrl,
    getAreaUrl,
    getPokemonUrl,
    getPokemonInfos
  };
})();
