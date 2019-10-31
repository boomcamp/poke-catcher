export default function GetAllRegion() {
    let regions = fetch(`https://pokeapi.co/api/v2/region`)
    .then(data=>data.json())
    .then(showRegions)
    .catch(e=>alert(e));

}

function showRegions(regions){
    let allregion = '';
    
    regions.results.map(region=>{
        // allregion +=`<div class="map-region-container" data-rname="${region.name}">
        //                     <h2 data-rname="${region.name}">${region.name}</h2>
        //              </div>`
        
        allregion += `<div class="map-hover map-region ${region.name}" data-name="${region.name}">
                        <h1 data-name="${region.name}">
                            ${region.name}
                        </h1>
                    </div>`;
    });

    // document.querySelector('.region').innerHTML = allregion;    
    document.querySelector('.new-map-select').innerHTML = allregion;    
}