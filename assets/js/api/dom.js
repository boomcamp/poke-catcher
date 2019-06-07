import all from '../main.js';
const SelectRegion = document.querySelector('.region');
const SelectLocation = document.querySelector('.location');
const SelectArea = document.querySelector('.area');

//Responsible for the DOMS
function RegionNames(names){
    SelectRegion.innerHTML =  names.map(regionName => `<option>${regionName.name}</option>`);
}
function LocationNames(names){
    SelectLocation.innerHTML =  names.map(locationName => `<option>${locationName.name}</option>`);
}
function AreaNames(names){
    SelectArea.innerHTML =  names.map(areaName => `<option>${areaName.name}</option>`);
 }
function showPokemon(place){

}

 //event listeners
    SelectRegion.addEventListener('change', setLocation);
    SelectLocation.addEventListener('change', setArea);
    function setLocation(e){
        all.getLocationFunc(`https://pokeapi.co/api/v2/region/${e.target.value}`);
    }
    function setArea(e){
        all.getAreaFunc(`https://pokeapi.co/api/v2/location/${e.target.value}`);
    }


export default{
    RegionNames,
    LocationNames,
    AreaNames,
}


//click events
var mapIcon = document.querySelector('.map');
var startDiv = document.querySelector('.start');
var mapDiv = document.querySelector('.map-body');
mapIcon.addEventListener('click',showMap);
function showMap(){
    startDiv.classList.add('hide');
    mapDiv.classList.remove('hide');
}