function Locations(){
    fetch("https://pokeapi.co/api/v2/region")
    .then(function (Response){
        Response.json()
        .then(function (){
            createLocationList(1);
        });
    });
};

function createLocationList(list){
    var id = Number(list);
    fetch(`https://pokeapi.co/api/v2/region/${id}`)
    .then(function (Response){
        Response.json()
        .then(function(list){
            for(var i = 0; i < list.locations.length; i++){
                var optionTag = document.createElement("option");
                var valueOption = document.createTextNode(list.locations[i].name);
                optionTag.value = list.locations[i].name;
                optionTag.className = list.locations[i].name;
                optionTag.appendChild(valueOption);
                document.getElementById('location-list').appendChild(optionTag);

            }
        });
    });
};

Locations();