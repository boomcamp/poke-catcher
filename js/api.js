const API = (function() {
    function get(path) {
        return fetch(`https://pokeapi.co/api/v2/${path}`)
            .then(res => res.json());
    }

    return {
        get,
    };
})();