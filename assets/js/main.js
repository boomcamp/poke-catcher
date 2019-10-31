const baseUrl = "https://pokeapi.co/api/v2/";
const regions = document.querySelector("#regions");
const locations = document.querySelector("#locations");
const areas = document.querySelector("#areas");
const exploreBtn = document.querySelector("#explore");
const captureBtn = document.querySelector("#capture");

var captured = [],
	count = 0,
	explore = false,
	stat = false;

document.querySelector("#id-count").innerHTML = count;
document.querySelector("#overlay").style = "display:none";
//events

regions.addEventListener("change", function() {
	getLocations();
});

locations.addEventListener("change", function() {
	getAreas();
});

exploreBtn.addEventListener("click", function() {
	document.querySelector("#pokemon-name").style = "display:block";
	document.querySelector(".img-h").style = "display:flex";
	document.querySelector("#overlay").style = "display:none";
	document.querySelector(".img-h").style = "display:flex";

	explore = false;
	explorePokemon();
});

captureBtn.addEventListener("click", function() {
	if (explore != true)
		if (count < 6) stackPokemon();
		else alert("Only 6 pokemons can be carried!");
});

//fetch

fetch(`${baseUrl}region`)
	.then(response => response.json())
	.then(function(region) {
		region = region.results;
		displaySelect([...region], regions);
		getLocations();
	})
	.catch(error => console.error());

//functions

function getLocations() {
	fetch(regions.value)
		.then(response => response.json())
		.then(function(location) {
			location = location.locations;
			displaySelect([...location], locations);
			getAreas();
		});
}

function getAreas() {
	fetch(locations.value)
		.then(response => response.json())
		.then(function(area) {
			area = area.areas;
			displaySelect([...area], areas);
		});
}

function explorePokemon() {
	fetch(areas.value)
		.then(response => response.json())
		.then(function(pokemon) {
			getPokemon(Array.from(pokemon.pokemon_encounters));
		});
}

function displaySelect(arr, target) {
	target.innerHTML = arr.map(e => `<option value="${e.url}">${e.name[0].toUpperCase() + e.name.slice(1)}</option>`);
}

function getPokemon(arr) {
	var pId = Math.floor(Math.random() * arr.length);

	fetch(arr[pId].pokemon.url)
		.then(response => response.json())
		.then(function(pokemon) {
			document.querySelector(
				".img-h"
			).innerHTML = `<img id="p-img" src="${pokemon.sprites.front_default}" name="${pokemon.name}" class="pokemon"/>`;

			document.querySelector("#pokemon-name").innerHTML = pokemon.name.toUpperCase();
			return new Promise(function(resolve, reject) {
				resolve(pokemon);
			});
		})
		.then(function(pokemon) {
			pokemon.stats.map(x => (document.querySelector(`#${x.stat.name}`).innerHTML = x.base_stat));
		})
		.catch(console.error);
}

function stackPokemon() {
	var name = document.getElementById("pokemon-name").innerText;
	var pic = document.getElementById("p-img").src;

	captured.push({ name: `${name}`, url: `${pic}` });
	document.querySelector("#poke-list").innerHTML = captured.reverse().map(x => `<img src="${x.url}" alt="" /><p>${x.name}</p>`);
	count++;

	document.querySelector("#id-count").innerHTML = count;
	document.querySelector("#pokemon-name").style = "display:none";
	document.querySelector(".img-h").style = "display:none";
	document.querySelector("#overlay").style = "display:block";
	document.querySelector("#cpoke").innerHTML = document.querySelector("#pokemon-name").innerText;

	explore = true;
}
