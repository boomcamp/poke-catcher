document.getElementById('region')
.addEventListener("change", function(){
    var selectedregion=document.getElementById('region').value;
    RegionLocations(selectedregion, 1);

});

function RegionLocations(id){

    var ID = id;

    fetch(`https://pokeapi.co/api/v2/region/${ID}`)
    .then(function(Response){
        Response.json()
        .then(function (event){
            if(event.name === ID){
                document.getElementById('region')
            .addEventListener("change",createRegionLocations(ID));

            }
        });
    });
}
/////////////////////////////////////////////////////////////////////////////////
function createRegionLocations(ID){

    fetch(`https://pokeapi.co/api/v2/region/${ID}`)
    .then(function(Response){
        Response.json()
        .then(function(locationslist){
            var locals =document.getElementById('location');
                locals.innerHTML="";
            for(var i=0; i<locationslist.locations.length; i++){

            var optiontagloc =document.createElement("option");
            var valoptloc=document.createTextNode(locationslist.locations[i].name);
            optiontagloc.value = locationslist.locations[i].name; 
            optiontagloc.className = locationslist.locations[i].name;
            optiontagloc.appendChild(valoptloc);
            document.getElementById('location').appendChild(optiontagloc);

            } 
            var valloc =document.getElementById('location').value;
                document.getElementById('location')
             .addEventListener("change",createRegionLocationAreas(valloc));
        });
    });
}

document.getElementById('location')
.addEventListener("change", function(){
    var selectedloc=document.getElementById('location').value;
    RegionLocationAreas(selectedloc, 1);

});
/////////////////////////////////////////////////////////////////////////
function RegionLocationAreas(id, num){
    fetch(`https://pokeapi.co/api/v2/location/${id}`)
    .then(function(Response){
        Response.json()
        .then(function (event){
            if(event.name === id){
            document.getElementById('location')
        .addEventListener("change",createRegionLocationAreas(id));

        }
        });
    });
}
//////////////////////////////////////////////////////////////////////////
function createRegionLocationAreas(id){

    fetch(`https://pokeapi.co/api/v2/location/${id}`)
    .then(function(Response){
        Response.json()
        .then(function(event){
            var areas =document.getElementById('Area');
            areas.innerHTML="";

            for(var i=0; i<event.areas.length; i++){

                var optiontagarea =document.createElement("option");
                var valoptarea=document.createTextNode(event.areas[i].name);
                optiontagarea.value = event.areas[i].name; 
                optiontagarea.className = event.areas[i].name;
                optiontagarea.appendChild(valoptarea);
                document.getElementById('Area').appendChild(optiontagarea);

                } 

        });
    });
} 
/////////////////////////////////////////////////////////////////////////////
function LocationArea(e){
    var ID =Number(e);
    fetch(`https://pokeapi.co/api/v2/region/${ID}`)
    .then(function(Response){
        Response.json().then(function(event){
            var name=event.locations[0].name;
            Areas(name)
        });
    });
}

//////////////////////////////////////////////////////////////////////////////
function Areas(name){
    fetch(`https://pokeapi.co/api/v2/location/${name}`)
    .then(function (Response){
        Response.json()
         .then(function (list){
               for(var i=0;i<list.areas.length;i++){
                var optiontagarea =document.createElement("option");
                var valoptarea=document.createTextNode(list.areas[i].name);
                optiontagarea.value = list.areas[i].name; 
                optiontagarea.className = list.areas[i].name;
                optiontagarea.appendChild(valoptarea);
                document.getElementById('Area').appendChild(optiontagarea);

               }
         });
    });
};

LocationArea(1);

//////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////
function getPokemon(id, num){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (Response){
        Response.json()
         .then(function (pokemon){
            catchPokemon(pokemon, num);
         });
    });
}
/////////////////////////////////////////////////////////////////////
function catchPokemon(pokemon, num){

    let item = list.querySelector(`#pokemon-${num}`)

    let imgpokemon=item.getElementsByTagName("img")[0]
    imgpokemon.setAttribute("src", pokemon.sprites.front_default)

    let h3=item.getElementsByTagName("h3")[0]
    h3.textContent =(pokemon.name).toUpperCase();

    var btn =document.getElementById('btn');
    btn.innerHTML="";

    let btncapture=document.createElement('button');
    btncapture.className="pokebutton";
    btncapture.id = "captured";
    btncapture.value = pokemon.name;
    var valueoption = document.createTextNode("CAPTURE");
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

//////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////
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
                image.className="imgCapture";
                il.appendChild(name);
                document.getElementById('catch').appendChild(image);


            });
        });
    } 
} 
////////////////////////////////////////////////////////////////////////////
function locations(){
    fetch("https://pokeapi.co/api/v2/region")
    .then(function (Response){

        Response.json()
         .then(function (){

                 createLocationslist(1);

         });
    });
};
////////////////////////////////////////////////////////////////////////////
function createLocationslist(list){
    var ID =Number(list);
    fetch(`https://pokeapi.co/api/v2/region/${ID}`)
    .then(function (Response){
        Response.json()
        .then(function(list){  
            for(var i=0; i<list.locations.length; i++){
                var optiontag = document.createElement("option");
                var valueoption = document.createTextNode(list.locations[i].name);
                optiontag.value = list.locations[i].name;
                optiontag.className = list.locations[i].name;
                optiontag.appendChild(valueoption);
                document.getElementById('location').appendChild(optiontag);
            }
        });
    });


}
locations(); 
////////////////////////////////////////////////////////////////////////////
function region(){
    fetch("https://pokeapi.co/api/v2/region")
    .then(function (Response){
        Response.json()
         .then(function (list){
             for(var i = 0; i <list.results.length; i++){
               createRegionlist(list, i);
             }
         });
    });
};

function createRegionlist(list, i){
    var optiontag = document.createElement("option");
    var valueoption = document.createTextNode(list.results[i].name);
    optiontag.value = list.results[i].name;
    optiontag.className = list.results[i].name;
    optiontag.appendChild(valueoption);
    document.getElementById('region').appendChild(optiontag);
}
region(); 