var locaoutput = document.querySelector('.loc-output')
var regoutput = document.querySelector('.region-output')
var areaoutput = document.querySelector('.area-output')
var catchpoke = document.querySelector('.left-container')
var pokemon = document.querySelector('.found-poke')
var details = document.querySelector('.poke-detail')
var catchbtn = document.querySelector('#tn-captured')
var found = document.querySelector('.found')
var count = 0;
var capturedlist=[]



found.style.display = 'none'

//default value for region
fetch('https://pokeapi.co/api/v2/region')
.then((res) => res.json())
.then((data)=> {
    let output= data.results
    output.forEach(val=> {
        let opt = document.createElement('option')
        opt.text = val.name;
        opt.value = val.name;
        regoutput.append(opt)
    })  
})

//default value for location base on the first value of region
fetch('https://pokeapi.co/api/v2/region/1')
.then((res) => res.json())
.then((data)=> {
    let output= data.locations
    output.forEach(val=> {
        let opt = document.createElement('option')
        opt.text = val.name;
        opt.value = val.name;
        locaoutput.append(opt)
        // console.log(opt)
      
    })  
})

//default value for location
fetch('https://pokeapi.co/api/v2/location/celadon-city')
.then((res) => res.json())
.then((data)=> {
    let output= data.areas
    output.forEach(val=> {
        let opt = document.createElement('option')
        opt.text = val.name;
        opt.value = val.name;
        areaoutput.append(opt)
    
    })  

})

var areaval = document.getElementById('area-output').value;
if(areaval){
    document.getElementById("getpoke").disabled = false;
}
else{
    document.getElementById("getpoke").disabled = true;
}


document.querySelector('#getpoke').addEventListener('click', getpoke)
function getpoke (){
    var areaval = document.getElementById('area-output').value;
    
    if (areaval){
        fetch(`https://pokeapi.co/api/v2/location-area/${areaval}`)
        .then((res) => res.json())
        .then((data)=> {
            let output= data.pokemon_encounters
            let ran_pokemon = Math.floor(Math.random()*data.pokemon_encounters.length);
            let pokemon_name=data.pokemon_encounters[ran_pokemon].pokemon.name
            // console.log(pokemon_name)
            encountered(pokemon_name)
            found.style.display = 'block'
        
        })
    }

}

function encountered(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => res.json())
    .then((data)=>{
        let output = data
        // console.log(data)
        pokemon.innerHTML="";
        details.innerHTML="";
        
        let opt = document.createElement('img')
        opt.src = output.sprites.front_default
        opt.name = output.name
        opt.alt = output.name
        pokemon.append(opt)
        // console.log(opt)

       let p = document.createElement('p')
       p.innerText = output.name
       pokemon.append(p)

       catchbtn.style.display="block"
       catchbtn.value=output.name
        
       // pokemon details
       output.stats.forEach(val =>{
       let p = document.createElement("p")
       p.innerText = val.stat.name +": "+val.base_stat
       details.append(p)
       })
    })
}
    catchbtn.addEventListener('click',function(e){  
    pokemon.innerHTML="";
    details.innerHTML="";
    found.style.display = 'none'
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${catchbtn.value}`)
    .then((res) => res.json())
    .then((data)=>{
        let output = data
        if(count<6){
            capturedlist.push({"name":output.name,"img": output.sprites.front_default})
        }
    
    })
    .then(()=>{
        
            e.preventDefault(); 
            if(count<6){
                let catched = document.querySelector('.list-captured')
                let div = document.createElement('div');
                div.innerHTML = `
                    <div>
                    <img src = '${capturedlist[count].img}' alt=''/>
                    <h2>${capturedlist[count].name}</h2>
                    </div>
                `;
                catched.append(div);
                console.log(catched)

                count++;
            }        
    })



})
