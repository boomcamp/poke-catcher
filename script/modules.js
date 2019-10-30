const selectRegion = document.querySelector("#regions");
const selectRegion = document.querySelector("#locations");
const selectRegion = document.querySelector("#areas");
function getRegion(arr)
        {
         selectRegion.innerHTML = arr.map(r => `<option value="${r.givenUrl}">${r.name[0].toUpperCase() + r.name.slice(1)}</option>`)
        }

export {getRegion};
      