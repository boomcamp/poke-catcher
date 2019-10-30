export default function GetArea(location) {
    console.log(location)
    fetch(`https://pokeapi.co/api/v2/location/${location}`)
    .then(data=>data.json())
    .then(showArea)
    .catch(e=>alert(e));

}

function showArea(location){
    
    let alllocations = '';

    console.log(location.areas);
    
    location.areas.map(area=>{
        alllocations +=`<div class="map-area-container" data-rname="${area.name}">
                            <h2 data-rname="${area.name}">${area.name}</h2>
                     </div>`
    });

    document.querySelector('.region').innerHTML = alllocations;    
}