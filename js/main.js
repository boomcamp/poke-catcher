

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
function SelectedRegion(){    
    var eID = document.getElementById("area");
    var Val = eID.options[eID.selectedIndex].value; 
    var areaPokeURL = `https://pokeapi.co/api/v2/location-area/${Val}`;
   areasPokemon(areaPokeURL);
});



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
            
               //console.log(areasPokemons[randomNum].pokemon.url);     
  
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
                        <label>Speed:</label>  &nbsp; &nbsp;<span id = "name"> ${pokemonStat[0].base_stat} </span> <br>
                        <label>Special-defense:</label>  &nbsp; &nbsp; <span> ${pokemonStat[1].base_stat}</span> <br>
                        <label>Special-attack:</label> &nbsp; &nbsp; <span>${pokemonStat[2].base_stat}</span> <br>
                        <label>Ddefense:</label> &nbsp; &nbsp; <span>${pokemonStat[3].base_stat}</span> <br>
                        <label>Aattack:</label> &nbsp; &nbsp; <span>${pokemonStat[4].base_stat}</span> <br>
                        <label>Hp:</label> &nbsp; &nbsp; <span>${pokemonStat[5].base_stat}</span> <br>
            `;
            
            input.innerHTML = det;
                  
        });
}

//displaying Image
function displayImage(url, name){
    var pokemonName = name;
    
    var pokemonURL = url;
    var pokemonImg = [];
fetch(pokemonURL)
  .then(poke => poke.json())
  .then(sprite =>  pokemonImage = sprite.sprites.front_default)
  .then( 
    function(){
            var img = document.getElementById('img');    
            var image =  ` <img src="${pokemonImage}" alt="img" class="pokemon">`;
            
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
    var image = document.querySelector('.pokemon').src;
    var pokemon = document.querySelector('#nameOfPokemon').innerText;

    var input = document.querySelector('.pokemons');
    
     var html = `<div>
                <img src="${image}" alt = "img" class = "captured" >
                <p style="margin-top: -30px;">${pokemon}</p>
                </div>`;  
    
     input.insertAdjacentHTML('beforeend', html);  
    
    //remove capture img from left
    var img = document.querySelector('#img');
    var namePoke = document.querySelector('#nameOfPokemon');
    var detail = document.querySelector('#detail');
    img.innerHTML = '';
    namePoke.innerHTML = '';
    detail.innerHTML = '';
  //  input.innerHTML = html; 
    
   
}

            







