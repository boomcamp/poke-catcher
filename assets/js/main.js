const baseUrl = "https://pokeapi.co/api/v2/";
const regions = document.querySelector("#regions");
const locations = document.querySelector("#locations");
const areas = document.querySelector("#areas");

var regionArr = [];

regions.addEventListener("change", function() {
	getLocations();
});

fetch(`${baseUrl}region`)
	.then(response => response.json())
	.then(function(region) {
		region = region.results;
		regionArr.push(...region);
		displaySelect(regionArr, regions);
		getLocations();
		getAreas();
	})
	.catch(error => console.error);

//functions
function getLocations() {
	fetch(regions.value)
		.then(response => response.json())
		.then(function(location) {
			location = location.locations;
			displaySelect([...location], locations);
		});
}

function getAreas() {
	console.log(localtions.value);
	fetch(locations.value)
		.then(response => response.json())
		.then(function(area) {
			area = area.areas;
			displaySelect([...area], areas);
		});
}

function displaySelect(arr, target) {
	target.innerHTML = arr.map(e => `<option value="${e.url}">${e.name[0].toUpperCase() + e.name.slice(1)}</option>`);
}
