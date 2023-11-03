var birds = 3;

function dogHouse() {
	var dogs = 8;
	function showDogs(){
		console.log(dogs)
	}
	return showDogs;
}

const getDogs = dogHouse()

console.log(getDogs())