function fetchLocations(){
    fetch(document.querySelector('#select-region').value)
    .then(response => response.json())
    .then(function(data) {
        addLocations([...data.locations])
    })
}

function fetchAreas(){
    fetch(document.querySelector('#select-location').value)
    .then(response => response.json())
    .then(function(data) {
        addAreas([...data.areas])
    }).catch(error => console.error(error));
}

function fetchPokemonImg(url){
    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        const html = `<h1 class="pokemon-name">${data.species.name}</h1><img class="pokemon-image" src="${data.sprites.front_default}"></img>
                        <button class="captureBtn">CAPTURE</button>`
        document.querySelector('.encounter-con').innerHTML = html;
        document.querySelector('.stat-con').innerHTML = `${generateStat(data.stats)}`;
        document.querySelector('.encounter-con').removeAttribute('style');
        document.querySelector('.stat-con').removeAttribute('style');
    }).catch(error => console.error(error));
}
function generateStat(statsArr){
    return statsArr.map(value => {
        return `<p><span>${value.stat["name"]}</span>: ${value.base_stat}</p>`;
    }).join('');
}

function addRegions(arr){
    const html = arr.map(function (region){
        return `<option value="${region.url}">${region.name}</option>`
    }).join('');
    document.querySelector('#select-region').innerHTML = html;
}

function addLocations(arr){
    const html = arr.map(function (loc){
        return `<option value="${loc.url}">${loc.name}</option>`
    }).join('');
    document.querySelector('#select-location').innerHTML = html;
    fetchAreas();
}

function addAreas(areas){
    const html = areas.map(function (area){
        return `<option value="${area.url}">${area.name}</option>`
    }).join('');
    document.querySelector('#select-area').innerHTML = html;
}

function addPokemons(pokemons){
    let randomNum = Math.floor(Math.random() * pokemons.length);
    fetchPokemonImg(pokemons[randomNum].pokemon['url']);
}


export { addRegions, addLocations, addAreas, addPokemons, fetchLocations };