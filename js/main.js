const pokeRegions = 'https://pokeapi.co/api/v2/region';

const regions = [];


fetch(pokeRegions)
    .then(response => response.json())
    .then(regs => {
        regions.push(regs)
        console.log(regions)
    })
    .catch(err => {
        console.log(err)
    })