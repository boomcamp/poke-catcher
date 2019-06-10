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
                        }))
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
                randomID = Math.floor((Math.random() * area.pokemon_encounters.length))
                getPokemon = area.pokemon_encounters[randomID]
                return getPokemon.pokemon
            })
            .then(pokemon => {
                pokemons.get(pokemon.name)
                    .then(pokemania => {
                        var pokemon = pokemania.name
                        pokemon = pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
                        $('.pokebox').html(
                            `<h3 class="animateType"> You Found A ${pokemon} ...</h3>`)
                        return pokemon
                    })
                pokemons.get(pokemon.name)
                    .then(pokemon => pokemon.sprites)
                    .then(sprites => sprites.front_default)
                    .then(spriteModel => {
                        $('.capturePokemon').html(
                            `<img src="${spriteModel}">`
                        )
                    })

            })
            .catch(err => console.log(err))
    })();

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