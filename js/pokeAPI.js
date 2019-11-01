getData('https://pokeapi.co/api/v2/')
.then(function(data){
    console.log(data)
}).catch(function(err){
    console.log("error")
})

function getData(url){
    return fetch(url)
    .then(function(response) {
    return response.json();
    })
}
var capturedpokemon = [];
var Selectarea = document.getElementById('area')
var Selectregions = document.getElementById('regions')
var Selectlocations = document.getElementById('locations')
var explore = document.getElementById('explore')
document.getElementById('pokemonname').innerHTML = "No Pokemon!"
document.getElementById('t-speak').innerHTML = "Lets Find rare Pkemon"
getData('https://pokeapi.co/api/v2/region/')
.then(function(region){
   region.results.forEach(regions => {
     //console.log(element.name)
     var optionregion = document.createElement("option");
     optionregion.text = regions.name;
     optionregion.value = regions.url;
     //console.log(element.url)
     Selectregions.append(optionregion);
   });
}).catch(function(err){
    console.log("error")
})

Selectregions.addEventListener('change', function(event){
    getData(event.target.value)
    .then(function(location){
        let locArr = location.locations
        Selectlocations.innerHTML= ""

        locArr.forEach(elemLoc => {   
            var locationOption = document.createElement('option')
            
            locationOption.setAttribute('class', `locationOption`)
            locationOption.value = elemLoc.url
            locationOption.text = elemLoc.name 
            //console.log(elemLoc.url);
            //console.log(elemLoc.name);
            Selectlocations.append(locationOption)

        }) 
    })
})

Selectlocations.addEventListener('change', function(event){
    getData(event.target.value)
    .then(function(listofarea){
        Selectarea.innerHTML= ""

        listofarea.areas.forEach(elemArea => {
            var areaOption = document.createElement('option')     
            areaOption.setAttribute('class', `areaOption`)
            areaOption.value = elemArea.url
            areaOption.text = elemArea.name
            // console.log(elemArea.name);
            // console.log(elemArea.url);
            Selectarea.append(areaOption)
        })
    })
})


explore.addEventListener('click', function(){
    getData(`${Selectarea.value}`)
    .then(function(pokeData){
        var randomNum = Math.floor((Math.random() * pokeData.pokemon_encounters.length -1) + 1)
        document.getElementById('pokemon-char').innerHTML= ""
        document.getElementById('pokemonname').innerHTML= ""
        document.getElementById('li1').innerHTML= ""
        document.getElementById('li2').innerHTML= ""
        document.getElementById('li3').innerHTML= ""
        document.getElementById('li4').innerHTML= ""
        document.getElementById('li5').innerHTML= ""
        document.getElementById('li6').innerHTML= ""
        getData(`${pokeData.pokemon_encounters[randomNum].pokemon.url}`)
        .then(function(encPoke){
            
            var stats = [];
            encPoke.stats.map(statElem =>{
                stats.push(statElem.base_stat)
            })
            
            var capImage = document.createElement('img')
            capImage.setAttribute('class', 'bounce')
            capImage.width = 200;
            capImage.height = 200;
            capImage.setAttribute('data-id', `${encPoke.name}`)
            capImage.setAttribute('data-src', `${encPoke.sprites.front_default}`)
            capImage.src = `${encPoke.sprites.front_default}`
            //console.log(stats)
            //console.log(encPoke.sprites.front_default);
            document.getElementById("pokemon-char").append(capImage);
            var pokemonname = `${encPoke.name}`.toUpperCase()
            document.getElementById('pokemonname').append(pokemonname);
        
            var list1 = `Speed: ${stats[0]}`
            var list2 = `Special Defense: ${stats[1]}`
            var list3 = `Special Attack: ${stats[2]}`
            var list4 = `Defense: ${stats[3]}`
            var list5 = `Defense: ${stats[4]}`
            var list6 = `HP: ${stats[5]}`
            document.getElementById('li1').append(list1);
            document.getElementById('li2').append(list2);
            document.getElementById('li3').append(list3);
            document.getElementById('li4').append(list4);
            document.getElementById('li5').append(list5);
            document.getElementById('li6').append(list6);
        })

    })
    tspeak.innerHTML = "Lets explore!"
})
var count = 0;
var capture = document.getElementById('capture')
var char = document.getElementById('pokemon-char')
var pokedex = document.getElementsByClassName('pokedex')
var cappoke = document.getElementsByClassName('bounce')
var tspeak = document.getElementById('t-speak')
capture.addEventListener('click',function(e){
    e.preventDefault();
    if(count < 6){
        let div = document.createElement('div');
        div.className = "pokecap";
        div.innerHTML = `
            <img src='${char.firstChild.getAttribute("src")}'/>
        `;
        document.querySelector('.pokedex').append(div);
        count++;
    }else{
        alert("Pokemon Bag is Full!")
    }
    document.getElementById("pokemon-char").innerHTML = ""
    document.getElementById('pokemonname').innerHTML = ""
    tspeak.innerHTML = "Nice Catch"
    document.getElementById('li1').innerHTML= ""
    document.getElementById('li2').innerHTML= ""
    document.getElementById('li3').innerHTML= ""
    document.getElementById('li4').innerHTML= ""
    document.getElementById('li5').innerHTML= ""
    document.getElementById('li6').innerHTML= ""
    
});
