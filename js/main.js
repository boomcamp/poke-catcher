$(function() {
    var pageTitle = $("title").text();
    $(window).blur(function() {
        $("title").text("Come Back! You gotta catch 'em all!");
    });
    $(window).focus(function() {
        $("title").text(pageTitle);
    });
});



const pokeRegions = 'https://pokeapi.co/api/v2/region';
const regions = [];


fetch(pokeRegions)
    .then(response => response.json())
    .then(regs => {
        regions.push(regs.results)
        console.log(regions)
    })
    .catch(err => {
        console.log(err)
    })