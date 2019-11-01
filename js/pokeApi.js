function get(path) {
    return fetch(`https://pokeapi.co/api/v2/` + path)
    .then(res => res.json())
};

export default get;