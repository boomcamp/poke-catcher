const poke = (function (){
    function getBackground(type){  
        console.log(type);
        if(type == 'water'){
            document.querySelector('.poke').style.backgroundImage = "url('img/water.png')";
        }
        else if(type == 'rock'){
            document.querySelector('.poke').style.backgroundImage = "url('img/cave.png')";
        }
        else if(type == 'ground'){
            document.querySelector('.poke').style.backgroundImage = "url('img/ground.png')";
        }
        else if(type == 'grass'){
            document.querySelector('.poke').style.backgroundImage = "url('img/grass.png')";
        }
        else if(type == 'normal'){
            document.querySelector('.poke').style.backgroundImage = "url('img/normal.png')";
        }
        else if(type == 'bug'){
            document.querySelector('.poke').style.backgroundImage = "url('img/background.jpg')";
        }
        else{
            document.querySelector('.poke').style.backgroundImage = "url('img/city.png')";
        }
    }

    function pokemonStats(stats){
        pokeStats.innerHTML = `
            <p>${stats[0].stat.name} : ${stats[0].base_stat}</p>
            <p>${stats[1].stat.name} : ${stats[1].base_stat}</p>
            <p>${stats[2].stat.name} : ${stats[2].base_stat}</p>
            <p>${stats[3].stat.name} : ${stats[3].base_stat}</p>
            <p>${stats[4].stat.name} : ${stats[4].base_stat}</p>
            <p>${stats[5].stat.name} : ${stats[5].base_stat}</p>
        `;
    }    

    function pokemonPic(url){
        document.querySelector('.pokePic').innerHTML = `<img src="${url}">`;
    }

    return {
        getBackground,
        pokemonStats,
        pokemonPic,
    }
})()