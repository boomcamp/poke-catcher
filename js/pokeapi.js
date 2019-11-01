const pokeapi = (function() {
  getRegion("https://pokeapi.co/api/v2/region");
  function getRegion(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var result = data.results;
        selectRegion.innerHTML = result
          .map(reg => `<option value="${reg.url}">${reg.name}</option>`)
          .join("");
        getLocation(result[0].url);
      });
  }
  function getLocation(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var result = data.locations;
        selectLocation.innerHTML = result
          .map(reg => `<option value="${reg.url}">${reg.name}</option>`)
          .join("");
        getArea(result[0].url);
      });
  }
  function getArea(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var result = data.areas;
        selectArea.innerHTML = result
          .map(reg => `<option value="${reg.url}">${reg.name}</option>`)
          .join("");
        btn.checkBtn();
      });
  }

  return {
    getRegion,
    getLocation,
    getArea
  };
})();
