function region(){
    fetch('https://pokeapi.co/api/v2/region')
    .then((res) => res.json())
    .then((data) => {
        let output = ' <option value="" disabled selected>  Select Region</option>';
        data.results.forEach(function(reg){
            output += `
            <option value="${reg.url}">${reg.name}</option>
            `
        })
        document.getElementById('regions').innerHTML = output;
    })
}

region()

document.getElementById('regions').addEventListener('change', function(){
    fetch(`${document.getElementById('regions').value}`)
    .then((res) => res.json())
    .then((data) => {
        let output = '<option value="" disabled selected>  Select Location</option>';
        data.locations.forEach(function(loc){
            output += `
           
            <option value="${loc.url}">${loc.name}</option>
            `
        })
        document.getElementById('location').innerHTML = output;
    })
}) 

document.getElementById('location').addEventListener('change', function(){
    fetch(`${document.getElementById('location').value}`)
    .then((res) => res.json())
    .then((data) => {
        let output = '<option value="" disabled selected>  Select Area</option>';
        data.areas.forEach(function(are){
            output += `
            <option value="${are.url}">${are.name}</option>
            `
        })
        document.getElementById('area').innerHTML = output;
    })
}) 

document.getElementById('exp').addEventListener('click', function(){
    
    fetch(`${document.getElementById('area').value}`)
    .then((res) => res.json())
    .then((data) => {

        var encounters = data.pokemon_encounters;
        var randomNumber = Math.floor(Math.random()*(encounters.length));
        var pokemonName = encounters[randomNumber].pokemon.name;
        var pokemonUrl = encounters[randomNumber].pokemon.url;
        let output = '';

            output = `<h1 id="pokeName">${pokemonName}</h1>`;
      
        document.getElementById('poke').innerHTML = output;
        // console.log(pokemonUrl)

        fetch(`${pokemonUrl}`)
        .then((ress) => ress.json())
        .then((abi) => {

            var pokePic = abi.sprites.front_default;
            var stats = abi.stats;
            var res = ''
            // console.log(abi.stats);
            // console.log(abi.sprites.front_default)
            document.getElementById('pic').innerHTML = `<img class="img-ephasis" id="pokeImage" src="${pokePic}" wdith="200px" height="200px" alt="">`;
            
            stats.forEach(function(stat){
                res +=`<li style="list-style-type:none;" id="">${stat.stat.name}: ${stat.base_stat}</li>`
            })
            document.getElementById('istats').innerHTML = res;
        })
        

    })

})

    counter = 1;
$(document).ready(function(){ 

    $('.encounter-capt').hide()


    $('.explore').on('click', function(){
        
        
        $('.encounter-capt').show()  
        
    })

    console.log(area)
    $('.capt').on('click', function(){
        $('.second').show()  
        $('.second').css('height', 'auto')
    })
    
    

    $('#capture').on('click', function(){
        var capturedImage = $('#pokeImage').attr('src');
        var capturedName = $('#pokeName').text();

        $('#captured').append(`
        <div class="captured">
            <div class="captured-img"><img src="${capturedImage}" alt=""></div>
            <div class="captured-name"><h6>${capturedName}</h6></div> 
        </div>
        `)

        $('#counterCapt').html(`
        <h4 id="counterCapt">Captured ${counter}/6</h4>
        `);
        console.log(this);
        counter++
        if(counter > 6){
            
            // alert('You dont have enough pokeballs');
            $(this).prop('disabled', true)
            $(this).text('Not Enough Poke Balls')
        }
        

    }) 


})


   




