import LocationDom from './api/LocationDom.js';
import all from './api/fetchApi.js';
import pokemonApi from './api/pokemonApi.js';

//fetches all information (objects) based on the passed url to the get() function

//sets the first url to fetch
const Urlregion = 'https://pokeapi.co/api/v2/region/'; 

//invoke the getRegionFunc function to start fetching data
getRegionFunc(Urlregion);

//region fetching
function getRegionFunc(Urlregion){
    //passes the url to get() function to process the url and return it as a promise
    const region = all.get(Urlregion); 
    region
    .then(RegionName => {
        LocationDom.RegionNames(RegionName.results);//passes the area object to the RegionName function for manipulating the dom
        getLocationFunc(RegionName.results[0].url); //passes the region url to get all the locations inside the region
    })
};


//location fetching
function getLocationFunc(regionUrl){
     const location = all.get(regionUrl);
     location
     .then(LocationName => {
        LocationDom.LocationNames(LocationName.locations);//passes the area object to the LocationNames function for manipulating the dom
        getAreaFunc(LocationName.locations[0].url);//passes the location url to get all the areas inside the location
    })
}


//area fetching
function getAreaFunc(locationUrl){
    const area = all.get(locationUrl);
    area
    .then(AreaName => {
        if(AreaName.areas.length!=0){ 
        LocationDom.AreaNames(AreaName.areas); //passes the area object to the AreaNames function for manipulating the dom
        pokemonApi.getPokemonObject(AreaName.areas[0].url);//passes the area url to get all the pokemon inside the area
        }else{ 
            LocationDom.AreaNames(AreaName.areas);
            pokemonApi.getPokemonObject(AreaName.areas.length);
        }
   })
    
}



export default{
    getLocationFunc,
    getAreaFunc,
}