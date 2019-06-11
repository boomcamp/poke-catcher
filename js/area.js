
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
                    //optiontag.value = i;//value = integer;
                    optiontag.className = list.areas[i].name;
                    optiontag.appendChild(valueoption);
                    document.getElementById('area-list').appendChild(optiontag);
                }
            });

        });
}

LocationAreaslist(1);