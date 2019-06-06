const action = $('.region');
const where = $('.where');
const menu = $('.menu');
const place = $('.tag');
const back = $('.back');
const floating = $('.floating');
const msa = $('.message-actual');
const avatar = $('.avatar');
let activeRegion= "";
let activeRegionApi = "";
let activeCity = "";
let activeArea = "";
let activeAreaApi = "";
let limit = 8;
let pokemons = [];
let encountered = [];
let found = false;
let api = "https://pokeapi.co/api/v2/";
$(document).ready(()=>{
    _ear();
    sysFunc();
});

function sysFunc(){
    msa.text(`You have ${pokemons.length}/${limit} Pokemons`);
   
    getRegions();
   
}


function _ear(){
   action.on('click',()=>actionHander());
   back.on('click',()=>backHandler());
   floating.on('click',()=>floatingHandler());
   $('.catch').on('click',()=>catchHandler());
}

function catchHandler(){
    let chance = Math.floor((Math.random() * 100)+(Math.random()*30));
    if(chance>60){

        $('.notify').css({'display':'flex'});
        setTimeout(()=>{
            $('.notify').css({'display':'none'});
        },1000)
        $('.notify').text(`You caught ${encountered[0].name}`);
        
        if(pokemons.length<8){
            pokemons.push(encountered);
            let imarkUp = "";
            pokemons.forEach(key=>{
                imarkUp+=`

                <div class="captured-actual">
                    <img class="img" src="${key[1].avatar}"/>
                </div>
            
                
                `;
            });
            msa.text(`You have ${pokemons.length}/${limit} Pokemons`);
            $('.cap').html(imarkUp);
        }

        else {
            $('.notify').css({'display':'flex'});
        setTimeout(()=>{
            $('.notify').css({'display':'none'});
        },1000)
        $('.notify').text(`Limit Reached!`);
        }
        floatingHandler();
    }
    else {
        $('.notify').css({'display':'flex'});
        setTimeout(()=>{
            $('.notify').css({'display':'none'});
        },1000)
        $('.notify').text(` ${encountered[0].name} has escaped!`);
        floatingHandler();
    }
}

function floatingHandler(){
    
   

    $.ajax(activeAreaApi).done((data)=>{
        let num = Math.floor(Math.random()*8);
        let gacha = data.pokemon_encounters[num];
        encountered = [];
        encountered.push(gacha.pokemon);
    }).then(()=>{
        $.ajax(encountered[0].url).done((data)=>{


            let stats = data.stats;
            let statObj = Object.create({
                avatar: data.sprites.front_default,
                speed: stats[0].base_stat,
                specialDefense: stats[1].base_stat,
                specialAttack: stats[2].base_stat,
                defense: stats[3].base_stat,
                attack: stats[4].base_stat,
                hp: stats[5].base_stat,
            });

            encountered.push(statObj);
           
            let imgMarkUp = `
                    
                    <img class="image" src="${encountered[1].avatar}"></img>
                    <p class="found">You found  <strong>${encountered[0].name} !<strong></p>
            `;

            found = true;
            $('#catch').css({'display':'block'});
            avatar.html(imgMarkUp);
            
        })
    });
}

function backHandler(){
   switch($('.tag').text()){
        case "Areas": 
            getCities(activeRegion,activeRegionApi);
        break;  
       case "Cities": 
            getRegions();
       ;break;
       default:

   }
}

function actionHander(){
    //when action is clicked.

   
}

function getRegions(){
    back.css({'display':'none'});
    floating.css({'display':'none'});
    where.text("You are not in any region.");
    let regionApi = `${api}region`;
    $.ajax(regionApi).done((data)=>{
        let regions = data.results;
        let tmpMarkUp = "";
        regions.map(region=>{
           tmpMarkUp+=`
                   
                    <a href="#" onclick="getCities('${region.name}','${region.url}')" id="action" class="region">
                        ${region.name} Region
                    </a>
           
           `;
        });
       place.text("Regions");
       menu.html(tmpMarkUp);
    });
}

function getCities(name,url){
    activeRegion = name;
    activeRegionApi = url;
    back.css({'display':'block'});
    where.text(`${activeRegion} Region`);
    $.ajax(url).done((data)=>{
        let regions = data.locations;
        let tmpMarkUp = "";
        regions.map(region=>{
           tmpMarkUp+=`
            
                    <a href="#" onclick="getArea('${region.name}','${region.url}')" id="action" class="region">
                        ${region.name}
                    </a>
           
           `;
        });
       place.text("Cities");
       menu.html(tmpMarkUp);
    });
}

function getArea(name,url){
    
    activeCity = name;
    $.ajax(url).done((data)=>{
        let regions = data.areas;
        let tmpMarkUp = "";
        regions.map(region=>{
           tmpMarkUp+=`
            
                    <a href="#" onclick="getMonsters('${region.name}','${region.url}')" id="action" class="region">
                        ${region.name}
                    </a>
           
           `;
        });
       place.text("Areas");
       let word = "";
       name.match(/\b(\w*city\w*)\b/g)?null:word="City";
       where.text(`${activeCity} , ${activeRegion} Region`);
       menu.html(tmpMarkUp);
    });
}

function getMonsters(name,url){
    activeArea = name;
    where.text(`${activeArea} , ${activeCity} , ${activeRegion} Region`);
    floating.css({'display':'block'});

    // start ajax
    activeAreaApi = url;
}