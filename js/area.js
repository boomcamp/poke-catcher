function locationAreaList(i){

    var id = Number(i);
    fetch(`https://pokeapi.co/api/v2/region/${id}`)
    .then(function (Response){
        Response.json()
        .then(function (event){
            var name = event.locations[0].name;
            areaList(name)
        });
    });
}

function areaList(name){
    fetch(`https://pokeapi.co/api/v2/location/${name}`)
        .then(function (Response){
            Response.json()
            .then(function (list){
                for(var i = 0; i < list.areas.length; i++){
                    var optionTag = document.createElement("option");
                    var valueOption = document.createTextNode(list.areas[i].name);
                    optionTag.value = list.areas[i].name;
                    optionTag.className = list.areas[i].name;
                    optionTag.appendChild(valueOption);
                    document.getElementById('area-list').appendChild(optionTag);
                }
            });
        });
}

locationAreaList(1);