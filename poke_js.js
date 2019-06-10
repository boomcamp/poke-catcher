const baseURL = 'https://pokeapi.co/api/v2/';

const selectRegion = document.getElementById('region');

const selectLocation = document.getElementById('location');

const selectArea = document.getElementById('area');

const exploreBtn = document.getElementById('explore');

var pokeEnc = [];

const pokeThumb = document.getElementById('pokeThumb');

const pokeName = document.getElementById('pokeName');

const details = document.getElementById('details');

const capture = document.getElementById('captureBTN');

var capturedPokemon = [];

function get(action) {
	return fetch(baseURL+action).then(reg => reg.json());
}

const region = {
	all:function() {
		return fetch(baseURL+'region').then(res => res.json());
	},
	selectLoc:function(url) {
		return fetch(baseURL+'region/'+url).then(loc => loc.json());
	}

}

function getArea(url) {
	return fetch(baseURL+'location/'+url).then(areas => areas.json());
}
function getRealArea(url) {
	return fetch(baseURL+'location-area/'+url).then(areas => areas.json());
}

region.all().then(regions => {
	selectRegion.innerHTML = regions.results.map(reg => {
		return '<option value="'+reg.name+'">'+reg.name+'</option>';
	}).join('');
	selectRegion.dispatchEvent(new Event('change'));
	// region.selectLoc('kanto').then(res => displayLoc(res));
	// getArea('celadon-city').then(areas => {
	// 	console.log(areas);
	// 	selectArea.innerHTML = areas.areas.map(area => {
	// 		return '<option value="'+area.name+'">'+area.name+'</option>';
	// 	}).join('');
		
	// })
	

});

selectRegion.addEventListener('change', function(e) {
	region.selectLoc(e.target.value).then(loc => {displayLoc(loc)});
	selectArea.dispatchEvent(new Event('change'));
});

selectLocation.addEventListener('change',function(e) {
	getArea(e.target.value).then(areas => {
		console.log(areas);
		selectArea.innerHTML = areas.areas.map(area => {
			return '<option value="'+area.name+'">'+area.name+'</option>';
		}).join('');

	selectArea.dispatchEvent(new Event('change'));
		console.log(e.target.value + " testing");

	});		
});

selectArea.addEventListener('change',function(e) {
	fetch(baseURL+'location-area/'+e.target.value).then(res => res.json()).then(data =>{ console.log(data); pokeEnc = data.pokemon_encounters;});
});

exploreBtn.addEventListener('click',function(e) {
	pokemon(pokeEnc);
	 
});

function displayLoc(loc) {
	console.log(loc)
	selectLocation.innerHTML = loc.locations.map(
		loc => { return '<option value="'+loc.name+'">'+loc.name+'</option>';}).join('');
	selectLocation.dispatchEvent(new Event('change'));
}


function pokemon(pokemons) {
	var max = Math.floor(Math.random() * pokemons.length);
	var pokemon = pokemons[max]['pokemon']['name'];
	capture.innerHTML = '<button value="'+pokemon+'">Capture</option>';
	pokeName.innerHTML = pokemon.toUpperCase();	
	fetch(baseURL+'pokemon/'+pokemon).then(res => res.json()).then(poke => {
		showDetails(poke);
		const thumb = poke.sprites.front_default;
		pokeThumb.src = thumb;

	});
}

function showDetails(pokeDetails) {
	console.log(pokeDetails);
	details.innerHTML = pokeDetails.stats.map
	(details => {return '<li>'+details.stat.name+': '+details.base_stat+'</li>'}).join('');
}

capture.addEventListener('click',function(e) {
	fetch(baseURL+'pokemon/'+e.target.value).then(res => res.json()).then(data => { capturedPokemon.push(data); 
		capturedPokemon.map(cp=>console.log(cp.sprites.front_default))});
	});
