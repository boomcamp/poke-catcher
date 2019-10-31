const selectRegion = document.querySelector("#regions");
const selectLoc = document.querySelector("#locations");
const selectArea = document.querySelector("#areas");
// function listLocation(){
//         fetch(document.querySelector('#regions').value)
//         .then(response => response.json())
//         .then(function(data){
//                 getLocations([...data.locations])
//         })
// }
function getRegion(arr)
        {
         selectRegion.innerHTML = arr.map(r => `<option value="${r.givenUrl}">${r.name[0].toUpperCase() + r.name.slice(1)}</option>`)
        }
// function getLocations(str)
//         {
//          selectLoc.innerHTML = str.map(loc => `<option value="${loc.givenUrl}">${loc.name[0].toUpperCase() + loc.name.slice(1)}</option>`)
//         }

export {getRegion};
      