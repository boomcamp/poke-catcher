
//function addeventhandlers for selecting a regions
document.getElementById('region-list')
.addEventListener("change", function(){
    var selectedregion=document.getElementById('region-list').value;
    RegionLocations(selectedregion, 1);
   //RegionLocationArea(selectedregion, 1);
    //console.log(selectedregion);
});
//called functions for list of all location called by region
function RegionLocations(id, num){
    //var ID = Number(id) +1;
    var ID = id;
    //console.log(ID);
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
//function for calling to create list of locations within regions
function createRegionLocations(ID){
    
    //console.log("region/"+ID);
    fetch(`https://pokeapi.co/api/v2/region/${ID}`)
    .then(function(Response){
        Response.json()
        .then(function(locationslist){
            var locals =document.getElementById('location-list');
                locals.innerHTML="";
            for(var i=0; i<locationslist.locations.length; i++){

            var optiontagloc =document.createElement("option");
            var valoptloc=document.createTextNode(locationslist.locations[i].name);
            optiontagloc.value = locationslist.locations[i].name; 
            //optiontagloc.value = i;//value = integer;
            optiontagloc.className = locationslist.locations[i].name;
            optiontagloc.appendChild(valoptloc);
            document.getElementById('location-list').appendChild(optiontagloc);
        
            }
            var slctloc=document.getElementById('location-list').value;
            //console.log(slctloc); 
            document.getElementById('region-list')
            .addEventListener("change",createRegionLocationAreas(slctloc));
        });
    });
}

//function addeventhandlers for selecting a locations
document.getElementById('location-list')
.addEventListener("change", function(){
    var selectedloc=document.getElementById('location-list').value;
    RegionLocationAreas(selectedloc, 1);
    
});
//called functions for list of all location areas called by location
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
//function for calling to create list of location areas within location
function createRegionLocationAreas(id){
    //console.log(id);
    fetch(`https://pokeapi.co/api/v2/location/${id}`)
    .then(function(Response){
        Response.json()
        .then(function(event){
            var areas =document.getElementById('area-list');
            areas.innerHTML="";
            //console.log(event.areas)
            for(var i=0; i<event.areas.length; i++){

                var optiontagarea =document.createElement("option");
                var valoptarea=document.createTextNode(event.areas[i].name);
                optiontagarea.value = event.areas[i].name; //value= name;
                //optiontagarea.value = i;//value = integer;
                optiontagarea.className = event.areas[i].name;
                optiontagarea.appendChild(valoptarea);
                document.getElementById('area-list').appendChild(optiontagarea);
            
                }
                var selectedarea = document.getElementById('area-list').value;
                if(selectedarea){
                    console.log(true);
                    document.getElementById("explore").disabled = false;
                } else{
                    document.getElementById("explore").disabled = true;
                    console.log(false);
                }
            
        });
    });
}