var capturedPoke = [];
var regionArray = [];
var regionJson = fetch('https://pokeapi.co/api/v2/region/')
regionJson
    .then(data => data.json())
    .then(res => regionArray.push(...res.results))
    .then(displayRegion)

function displayRegion() {
    //alert('Click EXPLORE button to start searching for POKEMON')
    var getTag = document.querySelector('.region');
    const option = regionArray.map(res => {
        return `<option value="${res.url}">${res.name}</option>`
    })
    getTag.innerHTML = option
}

//window.addEventListener('load', displayRegion)

const locArr = [];
setTimeout(function()
{
    const regionArrIndex0 = fetch(regionArray[0].url)
    regionArrIndex0
        .then(locdata => locdata.json())
        .then(result => locArr.push(...result.locations))
        .then(displayLocationInit)
        .then(displayAreaInit)
}, 100);

const area = [];
function displayLocationInit(){
    setTimeout(function(){
        var getlocation = document.querySelector('.location');
        const option = locArr.map(res => {
            return `<option value="${res.url}">${res.name}</option>"`
        })
        getlocation.innerHTML = option

        const fetchArea = fetch(locArr[0].url)
        fetchArea
            .then(areaData => areaData.json())
            .then(result => area.push(...result.areas))
    }, 100)
}

function displayAreaInit(){
    setTimeout(function(){
        var getarea = document.querySelector('.area');
        const option = area.map(res => {
            return `<option value="${res.url}">${res.name}</option>`
        })
        getarea.innerHTML = option

    }, 200)
}

//window.addEventListener('load', displayLocationInit)
//window.addEventListener('load', displayAreaInit)

