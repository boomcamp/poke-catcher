let list = document.getElementById('encounter-pokemonshow');

var capturedpokemon=[];


document.getElementById('explore')
.addEventListener('click',function(){
    var selectedarea = document.getElementById('Area').value;
    
        fetch(`https://pokeapi.co/api/v2/location-area/${selectedarea}`)
        .then(function(Response){
            Response.json()
            .then(function (event){
                let ran_pokemon = Math.floor(Math.random()*event.pokemon_encounters.length);
                let pokemon_name=event.pokemon_encounters[ran_pokemon].pokemon.name
                getPokemon(pokemon_name, 1)
                
            });
        });
    
});

function getPokemon(id, num){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (Response){
        Response.json()
         .then(function (pokemon){
            catchPokemon(pokemon, num);
         });
    });
}
function catchPokemon(pokemon, num){
    
    let item = list.querySelector(`#pokemon-${num}`)
    
    let imgpokemon=item.getElementsByTagName("img")[0]
    imgpokemon.setAttribute("src", pokemon.sprites.front_default)
    
    let h3=item.getElementsByTagName("h3")[0]
    h3.textContent =pokemon.name;

    var btn =document.getElementById('btn');
    btn.innerHTML="";
    
    let btncapture=document.createElement('button');
    btncapture.className="poke-button";
    btncapture.id="captured";
    btncapture.value=pokemon.name;
    var valueoption = document.createTextNode("capture");
    btncapture.appendChild(valueoption);
    document.getElementById('btn').appendChild(btncapture);
    
    var ul =document.getElementById('list');
    ul.innerHTML="";

    for(var i=0; i<pokemon.stats.length; i++){
        var il=document.createElement('li');
        var val = document.createTextNode(pokemon.stats[i].stat.name+": "+pokemon.stats[i].base_stat);
        il.appendChild(val);
        document.getElementById('list').appendChild(il);
    }

    document.getElementById('captured')
    .addEventListener('click',function (){
        var btn_id=document.getElementById('captured').value;
        Captured(btn_id, num);
    });
}


function Captured(id, num){
    var ul =document.getElementById('list');
    var btn =document.getElementById('btn');
    let item = list.querySelector(`#pokemon-${num}`);
    var img =item.getElementsByTagName('img')[0];
    var h3 =item.getElementsByTagName('h3')[0];

    if(capturedpokemon.length<6){
        capturedpokemon.push(id);
        h3.innerHTML="";
        ul.innerHTML="";
        btn.innerHTML="";
        var a='';
        img.setAttribute("src", a);
    }else{
        h3.innerHTML="";
        ul.innerHTML="";
        btn.innerHTML="";
        var a='';
        img.setAttribute("src", a);
    }
    
    
    document.getElementById('count').innerHTML=capturedpokemon.length;
    
    var ul = document.getElementById("catch");
    ul.innerHTML="";

    for(var i=0; i<capturedpokemon.length; i++){
        fetch(`https://pokeapi.co/api/v2/pokemon/${capturedpokemon[i]}`)
        .then(function (Response){
            Response.json()
            .then(function(event){
                console.log(event.sprites.front_default);
                console.log(event.name)
                var il=document.createElement('li');
                var image=document.createElement('img');
                var val = document.createTextNode(event.sprites.front_default);
                var name= document.createTextNode(event.name);
                image.setAttribute('src',event.sprites.front_default);
                image.className="imahe";
                il.appendChild(name);
                document.getElementById('catch').appendChild(image);
            
            
            });
        });
    } 
}