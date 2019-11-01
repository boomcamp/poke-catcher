const explored_pokemon = document.querySelector(".explored_pokemon");

export default function capturing() {
    var pokeball = document.createElement("img");
    var center = document.createElement("center");
    var captureText = document.createElement("p");

    explored_pokemon.innerHTML = ""
    captureText.setAttribute("class", "captureText")
    captureText.innerHTML = "Capturing  ..."
    pokeball.setAttribute("src", "../img/pokeball.gif")
    center.append(pokeball)
    center.append(captureText)
    
    explored_pokemon.append(center);    
}

export function exploring(){
    var exploreImg = document.createElement("img");
    var center = document.createElement("center");
    var exploreText = document.createElement("p");

    explored_pokemon.innerHTML = ""
    exploreText.setAttribute("class", "captureText")
    exploreText.innerHTML = "Exploring  ..."
    exploreImg.setAttribute("src", "../img/explore.gif")
    center.append(exploreImg)
    center.append(exploreText)
    
    explored_pokemon.append(center);    
}