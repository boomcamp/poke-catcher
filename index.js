// const api = 'https://pokeapi.co/api/v2/';
// function get(url) {
// 	return fetch(api+url);
// }
const regionSelect = document.getElementById('region');
const locationSelect = document.getElementById('location');
// const getRegion = get('region');
// console.log(getRegion);

// getRegion.then(res => { return res.json();})
// .then(data => { showRegions(data.results)});


// function showRegions(regions) {
// 	regionSelect.innerHTML = regions
// 	.map(region => { 
// 		return `<option value="${region.name}">${region.name}</option>`;
		
// 	}).join('');
// }

// regionSelect.addEventListener('change', function(e) {

// })

// function randomPokemon() {
	
// }
const pokeAPI = (function() {
	const baseURL = 'https://pokeapi.co/api/v2';

	function get(path) {
		return fetch(`${baseURL}/${path}`)
		.then(res => {console.log(res); return res.json();});
	}

	return {
		get,
	}
})();

//regions 
const regions = (function() {
	function all() {
	  return pokeAPI
		.get('region')
		.then(data => data.results)
		.catch(console.error);
	}
  
	function get(name) {
	  return pokeAPI.get(`region/${name}`);
	}
  
	return {
	  all,
	  get,
	};
  })();

  //location 
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

//API
const api = {
	// pokemon,
	locations,
	regions,
  };

  regions.all().then(regions => {
	  regionSelect.innerHTML = regions
	  .map(reg => 
		{ return `<option value="${reg.name}">${reg.name}</option>`; })
		.join("");
		regionSelect.dispatchEvent(new Event('change'));
  });

  regionSelect.addEventListener('change',function(e) {
	regions.get(e.target.value).then(region=> {
		locationSelect.innerHTML = region.locations.map
		(loc => {return `<option value="${loc.name}">${loc.name}</option>`;})
		.join('');
		locationSelect.dispatchEvent(new Event('change'));
	});
  });