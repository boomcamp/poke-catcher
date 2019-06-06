//GET REGION
let region;
const regionPromise = fetch ('https://pokeapi.co/api/v2/region/')
    .then(response => 
        response.json())
    .then(JsonRegion =>{ 
        var region = JsonRegion;
        console.log(region);
        document.querySelector('.region')
            .innerHTML = (`<option>Select Region</option>`)
            .concat((region.results)
            .map(ElementName => `<option>${ElementName.name}</option>`));
    });
