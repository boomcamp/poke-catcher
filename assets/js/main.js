const baseUrl = "https://pokeapi.co/api/v2/";
const regions = document.querySelector("#regions");
const locations = document.querySelector("#locations");
const areas = document.querySelector("#areas");
const exploreBtn = document.querySelector("#explore");
const captureBtn = document.querySelector("#capture");
const pokemonName = document.querySelector("#pokemon-name");
const overlay = document.querySelector("#overlay");
const idCount = document.querySelector("#id-count");
const imgH = document.querySelector(".img-h");

var captured = new Array(),
	count = 0,
	explore = false,
	stat = false,
	stat_c = false;

//onload

ballCount();
idCount.innerHTML = count;
overlay.style = "display:none";
document.querySelector("#exploring").style = "display :none";

//events

regions.addEventListener("change", function() {
	getLocations();
});

locations.addEventListener("change", function() {
	getAreas();
});

exploreBtn.addEventListener("click", function() {
	if (areas.value) {
		document.querySelector("#exploring").style = "display:block";

		imgH.style = "display:none";
		pokemonName.style = "display:none";
		overlay.style = "display:none";
		captureBtn.style = "visibility:hidden";
		setTimeout(function() {
			document.querySelector("#exploring").style = "display :none";
			imgH.style = "display:flex";
			pokemonName.style = "display:block";
			captureBtn.style = "visibility:visible";
			explorePokemon();
		}, 2000);

		// pokemonName.style = "display:block";
		// document.querySelector(".img-h").style = "display:flex";
		// overlay.style = "display:none";
		// document.querySelector(".img-h").style = "display:flex";

		explore = false;
		stat_c = true;
	}
});

captureBtn.addEventListener("click", function() {
	if (stat_c) {
		if (explore != true)
			if (count < 6) stackPokemon();
			else alert("Out of pokeballs!");
	} else alert("Click explore to find Pokemon!");
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

//location
function getLocations() {
	fetch(regions.value)
		.then(response => response.json())
		.then(function(location) {
			location = location.locations;
			displaySelect([...location], locations);
			getAreas();
		});
}

//areas

function getAreas() {
	fetch(locations.value)
		.then(response => response.json())
		.then(function(area) {
			area = area.areas;
			displaySelect([...area], areas);
		});
}

function displaySelect(arr, target) {
	target.innerHTML = arr.map(e => `<option value="${e.url}">${e.name[0].toUpperCase() + e.name.slice(1)}</option>`);
}

//explore pokemon
function explorePokemon() {
	fetch(areas.value)
		.then(response => response.json())
		.then(function(pokemon) {
			getPokemon(Array.from(pokemon.pokemon_encounters));
		});
}

//functions

function getPokemon(arr) {
	var pId = Math.floor(Math.random() * arr.length);

	fetch(arr[pId].pokemon.url)
		.then(response => response.json())
		.then(function(pokemon) {
			imgH.innerHTML = `<img id="p-img" src="${pokemon.sprites.front_default}" name="${pokemon.name}" class="pokemon"/>`;

			pokemonName.innerHTML = pokemon.name.toUpperCase();
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
	var name = pokemonName.innerText;
	var pic = document.getElementById("p-img").src;

	captured.push({ name: `${name}`, url: `${pic}` });

	showStackPokemon();

	count++;
	ballCount(captured.length);

	//pokemon count
	idCount.innerHTML = count;

	//hide poke
	pokemonName.style = "display:none";
	document.querySelector(".img-h").style = "display:none";

	//show message
	overlay.style = "display:block";
	document.querySelector("#cpoke").innerHTML = pokemonName.innerText;

	explore = true;
}

//pokeball display

function ballCount(c = 0) {
	var ballC = "";
	var bCount = 6 - c;

	if (c >= 0) for (i = 6; i > c; i--) ballC += `<img src="./assets/images/pokecount.png" alt="" width="30"/>`;
	document.querySelector("#ball").innerHTML = ballC;

	if (bCount == 0) document.querySelector("#ball").innerHTML = "Out of pokeballs";
}

//display poke stack

function showStackPokemon(arr) {
	var str = "";
	captured
		.reverse()
		.map(
			(x, i) =>
				(str += `<div><span class="remove" id="${i}" onclick="remove(this)">Remove</span><img src="${x.url}" alt="" /><p>${x.name}</p></div>`)
		);

	document.querySelector("#poke-list").innerHTML = str;
}

//removing pokemon
function remove(e) {
	count--;

	if (captured.length == 1) captured.pop();
	else captured.splice(e.getAttribute("id"), 1);
	ballCount(captured.length);
	var str = "";
	captured.map(
		(x, i) =>
			(str += `<div><span class="remove" id="${i}" onclick="remove(this)">Remove</span><img src="${x.url}" alt="" /><p>${x.name}</p></div>`)
	);

	document.querySelector("#poke-list").innerHTML = str;

	idCount.innerHTML = count;
}
