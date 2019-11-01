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
    
    if(location.areas.length < 1)
        alllocations = `<h1 data-name="nodata">No Areas Available</h1>`
    else{
        location.areas.map(area=>{
            alllocations +=`<h1 data-name="${area.name}" data-area="yes">${area.name}</h1>`;
        });
    }
 
    document.querySelector('.region-location-container').innerHTML = alllocations;    
}