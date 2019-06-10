const regionSelect = document.getElementById('region');
const locationSelect = document.getElementById('location');
const areaSelect = document.getElementById('area');
const pokemonSelect = document.getElementById('pokemonName');
const exploreButton = document.getElementById('explore');
const encounterDetails = document.getElementById('pokemondetails');

const getAPI = (path) => {
  const  pokeAPI =  `https://pokeapi.co/api/v2/`; 

  return fetch(`${pokeAPI}${path}`)
  .then(res => res.json())
  .then(function (post) {
    var pokeResults = post.results;
    // console.log(post)

    let regions = pokeResults.map(region => {
      return `
      <option value="${region.url}">${region.name}</option>`;
    })
    regionSelect.innerHTML = regions;
  }) 
} 

getAPI('region');

// function 
// fetch(locationSelect.value)
// .then(res => res.json())
// .then

region.addEventListener('change', function() {
  let locationRes = this.value;
  return fetch(`${locationRes}`)
  .then(res => res.json())
  .then(function(post) {
    var pokeResults = post.locations;
      // console.log(pokeResults);
      locationSelect.innerHTML = pokeResults.map(location => {
        return `<option value="${location.url}">${location.name}</option>`;
      })
  })
})

locationSelect.addEventListener('change', function() {
  let areaRes = this.value;
  return fetch(`${areaRes}`)
  .then(res => res.json())
  .then(function(post) {
    var pokeResults = post.areas;
      // console.log(pokeResults);
      areaSelect.innerHTML = pokeResults.map(area => {
        return `<option value="${area.url}">${area.name}</option>`;
      })
  })
})

// pokemonSelect.addEventListener('change', function(){
//   let pokemonDet = this.value;
//   return fetch(`${pokemonDet}`)
//   .then(res => res,json())
//   .then(function(post) {
//     var pokeResults = post.encounter_details;
//     // console.log(pokeResults)
//     pokemonSelect.innerHTML = pokeResults.map(details => {
//       if (details.indexOf() )
//     })
//   })
// })

exploreButton.addEventListener('click', function(){
  let areaRes = areaSelect.value;
  return fetch(`${areaRes}`)
  .then(res => res.json())
  .then(function(post){
    var encounters = post.pokemon_encounters;
    console.log(encounters);
    var number = Math.floor(Math.random()*(encounters.length-1));
    var pokemonName = encounters[number].pokemon.name;
    
    pokemonSelect.innerHTML = encounters.map(function(pokeVal){
      if(encounters.indexOf(pokeVal) == number){
        return `
        <option value="${pokemonName}"  selected >${pokemonName}</option>`
      }
    })
    
  })
})

