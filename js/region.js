function Regions(){
    fetch("https://pokeapi.co/api/v2/region")
    .then(function (Response){

        Response.json()
        .then(function(list){
            for(var i = 0; i < list.results.length; i++){
                createRegionList(list, i );
            }
        });
    });
};

function createRegionList(list, i){
    var optionTag = document.createElement("option");
    var valueOption = document.createTextNode(list.results[i].name);
    optionTag.value = list.results[i].name;
    optionTag.className = list.results[i].name;
    optionTag.appendChild(valueOption);
    document.getElementById('region-list').appendChild(optionTag);
}

Regions();