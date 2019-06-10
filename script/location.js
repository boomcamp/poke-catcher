const locations = (function() {
  function get(name) {
    return pokeAPI.get(`location/${name}`).catch(console.error);
  }

  function getArea(name) {
    return pokeAPI.get(`location-area/${name}`);
  }

  return {
    get,
    getArea,
  };
})();