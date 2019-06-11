
//Initialize the first regions, location, and area by default
getRegion('https://pokeapi.co/api/v2/region');
getLocation('https://pokeapi.co/api/v2/region/1');
getArea('https://pokeapi.co/api/v2/location/67/');

//Fuctions to get data
function getRegion(url) {
    var region;
    fetch(url)
    .then((reg) => reg.json())
    .then((data) => {
        data.results.forEach((reg) => {
            //console.log(reg);
            region += `<option value="${reg.url}">${reg.name}</option>`;
        });
        document.getElementById('region').innerHTML = region;
        region = '';
    });
}

function getLocation(url) {
    var locations;
    fetch(url)
    .then((loc) => loc.json())
    .then((dataL) => {
        dataL.locations.forEach((loc) => {
            //console.log(loc);
            locations += `<option value="${loc.url}">${loc.name}</option>`;
        });
        document.getElementById('locations').innerHTML = locations;
        locations = '';
    });    
}


function getArea(url) {
    var areas;
    fetch(url)
    .then((are) => are.json())
    .then((dataA) => {
        dataA.areas.forEach((are) => {
            //console.log(are);
            areas += `<option value="${are.url}">${are.name}</option>`;
        });
        document.getElementById('areas').innerHTML = areas;
        areas = '';
    });
}

// Change location and area when region changes

// get target elements' id
var r = document.getElementById('region');
var l = document.getElementById('locations');
r.addEventListener("change", () => {
    var selected = r.options[r.selectedIndex].value;
    console.log("Selected Region: " + selected);
    document.getElementById('locations').innerHTML = " ";
    getLocation(selected);
    l.selectedIndex = 1;
    //var loc = l.options[l.selectedIndex].value;
    getArea(loc)
});

var l = document.getElementById('locations');
l.addEventListener("change", () => {
    var loc = l.options[l.selectedIndex].value;
    var ar = a.options[a.selectedIndex].value;
    //console.log("Selected Location: " + loc);
    //console.log("Selected Area: " + ar);
    getArea(loc);
});
var a = document.getElementById('areas');



// Generate a random pokemon
var e = document.getElementById('explore');
e.addEventListener("click", () => {
    var url = a.options[a.selectedIndex].value;
    fetch(url)
    .then((pok) => pok.json())
    .then((datap) => {
        console.log(datap);
        var num = datap.pokemon_encounters.length
        var random = Math.floor(Math.random() * num);
        var pName = datap.pokemon_encounters[random].pokemon.name;
        console.log(datap.pokemon_encounters[random].pokemon.id); 
        var pUrl = datap.pokemon_encounters[random].pokemon.url;
        document.getElementById('name').innerHTML = pName;
        //console.log(pName);
        //console.log(pUrl);
        getImage(pUrl);
    });
});

function getImage(url){
    fetch(url)
    .then((img) => img.json())
    .then((datai) => {
        var pImage = datai.sprites.front_default//back_default;
        //console.log(pImage);
        console.log(datai);
        var sp = datai.stats[0].base_stat; //speed
        var sdef = datai.stats[1].base_stat; //special defense
        var satk = datai.stats[2].base_stat; //special attack
        var def = datai.stats[3].base_stat; //defense
        var atk = datai.stats[4].base_stat; //attack
        var hp = datai.stats[5].base_stat; //hit points
        document.getElementById('sp').innerText = sp;
        document.getElementById('sdef').innerText = sdef;
        document.getElementById('satk').innerText = satk;
        document.getElementById('def').innerText = def;
        document.getElementById('atk').innerText = atk;
        document.getElementById('hp').innerText = hp;
        document.getElementById('pokemon-image').src = pImage;
    });
}

var c = document.getElementById('catch');
c.addEventListener("click", () => {
    console.log('catch');
    var deck = document.getElementById("deck");
    var clone = deck.firstElementChild.cloneNode(true)
    deck.prepend(clone);
});

