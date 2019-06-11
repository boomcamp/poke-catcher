function get(URL){
    return fetch(URL)
       .then(response => response.json());
}

const regionSelected = $('#regions')[0];
const locationSelected = $('#locations')[0];
const areaSelected = $('#areas')[0];
const explore = $('#explore')[0];

function getLocation(URL){
    const location = get(URL);
    location.then(locationName => {
        findLocation(locationName.locations);
    })
}

function findLocation(locationArr){
    $('#locations')[0].innerHTML = 
        `${(locationArr).map(location => {
            return `<option> ${location.name} </option>`
        })
    }`;
    getArea(locationArr[0].url);
}

const region = get("https://pokeapi.co/api/v2/region");

region.then(regionName => {
    var regionResults = regionName.results;
    $('#regions')[0].innerHTML = 
        `${(regionResults).map(region => {
            return `<option> ${region.name} </option>`
        })
        .join('')
    }`;
    getLocation(regionName.results[0].url);
}
);


$(regionSelected).on('change', function(e){
    getLocation(`https://pokeapi.co/api/v2/region/${(e.target.value)}`);
    
})

$(locationSelected).on('change', function(e){
    getArea(`https://pokeapi.co/api/v2/location/${(e.target.value)}`);
})

function getArea(URL){
    const area = get(URL);
    area.then(areaName => {
        findArea(areaName.areas);
    })
}

function findArea(areaArr){
    $('#areas')[0].innerHTML = 
        `${(areaArr).map(area => {
            return `<option> ${area.name} </option>`
        })
    }`;
}

$(explore).on('click', function(){
    const getPoke = $('#areas').val();

    getPokemon(`https://pokeapi.co/api/v2/location-area/${getPoke}`);
})

function getPokemon(URL){
    const pokemon = get(URL);
    pokemon.then(pokemonName => {
        const random = (Math.floor(Math.random()*pokemonName.pokemon_encounters.length));
        findPokemon(pokemonName.pokemon_encounters[random]);
    })
}

function findPokemon(pokemonArr){
    getPokemonStat(`https://pokeapi.co/api/v2/pokemon/${pokemonArr.pokemon.name}`, pokemonArr.pokemon.name);
}



function getPokemonStat(URL, name){
    const stat = get(URL);
    stat.then(stat => {
        const hp = stat.stats[5].base_stat;
        const attack = stat.stats[4].base_stat;
        const defense = stat.stats[3].base_stat;
        const sp_atk = stat.stats[2].base_stat;
        const sp_def = stat.stats[1].base_stat;
        const speed = stat.stats[0].base_stat;
        function types(){        
            var output = [];
            for(let x in stat.types){
                output.push(stat.types[x].type.name);
            }
            return output;
        }

        // function abilities(){

        // }
        // console.log(stat.abilities.ability);
        
        $('.encounter-header').replaceWith('<div class="encounter-header">You found a:</div>');
        $('.encounter-content').replaceWith('<div class="encounter-content"></div>');
        $('.encounter-content').append(
                '<div id="wild-pokemon">'+
                    name+
                '</div>'+
                '<div id="wild-pokemon-image">'+
                    '<img src="'+stat.sprites.front_default+'" class="image wild-img" id="'+stat.sprites.front_default+'">'+
                '</div>'+
                '<div id="catch">'+
                    '<img src="img/catch-pokeball.gif" class="image" id="pokeball-catch">'+
                '</div>'
        );
        $('.data').replaceWith(
            '<div class="data">'+
                '<div class="data-divider bordered">'+
                    '<div class="stat" id="hp">Hit Points: '+hp+'</div>'+
                    '<div class="stat" id="attack">Attack: '+attack+'</div>'+
                    '<div class="stat" id="defense">Defense: '+defense+'</div>'+
                    '<div class="stat" id="sp-atk">Special Attack: '+sp_atk+'</div>'+
                    '<div class="stat" id="sp-def">Special Defense: '+sp_def+'</div>'+
                    '<div class="stat" id="speed">Speed: '+speed+'</div>'+
                '</div>'+
                '<div class="data-divider bordered">'+
                    '<div class="stat" id="type">Type/s: '+types()+'</div>'+
                    '<div class="stat" id="ability">Ability: </div>'+
                '</div>'+
            '</div>'
        );
    })
}

$(document).on('click', '#catch', function(){
    var Pname = $('#wild-pokemon').text();
    var Pimg = $('.wild-img').attr('id');
    catchPokemon(Pname, Pimg);
})

function catchPokemon(name, img){
    counter = $('.pokemon').length;
    for(x = 0; x <= counter; x++){
        if($('#poke'+x).hasClass('empty')==true){
            $('#poke'+x).replaceWith(
                '<div class="pokemon bordered" id="poke'+x+'">'+
                    '<div class="pokeRelease">'+
                        '<img src="img/owned-pokeball.gif" class="image-catched release" id="poke'+x+'">'+
                    '</div>'+
                    '<div class="pokeImg">'+
                        '<img src="'+img+'" class="image pokemon-catched" id="'+img+'">'+
                    '</div>'+
                    '<div class="pokeName" id="'+name+'">'+
                        name+
                    '</div>'+
                '</div>'
            )
            $('.encounter-header').replaceWith('<div class="encounter-header">Click the sprite again</div>');
            $('.encounter-content').replaceWith('<div class="encounter-content"></div>');
            $('.data').replaceWith(
                '<div class="data">'+
                    '<div class="data-divider bordered">'+
                    '</div>'+
                    '<div class="data-divider bordered">'+
                    '</div>'+
                '</div>')
            return;
        }
    }
}

$(document).on('click', '.release', function(e){
    var id = $(this).attr('id');
    $('.pokemon#'+id+'').replaceWith(
        '<div class="pokemon bordered empty" id="poke'+id+'">'+
            '<div class="pokeRelease">'+               
            '</div>'+
            '<div class="pokeImg">'+
            '</div>'+
            '<div class="pokeName">'+
            '</div>'+
        '</div>'
    );
});