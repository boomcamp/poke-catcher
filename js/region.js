//fetching all regions in db api
function Regions(){
    fetch("https://pokeapi.co/api/v2/region")
    .then(function (Response){
        //check all the things in their by console.log(Response)
        Response.json()
         .then(function (list){
             //check if has the vals of all regions and locations
             //console.log(list)
             for(var i = 0; i <list.results.length; i++){
                 //check if show all the regions console.log(list.results[i].name)
                 //CALL a function to create a option tags for all regions
                 createRegionlist(list, i);
             }
         });
    });
};
//call by region function
function createRegionlist(list, i){
    //we creating option tag with value & class 
    //check if its has the rigth val console.log('regions: '+list.results[i].name+" "+i)
    var optiontag = document.createElement("option");
    var valueoption = document.createTextNode(list.results[i].name);
    optiontag.value = list.results[i].name;// value= name;
    //optiontag.value = i;//value = integer;
    optiontag.className = list.results[i].name;
    optiontag.appendChild(valueoption);
    document.getElementById('region-list').appendChild(optiontag);
}
Regions();