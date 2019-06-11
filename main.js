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

var pName;
var pImage;

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
        pName = datap.pokemon_encounters[random].pokemon.name;
        var pUrl = datap.pokemon_encounters[random].pokemon.url;
        getImage(pUrl);
        document.getElementById('name').innerHTML = pName;
        document.getElementById('catch').disabled = false; 
    });
});

function getImage(url){
    fetch(url)
    .then((img) => img.json())
    .then((datai) => {
        pImage = datai.sprites.front_default//back_default;
        //console.log(datai);
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
myDeck = ['psyduck']; //storage of all caught pokemon

var c = document.getElementById('catch');
c.addEventListener("click", () => {
    var exist = isCatched(pName)
    console.log(exist);
    if(exist === false) {
        //get the template then clone it
        var deck = document.getElementById("deck");
        var clone = deck.firstElementChild.cloneNode(true)
        //prepend then add details
        deck.prepend(clone);
       
        myDeck.push(pName);
        console.log(myDeck);
        document.getElementById('fcard-img').src = pImage;
        document.getElementById('fcard-name').innerText = pName;
        //diplay the message saying congrats
        document.getElementById('msg-name').innerText = pName;
        document.getElementById('warning').style.display = 'none';
        document.getElementById('message').style.display = 'block';
        //hide the message after 3s
        setTimeout(() => {
            document.getElementById('message').style.display = 'none';
        }, 3000)
    }
    else {
         //diplay the message saying warning
         document.getElementById('message').style.display = 'none';
         document.getElementById('warning').style.display = 'block';
         //hide the message after 3s
         setTimeout(() => {
             document.getElementById('warning').style.display = 'none';
         }, 2000)
    }
});

//return true if pokemo is catched
function isCatched(pokemon) {
    var found;
    for(let x of myDeck) {
        if(x === pokemon) {
            found = true;
            break;
        }
    }
    if(found === true){
        return true;
    }
    else {
        return false;
    }


}
