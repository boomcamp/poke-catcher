


(function region(){
  fetch('https://pokeapi.co/api/v2/region')
  .then((res) => res.json())
  .then((data)=> {
    let output='';
    data.results.forEach(region => {
      output += `
        <option value="${region.url}">${region.name}</option>
        `;
    });
    document.getElementById('region').innerHTML = output;

  })
})()


document.getElementById('region').addEventListener('change', function(){
  fetch(`${document.getElementById('region').value}`)
  .then((res) => res.json())
  .then((data) => {
    let output='';
    data.locations.forEach(location =>{
      output += `
      <option value="${location.url}">${location.name}</option>
      `;
    });
    document.getElementById('location').innerHTML = output;
  })
})


document.getElementById('location').addEventListener('change', function(){
  fetch(`${document.getElementById('location').value}`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.areas);
    let output='';
    data.areas.forEach(area =>{
      output += `
      <option value="${area.url}">${area.name}</option>
      `;
    });
    document.getElementById('area').innerHTML = output;
  })
})


document.getElementById('explore-btn').addEventListener('click', function(){
  fetch(`${document.getElementById('area').value}`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.pokemon_encounters[0]);
    // let output='';
    // data.pokemon_encounters.forEach(poke_en =>{
      
    //     output += `${poke_en.pokemon.url}`;
    //     fetch
    // });
    var encounters = data.pokemon_encounters;
    var randomNumber = Math.floor(Math.random()*(data.pokemon_encounters.length));
    var pokemonName = encounters[randomNumber].pokemon.name;
    var pokemonUrl = encounters[randomNumber].pokemon.url;
    console.log(pokemonUrl);
    
    document.getElementById('laogan').innerHTML = `
    <img src="images/poke-logo.jpg" alt="" />
          <h2>${pokemonName}</h2>
          <button class="capture-btn" id="capture">Capture!</button>
    `;

  })
})