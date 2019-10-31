(function region(){
  fetch('https://pokeapi.co/api/v2/region')
  .then((res) => res.json())
  .then((data)=> {
    let output='<option disabled selected>Choose region</option>';
    data.results.forEach(region => {
      output += `
        <option value="${region.url}">${region.name}</option>
        `;
    });
    document.getElementById('region').innerHTML = output;
   
    
  })
  document.getElementById('region').addEventListener('change', function(){
    document.getElementById('location').removeAttribute('disabled');
    document.getElementById('area').innerHTML = `<option disabled selected>Choose area</option>`;
  })
})()


document.getElementById('region').addEventListener('change', function(){
  fetch(`${document.getElementById('region').value}`)
  .then((res) => res.json())
  .then((data) => {
    let output='<option disabled selected>Choose location</option>';
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
    let output='<option disabled selected>Choose area</option>';
    data.areas.forEach(area =>{
      output += `
      <option value="${area.url}">${area.name}</option>
      `;
    });
    document.getElementById('area').removeAttribute('disabled');
    document.getElementById('area').innerHTML = output;
  })
})

let counter = 0;
document.getElementById('explore-btn').addEventListener('click', function(){
  fetch(`${document.getElementById('area').value}`) //FETCH POKEMON BY AREA
  .then((res) => res.json())
  .then((data) => {
  
    var encounters = data.pokemon_encounters;
    var randomNumber = Math.floor(Math.random()*(encounters.length));
    var pokemonName = encounters[randomNumber].pokemon.name;
    var pokemonUrl = encounters[randomNumber].pokemon.url;
    
    fetch(`${pokemonUrl}`) //FETCH POKEMON CHARACTERISTICS
    .then((nres) => nres.json())
    .then((ndata) => {

      var logoUrl = ndata.sprites.front_default;
      
      document.getElementById('laogan').innerHTML = `
      <img src="${logoUrl}" alt="" />
          <h2>${pokemonName}</h2>
          <button class="capture-btn" id="capture">Capture!</button>
      `;
      // STATS
      let output =`
      <h3>Details:</h3>
      <ul>`;
      ndata.stats.forEach(statt =>{
        let baseStat = statt.base_stat;
        let statName = statt.stat.name;
        
      output += `
        <li>${statName}: ${baseStat}</li>
      `;
      });
      output += '</ul>';
      document.getElementById('detalye').innerHTML = output;


      //ON CAPTURE
      $('#capture').on('click', function(){
        document.getElementById('caps').innerText=`${counter+1}/6`;
        let laogan = document.getElementById('laogan');
        let tag = laogan.getElementsByTagName('img')[0];
        let pokePicUrl = tag.src;
        
        let pokeName = laogan.getElementsByTagName('h2').innerHTML;
        if(counter != 6){
            ++counter;

        document.getElementById(`${counter}`).innerHTML =`
        <img src="${pokePicUrl}" alt="" />
        <h2>${pokeName}</h2>
        `;
        }

      })


    })

  })

  // var audio = new Audio('../sounds/pokebattle.mp3');
  // audio.currentTime = 0;
  // audio.play();
})