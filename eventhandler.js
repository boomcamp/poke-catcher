var locaoutput = document.querySelector('.loc-output')
var regoutput = document.querySelector('.region-output')
var areaoutput = document.querySelector('.area-output')
var catchpoke = document.querySelector('.left-container')

//change the region
document.getElementById('region-output').addEventListener("change",function(){
    var region =document.getElementById('region-output').value;
    changelocationval(region)
})

//change the location
document.getElementById('loc-output').addEventListener("change",function(){
    var location =document.getElementById('loc-output').value;
    changeareaval(location)
})


//change also in location base on region changes
function changelocationval(val){
    fetch(`https://pokeapi.co/api/v2/region/${val}`)
    .then((res) => res.json())
    .then((data)=>{
        let output= data.locations
        var loc =document.getElementById('loc-output');
        loc.innerHTML="";

        output.forEach(val=> {
            let opt = document.createElement('option')
            opt.text = val.name;
            opt.value = val.name;
            locaoutput.append(opt)
        
        })
        //this is where give a default value for area when changing the location
        changeareaval(output[0].name)  
    })
}

//change also in area base on location changes
function changeareaval(val){
    fetch(`https://pokeapi.co/api/v2/location/${val}`)
    .then((res) => res.json())
    .then((data)=>{
        let output= data.areas
        var area =document.getElementById('area-output');
        area.innerHTML="";

        output.forEach(val=> {
            let opt = document.createElement('option')
            opt.text = val.name;
            opt.value = val.name;
            areaoutput.append(opt)
           
        })  
        
    })
}