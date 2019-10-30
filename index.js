
function region(){
    fetch('https://pokeapi.co/api/v2/region')
    .then((res) => res.json())
    .then((data) => {
        let output = '';
        data.results.forEach(function(reg){
            output += `
            <option value="${reg.url}">${reg.name}</option>
            `
        })
        document.getElementById('regions').innerHTML = output;
    })
}

region()

// $('.regions').on('change', function(){ })

document.getElementById('regions').addEventListener('change', function(){
    fetch(`${document.getElementById('regions').value}`)
    .then((res) => res.json())
    .then((data) => {
        let output = '';
        data.locations.forEach(function(loc){
            output += `
            <option value="${loc.url}">${loc.name}</option>
            `
        })
        document.getElementById('location').innerHTML = output;
    })
}) 




