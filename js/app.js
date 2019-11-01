getData("https://pokeapi.co/api/v2/")
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log("error");
  });

getData("https://pokeapi.co/api/v2/region/")
  .then(region =>
    region.results.map(reg => {
      var op = document.createElement("option");
      op.text = reg.name;
      op.value = reg.url;
      $("#regions").append(op);
    })
  )
  .catch(function(err) {
    console.log("error");
  });
var currentPoke = null;
var allPokemon = [];
$(document).ready(function() {
  $(".ball").css("display", "none");
});

$("#regions").change(() => {
  var reg = $("#regions").val();
  $("#locations").empty();
  $("#areas").empty();
  getData(reg).then(loc => {
    loc.locations.map(item => {
      $("#locations").append(
        "<option value ='" + item.url + "'>" + item.name + "</option>"
      );
    });
    getData($("#locations").val()).then(area => {
      area.areas.map(item => {
        $("#areas").append(
          "<option value ='" + item.url + "'>" + item.name + "</option>"
        );
      });
    });
  });
});

$("#locations").change(() => {
  var location = $("#locations").val();
  $("#areas").empty();
  getData(location).then(el => {
    el.areas.map(aloc => {
      $("#areas").append(
        "<option value ='" + aloc.url + "'>" + aloc.name + "</option>"
      );
    });
  });
});

$("#areas").change(() => {
  var areaChange = $("#areas").val();
  getData(areaChange).then(areaOfPokemon =>
    areaOfPokemon.pokemon_encounters.map(poke => {})
  );
});

$("#explore").click(() => {
  var empt = [];
  var explores = $("#areas").val();

  getData(explores).then(ex => {
    ex.pokemon_encounters.map(explore => {
      empt.push(explore.pokemon);
    });
    var math = Math.floor(Math.random() * empt.length);
    var pokemonShow = empt[math].url;
    var stats = "";
    getData(pokemonShow).then(getAppend => {
      currentPoke = getAppend;
      $(".encounterDetails").empty();
      $(".encounterDetails").append("<h3>Details:</h3>");
      getAppend.stats.map(pokesName => {
        $(".encounterDetails").append(
          "<div class='details'><span>" +
            pokesName.stat.name +
            ":</span> <span>" +
            pokesName.base_stat +
            "</span></div>"
        );
      });

      var pukeImg = getAppend.sprites.front_default;
      var pokeName = getAppend.name;
      $(".ball").css("display", "block");
      $(".encounter").html(
        "<div class='aw'><img src='" +
          pukeImg +
          "' /><em>YOU FOUND " +
          pokeName +
          "!  </em></div>"
      );
    });
  });
});
$(".ball").click(() => {
  $(".aw").css("display", "none");
  $(".details").css("display", "none");
  $("h3").css("display", "none");
  $(".ball").css("display", "none");

  allPokemon.push(currentPoke);
  var names = currentPoke.name;

  allPokemon.length <= 6
    ? $(".captured").append(
        "<div class='pokeCaptured'>" +
          "<img src='" +
          currentPoke.sprites.front_default +
          "'/><em>" +
          names +
          "</em></div>"
      )
    : alert("BAG IS FULL!");
});

function getData(url) {
  return fetch(url).then(function(response) {
    return response.json();
  });
}
