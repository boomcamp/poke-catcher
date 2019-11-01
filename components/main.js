import GetRegion from './GetRegion.js';
import GetAllLocations from './GetLocation.js';
import GetArea from './GetArea.js';
import GetEncounters, { randomEncounter, catchPokemon } from './GetPokeEncounter.js';

//for selecting locations and area
let once = true;

function defaultProps(){
    document.querySelector('.region').style.display = "none";
    // new
    toggle('.new-map-select');
    toggle('.back-to-menu');
    toggle('.location-selectables');
    toggle('.background-overlay');
    // for field
    toggle('.exploration-number-five');
    fhide('.map-on-game');
    toggle('.catching-poke');
    // hide pokemons
    toggle('.mypokemons');
    // hide in-game-menu
    toggle('.menu-on-game');
    //hide pokeball
    toggle('.catching');
    fhide('.iscaptured');
}

function toggle(className, type){
    let ref = document.querySelector(className);

    if(type){
        return ref.style.display == 'none'? ref.style.display = type : ref.style.display = 'none';
    }

    return ref.style.display == 'none'? ref.style.display = 'block' : ref.style.display = 'none';
}

function fhide(className){
    let ref = document.querySelector(className);

    return ref.style.display = 'none';
}

let stopcurrentExploration = false;


document.querySelectorAll('.map-clickable').forEach(element => {

    element.addEventListener('click', function(){
        toggle('.menu', 'flex');
        toggle('.new-map-select', 'flex');
    
        GetRegion();
    
        toggle('.back-to-menu');
    
        document.querySelector('body').style.background = 'black';

        fhide('.exploration-number-five');
        fhide('.menu');
        fhide('.location-selectables');
        fhide('.background-overlay');
        fhide('.map-on-game');
        fhide('.menu-on-game');
        fhide('.catching-poke');

        preventthis = false;
        stopcurrentExploration = true;
    }); 
});

document.querySelector('.back-to-menu').addEventListener('click',function(){
    toggle('.back-to-menu');
    toggle('.new-map-select', 'flex');
    toggle('.menu', 'flex');

    fhide('.location-selectables');
    fhide('.background-overlay');
    document.querySelector('body').style.background = '#F2EB88';
});


document.querySelector('.new-map-select').addEventListener('click',function(e){

    document.querySelector('.region-to-location-name').innerHTML = e.target.getAttribute('data-name');

    toggle('.location-selectables','flex');
    toggle('.background-overlay');
    
    GetAllLocations(e.target.getAttribute('data-name'))
    once = true;    

    console.log('new map select');

});

document.querySelector('.background-overlay').addEventListener('click',function(e){

    console.log('background overlay');

    if(!preventthis){
        toggle('.background-overlay');
        toggle('.location-selectables');
    }
    
    once = true;
})

document.querySelector('.region-location-container').addEventListener('click', function(e){        
    if(once){

        document.querySelector('.region-to-location-name').innerHTML = e.target.getAttribute('data-name');
        GetArea(e.target.getAttribute('data-name'));
        once = false;

    }else if(e.target.getAttribute('data-area')){
        GetEncounters(e.target.getAttribute('data-name'))
        toggle('.exploration-number-five');
        fhide('.new-map-select');
        fhide('.menu');
        fhide('.back-to-menu');
        fhide('.location-selectables');
        toggle('.map-on-game');
        fhide('.background-overlay');
        toggle('.menu-on-game' , 'flex');

        stopcurrentExploration = false; 

        exploring();

        preventthis = true;
    } 
});

function exploring(){

    document.querySelector('.catching-poke').style.display = 'none'
    document.querySelector('.exploration-number-five').style.display = 'flex'

   setTimeout(function(){
        randomEncounter();
        proceedCatch();
    },2000);    

}

function proceedCatch(){
    if(!stopcurrentExploration){

        console.log('proccedding')

        toggle('.catching-poke','flex');
        toggle('.exploration-number-five');

        document.querySelector('.pokemon-details').style.display = 'flex';
        
        //hide pokeball
        fhide('.catch-em-all');

        document.querySelector('.explore-or-catch').style.display = 'flex';
    }
}


document.querySelector('.catch-this-try').addEventListener('click',function(){
    //show pokeball
    document.querySelector('.catch-em-all').style.display = 'flex';

    //hide poke options
    toggle('.explore-or-catch');

    document.querySelector('.pokemon-details').style.width = '800px';
    document.querySelector('.pokemon-details').style.marginLeft = '18%';
    document.querySelector('.catch-em-all').style.opacity = '1';
});


document.querySelector('.menu-on-game .menu-ref').addEventListener('click', function(){

    console.log('menu-ref');

    fhide('.exploration-number-five');
    fhide('.catching-poke');
    fhide('.location-selectables');
    fhide('.background-overlay');
    toggle('.menu', 'flex');
    fhide('.menu-on-game');
    document.querySelector('body').style.background = '#F2EB88';

    fhide('.mypokemons');
    fhide('.iscaptured');

});

document.querySelector('.catch-em-all').addEventListener('click', function(){

    console.log('catch em all');
    
    document.querySelector('.catch-em-all').style.animationName = 'pokeballmove';
    document.querySelector('.catch-em-all').style.opacity = '0';


    setTimeout(function(){
        toggle('.catching');
        let forPokePos = document.getElementsByClassName('pf-pokemon');
        document.getElementsByClassName('catching')[0].style.left = forPokePos[0].offsetLeft + 'px';
        document.getElementsByClassName('catching')[0].style.top = forPokePos[0].offsetTop + 'px';
        fhide('.pokemon-details');
    },1000);

    setTimeout(function(){

        let pokename = document.querySelector('.name-poke').getAttribute('data-name');

        document.querySelector('#captured-pokemon-name').innerHTML = pokename;

        fhide('.catching')
        toggle('.iscaptured', 'flex')
        catchPokemon();

        document.querySelector('.catch-em-all').style.animationName = 'none';
        
    },3000)

});

document.querySelector('.my-pokemons').addEventListener('click', function(){

   toggle('.mypokemons');

});

document.querySelectorAll('.show-pokemons').forEach(element=>{
    element.addEventListener('click', function(){

        toggle('.mypokemons');
        toggle('.iscaptured', 'flex')
     
     });
});

document.querySelectorAll('.explore-again').forEach(element=>{
    element.addEventListener('click', function(){

        exploring();
        fhide('.iscaptured');
     });
});

defaultProps();

let preventthis = false;
