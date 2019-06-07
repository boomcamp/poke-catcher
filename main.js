//How it works

//Initialize the first regions, location, and area
getRegion('https://pokeapi.co/api/v2/region');
//getLocation('https://pokeapi.co/api/v2/region/1');
//getArea('https://pokeapi.co/api/v2/location/67/');

//Fuctions to get data
function getRegion(url) {
    var region;
    fetch(url)
        .then((reg) => reg.json())
        .then((data) => {
            data.results.forEach((reg) => {
                //console.log(reg);
                region += `<option value="${reg.url}">${reg.name}</option>`;
            });

            document.getElementById('region').innerHTML = region;
            region = '';
        });
}

function getLocation(url) {
    var location;
    fetch(url)
        .then((loc) => loc.json())
        .then((dataL) => {
            dataL.locations.forEach((loc) => {
                //console.log(loc);
                locations = `<option value="${loc.url}">${loc.name}</option>`;
            });

            document.getElementById('locations').innerHTML = locations;
        });    
}


function getArea(url) {
    var areas;
    fetch(url)
        .then((are) => are.json())
        .then((dataA) => {
            dataA.areas.forEach((are) => {
                //console.log(are);
                areas += `<option value="${are.url}">${are.name}</option>`;
            });

            document.getElementById('areas').innerHTML = areas;
        });
}

// function empty(id){
//     var parent = document.getElementById(id)
// }

//Change location and area when region changes
var r = document.getElementById('region');

r.addEventListener("change", updateLocArea);

function updateLocArea() {
    var selected = r.options[r.selectedIndex].value;
    console.log("Update: " + selected);
    document.getElementById('locations').innerHTML = " ";
    getLocation(selected)
}




