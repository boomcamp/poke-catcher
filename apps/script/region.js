
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