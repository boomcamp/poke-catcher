
// variable
let count = 0;
let region = document.querySelector('.region');
let loc = document.querySelector('.loc');
let area = document.querySelector('.area');
let explore = document.querySelector('.explore');
let name = document.querySelector('.pokemon-name');
let image = document.querySelector('.pokemon-image');
let detail = document.querySelector('.pokemon-detail');
let capture = document.querySelector('.catch');
let more = document.querySelector('.more');
let ball = document.querySelector('.ball');
let pokeCatch = document.querySelector('.catch-pokemon');

// display region from url
fetch('https://pokeapi.co/api/v2/region/')
.then(res=>res.json())
.then(data=>{
    let result = data.results;
    result.forEach(post=>{
        let option = document.createElement('option');
        option.text = post.name;
        option.value = post.url;
        region.append(option);
    })
})
.catch(error=>console.error(error))

// add event
region.addEventListener('change',getLocation);
loc.addEventListener('change',getArea);
area.addEventListener('change',getPokemon);
explore.addEventListener('click',getexplore);
capture.addEventListener('click',getCapture);
pokeCatch.addEventListener('click',getCatch);

// function of event
function getLocation(e){
    fetch(e.target.value)
    .then(res=>res.json())
    .then(data=>{
        loc.innerHTML="";
        let result = data.locations;
        let selected = document.createElement('option')
        selected.hidden = true;
        loc.append(selected);
        result.forEach(post=>{
            let option = document.createElement('option')
            option.text = post.name;
            option.value = post.url;
            loc.append(option);
        })
        area.innerHTML=`<option hidden selected>Please Select Location</option>`;
    })
    .catch(error=>console.log(error))

    explore.style.display= 'none';
    capture.style.display= 'none';
    more.style.display= 'block';
    image.innerHTML = '';
    name.innerHTML = '';
    detail.innerHTML = ''; 
}

function getArea(e){
    fetch(e.target.value)
    .then(res=>res.json())
    .then(data=>{
        area.innerHTML="";
        let result = data.areas;
        if(result.length !== 0){
            let selected = document.createElement('option')
            selected.hidden = true;
            area.append(selected);
            result.forEach(post=>{
                let option = document.createElement('option');
                option.text = post.name;
                option.value = post.url;
                area.append(option);
            })
        }else{
            let option = document.createElement('option');
            option.text = 'No area found!';
            option.hidden = true;
            area.append(option);
            explore.style.display= 'none';
        }
    })
    .catch(error=>console.log(error))

    explore.style.display= 'none';
    capture.style.display= 'none';
    more.style.display= 'block';
    image.innerHTML = '';
    name.innerHTML = '';
    detail.innerHTML = ''; 
}

function getPokemon(e){
    explore.style.display= 'block';
}

function getexplore(e){
    e.preventDefault();
    fetch(area.value)
    .then(res=>res.json())
    .then(data=>{
        let encounter = data.pokemon_encounters;
        let ramdom = Math.floor(Math.random() * encounter.length);
        name.innerHTML = encounter[ramdom].pokemon.name;
        
        fetch(encounter[ramdom].pokemon.url)
        .then(res=>res.json())
        .then(data=>{
            picback = data.sprites.back_default;
            let img = document.createElement('img');
            img.src = data.sprites.front_default;
            image.innerHTML ='';
            image.append(img);
            detail.innerHTML = '';
            data.stats.forEach(post=>{
                let li = document.createElement('li');
                li.innerHTML = `${post.stat.name} : ${post.base_stat}`;
                detail.append(li);
            })
        })
    })
    capture.style.display= 'block';
    more.style.display= 'none';
}

function getCapture(e){
    e.preventDefault();
    if(count < 6){
        let div = document.createElement('div');
        div.innerHTML = `
            <img src='${image.firstChild.getAttribute("src")}'/>
            <h2>${name.innerHTML}</h2>
             <p class='delete' >x</p>
        `;
        pokeCatch.append(div);
        count++;
    }else{
        alert("Poke is full!")
    }
    capture.style.display= 'none';
    more.style.display= 'block';
    image.innerHTML = '';
    name.innerHTML = '';
    detail.innerHTML = ''; 
}

function getCatch(e){
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        count--;
    }
}