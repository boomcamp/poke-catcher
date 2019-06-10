const pokeApi = (function() {
    const pokeUrl = 'https://pokeapi.co/api/v2';

    function get(path) {
        return fetch(`${pokeUrl}/${path}`)
            .then(result => result.json())
    }

    return {
        get,
    };
})();

//regions
const region = (() => {
    function all() {
        return pokeApi
            .get('region')
            .then(regs => regs.results)
            .catch(err => console.log(err))
    }

    function get(region) {
        return pokeApi.get(`region/${region}`);
    }

    return {
        all,
        get,
    };
})();

const locations = (() => {
    let get = (locate) => {
        return pokeApi
            .get(`location/${locate}`)
            .catch(err => console.log(err))
    }
    let area = (locationArea) => {
        return pokeApi
            .get(`location-area/${locationArea}`)
    }

    return {
        get,
        area,
    }
})();

const pokemons = (() => {
    let get = (pokemon) => {
        return pokeApi
            .get(`pokemon/${pokemon}`)
            .catch(err => console.log(err))
    }
    return {
        get,
    }

})();