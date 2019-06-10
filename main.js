

const regionURL = 'https://pokeapi.co/api/v2/region';


var regions = [];
var locations = [];
var areas = [];
var areasPokemons = [];

//fetch region
fetch(regionURL)
  .then(regions => regions.json())
  .then(data => regions.push(...data.results))
    .then(displayRegions);

  
  function displayRegions() {
    var input = document.getElementById('region');
    const html = regions.map(region => {
        return `
        <option value="${region.name}">${region.name}</option>
    `;
    }).join('');
    input.innerHTML = html;
 }


 
//Getting the selected region
document.getElementById('region').addEventListener('change', 
function SelectedRegion(){  
 
    var eID = document.getElementById("region");
    var regionVal = eID.options[eID.selectedIndex].value; 
    var locationURL = `https://pokeapi.co/api/v2/region/${regionVal}`;
    
    displayLocation(locationURL);
  
});

//displaying region locations 
function displayLocation(locURL) {
    locations = [];
    var locationURL = locURL;
    fetch(locationURL)
        .then(loca => loca.json())
            .then(secArea1 =>  locations.push(...secArea1.locations))
                .then(function(){
                    var input = document.getElementById('location');
                    var html = locations.map(loca => {
                    return `
                    <option value="${loca.name}" >${loca.name}</option>
                    `;
                })
    input.innerHTML = html;
    }) 
}


//Getting the selected location, get the URL
document.getElementById('location').addEventListener('change', 
function SelectedRegion(){    
   var option = document.getElementById('location').selectedIndex;
    for(let c=0; c<locations.length; c++){
        if(option === c){
            var locaAreaURL = locations[c].url;            
            displayArea(locaAreaURL);
        }
    }       
   });


//  displaying  location area
function displayArea(arURL) { 
    
    areas = [];
    var areaURL = arURL;
    fetch(areaURL)
        .then(area => area.json())
            .then(area =>  areas.push(...area.areas))
                .then(function(){
                    var input = document.getElementById('area');
                    var html = areas.map(area => {
                    return `
                    <option value="${area.name}">${area.name}</option>
                    `;
                    })
                    input.innerHTML = html;
    }) 
}


//when no area 
document.getElementById('area').addEventListener('click', 
function noneArea(){    
   var option = document.getElementById('area').length;
   // console.log(option); 
    if(option === 0){
       document.getElementById('mes').innerHTML = "No areas to explore here! Select a different location";
    }
    }  
   );


//Getting the area to get the pokemons on the area
document.getElementById('explore').addEventListener('click', 
function SelectedRegion(event){    
    var eID = document.getElementById("area");
    var Val = eID.options[eID.selectedIndex].value; 
    var areaPokeURL = `https://pokeapi.co/api/v2/location-area/${Val}`;
   areasPokemon(areaPokeURL);

}
);



//Getting random pokemon
function areasPokemon(areaPoke){
    areasPokemons = [];
    var areasPokemoURL = areaPoke;
  
    fetch(areasPokemoURL)
  .then(poke => poke.json())
  .then(data => areasPokemons.push(...data.pokemon_encounters))
    .then(
        function(){
            // console.log(areasPokemons.length);
             var randomNum = Math.floor((Math.random() * areasPokemons.length) + 1);
             var pokemonURL = areasPokemons[randomNum].pokemon.url;
            var pokemonName = areasPokemons[randomNum].pokemon.name;
              
            //console.log(pokemonURL);
              displayExplore(pokemonURL); 
              displayImage(pokemonURL, pokemonName); 
              displayOtherDetail(randomNum);

              //other
              var div = document.querySelector('#messageCapture');
              div.innerHTML = ``;
           
              var divfound = document.querySelector('#youFound');
              divfound.innerHTML = `<p>You Found A...</p>`;


            //detail border style
            document.querySelector('#detail').setAttribute("class", "det");


            //remove class disable
            var divImg = document.querySelector('#imgDiv');
            var det = document.querySelector('#detail-div');
           
            divImg.classList.remove('disabled');
            det.classList.remove('disabled');
           

});
}

