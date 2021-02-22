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

/********************** PSEUDOCODE STEPS**********************/
//create a random sequence
const randomNumber = () => {
	return Math.floor(Math.random() * 5);
};

const pieceColors = ['green', 'yellow', 'red', 'blue', 'purple'];
let gameSequence = [];

const simonMoves = () => {
	let currentRandomNumber = randomNumber();
	let simonsColors = pieceColors[currentRandomNumber];

	return gameSequence.push(simonsColors);
};

//display current level
const levelUp = () => {
	const level = document.querySelector('.header');
	let currentLevel = 0;
	currentLevel++;
	return (level.textContent = `Level ${currentLevel}`);
};

//display Simon's colors at the start of each level
const game = () => {
	simonMoves();
	levelUp();
	let piece = document.getElementById(`${gameSequence}`);
	piece.classList.add('highlight');
	setTimeout(function () {
		piece.classList.remove('highlight');
	}, 1000);
	return gameSequence;
};

game();

//use corresponding numbers to flash components

//store the input of the game's sequence

//store the input of the player

//wait for user's input and cross-check if the input matches the game's input

//if matches, proceed to next level

//else, game over, and game resets

//inform user if game is over
