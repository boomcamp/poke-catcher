const action = $('.region');
const where = $('.where');
const menu = $('.menu');
const place = $('.tag');
const back = $('.back');
const floating = $('.floating');
const msa = $('.message-actual');
const avatar = $('.avatar');
const disp = $('.ability');
let ca = $('.captured-actual');
let activeRegion= "";
let activeRegionApi = "";
let activeCity = "";
let activeArea = "";
let activeAreaApi = "";
let limit = 8;
let pokemons = [];
let encountered = [];
let sample = $('.sample');
let found = false;
let api = "https://pokeapi.co/api/v2/";
let topContent = $('.topcontent');
$(document).ready(()=>{
    _ear();
    sysFunc();
});

function sysFunc(){
    msa.text(`You have ${pokemons.length}/${limit} Pokemons`);
   
    getRegions();
    avatar.html('');
   
}



function _ear(){
   action.on('click',()=>actionHander());
   back.on('click',()=>backHandler());
   floating.on('click',()=>{
         topContent.css({'display':'none'});
        $('.notify').text(`Searching Pokemons....`);
        $('.notify').css({'display':'flex','left':'50%'});
        $('.notify').css({'background': 'none','width':'500px','height':'450px'});
        setTimeout(()=>{
            floatingHandler();
        },2000);
   });
   $('.catch').on('click',()=>{
    $('.notify').text(``);
    $('.notify').css({'display':'flex','left':'50%'});
    $('.notify').css({'background':`url(${'./lolpoke.gif'})`,'width':'500px','height':'288px'});
       setTimeout(catchHandler,1400);
   });
  
}


function caHandler(){
   
}

function catchHandler(){
    let chance = Math.floor((Math.random() * 100)+(Math.random()*30));
    if(chance>60 && pokemons.length<=8){

        $('.notify').css({'display':'flex','left':'30%'});
        // setTimeout(()=>{
        //     $('.notify').css({'display':'none'});
        // },1500)
        
        $('.notify').css({'background':`url(${'./pokeball.gif'})`,'width':'260px','height':'250px','left':'50%'});
        $('.notify').text(``);
        
            setTimeout(()=>{
                // setTimeout(()=>{
                   
            $('.notify').css({'display':'none','left':'30%'});
        // },1500)
                if(pokemons.length<8){
                    pokemons.push(encountered);
                    let imarkUp = "";
                    let marker = 0;
                    pokemons.forEach(key=>{
                        imarkUp+=`
                        <div onclick="bagClick('${marker}')" class="captured-actual">
                            <img class="img" src="${key[1].avatar}"/>
                            <p class="name">${key[0].name}</p>
                        </div>
                       
                        `;
                        marker++;
                    });
                    msa.text(`You have ${pokemons.length}/${limit} Pokemons`);
                    $('.cap').html(imarkUp);
                }

                else {
                    $('.notify').css({'display':'flex','left':'30%'});
                setTimeout(()=>{
                    $('.notify').css({'display':'none','left':'30%'});
                },1000)
                $('.notify').css({'background':'white','left':'50%'});
                $('.notify').text(`Limit Reached!`);
                }
        
                avatar.html('Explore to find pokemon.');
                disp.css({'display':'none'});
                $('#catch').css({'display':'none'});
            },1500)
        
    }
    else {
        $('.notify').css({'display':'flex','left':'50%'});
        setTimeout(()=>{
            $('.notify').css({'display':'none','left':'50%'});
        },1000)
        $('.notify').css({'background':'white','left':'50%'});
        //pokemons.length<=8? $('.notify').text(` ${encountered[0].name} has escaped!`): $('.notify').text(`You have reached the maximum allowed pokemons!`);
        
        if(pokemons.length<=8){
            
            $('.notify').css({'background':'none','width':'266px','height':'200px','left':'30%'});
            $('.notify').text(` ${encountered[0].name} has escaped!`);

            setTimeout(()=>{
                $('.notify').css({'display':'none','left':'30%'});
                ender();
            },1000);
        }
        else{
            // 
            
            // setTimeout(()=>{
                ender();
            // },2000);
           
        }

        
    }
}

function ender(){
   
        encountered = [];
        avatar.html('Explore to find pokemon.');
        disp.css({'display':'none'});
        $('#catch').css({'display':'none'});
    
}

