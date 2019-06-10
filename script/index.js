

const regionsSelect = document.getElementById('regions');

var regionSel = $('#regions');
var locationsSel = $('#locations');
var areaSel = $('#areas');
var explore = $('#explore');

var pokemonList = [];

var pokemons = {
	encountered: [],
	current: undefined,
	captured: [],
};

regionSel.on('change', () => {
	regions.region();
	locations.location();
});

locationsSel.on('change', () => {
	locations.location();
});

areaSel.on('change', () => {
	areas.locArea();
});

const regions = (function(){
	
	function allRegion() {
	return poke_api.get('region').then(data => data.results).catch(console.error);
	}

	function region() {
		locationsSel.empty();
		locationsSel.show();
		var y = regionSel.val();
		var x = poke_api.get('region/'+y).then(data => {
			data.locations.map(loc => {
				locationsSel.append('<option value="'+loc.name+'">'+loc.name+'</option>');		
			}).join('');
			locationsSel.trigger('change');
			// areaSel.trigger('change');
		});
	}
	return {
		allRegion,
		region,
	};
})();

const locations = (function(){

	function location() {
		areaSel.empty();
		areaSel.show();
		var y = locationsSel.val();		
		var x = poke_api.get('location/'+y).then(data => {
			data.areas.map(area => {
				areaSel.append('<option value="'+area.name+'">'+area.name+'</option>');
			}).join('');
			areaSel.trigger('change');
		});
	}

	return {
		location,
	}

})();

const areas = (function(){

	function locArea() {
		var yy = areaSel.val();
		if(yy == null){
			areaSel.hide();
			$('#explore').prop('disabled', true);
			$('#explore').addClass('ex-disabled');			
		}else{
			areaSel.show();
			$('#explore').prop('disabled', false);
			$('#explore').removeClass('ex-disabled');
		}
		var xx = poke_api.get('location-area/'+yy).then(data => {
			pokemonList = data.pokemon_encounters;
		});
	}
	return {
		locArea,
	}

})();





regions.allRegion().then(all => {
	all.map(reg => {
     regionSel.append('<option value="'+reg.name+'">'+reg.name+'</option>');		
 }).join('');
	regionSel.trigger('change');
});






