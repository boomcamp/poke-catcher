const Region = document.querySelector(".region");
const Location = document.querySelector(".location");
const Area = document.querySelector(".area");
const Explore = document.querySelector(".explore-btn");
const Detail = document.querySelector(".head-text2");
const stat = document.querySelector(".poke-stat");
const Encounter = document.querySelector(".encounter");
const Pokemondetail = document.querySelector(".detail");
const CaptureBtn = document.querySelector(".capture-btn");
const Message = document.querySelector(".message");

var count = 0;
var catchedHtml = "";

Encounter.style.display = "none";
Pokemondetail.style.display = "none";

Region.addEventListener("change", function(event) {
  data.getLocationUrl(this.value);
});

Location.addEventListener("change", function(event) {
  data.getAreaUrl(this.value);
});

Explore.addEventListener("click", function(event) {
  data.getPokemonUrl(Area.value);
  Encounter.style.display = "";
  Pokemondetail.style.display = "";
  document.querySelector(".message").style.display = "none";
});

CaptureBtn.addEventListener("click", function(event) {
  Encounter.style.display = "none";
  Pokemondetail.style.display = "none";
  Message.style.display = "";

  if (count < 6) {
    document.querySelector(
      ".message"
    ).innerHTML = `<p>Congrats you captured ${Detail.innerText}, Click Explore to find more pokemons</p>`;
    catchedHtml += `<div class="poke-slot">${
      document.querySelector(".appeared").innerHTML
    }${Detail.innerHTML}</div>`;
    document.querySelector(".head-text").innerHTML = catchedHtml;

    count++;
    document.querySelector(".poke-count").innerText = `Captured: ${count}/6`;
  } else {
    Encounter.style.display = "none";
    Pokemondetail.style.display = "none";
    document.querySelector(".message").innerHTML = `<p>No more empty slot.</p>`;
  }
});
