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