import get from './pokeApi.js'

export default function exploreEvent(areaSelect, captureBtn)  {
    const explored_pokemon = document.querySelector(".explored_pokemon");

    const pokeImg = document.createElement("img");
    const statText = document.createElement("p");
    pokeImg.setAttribute("class", "pokeImg");
    statText.setAttribute("class", "stat");

    get(`location-area/${areaSelect}`).then(data => {
        var encounter = data.pokemon_encounters
        explored_pokemon.innerHTML = `<p class="explored_txt">${encounter[Math.floor(Math.random()*(0+encounter.length))].pokemon.name}</p>`

        get(`pokemon/${explored_pokemon.textContent}`).then(data => {
            var stats = data.stats
            pokeImg.setAttribute("src", `${data.sprites.front_default}`)
            statText.innerHTML = 
            `<b>Speed</b>: ${stats[0].base_stat}<br>
            <b>Special-Defense</b>: ${stats[1].base_stat}<br>
            <b>Special-Attack</b>: ${stats[2].base_stat}<br>
            <b>Defense</b>: ${stats[3].base_stat}<br>
            <b>Attack</b>: ${stats[4].base_stat}<br>
            <b>Hp</b>:${stats[5].base_stat}`

            explored_pokemon.prepend(pokeImg);
            explored_pokemon.append(statText)
            explored_pokemon.append(captureBtn)
        })
    })
    return pokeImg
}