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
function regions(){
    fetch("https://pokeapi.co/api/v2/region/")
    .then(function(response){
        response.json()
        .then(function(list){
            for(var i= 0; i<list.results.length; i++){
                createregionlist(list, i);
            }
        })
    })
}
 
function createregionlist(list, i){
    var option = document.createElement("option");
    var valueoption =document.createTextNode(list.results[i].name);
    option.value = list.results[i].name;
    option.className = list.results[i].name;
    option.appendChild(valueoption);
    document.getElementById('region-list').appendChild(option);
  
}
regions();
                            
function Locations(){
    fetch("https://pokeapi.co/api/v2/region")
    .then(function (Response){
        Response.json()
         .then(function (){
              createLocationslist(1);
          
         });
    });
};

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
                document.getElementById('location-list').appendChild(optiontag);
            }
        });
    });
}
Locations();


document.getElementById('region-list')
.addEventListener("change", function(){
    var selectedreg=document.getElementById('region-list').value;
    RegionLocations(selectedreg, 1);
});

function RegionLocations(id, num){
    var ID = id;
    fetch(`https://pokeapi.co/api/v2/region/${ID}`)
    .then(function(Response){
        Response.json()
        .then(function (event){
            if(event.name === ID){
                document.getElementById('region-list')
            .addEventListener("change",createRegionLocations(ID));
            
            }
      
        });
    });
}

function createRegionLocations(ID){
    
    fetch(`https://pokeapi.co/api/v2/region/${ID}`)
    .then(function(Response){
        Response.json()
        .then(function(locationslist){
            var locals =document.getElementById('location-list');
                locals.innerHTML="";
            for(var i=0; i<locationslist.locations.length; i++){

            var optionloc =document.createElement("option");
            var valtloc=document.createTextNode(locationslist.locations[i].name);
            optionloc.value = locationslist.locations[i].name; 
            optionloc.className = locationslist.locations[i].name;
            optionloc.appendChild(valtloc);
            document.getElementById('location-list').appendChild(optionloc);
        
            }
            var slctloc=document.getElementById('location-list').value;
            document.getElementById('region-list')
            .addEventListener("change",createRegionLocationAreas(slctloc));
        });
    });
}


document.getElementById('location-list')
.addEventListener("change", function(){
    var locselct=document.getElementById('location-list').value;
    RegionLocationAreas(locselct, 1);
    
});

function RegionLocationAreas(id, num){
    fetch(`https://pokeapi.co/api/v2/location/${id}`)
    .then(function(Response){
        Response.json()
        .then(function (event){
            if(event.name === id){
            document.getElementById('location-list')
        .addEventListener("change",createRegionLocationAreas(id));
        
        }
        });
    });
}

function createRegionLocationAreas(id){
    fetch(`https://pokeapi.co/api/v2/location/${id}`)
    .then(function(Response){
        Response.json()
        .then(function(event){
            var areas =document.getElementById('area-list');
            areas.innerHTML="";
            for(var i=0; i<event.areas.length; i++){

                var optionarea =document.createElement("option");
                var valoptarea=document.createTextNode(event.areas[i].name);
                optionarea.value = event.areas[i].name; 
                optionarea.className = event.areas[i].name;
                optionarea.appendChild(valoptarea);
                document.getElementById('area-list').appendChild(optionarea);
                }
                var selarea = document.getElementById('area-list').value;
                if(selarea){
                    console.log(true);
                    document.getElementById("explore").disabled = false;
           
                } else{
                    document.getElementById("explore").disabled = true;
                    console.log(false);
                }
        });
    });
}



