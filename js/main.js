//region
const regionURL = 'https://pokeapi.co/api/v2/region';
const regionArr = [];
var locArr = []; 
var areaArr = [];
var pokemonArr = [];
var detArr = [];
var pokemonImg;


fetch(regionURL)
    .then(regRes => regRes.json())
    .then(regData => regionArr.push(...regData.results))
    .then(displayRegion);
    // .catch(console.error)

function displayRegion() {
    var reg = document.getElementById('region');
    const reghtml = regionArr.map(regRes => {
        return `<option value="{regRes.name}" id="regOption">${regRes.name}</option>`;
    })
    reg.innerHTML = reghtml;
}
document.getElementById('region').addEventListener('change', regDropdown);


function regDropdown() {
    var selectReg = document.getElementById('region').selectedIndex;
    for(let i=0; i < regionArr.length; i++){
        if(selectReg === i){
            var regSelected = regionArr[i].url;
            regionURL2 = regSelected;
            displayLocation(regionURL2);
        }
    }
}


// location
function displayLocation(res) {
    locArr = []; 
    var regionURL2 = res;  

    fetch(regionURL2)
        .then(locRes => locRes.json())
        .then(locData => locArr.push(...locData.locations))
        .then(function() {
            var loc = document.getElementById('location');
            var lochtml = locArr.map(locRes => {
                return `<option value="${locRes.name}" id="locOption">${locRes.name}</option>`;
            })
            loc.innerHTML = lochtml;
        })
}   
document.getElementById('location').addEventListener('change', locDropdown);



function locDropdown() {
    var selectLoc = document.getElementById('location').selectedIndex;
    for(let i=0; i < locArr.length; i++){
        if(selectLoc === i){
            var locSelected = locArr[i].url;
            regionURL2 = locSelected;
            displayArea(regionURL2);
        }
    }
}



function displayArea(res2) {
    areaArr = [];
    var areaURL = res2;

    fetch(areaURL)
        .then(areaRes => areaRes.json())
        .then(areaData => areaArr.push(...areaData.areas))
        .then(function() {
            var area = document.getElementById('area');
            var areahtml = areaArr.map(areaRes => {
                return `<option value="${areaRes.url}" id="areaOption">${areaRes.name}</option>`;
            })
            area.innerHTML = areahtml;
        })
}
document.getElementById('area').addEventListener('change', pokemonEncounter);
document.getElementById('explore').addEventListener('click', pokemonEncounter);



//pokemon encounter
function pokemonEncounter() {
    pokemonArr = [];
    detArr = [];
    var poke = document.getElementById('area');
    var pokeValue = poke.options[poke.selectedIndex].value;

    fetch(pokeValue)
        .then(location => location.json())
        .then(location1 => pokemonArr.push(...location1.pokemon_encounters))
        .then(function searchPokemon() {
            var num = Math.floor(Math.random() * pokemonArr.length);
            var explore = document.querySelector('.poke-name');
            var exphtml = pokemonArr[num].pokemon.name;
            var pokeImg = pokemonArr[num].pokemon.url;

            explore.innerHTML = exphtml;
            getImage(pokeImg);
            fetch();
        })
}


//get pokemon image
function getImage(img) {
    fetch(img)
        .then(pImg => pImg.json())
        .then(pokeImgData => pokemonImg = pokeImgData.sprites.front_default)
        .then(function() {
            // console.log(pokemonImg);
            var imgCont = document.querySelector('.poke-img');
            imgCont.src = pokemonImg;

            //hidden elements
            document.querySelector('.capture-btn').style.display = 'initial';
            document.querySelector('.poke-img').style.display = 'initial';
        })

    fetch(img)
        .then(det => det.json())
        .then(details => detArr.push(...details.stats))
        .then(function() {
            var detData = document.querySelector('.det');
            detData.innerHTML = '';
            var dethtml = detArr.map(det => {
                return `<li><b>${det.stat.name}</b><span id="det-value">${det.base_stat}</span></li>`;
            }).join('');
            detData.insertAdjacentHTML('beforeend', dethtml);
        })
}

document.getElementById('capture').addEventListener('click', capturedPokemon);

//capture is click
function capturedPokemon() {
    var captOne = document.getElementById('capt-one');
    var captTwo = document.getElementById('capt-two');
    var captImg = document.querySelector('.poke-img').src;
    var captName = document.querySelector('.poke-name').innerText;
    var captCount = document.getElementById('.counter');

    if(captTwo.childElementCount < 6) {
        if(captOne.childElementCount <= 4){
                var capthtml = `<img src="${captImg}" />
                                <p>${captName}</p>`;
                captOne.insertAdjacentHTML('beforeend', capthtml);
                document.getElementById('counter').innerHTML = countPokemon();
                
                function countPokemon () {
                    var counter = 0;
                    function add() {
                        if(counter < 3){
                            counter++;
                        }
                    }
                    add();
                    return counter + "/6";
                }
                // return countPokemon(added);

                document.querySelector('.poke-img').style.display = 'none';
                document.querySelector('.poke-name').style.display = 'none';
                document.querySelector('.capture-btn').style.display = 'none';
                // document.querySelector('.det').style.display = 'none';

        }
        else if(captOne.childElementCount > 3 || captOne.childElementCount !== 7) {
            var capthtml = `<img src="${captImg}" />
                            <p>${captName}</p>`;
            captTwo.insertAdjacentHTML('beforeend', capthtml);

            document.querySelector('.poke-img').style.display = 'none';
            document.querySelector('.poke-name').style.display = 'none';
            document.querySelector('.capture-btn').style.display = 'none';

            

        }
        else {
            alert("Congratulations! You've captured 6 Pokemons!");

        }

        function countPokemon () {
            var counter = 0;
            function add() {
                if(counter < 3){
                    counter++;
                }
            }
            add();
            return counter + "/6";
            // var added = document.getElementById('counter').innerHTML = add();
        }
        // return countPokemon(added);

        captCount.innerHTML = captOne.childElementCount + captTwo.childElementCount;
    }
    else {
        alert("Congratulations! You've captured 6 Pokemons!");
        document.getElementById('explore').disabled = true;
    }

}
