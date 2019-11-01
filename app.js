getData('https://pokeapi.co/api/v2/')
.then(function(data){
    //console.log(data)
}).catch(function(err){
    console.log("error")
})
var currentPuke = null;
var allPuke = [];
$(document).ready(function(){

})
$("#capturer").css("visibility", "hidden");
getData('https://pokeapi.co/api/v2/region/')
.then(region=>
    region.results.map(
           reg=>{
               //console.log(reg)
               var op = document.createElement("option");
            //    regionSelect.setAttribute('data-url', `${reg.url}`)
               op.text = reg.name;
               op.value = reg.url;
               $("#regions").append(op) 
           }
       )
).catch(function(err){
    console.log("error")
})
  $("#regions").change(()=>{
 var reg = $("#regions").val();
   $("#locations").empty()
   $("#areas").empty();
   if($("#areas").val()===null){
    $("#explore").css("visibilty", "hidden");
  }
     getData(reg)
     .then(loc=>{
         //console.log(loc.locations)
         loc.locations.map(item=>{
               $("#locations").append("<option value ='"+item.url+"'>"+item.name+"</option>")
             })
             //console.log( $("#locations").val())
             getData( $("#locations").val())
             .then(area =>{
                //console.log(area)
                 area.areas.map(item =>{
                    // console.log(item)
                    $("#areas").append("<option value ='"+item.url+"'>"+item.name+"</option>")
                 })
             })
     })  
})

$("#locations").change(()=>{
   var loc = $("#locations").val();
   $("#areas").empty();
   getData(loc)
   .then(el =>{
       //console.log(el)
     el.areas.map(aloc=>{
            $("#areas").append("<option value ='"+aloc.url+"'>"+aloc.name+"</option>")
         })
   })
})

$("#explore").click(() => {
    
   var empt =[];
   var explores = $("#areas").val();
   $("#capturer").css("visibility", "visible");
//    $(".pokeImage").css('visibility', 'visible');
//    $(".stats").css('visibility', 'visible');
   getData(explores)
   .then(ex =>{
    ex.pokemon_encounters.map(puke =>{
            empt.push(puke.pokemon)
        })
        //console.log(empt.length)
        var math = Math.floor(Math.random() * empt.length);
        var pokemonShow = empt[math].url;
        //console.log(pokemonShow)
        var stats ='';
     getData(pokemonShow)
     .then(pukes =>{ 
        //console.log(pukes)
        currentPuke = pukes;
         $(".stats").empty()
        // console.log(pukes.name)
         $(".stats").append("<h2 class='statsHead'>Status</h2><hr>")
         pukes.stats.map(pukeName =>{
         //console.log(pukeName.stat.url)
        
            $(".stats").append("<div class='stat'><span>"+pukeName.stat.name+":</span> <span class='statusName'>"+pukeName.base_stat+"</span></div>")
         })
        var pukeImg = pukes.sprites.front_default;
        var pokeName = pukes.name;
        $("#capturer").css("display", "inline"); 
        $(".pokeImage").html("<hr><div class ='lapis'><img src='"+pukeImg+"' height ='200vh' width='90%' style ='margin-top:10%''/><br><br><br><br><br><br><h4 class='name'>"+pokeName+"</h4></div>")
       // console.log(pukeImg)
       
     })
        
   })
})

$("#capturer").click(()=>{
//console.log(currentPuke)
$("#cap").css("visibility", "visible");

$(".lapis").css("display", "none");
$(".stat").css("display", "none");
$(".statsHead").css("display", "none");
$("hr").css("display", "none");
$("#capturer").css("visibility", "hidden");
allPuke.push(currentPuke);

allPuke.length <= 6? $("#pukeCatch").append("<span class='pukemo'>"+"<img src='"+currentPuke.sprites.front_default+"'><h4>"+currentPuke.name+"</h4></span>"):alert("Inventory is    full")

})
function getData(url){
    return fetch(url)
    .then(function(response){
    return response.json();
    })
}
