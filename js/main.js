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
                if (areaPokemons.length !== 0) {
                    $('#explore').attr('disabled', false)
                    console.log('yes pokemons')
                } else {
                    $('#explore').attr('disabled', true);
                    console.log('no pokemons')
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
            .then(mrPokeball)
            .catch(err => console.log(err))
    })();

})

$(document).on('click', '#catch', function(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!temPokemon) {
        $('.explore-message').html(`
        <div class="custom-pokebox"> Explore area for pokemons!
        <i> <div id="catch" class="meowth"></div><span>Meowth</span></i>
        </div>`)
    } else {
        if (captured.length === 6) {
            $('#bagMessage').html(
                `<div class="custom-pokebox"><span class="animateType">Your bag is full!</span>
                <i><div id="pokedex" class="mrpokedex"></div><span>Dr. Pokedex</span></i>
                </div>`
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
                    return `
                    <div class="stat-info"><p>${st.stat.name}:${st.base_stat}</p></div>`
                }))
        })
    pokemons.get(pokemon)
        .then(details => temPokemon = details)
}

const mrPokeball = () => {
    $('.explore-message').html('<button id="catch" class="catch"></button><span>Catch!</span>')
}

const clear = () => {
    $('.pokebox').html('')
    $('.capturePokemon').html('')
    $('.pokestats').html('')
    temPokemon = '';
}