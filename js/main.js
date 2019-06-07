$(function() {
    var pageTitle = $("title").text();
    $(window).blur(function() {
        $("title").text("Come Back!  You gotta catch 'em all!");
    });
    $(window).focus(function() {
        $("title").text(pageTitle);
    });
});



const pokeRegions = 'https://pokeapi.co/api/v2/region';
const regions = [];

fetch(pokeRegions)
    .then(response => response.json())
    .then(regs => regions.push(...regs.results))
    .then(displayList)
    .catch(err => {
        console.log(err)
    })

function displayList() {
    var regionsName;
    for (var i = 0; i < regions.length; i++) {
        regionsName = regions[i].name
        regionsName.charAt(0).toUpperCase() + regionsName
        regionsName = regionsName.;
        $('.regions').append(`
            <option>${regionsName}</option>
         `)
    }
}