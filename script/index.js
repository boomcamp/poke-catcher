



var regionSel = $('#regions');
var locationsSel = $('#locations');
var areaSel = $('#areas');
var explore = $('#explore');

var pokemonList = [];
var pokemonCaptured = [];
var currentPok;

$('.pokemon-name').hide();
$('.capture-fr').hide();
$('.note-poke').hide();
$('.body-encounter-fr').hide();

regionSel.on('change', () => {
	regions.region();
	locations.location();
	$('.body-encounter-fr').hide();	
	$('.capture-fr').hide();
	$('.note-poke').hide();
});

locationsSel.on('change', () => {
	locations.location();
	$('.body-encounter-fr').hide();	
	$('.capture-fr').hide();
	$('.note-poke').hide();
});

areaSel.on('change', () => {
	areas.locArea();
	$('.body-encounter-fr').hide();	
	$('.capture-fr').hide();
	$('.note-poke').hide();
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


const details = (function() {
  
  function stats(detail) {
  	
    $('.poke-ul-l').empty();
    $('.poke-ul-r').empty();
    var x = detail.stats.map(details => {
    	$('.poke-ul-l').append('<li>'+details.stat.name+'</li>');
    	$('.poke-ul-r').append('<li>'+details.base_stat+'</li>');
    })

  }
  return {
    stats,
  }
})();	




explore.on('click', () => {

		$('.body-encounter-fr').show();
		$('.capture-fr').show();

		var x = Math.floor((Math.random() * pokemonList.length));
		var y = pokemonList[x];

		currentPok = y;

		var poke_name = y.pokemon.name;
		var poke_image = poke_api.get('pokemon/'+poke_name).then(data => {			
			var pokeimg = data.sprites.front_default;
			var pokestats = data.details;
		
			$('.poke-img').html('<img src="'+pokeimg+'" style="width: 80%;">');
			details.stats(data);
		});		

		$('.pokemon-name').show();
		$('.poke-name').html(poke_name);
		$('.capture-fr').show();
		$('.note-poke').show();

 		$('.hidden').css('display', 'none');
		$('#show').css('display', 'block');
});

$('.pokeball').on('click', () => {
	



	if(pokemonCaptured.length < 6){
			
			
			pokemonCaptured.push(currentPok);
			var name = currentPok.pokemon.name;
			var length = pokemonCaptured.length;
			var img_name = poke_api.get('pokemon/'+name).then(data => {
				
			 	var img_src =  data.sprites.front_default;
					
			 	
			 		$('.body-captured-fr').append('<div class="captured-poke">'+
								'<div class="captured-head">'+
									'<p class="captured-p">Slot '+length+'</p>'+
								'</div>'+
								'<div class="captured-body">'+
									'<div class="captured-img">'+
										'<img src="'+img_src+'">'+
									'</div>'+
									'<div class="captured-name">'+
										'<p class="captured-p-name">'+name+'</p>'+
									'</div>'+
								'</div>'+
							'</div>');
					$('#captured-span').html(length+'/6');	
			 		
			 		$('.body-encounter-fr').hide();
			 		$('.capture-fr').hide();

			 		$('.hidden').html('You captured '+name);
			 		$('.hidden').css('display', 'block');
			 		$('#show').css('display', 'none');
			 		
			});
				// a++;

	 }else{
			alert('Slot full! Can not capture anymore!');
		  }

});


regions.allRegion().then(all => {
	all.map(reg => {
     regionSel.append('<option value="'+reg.name+'">'+reg.name+'</option>');		
 }).join('');
	regionSel.trigger('change');
});






