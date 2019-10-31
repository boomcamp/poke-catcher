export default function GetArea(location) {
    console.log(location)
    fetch(`https://pokeapi.co/api/v2/location/${location}`)
    .then(data=>data.json())
    .then(showArea)
    .catch(e=>alert(e));

}

function showArea(location){
    
    let alllocations = '';

    console.log(location.areas.length);
    
    // location.areas.map(area=>{
    //     alllocations +=`<div class="map-area-container" data-rname="${area.name}">
    //                         <h2 data-rname="${area.name}">${area.name}</h2>
    //                  </div>`
    // });

    if(location.areas.length < 1)
        alllocations = `<h1 data-name="nodata">No Areas Available</h1>`
    else{
        location.areas.map(area=>{
            alllocations +=`<h1 data-name="${area.name}">${area.name}</h1>`;
        });
    }
    // document.querySelector('.region').innerHTML = alllocations;    
    document.querySelector('.region-location-container').innerHTML = alllocations;    
}