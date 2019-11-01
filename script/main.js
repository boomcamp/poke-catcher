import get from './pokeApi.js'
import exploreEvent from './exploreEvent.js'
import captureEvent from './captureEvent.js'
import capturing, {exploring} from './capturing.js'

let pokeImg, captured=1;

const regionSelect = document.querySelector(".region");
const locationSelect = document.querySelector(".location");
const areaSelect = document.querySelector(".area");
const explore_btn = document.querySelector("#explore");

const captureBtn = document.createElement("button");
captureBtn.setAttribute("class", "captureBtn")
captureBtn.textContent = "CAPTURE";

    function enableBtn(){
        explore_btn.disabled = false
        explore_btn.className = "explore_btn"
    }

    function disableBtn(){
        explore_btn.disabled = true
        explore_btn.className = "explore_btn_disabled"
    }

    get(`region/`).then(data => {
        var regions = data.results
        regionSelect.innerHTML = regions.map((x, i) => `<option value="${regions[i].name}">${regions[i].name}</option>`)
        regionSelect.dispatchEvent(new Event('change'));
    });

    regionSelect.addEventListener("change", function(){
        get(`region/${regionSelect.value}`).then(data => {
            var locations = data.locations
            locationSelect.innerHTML = locations.map((x, i) => `<option value="${locations[i].name}">${locations[i].name}</option>`)
            locationSelect.dispatchEvent(new Event('change'));
        });
    });

    locationSelect.addEventListener("change", function(){
        get(`location/${locationSelect.value}`).then(data => {
            var areas = data.areas
            areaSelect.innerHTML = areas.map((x, i) => `<option value="${areas[i].name}">${areas[i].name}</option>`)
            areaSelect.dispatchEvent(new Event('change'));
        });
    });

    areaSelect.addEventListener("change", function(){
        if(areaSelect.value == "")         
            disableBtn();
        else
            enableBtn();
    });

    // -------------------------- EXPLORE EVENT -------------------------- //
    explore_btn.addEventListener("click", function(){
        var captureTime = (2+Math.floor(Math.random()*(0+5))) * 1000
        disableBtn();
        exploring();

        setTimeout(() => {
            enableBtn();
            pokeImg = exploreEvent(areaSelect.value, captureBtn);
        }, captureTime);
    });

    // -------------------------- CAPTURE EVENT -------------------------- //
    captureBtn.addEventListener("click", function(){
        if(captured <= 6){
            var poke_name = document.querySelector(".explored_txt").textContent;
            var captureTime = (2+Math.floor(Math.random()*(0+5))) * 1000
            disableBtn();
            capturing();

            setTimeout(() => {
                enableBtn();
                captured = captureEvent(pokeImg, poke_name, captured);
                captured++
            }, captureTime);
        }
    });