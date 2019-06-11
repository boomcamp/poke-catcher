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


