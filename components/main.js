import GetRegion from './GetRegion.js';
import GetAllLocations from './GetLocation.js';
import GetArea from './GetArea.js';
import GetEncounters, { randomEncounter, catchPokemon } from './GetPokeEncounter.js';

//for selecting locations and area
let once = true;

function defaultProps(){
    document.querySelector('.region').style.display = "none";
    // document.querySelector('.explore-map-container').style.display = 'none';

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
    console.log('called');
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


document.querySelectorAll('.map-clickable').forEach(element => {

    element.addEventListener('click', function(){
        // document.querySelector('.menu').style.display = 'none';
    
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


        preventthis = false;

        // if(document.querySelector('.region').style.display === 'none'){
        //     document.querySelector('.region').style.display = "flex";
        //     document.querySelector('.explore-map-container').style.display = 'none';
    
        //     GetRegion();
        // }else{
        //     document.querySelector('.region').style.display = "none";
        //     defaultProps();
        //     document.querySelector('.explore-map-container').style.display = 'block';
        // }
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
    // toggle('.new-map-select');
    // toggle('.back-to-menu');
    document.querySelector('.region-to-location-name').innerHTML = e.target.getAttribute('data-name');

    toggle('.location-selectables','flex');
    toggle('.background-overlay');

    // fhide('.exploration-number-five');
    
    GetAllLocations(e.target.getAttribute('data-name'))
    once = true;    
});

document.querySelector('.background-overlay').addEventListener('click',function(e){
    console.log(preventthis);
    

    if(!preventthis){
        toggle('.background-overlay');
        toggle('.location-selectables');
    }
    
    once = true;
})

// after region -> location selections
document.querySelector('.region-location-container').addEventListener('click', function(e){
    
    if(once){
        document.querySelector('.region-to-location-name').innerHTML = e.target.getAttribute('data-name');
        GetArea(e.target.getAttribute('data-name'));
        once = false;
    }else{

        GetEncounters(e.target.getAttribute('data-name'))

        toggle('.exploration-number-five');
        fhide('.new-map-select');
        fhide('.menu');
        fhide('.back-to-menu');
        fhide('.location-selectables');
        toggle('.map-on-game');
        fhide('.background-overlay');
        
        toggle('.menu-on-game');

        pokecatch();

        preventthis = true;

        console.log(preventthis);
    } 
});

let preventthis = false;

function pokecatch(){
    setTimeout(function(){
        randomEncounter();
        toggle('.catching-poke','flex');
        toggle('.exploration-number-five');
    },2000);
}

document.querySelector('.catch-em-all').addEventListener('click', function(){

    catchPokemon();
    pokecatch();

    toggle('.catching-poke');
    toggle('.exploration-number-five');

});
    
document.querySelector('.my-pokemons').addEventListener('click', function(){

   toggle('.mypokemons');
});


// document.querySelector()
//commment out this. old region select
// document.querySelector('.region').addEventListener('click',function(e){
//     if(!document.querySelector('.map-location-container')&&!document.querySelector('.map-area-container')){
//         GetAllLocations(e.target.getAttribute('data-rname'));
//     }else if(!document.querySelector('.map-area-container')){

//         GetArea(e.target.getAttribute('data-rname'));
//     }else{

//         GetEncounters(e.target.getAttribute('data-rname'));

//         document.querySelector('.region').style.display = "none";
//         defaultProps();
        
//     }
// });

// document.querySelector('.explore-btn').addEventListener('click', function(){
//     randomEncounter();
// });


// document.querySelector('.catch-btn').addEventListener('click',function(){
//     catchPokemon();
// });

defaultProps();