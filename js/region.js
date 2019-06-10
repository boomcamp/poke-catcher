//regions

const regionData = [];
const region = (function() {
    function all() {
        return pokeApi
            .get('region')
            .then(regs => regs.results)
            .catch(err => console.log(err))
    }

    function get(name) {
        return pokeApi.get(`region/${name}`);
    }

    return {
        all,
        get,
    };
})();