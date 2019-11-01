export default function GetAllLocations(region) {
    console.log(region)
    fetch(`https://pokeapi.co/api/v2/region/${region}`)
    .then(data=>data.json())
    .then(showLocations)
    .catch(e=>alert(e));
}

function showLocations(locations){
    
    let alllocations = '';

    locations.locations.map(location=>{
        alllocations +=`<h1 data-name="${location.name}">${location.name}</h1>`;
    });

    
    document.querySelector('.region-location-container').innerHTML = alllocations;   
}