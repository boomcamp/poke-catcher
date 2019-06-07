const regionSelect = document.getElementById('region');
const locationSelect = document.getElementById('location');
const areaSelect = document.getElementById('area');


const fetchAPI = (path) => {
    const baseURL = `https://pokeapi.co/api/v2/`;

    return fetch(`${baseURL}${path}`)
        .then(res => res.json())
        .then(function (posts)  {
            var postsValue = posts.results;
            
            if(path === 'region'){
                regionSelect.innerHTML = postsValue.map(function(arrValue){
                    
                    if(postsValue.indexOf(arrValue) == 0){
                         return `
                         <option value=""  selected ">Select Region</option>
                         <option value="${arrValue.url}"   ">${arrValue.name}</option>`;
                    }else{
                        return `<option value="${arrValue.url} ">${arrValue.name}</option>`;
                    }  
                 })
            }

            region.addEventListener('change', function() {
                let locationUrl = this.value;
                //console.log(locationUrl);
                return fetch(`${locationUrl}`)
                .then(res => res.json())
                .then(function (posts)  {
                    var postsValue = posts.locations;

                    locationSelect.innerHTML = postsValue.map(function(arrValue){
                        if(postsValue.indexOf(arrValue) == 0){
                            return `
                            <option value=""  selected ">Select Region</option>
                            <option value="${arrValue.url}"   ">${arrValue.name}</option>`;
                       }else{
                           return `<option value="${arrValue.url} ">${arrValue.name}</option>`;
                       } 

                    })
                })
            
            });

            locationSelect.addEventListener('change', function() {
                let areaURL = this.value;
                // console.log(areaURL);
                return fetch(`${areaURL}`)
                .then(res => res.json())
                .then(function (posts)  {
                    var postsValue = posts.areas;

                    areaSelect.innerHTML = postsValue.map(function(arrValue){

                        if(postsValue.indexOf(arrValue) == 0){
                            return `
                            <option value=""  selected ">Select Region</option>
                            <option value="${arrValue.url}"   ">${arrValue.name}</option>`;
                       }else{
                           return `<option value="${arrValue.url} ">${arrValue.name}</option>`;
                       } 

                    })
                })
            
            });
            
 
        })
        .catch(console.error);
        
}

fetchAPI('region');



