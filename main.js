const regionURL = 'https://pokeapi.co/api/v2/region';
var regions = [];
var locations = [];
var areas = [];
var areasPokemons = [];
var captured = [];

//fetch region
fetch(regionURL)
  .then(regions => regions.json())
  .then(data => regions.push(...data.results))
    .then(displayRegions);

  function displayRegions() {
    var input = document.getElementById('slct-region');
    const html = regions.map(region => {
        return `
        <option value="${region.name}">${region.name}</option>
    `;
    }).join('');
    input.innerHTML = html;
 }
 
//  Getting the selected region
document.getElementById('slct-region').addEventListener('change', 
function SelectedRegion(){  
 
    var eID = document.getElementById("slct-region");
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
                  var input = document.getElementById('slct-location');
                  var html = locations.map(loca => {
                  return `
                  <option value="${loca.name}" >${loca.name}</option>
                  `;
              })
  input.innerHTML = html;
  }) 
}

//Getting the selected location, get the URL
document.getElementById('slct-location').addEventListener('change', 
function SelectedRegion(){    
   var option = document.getElementById('slct-location').selectedIndex;
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
                  var input = document.getElementById('slct-area');
                  var html = areas.map(area => {
                  return `
                  <option value="${area.name}">${area.name}</option>
                  `;
                  })
                  input.innerHTML = html;
  }) 
}

//when no area 
document.getElementById('slct-area').addEventListener('click', 
function noneArea(){    
   var option = document.getElementById('area').length;
    if(option === 0){
       document.getElementById('mes').innerHTML = "No areas to explore here! Select a different location";
    }
    }  
   );

//Getting the area to get the pokemons on the area
document.getElementById('explore-btn').addEventListener('click', 
function SelectedRegion(){    
    var eID = document.getElementById("slct-area");
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
           var randomNum = Math.floor((Math.random() * areasPokemons.length) + 1);
           var pokemonURL = areasPokemons[randomNum].pokemon.url;
           var pokemonName = areasPokemons[randomNum].pokemon.name;
            displayExplore(pokemonURL); 
            displayImage(pokemonURL, pokemonName);      

});
}

function displayExplore(url){
  var pokemonURL = url;
  var pokemonStat = [];
fetch(pokemonURL)
.then(poke => poke.json())
.then(data => pokemonStat.push(...data.stats))
  .then(
      function(){
        var input = document.getElementById('detail');    
           var det = 
                      `
                          <h4>${pokemonStat[0].base_stat} </h4>
                          <h4> ${pokemonStat[1].base_stat}</h4>
                          <h4>${pokemonStat[2].base_stat}</h4>
                          <h4>${pokemonStat[3].base_stat}</h4>
                          <h4>${pokemonStat[4].base_stat}</h4>
                          <h4>${pokemonStat[5].base_stat}</h4>
                      `;
          
          input.innerHTML = det;
                
      });

}

function displayImage(url, name){
  var pokemonName = name;
  var pokemonURL = url;
  var pokemonImg = [];
fetch(pokemonURL)
.then(poke => poke.json())
.then(sprite1 =>  pokemonImage = sprite1.sprites.front_default)
.then( 
  function(){
        var input = document.getElementById('img');    
          var image =  `<img src="${pokemonImage}" alt="img" class="img-captured" />`;
          
          input.innerHTML = image;

          var div = document.getElementById('name-captured'); 
          var p =  `<span class="poke-name" id="nameOfPokemon">${pokemonName.toUpperCase()}</span>`;
          div.innerHTML = p;
          
          var capturebtn = document.querySelector('#capture-btn');
          capturebtn.classList.remove('disabled')
          var captureTitle = document.querySelector('.capture-title');
          captureTitle.innerHTML = `You Found A`;
          var captureTitle = document.querySelector('#det-title');
          captureTitle.classList.remove('disabled')
          var detailsInfo = document.querySelector('#det-info');
          detailsInfo.classList.remove('disabled')
      });
  }

 // capture
 document.getElementById('capture-btn').addEventListener('click', capturedPokemon);
 function capturedPokemon(){
     var image = document.querySelector('.img-captured').src;
     var pokemon = document.querySelector('#nameOfPokemon').innerText;
     var input = document.querySelector('.output');
     
      var html = `
        <div class="captured-poke">
          <img src="${image}" class="poke-img" />
          <div class="name">${pokemon}</div>
        </div> `;  
     
      input.insertAdjacentHTML('beforeend', html);  
      captured.push(pokemon)
     
     var img = document.querySelector('#img');
     var namePoke = document.querySelector('#nameOfPokemon');
     var captureTitle = document.querySelector('.capture-title');
     img.innerHTML = '';
     namePoke.innerHTML = '';
     captureTitle.innerHTML = `Captured ${pokemon}! Explore to find more pokemon!`;
     var capturebtn = document.querySelector('#capture-btn');
     capturebtn.classList.add('disabled')
     var captureTitle = document.querySelector('#det-title');
     captureTitle.classList.add('disabled')
     var detailsInfo = document.querySelector('#det-info');
     detailsInfo.classList.add('disabled');
     var count = document.querySelector('#count');
     count.innerHTML = `${captured.length}`;

     if(captured.length === 6) {
       var exploreBtn = document.querySelector('#explore-btn');    
       exploreBtn.disabled = true;
       alert('CONGRATULATIONS! You got 6 pokemons!')
       var msg = document.querySelector('.capture-title');
       msg.innerHTML = `You got 6 pokemons!`
     }
 } 