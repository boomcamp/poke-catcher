$( document ).ready(function() {

        $('.loc-area').hide();
        $('.capture-area').hide();
        $('.limit').hide();
    $('.box-4').on('click', function() {
        var greetings = `
        <div class="box-4"style="cursor: default">
            <div class="typewriter">
                <div class="typewriter-text">Are you ready to catch some pokemons?</div>
            </div>
                <span class="answer" id="no">NO</span>
                <span class="answer" id="yes">YES</span>
            </div>
        </div>
        `;
        $('.box-4').replaceWith(greetings)
        //$(".typewriter-text").text("Are you ready to catch pokemons?");

        $('#yes').on('click', function() {
            var greetings = `
            <section class="loc-wrapper">
            <div class="box-1">
                    <div class="box-2">
                            <div class="box-3">
                                    <div class="box-4">
                                            <div class="typewriter">
                                               <div class="typewriter-text">Click "Explore" to start searching for Pokemons    </div>
                                            </div>
                                    </div>
                            </div>
                    </div>
            </div>
        </section>
            `;
                $('.box-1').replaceWith(greetings)
                $('.loc-area').show();

                const regClass = $('.regions');
                const locClass = $('.locations');
                const areaClass = $('.areas')
                

                const fetchAPI = (path) => {
                const baseURL = `https://pokeapi.co/api/v2/`;
                return fetch(`${baseURL}${path}`)
                        .then(res => res.json())
                        .then(function (posts)  {
                        var regionRes = posts.results;
                
                        if (path === 'region') {
                                $('.regions').append('<option> -- select region --</option>');
                                for(let x in regionRes){
                                        $('.regions').append(`<option value="${regionRes[x].url}">${regionRes[x].name}</option>`)
                                }
                        }

                
                        $('.regions').on('change', function(){
                                let locURL = this.value;
                                console.log(locURL);
                                $(locClass).html('');
                                $(areaClass).html('');
                                //FETCH LOC

                                return fetch(locURL)
                                        .then(res => res.json())
                                        .then(function (locF) {
                                                var locRes = locF.locations;
                                                $('.locations').append('<option> -- select location --</option>');
                                                for (let x in regionRes){
                                                        $('.locations').append(`<option value="${locRes[x].url}">${locRes[x].name}</option>`)
                                                }

                                        })

                        })

                        $('.locations').on('change', function() {
                                let areaURL = this.value;
                                $(areaClass).html('');

                                //FETCH AREA

                                return fetch(areaURL)
                                        .then(res => res.json())
                                        .then(function(areaF) {
                                                var areaRes = areaF.areas;
                                                $('.areas').append('<option> -- select area --</option>');
                                                for (let x in areaRes)  {
                                                        $('.areas').append(`<option value="${areaRes[x].url}">${areaRes[x].name}</option>`)
                                                }
                                        })
                        })

                        $('.areas').on('change', function() {
                                let areaURL = this.value;


                                //FETCH AREA

                                return fetch(areaURL)
                                        .then(res => res.json())
                                        .then(function(areaF) {
                                                var areaRes = areaF.areas;

                                                for (let x in areaRes)  {
                                                        $('.areas').append(`<option value="${areaRes[x].url}">${areaRes[x].name}</option>`)
                                                }
                                        })
                        })
                        
                        let locAreaUrl;
                        $('.areas').on('change', function(){
                                locAreaUrl = this.value;
                                console.log(locAreaUrl)
                        })

                        let seen = 0;
                        const exploreBtn = $('.start-btn');
                        exploreBtn.on('click', function(){
                                $('.capture-area').show();
                                fetch(locAreaUrl)
                                .then(res => res.json())
                                .then(function(allPoke){
                                    encounter = allPoke.pokemon_encounters;
                                    var randomNum = Math.floor(Math.random()*(encounter.length));
                                    console.log(randomNum)
                                    pokeName = encounter[randomNum].pokemon.name ;
                                    console.log(pokeName)
                                    pokeUrl = encounter[randomNum].pokemon.url ;
                                    console.log(pokeUrl)
                                    
                                        if(pokeUrl) {
                                                fetch(pokeUrl)
                                                .then(res => res.json())
                                                .then(function(details){
                                                pokePics = details.sprites.front_default;
                                                console.log(pokePics);

                                                $('#poke-image').attr('src', pokePics);
                                                $('.poke-name').text(pokeName)
                                                $('#speed').text(`speed: ${details.stats[0].base_stat}`);
                                                $('#sp-defense').text(`sp-defense: ${details.stats[1].base_stat}`);
                                                $('#sp-attack').text(`sp-attack: ${details.stats[2].base_stat}`);
                                                $('#defense').text(`defense: ${details.stats[3].base_stat}`);
                                                $('#attack').text(`attack: ${details.stats[4].base_stat}`);
                                                $('#hp').text(`hp: ${details.stats[5].base_stat}`);
                                                
                                                // console.log($('#speed').text())
                                                // $('#speed') details.stats[0].base_stat;
                                                // $('#sp-defense') details.stats[1].base_stat;
                                                // $('#sp-attack') details.stats[2].base_stat;
                                                // $('#defense') details.stats[3].base_stat;
                                                // $('#attack') details.stats[4].base_stat;
                                                // $('#hp') details.stats[5].base_stat;
                                                seen++;
                                                $('.seen').text(`${seen}`);
                                                })
                                        } 
                                })

                                
                            })
                            let capturedCounter = 0;
                            const catchBtn = $('#poke-ball');
                            catchBtn.on('click', function() {
                               
                                    if(capturedCounter!=6){
                                            //$('.found-cont').addClass('hide')
                                           // $('.found-cont-captured').removeClass('hide')
                                            //$('.capture-text').text(`you've captured ${pokeName}!`)
                                     
                                            $('.pokedex').append(`
                                            <div class="captured">
                                            <div>${pokeName}</div>
                                            <img src="${pokePics}" alt="" width="150px" height="150px">
                                            </div>
                                            `)
                                     
                                            capturedCounter++;
                                            $('.ctr').text(`${capturedCounter}/6`)
                                     }
                                     else {
                                        $('.capture').hide();
                                        $('.limit').show();
                                        
                                     }
                                            
                            }) 
                        
                        
                })
                }
                fetchAPI('region');

            /* $('.start-btn').on('click', function() {
                var captureArea = `
                <section class="capture-area">
                    <div class="capture">
                            <div class="poke-image">
                            <img style="height: 120px" src="https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c325.png">
                            </div>  

                            <div class="poke-ball">
                                    <img style="height: 120px" src="https://media.giphy.com/media/JgCZ2hksM1abS/giphy.gif">
                            </div>  
                    </div>
                    <div class="index">
                            <div class="index-inner">
                                    <div class="index-title-area">
                                            <div class="index-text">POKÉDEX</div>
                                            <div class="index-text-sub">CAUGHT: 6/6 | SEEN: 104</div>
                                    </div>
                            </div>
                    </div>
                </section>
                `;
               $('.capture-area').replaceWith(captureArea);

                //FETCH 

             })
             */
        })

        $('#no').on('click', function() {
             
        })
    })
})