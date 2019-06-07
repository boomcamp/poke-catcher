const regionURL = "https://pokeapi.co/api/v2/region"


const regions = [];

fetch(regionURL)
    .then(fetchreg => fetchreg.json())
    .then(data => regions.push(...data.results));

$( window ).on( "load", function() {
        for(let x in regions){
        $('#region-inp').append(`<option>${regions[x].name}</option>`)
        }
        
 });




