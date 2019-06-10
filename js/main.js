const captured = [];
let areaPokemons = [];
let temPokemon;

$(document).ready(function() {
    $('#regions').change(function() {
        let regs = $('#regions').val()
        region.get(regs).then(region => {
            var locationName;
            $('#city').html(region.locations
                    .map(loc => {
                        locationName = loc.name
                        let locNewName = loc.name.charAt(0).toUpperCase() + loc.name.slice(1);
                        return `<option value="${locationName}">${locNewName}</option>`
                    }).join(''))
                .trigger('change')
        })
    })

    $('#city').change(function() {
        let cities = $('#city').val()
        locations.get(cities)
            .then(city => {
                if (!city.areas.length) {
                    $('#area').html(`
                    <option>Empty!</option>`)
                } else {
                    var areaName;
                    $('#area').html(city.areas
                            .map(area => {
                                areaName = area.name;
                                let areaNewName = areaName.charAt(0).toUpperCase() + areaName.slice(1)
                                return `<option value="${areaName}">${areaNewName}</option>`
                            }).join(''))
                        .trigger('change')
                }

            })
    })

    $('#area').change(function() {
        let data = $('#area').val()
        locations.area(data)
            .then(area => {
                areaPokemons = area.pokemon_encounters
                if (areaPokemons.length) {
                    $('#explore').attr('disabled', false)
                } else {
                    $('#explore').attr('disabled', true);
                }
            })
    })
})

$(document).on('click', '#explore', function(e) {
    e.preventDefault();
    e.stopPropagation();
    let areaVal = $('#area').val();
    var areaUrl;
    var getRandomPoke = (() => {
        locations.area(areaVal)
            .then(area => {
                return randomID = Math.floor((Math.random() * areaPokemons.length))
            })
            .then(pokemon => areaPokemons[pokemon])
            .then(displayPokemon)
            .catch(err => console.log(err))
    })();

})

$(document).on('click', '#catch', function(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!temPokemon) {
        alert('Explore the area for pokemons!')
    } else {
        if (captured.length === 6) {
            $('#bagMessage').html(
                `<span class="animateType">You are out of pokeball!</span>`
            )
        } else {
            captured.push(temPokemon)
            $('#pokeCount').html(`${captured.length}/6`)
            $('.pokedex').html(
                captured.map(poks => {
                    console.log(poks)
                    return `
                    <div class="my-pokemon">
                   <p>${poks.name}</p>
                   <img src="${poks.sprites.front_default}">
                   </div>`
                })
            )
            clear();
        }
    }

})


$(document).ready(function() {
    region.all().then(displayRegion => {
        var regionsName;
        $('#regions').html(displayRegion
                .map(regs => {
                    regionsName = regs.name;
                    let regsNewName = regionsName.charAt(0).toUpperCase() + regionsName.slice(1)
                    return `<option value="${regionsName}">${regsNewName}</option>`
                }).join('')
            )
            .trigger('change')
    })
})

const displayPokemon = (details) => {
    var pokemon = details.pokemon.name
    pokemons.get(pokemon)
        .then(pokemania => {
            var pokemon = pokemania.name
            pokemon = pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
            $('.pokebox').html(
                `<h3 class="animateType"> You Found A ${pokemon} ...</h3>`)
            return pokemon
        })
    pokemons.get(pokemon)
        .then(pokemon => pokemon.sprites)
        .then(sprites => sprites.front_default)
        .then(spriteModel => {
            $('.capturePokemon').html(
                `<img src="${spriteModel}">`
            )
        })
    pokemons.get(pokemon)
        .then(pokemon => pokemon.stats)
        .then(stat => {
            $('.pokestats').html(stat
                .map(st => {
                    return `<p>${st.stat.name}:${st.base_stat}</p>`
                }))
        })
    pokemons.get(pokemon)
        .then(details => temPokemon = details)

}

const clear = () => {
    $('.pokebox').html('')
    $('.capturePokemon').html('')
    $('.pokestats').html('')
    temPokemon = '';
}