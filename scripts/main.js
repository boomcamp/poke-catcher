(function region() {
  fetch("https://pokeapi.co/api/v2/region")
    .then(res => res.json())
    .then(data => {
      let output = "<option disabled selected>Choose region</option>";
      data.results.forEach(region => {
        output += `
        <option value="${region.url}">${region.name}</option>
        `;
      });
      document.getElementById("region").innerHTML = output;
    });
  document.getElementById("region").addEventListener("change", function() {
    document.getElementById("location").removeAttribute("disabled");
    document.getElementById(
      "area"
    ).innerHTML = `<option disabled selected>Choose area</option>`;

    //RESET
    document.getElementById("laogan").innerHTML = ``;
    document.getElementById("detalye").innerHTML = `
    <h3>Searching pokemon..</h3>
      <ul></ul>
    `;
  });
})();

document.getElementById("region").addEventListener("change", function() {
  fetch(`${document.getElementById("region").value}`)
    .then(res => res.json())
    .then(data => {
      let output = "<option disabled selected>Choose location</option>";
      data.locations.forEach(location => {
        output += `
      <option value="${location.url}">${location.name}</option>
      `;
      });
      document.getElementById("location").innerHTML = output;
    });
});

document.getElementById("location").addEventListener("change", function() {
  fetch(`${document.getElementById("location").value}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data.areas);
      let output = "<option disabled selected>Choose area</option>";
      data.areas.forEach(area => {
        output += `
      <option value="${area.url}">${area.name}</option>
      `;
      });
      document.getElementById("area").removeAttribute("disabled");
      document.getElementById("area").innerHTML = output;

      //RESET
      document.getElementById("laogan").innerHTML = ``;
      document.getElementById("detalye").innerHTML = `
    <h3>Searching pokemon..</h3>
      <ul></ul>
    `;
    });
});

const pokemonBG = document.getElementById("pokemon-music");
function pokemonBgSuccess() {
  pokemonBG.src = "../sounds/success.mp3";
  pokemonBG.play();
}
function pokemonBgBattle() {
  pokemonBG.src = "../sounds/pokebattle.mp3";
  pokemonBG.play();
}

let counter = 0;
document.getElementById("explore-btn").addEventListener("click", function() {
  pokemonBgBattle();

  fetch(`${document.getElementById("area").value}`) //FETCH POKEMON BY AREA
    .then(res => res.json())
    .then(data => {
      var encounters = data.pokemon_encounters;
      var randomNumber = Math.floor(Math.random() * encounters.length);
      var pokemonName = encounters[randomNumber].pokemon.name;
      var pokemonUrl = encounters[randomNumber].pokemon.url;

      fetch(`${pokemonUrl}`) //FETCH POKEMON CHARACTERISTICS
        .then(nres => nres.json())
        .then(ndata => {
          var logoUrl = ndata.sprites.front_default;

          document.getElementById("laogan").innerHTML = `
      <img src="${logoUrl}" alt="${pokemonName}" class="picpoke" />
          <h2>${pokemonName}</h2>
          <button class="capture-btn" id="capture">Capture!</button>
      `;
          // STATS
          let output = `
      <h3>Details:</h3>
      <ul>`;
          ndata.stats.forEach(statt => {
            let baseStat = statt.base_stat;
            let statName = statt.stat.name;

            output += `
        <li>${statName}: ${baseStat}</li>
      `;
          });
          output += "</ul>";
          document.getElementById("detalye").innerHTML = output;
          document.getElementById(
            "notif"
          ).innerHTML = `wild ${pokemonName} appeared!`;

          //ON CAPTURE
          $("#capture").on("click", function() {
            document.getElementById("notif").innerHTML = `Capturing pokemon...`;

            document.getElementById("laogan").innerHTML = `
        <img src="images/pokeball.png" class="kontenerPic" alt="${logoUrl},${pokemonName}" />
        <h2>Capturing pokemon...</h2>
        `;

            document.getElementById("detalye").style.display = "none";

            //DISABLE BUTTONS FIRST
            document.getElementById("region").setAttribute("disabled", true);
            document.getElementById("location").setAttribute("disabled", true);
            document.getElementById("area").setAttribute("disabled", true);
            document
              .getElementById("explore-btn")
              .setAttribute("disabled", true);

            //AFTER Capturing
            setTimeout(function() {
              pokemonBgSuccess();
              document.getElementById("detalye").style.display = "block";
              document.getElementById(
                "notif"
              ).innerHTML = `Successfully captured ${pokemonName}!`;

              let laogan = document.getElementById("laogan");
              let tag = laogan.getElementsByTagName("img")[0];
              let newarr = tag.alt.split(",");
              let pokePicUrl = newarr[0];
              let pokeName = newarr[1];

              if (counter != 6) {
                ++counter;
                document.getElementById("caps").innerText = `${counter} / 6`;
                document.getElementById(`${counter}`).innerHTML = `
              <img src="${pokePicUrl}" class="defaultPic"alt="" />
              <h2>${pokeName}</h2>
              `;
                document.getElementById("laogan").innerHTML = ``;
                document.getElementById("detalye").innerHTML = `
              <h3>Successfully captured ${pokemonName}!</h3>
              `;

                setTimeout(() => {
                  document.getElementById(
                    "notif"
                  ).innerHTML = `Choose a region to start finding a pokemon!`;
                  document.getElementById("detalye").innerHTML = `
                <h3>Searching pokemon..</h3>
                <ul></ul>
                `;

                  //ENABLE BUTTONS
                  document.getElementById("region").removeAttribute("disabled");
                  document
                    .getElementById("location")
                    .removeAttribute("disabled");
                  document.getElementById("area").removeAttribute("disabled");
                  document
                    .getElementById("explore-btn")
                    .removeAttribute("disabled");
                }, 3000);
              } else {
                alert("Oh no! No more pokeball!");
                // location.reload();
              }
            }, 2500);
          });
        });
    });
});
