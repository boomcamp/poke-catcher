import GetRegion from './GetRegion.js';
import GetAllLocations from './GetLocation.js';
import GetArea from './GetArea.js';
import GetEncounters, { randomEncounter, catchPokemon } from './GetPokeEncounter.js';



function defaultProps(){
    document.querySelector('.region').style.display = "none";
    console.log('called');
}


document.querySelector('.map-clickable').addEventListener('click', function(){
    if(document.querySelector('.region').style.display === 'none'){
        document.querySelector('.region').style.display = "flex";
        document.querySelector('.explore-map-container').style.display = 'none';

        GetRegion();
    }else{
        document.querySelector('.region').style.display = "none";
        defaultProps();
        document.querySelector('.explore-map-container').style.display = 'block';
    }
});


document.querySelector('.region').addEventListener('click',function(e){
    if(!document.querySelector('.map-location-container')&&!document.querySelector('.map-area-container')){
        GetAllLocations(e.target.getAttribute('data-rname'));
    }else if(!document.querySelector('.map-area-container')){
        GetArea(e.target.getAttribute('data-rname'));
    }else{
        GetEncounters(e.target.getAttribute('data-rname'));
        document.querySelector('.region').style.display = "none";
        defaultProps();
        document.querySelector('.explore-map-container').style.display = 'block';
    }
});

document.querySelector('.explore-btn').addEventListener('click', function(){
    randomEncounter();
});


document.querySelector('.catch-btn').addEventListener('click',function(){
    catchPokemon();
});

defaultProps();