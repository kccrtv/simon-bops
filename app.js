const wrapper = document.querySelector('.wrapper');
const pieceColors = ['green', 'yellow', 'red', 'blue', 'purple'];
let userMoves = [];
let startGame = false;
let currentLevel = 0;
const level = document.querySelector('.header');

window.document.addEventListener('keypress', () => {
	if (!startGame) {
		simonMoves();
	}
});
const simonMoves = () => {
	return game();
};

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
	return gameSequence;
});

/********************** PSEUDOCODE STEPS**********************/
//create a random sequence
const randomNumber = () => {
	return Math.floor(Math.random() * 5);
};

let gameSequence = [];

const randomSimon = () => {
	let currentRandomNumber = randomNumber();
	let simonsColors = pieceColors[currentRandomNumber];
	return gameSequence.push(simonsColors);
};

//display current level

const levelUp = () => {
	currentLevel++;
	return (level.textContent = `Level ${currentLevel}`);
};

//display Simon's colors at the start of each level and flash corresponding color piece
let piece = gameSequence[0];
const game = () => {
	randomSimon();
	piece = gameSequence[gameSequence.length - 1];
	let pieceHighlight = document.getElementById(`${piece}`);
	pieceHighlight.classList.add('highlight');
	setTimeout(function () {
		pieceHighlight.classList.remove('highlight');
	}, 1000);
	console.log(`Simon: ${gameSequence}`);
	levelUp();
	checkAnswer(currentLevel);
	return gameSequence;
};

//wait for user's input and cross-check if the input matches the game's input

//if matches, proceed to next level

//else, game over, and game resets

//inform user if game is over
function checkAnswer(currentLevel) {
	console.log(currentLevel);
	if (userMoves === gameSequence) {
		console.log('success');
	} else {
		console.log('wrong');
	}
}
