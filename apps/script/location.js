
function locations(){
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
                document.getElementById('location').appendChild(optiontag);
            }
        });
    });
    
    
}
locations();