var pokemonDef = [];
function explore(){
   var areacheck = document.querySelector('.area').value
   if(areacheck === ''){
    var alertmsg = document.querySelector('.alert')
    alertmsg.style.display = 'block'
    alertmsg.innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                    <strong>Select a different location.</strong>`
   }else{
    var alertmsg = document.querySelector('.alert')
    alertmsg.style.display = 'none'

    var areaUrl = fetch(document.querySelector('.area').value)
    //console.log(areaUrl)
     areaUrl
    .then(areaUrlData => areaUrlData.json())
    .then(data => pokemonDef.push(...data.pokemon_encounters) )

    setTimeout(function(){
        var nameEl = document.querySelector('.btnImgDisplay')
        var getImgElem = document.querySelector('.content')
        var infoElem = document.querySelector('.info');

        var random = Math.floor((Math.random() * pokemonDef.length));
        nameEl.innerHTML = `${pokemonDef[random].pokemon.name}`
        var pokeUrl = fetch(pokemonDef[random].pokemon.url)
        pokeUrl
            .then(urldata => urldata.json())
            .then(url => {
                   getImgElem.innerHTML =  `<img src="${url.sprites.front_default}">`

        infoElem.innerHTML = `
            <p><em><b>${url.stats[0].stat.name}:</b></em> <span>${url.stats[0].base_stat}</span></p>
            <p><em><b>${url.stats[1].stat.name}:</b></em> <span>${url.stats[1].base_stat}</span></p>
            <p><em><b>${url.stats[2].stat.name}:</b></em> <span>${url.stats[2].base_stat}</span></p>
            <p><em><b>${url.stats[3].stat.name}:</b></em> <span>${url.stats[3].base_stat}</span></p>
            <p><em><b>${url.stats[4].stat.name}:</b></em> <span>${url.stats[4].base_stat}</span></p>
            <p><em><b>${url.stats[5].stat.name}:</b></em> <span>${url.stats[5].base_stat}</span></p>
        `    
    })
    },100)
   }
  
}


document.querySelector('.explore-btn').addEventListener('click', explore)
document.querySelector('.explore-btn').addEventListener('click', function(){
    pokemonDef.length = 0
})

function captureDft(){
    if(capturedPoke.length <= 6){
        var object = {
            name: document.querySelector('.btnImgDisplay').innerText,
            url: document.querySelector('.content').children[0].src
        };
        capturedPoke.push(object)
        
        for(let i = 0; i < capturedPoke.length; i++){
            if(i===0){
                var box0elem = document.querySelector('.box1');
                box0elem.innerHTML = `
                <img src="${capturedPoke[i].url}">
                <h4>${capturedPoke[i].name}</h4>
                `
                document.querySelector('.header2').innerHTML = `<h2>CAPTURED 1/6</h2>`
            }else if(i===1){
                var box0elem = document.querySelector('.box2');
                box0elem.innerHTML = `
                <img src="${capturedPoke[i].url}">
                <h4>${capturedPoke[i].name}</h4>
                `
                document.querySelector('.header2').innerHTML = `<h2>CAPTURED 2/6</h2>`
            }else if(i===2){
                var box0elem = document.querySelector('.box3');
                box0elem.innerHTML = `
                <img src="${capturedPoke[i].url}">
                <h4>${capturedPoke[i].name}</h4>
                `
                document.querySelector('.header2').innerHTML = `<h2>CAPTURED 3/6</h2>`
            }else if(i===3){
                var box0elem = document.querySelector('.box4');
                box0elem.innerHTML = `
                <img src="${capturedPoke[i].url}">
                <h4>${capturedPoke[i].name}</h4>
                `
                document.querySelector('.header2').innerHTML = `<h2>CAPTURED 4/6</h2>`
            }else if(i===4){
                var box0elem = document.querySelector('.box5');
                box0elem.innerHTML = `
                <img src="${capturedPoke[i].url}">
                <h4>${capturedPoke[i].name}</h4>
                `
                document.querySelector('.header2').innerHTML = `<h2>CAPTURED 5/6</h2>`
            }else if(i===5){
                var box0elem = document.querySelector('.box6');
                box0elem.innerHTML = `
                <img src="${capturedPoke[i].url}">
                <h4>${capturedPoke[i].name}</h4>
                `
                document.querySelector('.header2').innerHTML = `<h2>CAPTURED 6/6</h2>`
            }

            if(i <= 5){

            document.querySelector('.btnImgDisplay').innerText = ''
            document.querySelector('.content').innerHTML = ''
            var alertmsg = document.querySelector('.alert')
            alertmsg.style.display = 'block'
            alertmsg.innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                            <strong>Captured magikarp, Click EXPLORE to find more pokemon</strong>`
            }else{
                var alertmsg = document.querySelector('.alert')
                alertmsg.style.display = 'block'
                alertmsg.innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                            <strong>You already captured 6 Pokemons</strong>`
            }
        } 

    }
}

document.querySelector('.capture-btn').addEventListener('click', captureDft)
////////////////////////////////////////////////////////////////////////////

var newlocArr = [];
var newAreaArr = [];

function regionOnChange(e){
    var input = fetch(e.target.value);
        input
            .then(reg => reg.json())
            .then(regRes => newlocArr.push(...regRes.locations))

        setTimeout(function(){
            var locElem = document.querySelector('.location');
            var elem = newlocArr.map(elemRes => {
                return `<option value="${elemRes.url}">${elemRes.name}</option>`
            })
            locElem.innerHTML = elem;

            var area = fetch(newlocArr[0].url)
            area
                .then(areaData => areaData.json())
                .then(areaRes => newAreaArr.push(...areaRes.areas))
        }, 100)

        setTimeout(function(){
            var areaElem = document.querySelector('.area');
            var  areaOpt = newAreaArr.map(areaEl => {
                return `<option value="${areaEl.url}">${areaEl.name}</option>`
            })
            areaElem.innerHTML = areaOpt
        }, 200)
}

document.querySelector('.region').addEventListener('change', regionOnChange)

document.querySelector('.region').addEventListener('change', function(){
    newlocArr.length = 0
    newAreaArr.length = 0
})

var arrayArea = [];    
function locationOnChange(e){
    var locInput = fetch(e.target.value);
    locInput
        .then(data => data.json())
        .then(res => arrayArea.push(...res.areas))

    setTimeout(function(){
        var areaElem = document.querySelector('.area');
            var  areaOpt = arrayArea.map(areaEl => {
                return `<option value="${areaEl.url}">${areaEl.name}</option>`
            })
            areaElem.innerHTML = areaOpt
    }, 200)

    //console.log(arrayArea)
}

document.querySelector('.location').addEventListener('change', locationOnChange)
document.querySelector('.location').addEventListener('change', function(){
    arrayArea.length = 0
})