function LocationAreaslist(i){

    var ID =Number(i);
    fetch(`https://pokeapi.co/api/v2/region/${ID}`)
    .then(function (Response){
        Response.json()
        .then(function (event){
            var name=event.locations[0].name;
            Areaslist(name)
           
        });
    });
  
}
function Areaslist(name){
    fetch(`https://pokeapi.co/api/v2/location/${name}`)
        .then(function (Response){
            Response.json()
            .then(function(list){
                for(var i=0; i<list.areas.length; i++){
                    var optiontag = document.createElement("option");
                    var valueoption = document.createTextNode(list.areas[i].name);
                    optiontag.value = list.areas[i].name;
                    optiontag.className = list.areas[i].name;
                    optiontag.appendChild(valueoption);
                    document.getElementById('area-list').appendChild(optiontag);
                }
            });

        });
}

LocationAreaslist(1);

let list = document.getElementById('first-column');
var capturedpokemon=[];

document.getElementById('explore')
.addEventListener('click',function(){
    var selectedarea = document.getElementById('area-list').value;
    
        fetch(`https://pokeapi.co/api/v2/location-area/${selectedarea}`)
        .then(function(Response){
            Response.json()
            .then(function (event){
                let ran_pokemon = Math.floor(Math.random()*event.pokemon_encounters.length);
                let pokemon_name=event.pokemon_encounters[ran_pokemon].pokemon.name
                consultpokemon(pokemon_name, 1)
                
            });
        });
    
});

function consultpokemon(id, num){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (Response){
        Response.json()
         .then(function (pokemon){
            createPokemon(pokemon, num);
         });
    });
}
function createPokemon(pokemon, num){
    let item = document.querySelector(`.pokecatch`);    
    let imgpokemon=item.getElementsByTagName("img")[0]
    imgpokemon.setAttribute("src", pokemon.sprites.front_default)
    let h3=item.getElementsByTagName("h3")[0]
    h3.textContent =pokemon.name;
    h3.className="titled";

    var btn =document.getElementById('btn');
    btn.innerHTML="";



    
            let btncapture=document.createElement('button');
            btncapture.className="explore-btn";
            btncapture.id="captured";
            btncapture.value=pokemon.name;
            var valueoption = document.createTextNode("CAPTURE");
            btncapture.appendChild(valueoption);
            document.getElementById('btn').appendChild(btncapture);
        
        
        var ul =document.getElementById('details-list');
        ul.innerHTML="";

        for(var i=0; i<pokemon.stats.length; i++){
            var il=document.createElement('p');
            var val = document.createTextNode(pokemon.stats[i].stat.name+": "+pokemon.stats[i].base_stat);
            il.appendChild(val);
            document.getElementById('details-list').appendChild(il);
        }

        document.getElementById('captured')
        .addEventListener('click',function (){
            var btn_id=document.getElementById('captured').value;
            CapturedPokemon(btn_id, num);
        });
    }


function CapturedPokemon(id){
    var ul =document.getElementById('details-list');
    var btn =document.getElementById('btn');
    let item = document.querySelector(`.pokecatch`);   
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
        alert("Already Full");
        h3.innerHTML="";
        ul.innerHTML="";
        btn.innerHTML="";
        var a='';
        img.setAttribute("src", a);
    }
    document.getElementById('count').innerHTML=capturedpokemon.length;
    
    var u = document.getElementById("capture-list");
    u.innerHTML="";
    
    for(var i=0; i<capturedpokemon.length; i++){
        fetch(`https://pokeapi.co/api/v2/pokemon/${capturedpokemon[i]}`)
        .then(function (Response){
            Response.json()
            .then(function(event){
                console.log(event);
            
                var span=document.createElement('span');
                var image=document.createElement('img');
                var name= document.createTextNode(event.name);
                var nameId=(event.id)
                var names=(event.name)
                image.setAttribute('src',event.sprites.front_default);
                image.className="img-pokemon-captured";
                span.appendChild(name);
            
                var Captured = '<div id= "'+nameId+'" class="Captured-Pokemon '+names+'"></div>';
                $('#capture-list').append(Captured); 

                document.getElementById(nameId).appendChild(span);
                document.getElementById(nameId).appendChild(image);

            });
        });
    } 

}