


$(document).ready(function(){
    $('.regions-container').hide();

    $('.landing-title').click(function(){
        $('.landing-container').fadeOut();
        $('.regions-container').fadeIn();
          
      
        
    })

   

   getRegions('https://pokeapi.co/api/v2/region')
    .then(function(regions){
        let regionsArr = regions.results;


        regionsArr.forEach(element => {
            let region = element.name;
            let regionURL = element.url;
            let regionList = $(
                `<li class="list-group-item region-item" onclick="viewLocation('${regionURL}')">`+
                    '<i class="fa fa-angle-right"></i>' +
                    region +

                   

                    `<ul class="${region}-group">` +

                    '</ul>' +

                '</li>'
            )

            $('.regions-group').prepend(regionList);
        });
        
    })


    
})

function viewLocation(region){
    return fetch(region)
        .then(function(response){
            return response.json();
        })
        .then(function(region){
            let regionName = region.name;
            let locationsArr = region.locations;
            let container = `.${regionName}-group`;
            
            locationsArr.forEach(element => {


               let locationName = element.name;
               
               let locationList = $(
                   `<li class="list-group-item">${locationName}</li>` 
               )

               $(container).prepend(locationList);

                
            });
          
        })
}

function getRegions(url){
    return fetch(url)
        .then(function(response){
            return response.json()
        })
    
}