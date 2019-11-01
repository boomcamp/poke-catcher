const selectRegion = document.querySelector(".region");
const selectLocation = document.querySelector(".location");
const selectArea = document.querySelector(".area");
const exploreBtn = document.querySelector(".exploreBtn");
const details = document.querySelector(".div4");
const pokemonCont = document.querySelector(".div1");
const msg = document.querySelector(".div2");
const poke = document.querySelector(".name");
const bag = document.getElementsByClassName("bag-content");
const bag2 = document.querySelector(".full-content");
const start = document.querySelector(".start");
const counter = document.querySelector("#counter");

let count = 0;

start.addEventListener("click", function() {
  document.querySelector(".main-container").classList.remove("none");
  document.querySelector(".window").classList.add("none");
});
selectRegion.addEventListener("change", function() {
  pokeapi.getLocation(this.value);
});

selectLocation.addEventListener("change", function() {
  pokeapi.getArea(this.value);
});
exploreBtn.addEventListener("click", function() {
  pokemon.getPokemonUrl(selectArea.value);
  details.classList.remove("none");
  pokemonCont.classList.remove("none");
  msg.classList.add("none");
});
function exploreBtn1() {
  if (selectArea.value) {
    pokemon.getPokemonUrl(selectArea.value);
    details.classList.remove("none");
    pokemonCont.classList.remove("none");
    msg.classList.add("none");
    exploreBtn.classList.remove("none");
  }
}
function pokemonBtn() {
  exploreBtn.classList.add("none");
  details.classList.add("none");
  pokemonCont.classList.add("none");
  msg.classList.remove("none");
  msg.innerHTML = `
    <span>Congatulations! You got <span class="up"> ${pokemon.pokename()}</span></span><br />
    <span>Explore again to find more!!</span>
    <button class="btn2" onclick="exploreBtn1()">Explore 🔍</button>`;
  if (count < 6) {
    bag[count].innerHTML = `
        <img
        src="${pokemon.pokepic()}"
        />
        <span>${pokemon.pokename()}</span>`;
    count++;
    counter.innerText = `Bag (${count}/6)`;
  } else {
    details.classList.add("none");
    pokemonCont.classList.add("none");
    msg.classList.remove("none");
    msg.innerHTML = `
        <span class="msg-up">No more Slot in your Bag!!</span>`;
    exploreBtn.classList.remove("none");
  }
}
function clearbag() {
  bag2.innerHTML = ``;
  count = 0;
  for (a = 0; a < 6; a++) {
    bag2.innerHTML += `
              <div class="bag-content">
                <img src="img/pokeball.png" />
                <span>Empty Slot</span>
              </div>`;
  }
  counter.innerText = `Bag (0/6)`;
}
