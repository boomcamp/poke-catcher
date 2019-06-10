//EVENTS

document.addEventListener("DOMContentLoaded", function() {
    fetchRegions();
    themeAudio.play();
  });
  
  regionNames.addEventListener('change', function(){
    changeLocSelect(this.value);
  })
  
  locationNames.addEventListener('change', function(){
    changeAreaSelect(this.value);
  })
  
  exploreBtn.addEventListener('click', function(){
    var location_area = areaNames.options[areaNames.selectedIndex].value;
    getPokemon(location_area);
    setTimeout(function(){
      pokeModel.classList.remove("none");
      pokeName.classList.remove("none");
      captureDiv.classList.remove("none");
      statsDiv.classList.remove("none");
    }, 2500)
      themeAudio.pause();
      encounterAudio.play();
  })
  
  pokeBall.addEventListener('click', function() {
    if(count === 6){
          Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'You cannot carry any more PokeMon!'
      })
    }else {
      var capitalname = randomName.charAt(0).toUpperCase() + randomName.slice(1);
      var insertCaught = `
              <li>
                <img src="${randomSprite}" alt="">
                <label>${randomName}</label>
              </li>
          `;
      caughtPoke.insertAdjacentHTML('beforeend', insertCaught);
      count++;
      caughtCount.innerHTML = count;
      captureDiv.classList.add("none");
      statsDiv.classList.add("none");
      pokeModel.classList.add("none");
      pokeName.classList.add("none");
      encounterAudio.pause();
      encounterAudio.currentTime = 0;
      captureAudio.play();
      Swal.fire({
          title: 'Gotcha!',
          text: `${capitalname} was caught. Explore to find more PokeMon!`,
          type: 'success',
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          if (result.value) {
            themeAudio.play();
          }
        })
    } 
  })