//pokemon detail
function displayExplore(url){
    var pokemonURL = url;
    var pokemonStat = [];
fetch(pokemonURL)
  .then(poke => poke.json())
  .then(data => pokemonStat.push(...data.stats))
    .then(
        function(){
          var input = document.getElementById('detail');    
             var det =  `
          
                        <label>Speed:</label>   <span> ${pokemonStat[0].base_stat} </span> 
                        <label>Special-defense:</label>  <span> ${pokemonStat[1].base_stat}</span> 
                        <label>Special-attack:</label>  <span>${pokemonStat[2].base_stat}</span> 
                        <label>Ddefense:</label> <span>${pokemonStat[3].base_stat}</span> 
                        <label>Aattack:</label> <span>${pokemonStat[4].base_stat}</span> 
                        <label>Hp:</label>   <span>${pokemonStat[5].base_stat}</span> 
           
            `;
            
            input.innerHTML = '<p><b>STATS: </b></p>' + det;
                  
        });
}

//other detail
function  displayOtherDetail(num){
   
    var url = `https://pokeapi.co/api/v2/ability/${num}`;
    var effect = [];
    fetch(url)
    .then(eff => eff.json())
        .then(eff =>  effect.push(...eff.effect_entries))
            .then(function(){
               
                var p = effect.map(eff => {
                return `
                <p>${eff.effect}</p>
                <p>Short Effect: ${eff.short_effect}</p>
                `;
                }).join('');

                //console.log(p);
                var div = document.getElementById('otherDetail');
               div.innerHTML = '<p><b>ABILITY: </b></p>' + p;
            }) 
}

    


//displaying Image
function displayImage(url, name){
    var pokemonName = name;
    
    var pokemonURL = url;
    
fetch(pokemonURL)
  .then(poke => poke.json())
  .then(sprite =>  pokemonImage = sprite.sprites.front_default)
  .then( 
    function(){
       
            var img = document.getElementById('img');    
            var image =  `<img src="${pokemonImage}" alt="img" class="pokemon">`;
            
            img.innerHTML = image;
        
            var div = document.getElementById('name'); 
            var p =  `<p style="color:blue" id = "nameOfPokemon"><i><b>${pokemonName}</b></i></p>`;
            div.innerHTML = p;
                
        }
  );

}

 // capture
document.getElementById('capture').addEventListener('click', capturedPokemon);

function capturedPokemon(){
//count
var matched = document.querySelectorAll(".pokemons div");
//console.log(matched.length);

if(matched.length != 6){

    var image = document.querySelector('.pokemon').src;
    var pokemon = document.querySelector('#nameOfPokemon').innerText;

    var input = document.querySelector('.pokemons');
    
     var html = `<div id="div_pokemon">
                <img src="${image}" alt = "img" class = "captured" >
                <p style="margin-top: -30px;">${pokemon}</p>
                </div>`;  
    
     input.insertAdjacentHTML('beforeend', html);  
    
    //remove capture img from left
    var img = document.querySelector('#img');
    var namePoke = document.querySelector('#nameOfPokemon');
    var detail = document.querySelector('#detail');
    var otherDetail = document.querySelector('#otherDetail');
    img.innerHTML = '';
    namePoke.innerHTML = '';
    detail.innerHTML = '';
    otherDetail.innerHTML = '';


    //message the pokemon name capture to explore again
    var div = document.querySelector('#messageCapture');
    div.innerHTML = `<p style = "color: blue; font-size: 30px;">Captured <span style="color: red">${pokemon}</span>, explore to find more pokemon</p>`;
  
    //remove
    var divfound = document.querySelector('#youFound');
    divfound.innerHTML = ``;


     //remove class disable
     var divImg = document.querySelector('#imgDiv');
     var det = document.querySelector('#detail-div');
    
     divImg.classList.add('disabled');
     det.classList.add('disabled');
    


    //counter at captured
    var span = document.querySelector('#count');
    span.innerText = `${matched.length+1}/6`;
   

} else{
    alert("You already captured 6 pokemon.");
}



    
}

            