function floatingHandler(){
   
    $('.notify').text(``);
    $('.notify').css({'display':'none'});
    topContent.css({'display':'flex'});

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
            let i = encountered[1];
            let iMak = `
                <div class="ability1">Attack   <strong>${i.attack}</strong></div>
                <div class="ability1">Defense   <strong>${i.defense}</strong></div>
                <div class="ability1">HP   <strong>${i.hp}</strong></div>
                <div class="ability1">Special Attack   <strong>${i.specialAttack}</strong></div>
                <div class="ability1">Special Defense  <strong>${i.specialDefense}</strong></div>
                <div class="ability1">Speed   <strong>${i.speed}</strong></div>
            `;
            topContent.css({'display':'flex'});
            disp.css({'display':'flex'});
            sample.html(iMak);
            $('#catch').css({'display':'block'});
            avatar.html(imgMarkUp);
            
        })
    });
}

function bagClick(key){
    if(confirm("Ara. Do you want to throw this lovely pokemon away?")){
         pokemons.splice(key,1);
         let imarkUp = "";
         let marker = 0;
         pokemons.forEach(key=>{
             imarkUp+=`
             <div onclick="bagClick('${marker}')" class="captured-actual">
                 <img class="img" src="${key[1].avatar}"/>
                 <p class="name">${key[0].name}</p>
             </div>
            
             `;
             marker++;
         });
         msa.text(`You have ${pokemons.length}/${limit} Pokemons`);
         $('.cap').html(imarkUp);
    }
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
    topContent.css({'display':'none'});
    $('#catch').css({'display':'none'});
    back.css({'display':'none'});
    floating.css({'display':'none'});
    where.text("You are not in any region.");
    let regionApi = `${api}region`;
    // $.ajax(regionApi).done((data)=>{
    //     let regions = data.results;
    //     let tmpMarkUp = "";
    //     regions.map(region=>{
    //        tmpMarkUp+=`
                   
    //                 <a href="#" onclick="getCities('${region.name}','${region.url}')" id="action" class="region">
    //                     ${region.name} Region
    //                 </a>
           
    //        `;
    //     });
    // change to fetch


        fetch(regionApi)
        .then(data=>data.json())
        .then(data=>{
            console.log(data);
            let regions = data.results;
            let tmpMarkUp = "";
            regions.map((region)=>{
                       tmpMarkUp+=`
                               
                                <a href="#" onclick="getCities('${region.name}','${region.url}')" id="action" class="region">
                                    ${region.name} Region
                                </a>
                       
                       `;
                    });

                    place.text("Regions");
                    menu.html(tmpMarkUp);

        });



       
    // });
}

function getCities(name,url){
    topContent.css({'display':'none'});
    $('#catch').css({'display':'none'});
    floating.css({'display':'none'});
    activeRegion = name;
    activeRegionApi = url;
    back.css({'display':'block'});
    where.text(`${activeRegion} Region`);
    // $.ajax(url).done((data)=>{
    //     let regions = data.locations;
    //     let tmpMarkUp = "";
    //     regions.map(region=>{
    //        tmpMarkUp+=`
            
    //                 <a href="#" onclick="getArea('${region.name}','${region.url}')" id="action" class="region">
    //                     ${region.name}
    //                 </a>
           
    //        `;
    //     });
    //    place.text("Cities");
    //    menu.html(tmpMarkUp);
    // });



    fetch(url)
    .then(data=>data.json())
    .then((data)=>{
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
    })
}

function getArea(name,url){
    floating.css({'display':'none'});
    $('#catch').css({'display':'none'});
    activeCity = name;
    // $.ajax(url).done((data)=>{
    //     let regions = data.areas;
    //     let tmpMarkUp = "";
    //     regions.map(region=>{
    //        tmpMarkUp+=`
            
    //                 <a href="#" onclick="getMonsters('${region.name}','${region.url}')" id="action" class="region">
    //                     ${region.name}
    //                 </a>
           
    //        `;
    //     });
    //    place.text("Areas");
    //    let word = "";
    //    name.match(/\b(\w*city\w*)\b/g)?null:word="City";
    //    where.text(`${activeCity} , ${activeRegion} Region`);
    //    menu.html(tmpMarkUp);
    // });

    fetch(url)
    .then((data)=>data.json())
    .then(data=>{
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
    })
}

function getMonsters(name,url){
    
    activeArea = name;
    where.text(`${activeArea} , ${activeCity} , ${activeRegion} Region`);
    floating.css({'display':'block'});
    avatar.html('Explore to find pokemon.');
    // start ajax
    activeAreaApi = url;
}