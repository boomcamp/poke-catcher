import get from './pokeApi.js'

export default function captureEvent(pokeImg, poke_name, captured) {
    const captured_pokemon = document.querySelector(".captured_pokemon");
    const explored_pokemon = document.querySelector(".explored_pokemon");

    var capturedPoke = document.createElement("div");
    var capturePokeImg = document.createElement("img");
    var capturePoketext = document.createElement("p");

    capturePokeImg.setAttribute("src" ,pokeImg.src);
    capturePoketext.setAttribute("class", "poke_name")
    capturePoketext.innerHTML = poke_name;

    capturedPoke.append(capturePokeImg)
    capturedPoke.append(capturePoketext)
    captured_pokemon.append(capturedPoke)
    document.querySelector(".captured_header").innerHTML = `Captured ${captured}/6`

    explored_pokemon.innerHTML = `<p class="success_captured">You've Successfully Captured ${poke_name}</p>`;

    return captured
}