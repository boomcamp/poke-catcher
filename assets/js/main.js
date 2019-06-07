import dom from './api/dom.js';
import all from './api/location.js';

//fetches all information (objects) based on the passed url to the get() function
const region = all.get('https://pokeapi.co/api/v2/region/');
getRegionFunc(region);
function getRegionFunc(region){
    region
    .then(RegionName => {
        dom.RegionNames(RegionName.results);
        getLocationFunc(RegionName.results[0].url);
    })
};
function getLocationFunc(regionUrl){
     const location = all.get(regionUrl);
     location
     .then(LocationName => {
        dom.LocationNames(LocationName.locations);
        getAreaFunc(LocationName.locations[0].url);
    })
}
function getAreaFunc(locationUrl){
    const area = all.get(locationUrl);
    area
    .then(AreaName => {
       dom.AreaNames(AreaName.areas);
   })
}

export default{
    getLocationFunc,
    getAreaFunc,
}