const selectRegion = document.querySelector(".region");
const selectLocation = document.querySelector(".location");
const selectArea = document.querySelector(".area");
const exploreBtn = document.querySelector(".poke-button");
const encounterHud = document.querySelector(".hud");
const encounterDetails = document.querySelector(".hud-details");
const pokeName = document.querySelector(".pokemon-name");
const pokeSprite = document.querySelector(".pokemon-pic");
const pokeSpriteList = document.querySelector(".list-sprite");
const selectPokemon = document.querySelector(".list-details");
const capture = document.querySelector(".capture");
const counter = document.querySelector(".counter");
const msg = document.querySelector(".msg");
const captured = document.querySelector(".poke-list");
const temp = document.querySelector(".temp-msg");

let captureHtml = "";
var count = 0;

function transferPoke() {
  count = 0;
  counter.innerText = `CAPTURED ${count}/6`;
  captureHtml = "";
  captured.style.display = "none";
  msg.innerHTML = `<p class="msg-text ">Successfully Transfered! explore to find more pokemon</p>`;
}

temp.style.display = "none";
msg.style.display = "none";
capture.style.display = "none";
captured.style.display = "none";
pokeName.style.display = "none";

selectRegion.addEventListener("change", function(event) {
  getData.getLocationUrl(this.value);
});

selectLocation.addEventListener("change", function(event) {
  getData.getAreaUrl(this.value);
});

exploreBtn.addEventListener("click", function(event) {
  getData.getPokemonUrl(selectArea.value);
  capture.style.display = "";
  pokeName.style.display = "";
  msg.style.display = "none";
  encounterHud.style.display = "";
  temp.style.display = "none";
  encounterDetails.style.display = "";
});

capture.addEventListener("click", function(event) {
  captured.style.display = "";

  if (count < 6) {
    encounterHud.style.display = "none";
    msg.style.display = "";
    encounterDetails.style.display = "none";
    temp.style.display = "";
    msg.innerHTML = `<p class="msg-text ">Captured ${selectPokemon.innerText}, explore to find more pokemon</p>`;
    captureHtml += `
    <div class="list-container">
    <div class="list-sprite">${pokeSpriteList.innerHTML}</div>
    <div class="list-details">${selectPokemon.innerHTML}</div>
  </div>`;

    captured.innerHTML = captureHtml;
    count++;
    counter.innerText = `CAPTURED ${count}/6`;
  } else {
    encounterHud.style.display = "none";
    msg.style.display = "";
    encounterDetails.style.display = "none";
    temp.style.display = "";
    msg.innerHTML = `
    <div>
    <p class="msg-text ">No More Slots</p>
    </div>
    <button class="transfer" onclick="transferPoke()">Transfer All Pokemon to Pokemon Center</button>
    `;
  }
});
