const wrapper = document.querySelector('.wrapper');
const pieceColors = ['green', 'yellow', 'red', 'blue', 'purple'];
let userMoves = [];

wrapper.addEventListener('click', (event) => {
	event.preventDefault();
	let colorId = document.getElementById(event.target.id);
	if (colorId !== null) {
		colorId = colorId.getAttribute('id');
		document.getElementById(`${colorId}`).classList.add('highlight');
		setTimeout(function () {
			document.getElementById(`${colorId}`).classList.remove('highlight');
		}, 1000);
		userMoves.push(`${colorId}`);
		console.log(`Player's moves: ${userMoves}`);
	}
});

/********************** PSEUDOCODE STEPS**********************/
//create a random sequence
const randomNumber = () => {
	return Math.floor(Math.random() * 5);
};

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

//display Simon's colors at the start of each level and flash corresponding color piece
let piece = gameSequence[0];
const game = () => {
	simonMoves();
	levelUp();
	piece = gameSequence[gameSequence.length - 1];
	let pieceHighlight = document.getElementById(`${piece}`);
	pieceHighlight.classList.add('highlight');
	setTimeout(function () {
		pieceHighlight.classList.remove('highlight');
	}, 1000);
	console.log(`Simon's moves: ${gameSequence}`);
	return gameSequence;
};

game();

//store the input of the player

//wait for user's input and cross-check if the input matches the game's input

//if matches, proceed to next level

//else, game over, and game resets

//inform user if game is over
