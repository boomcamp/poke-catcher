//fetching all locations in db api
function Locations(){
    fetch("https://pokeapi.co/api/v2/region")
    .then(function (Response){
        //check all the things in their by console.log(Response)
        Response.json()
         .then(function (){
             //check if has the vals of all regions and locations
             
             //for(var i = 0; i <list.results.length; i++){
                 //check if show all the regions console.log(list.results[i].name)
                 //CALL a function to create a option tags for all regions
                 //default value for to show the list first
                 createLocationslist(1);
            // }
         });
    });
};
//call by region function
function createLocationslist(list){
    //console.log(list)
    var ID =Number(list);
    fetch(`https://pokeapi.co/api/v2/region/${ID}`)
    .then(function (Response){
        Response.json()
        .then(function(list){
            //console.log(list.locations[0].name);
            for(var i=0; i<list.locations.length; i++){
                
                 //we creating option tag with value & class 
                //check if its has the rigth val console.log('regions: '+list.results[i].name+" "+i)
                var optiontag = document.createElement("option");
                var valueoption = document.createTextNode(list.locations[i].name);
                optiontag.value = list.locations[i].name;// value= name;
                //optiontag.value = i;//value = integer;
                optiontag.className = list.locations[i].name;
                optiontag.appendChild(valueoption);
                document.getElementById('location-list').appendChild(optiontag);
            }
        });
    });
    
    
}
Locations();