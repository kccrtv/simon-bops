const wrapper = document.querySelector('.wrapper');

wrapper.addEventListener('click', (event) => {
	event.preventDefault();

	let colorId = document.getElementById(event.target.id);
	if (colorId !== null) {
		colorId = colorId.getAttribute('id');
		document.getElementById(`${colorId}`).classList.add('highlight');
		setTimeout(function () {
			document.getElementById(`${colorId}`).classList.remove('highlight');
		}, 1000);
	}
});

// const levelUp (()=> {
//     const level = document.querySelector('.header');
//     let currentLevel = 0;
//     level.textContent = `Level ${currentLevel}`;
// })

/********************** PSEUDOCODE STEPS**********************/
//create a random sequence
const randomNumber = () => {
	return Math.floor(Math.random() * 5);
};

let colors = ['green', 'yellow', 'red', 'blue', 'purple'];

let moves = [];
moves.push(randomNumber());
console.log(moves);
console.log(colors[moves]);

//display current level

//display Simon's colors at the start of each level

//use corresponding numbers to flash components

//store the input of the game's sequence

//store the input of the player

//wait for user's input and cross-check if the input matches the game's input

//if matches, proceed to next level

//else, game over, and game resets

//inform user if game is over
