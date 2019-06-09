import all from '../main.js';
import pokemonApi from './pokemonApi.js';
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
 //shows all pokemon available in the area


 //event listeners
    SelectRegion.addEventListener('change', setLocation);
    SelectLocation.addEventListener('change', setArea);
    SelectArea.addEventListener('change', setAreaFunc);
    function setLocation(e){
        all.getLocationFunc(`https://pokeapi.co/api/v2/region/${e.target.value}`);
    }
    function setArea(e){
        all.getAreaFunc(`https://pokeapi.co/api/v2/location/${e.target.value}`);
    }
    function setAreaFunc(e){
        pokemonApi.getPokemonObject(`https://pokeapi.co/api/v2/location-area/${e.target.value}/`);
    }


export default{
    RegionNames,
    LocationNames,
    AreaNames,
}


//click events
var mapIcon = document.querySelector('.map');
var startDiv = document.querySelector('.start');
var mapDiv = document.querySelector('.mapDiv');
mapIcon.addEventListener('click',showMap);
function showMap(){
    startDiv.classList.add('hide');
    mapDiv.classList.remove('hide');
    mapDiv.classList.add('flex');
}