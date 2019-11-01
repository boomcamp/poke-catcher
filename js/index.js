const selectRegion = document.querySelector(".region");
const selectLocation = document.querySelector(".location");
const selectArea = document.querySelector(".area");
const exploreBtn = document.querySelector(".exploreBtn");
const details = document.querySelector(".div4");
const pokemonCont = document.querySelector(".div1");
const msg = document.querySelector(".div2");
const poke = document.querySelector(".name");
const bag = document.getElementsByClassName("bag-content");
let count = 0;
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
function pokemonBtn() {
  details.classList.add("none");
  pokemonCont.classList.add("none");
  msg.classList.remove("none");
  msg.innerHTML = `
    <span>Congatulations! You got <span class="up"> ${pokemon.pokename()}</span></span><br />
    <span>Explore again to find more!!</span>`;
  if (count < 6) {
    bag[count].innerHTML = `
        <img
        src="${pokemon.pokepic()}"
        />
        <span>${pokemon.pokename()}</span>`;
    count++;
    document.querySelector("#counter").innerText = `Bag (${count}/6)`;
  } else {
    details.classList.add("none");
    pokemonCont.classList.add("none");
    msg.classList.remove("none");
    msg.innerHTML = `
        <span>No more Slot in your Bag!!</span>
        <span></span>`;
  }
}
