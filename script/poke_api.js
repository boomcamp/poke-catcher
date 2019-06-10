


const poke_api = (function(){

	const baseURL = 'https://pokeapi.co/api/v2';

	function get(path) {
    return fetch(`${baseURL}/${path}`).then(res => res.json());
	  }
	return {
    get,
  };
})();



