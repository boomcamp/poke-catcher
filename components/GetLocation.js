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
        alllocations +=`<div class="map-location-container" data-rname="${location.name}">
                            <h2 data-rname="${location.name}" >${location.name}</h2>
                     </div>`
    });

    document.querySelector('.region').innerHTML = alllocations;   
    // document.querySelector('.region').className = 'location';   
     
}