const pokemon = (function() {
  function Stats(stats) {
    stat.innerHTML = stats
      .map(pokemon => ` <p>${pokemon.stat.name} : ${pokemon.base_stat}</p>`)
      .join("");
  }

  function Sprite(url) {
    document.querySelector(".appeared").innerHTML = `<img src="${url}">`;
  }

  return {
    Stats,
    Sprite
  };
})();
