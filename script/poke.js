const regions = document.getElementById('region');
const locations = document.getElementById('location');
const areas = document.getElementById('area');
const explore = document.getElementById('btn-explore');
const poke_detail = document.getElementById('poke-capture-detail');
const stat_list = document.getElementById('stat_list');
const capture = document.getElementById('capture');

//fetching the regions
fetch('https://pokeapi.co/api/v2/region')
    .then((res) => res.json())
    .then(function(data){
        let option = '<option>Select Region...</option>';
        data.results.forEach(function(region){
            option += `
            <option value="${region.url}">${region.name.toUpperCase()}</option>
            `;
        });
        regions.innerHTML = option;
    })
//on select or change of regions get all the locations 
regions.addEventListener('change', function () {
    let reg_location = this.value;
    fetch(reg_location)
    .then((res) => res.json())
    .then(function(data){
        let option = ' <option>Select Location...</option>';
        data.locations.forEach(function(location_data){
            option += `
            <option value="${location_data.url}">${location_data.name.toUpperCase()}</option>
            `;
        });
        locations.innerHTML = option;
    })
});   
//on select or change of location get all the area 
locations.addEventListener('change', function () {
    let reg_location = this.value;
    fetch(reg_location)
    .then((res) => res.json())
    .then(function(data){
        let option = ' <option>Select Area...</option>';
        data.areas.forEach(function(location_data){
            option += `
            <option value="${location_data.url}">${location_data.name.toUpperCase()}</option>
            `;
        });
        areas.innerHTML = option;
    })
});   


//on click 'explore button' get a randomize data
explore.addEventListener('click', function () {
    let reg_location = areas.value;
    fetch(reg_location)
    .then((res) => res.json())
    .then(function(data){
       let random_id = Math.floor(Math.random() * data.pokemon_encounters.length);
       let poke_data = data.pokemon_encounters[random_id].pokemon.url;
       poke_detail.innerHTML = `
       <div class="img-cont">
           <img id="poke-image" src="">
           <div class="poke_name"></div>  
       </div>
        <div class="description">
         <div class="box-title">DETAILS:</div>  
            <div class="detail-list">
                 <ul id="stat-list">

                 </ul>
            </div>
        </div>
        <div class="capture">
             <img src="images/Pokeball.png" id="capture">  
        </div>    
       `;
       get_poke_data(poke_data);
       $('.no-poke').html();
    })
});   

 var counter= 0;
const get_poke_data = data =>{
    fetch(data)
    .then((res) => res.json())
    .then(function(poke){
       let poke_img = poke.sprites.front_default;
       let poke_name = poke.name;
       let stats = poke.stats;
       let list = '';
        stats.forEach(stat => {
             list += `
                <li>${stat.stat.name}: ${stat.base_stat} </li>
             `;
        });
        $('#stat-list').html(list);
        $('#poke-image').attr("src", poke_img);
        $('.poke_name').html(poke_name.toUpperCase());
        
        $('img[id*="capture"]').on('click', function(){
            if(counter != 6){
                counter++;
            $('.counter').html(counter);
            $('.poke-capture').append(`
                <div class="poke-box">
                    <div class="pb-image">
                        <img src="${poke_img}" style="margin: auto;">
                    </div>
                    <div class="pb-poke-name">
                        ${poke_name.toUpperCase()}
                    </div>
                </div>
            `);
            $('#poke-capture-detail').html(`<div class="no-poke"><i class="normal">${poke_name.toUpperCase()}</i> was added on your Pokedex. <br> Explore to find more pokemons.</div>`);
            }else{
            $('#poke-capture-detail').html(`<div class="no-poke">You're Pokedex is full!</div>`);   
            }
            
        })
    })
};

