import {getRegion} from './modules.js';
const givenUrl = 'https://pokeapi.co/api/v2/'

var regionlist = [];
fetch(`${givenUrl}region`)
.then(response => response.json())
.then(function(data){ 
    getRegion(regionlist.push(...data.results));
    })
    
