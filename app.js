/********************** REFACTORING! **********************/
let gameSequence = [];
let userMoves = [];
let game = false;
let currentLevel = 0;
const level = document.querySelector('.header');
const wrapper = document.querySelector('.wrapper');
const pieceColors = ['green', 'yellow', 'red', 'blue', 'purple'];

//starting the game
window.document.addEventListener('keypress', () => {
	if (!game) {
		simonMoves();
		level.textContent = `Level ${currentLevel}`;
		game = true;
	}
});

wrapper.addEventListener('click', (event) => {
	event.preventDefault();
	let user = document.getElementById(event.target.id).getAttribute('id');
	userMoves.push(user);
	console.log(`User pattern: ${userMoves}`);
	validate(userMoves.length - 1);
	highlight(user);
});

function validate(currentLevel) {
	if (gameSequence[currentLevel] === userMoves[currentLevel]) {
		if (userMoves.length === gameSequence.length) {
			setTimeout(function () {
				simonMoves();
			}, 1000);
		}
	} else {
		level.textContent = `Game Over!`;
		reset();
	}
}

//simon's turn
function simonMoves() {
	userMoves = [];
	currentLevel++;
	level.textContent = `Level ${currentLevel}`;
	let currentRandomNumber = Math.floor(Math.random() * 5);
	let piece = gameSequence[0];
	let simon = pieceColors[currentRandomNumber];
	let simonPiece = document.querySelector(`#${simon}`);
	piece = gameSequence[gameSequence.length - 1];

	gameSequence.push(simon);
	console.log(`game sequence: ${gameSequence}`);
	// highlight(simon);

	setTimeout(() => {
		simonPiece.classList.add('highlight');
		simonPiece.classList.remove('pressed');
	}, 400);

	//fade in/out/in animation + play sound
}

function highlight(currentPiece) {
	document.getElementById(`${currentPiece}`).classList.add('highlight');
	setTimeout(() => {
		document.getElementById(`${currentPiece}`).classList.remove('highlight');
	}, 200);
}

function reset() {
	currentLevel = 0;
	gameSequence = [];
	game = false;
}

/********************** FIRST DRAFT **********************/
// const wrapper = document.querySelector('.wrapper');
// const pieceColors = ['green', 'yellow', 'red', 'blue', 'purple'];
// let userMoves = [];
// let startGame = false;
// let currentLevel = 0;
// const level = document.querySelector('.header');

// window.document.addEventListener('keypress', () => {
// 	if (!startGame) {
// 		simonMoves();
// 	}
// });

// const simonMoves = () => {
// 	return game();
// };

// wrapper.addEventListener('click', (event) => {
// 	event.preventDefault();
// 	let colorId = document.getElementById(event.target.id);
// 	if (colorId !== null) {
// 		colorId = colorId.getAttribute('id');
// 		document.getElementById(`${colorId}`).classList.add('highlight');
// 		setTimeout(function () {
// 			document.getElementById(`${colorId}`).classList.remove('highlight');
// 		}, 1000);
// 		userMoves.push(`${colorId}`);
// 		console.log(`Player's moves: ${userMoves}`);
// 	}
// 	return gameSequence;
// });

// /********************** PSEUDOCODE STEPS**********************/
// //create a random sequence
// // const randomNumber = () => {
// // 	let num = Math.floor(Math.random() * 5);
// // 	gameSequence.push(num);
// // };

// let gameSequence = [];

// const randomSimon = () => {
// 	let currentRandomNumber = randomNumber();
// 	let simonsColors = pieceColors[currentRandomNumber];
// 	return gameSequence.push(simonsColors);
// };

// //display current level

// const levelUp = () => {
// 	currentLevel++;
// 	return (level.textContent = `Level ${currentLevel}`);
// };

// //display Simon's colors at the start of each level and flash corresponding color piece
// let piece = gameSequence[0];
// const game = () => {
// 	randomSimon();
// 	piece = gameSequence[gameSequence.length - 1];
// 	let pieceHighlight = document.getElementById(`${piece}`);
// 	pieceHighlight.classList.add('highlight');
// 	setTimeout(function () {
// 		pieceHighlight.classList.remove('highlight');
// 	}, 1000);
// 	console.log(`Simon: ${gameSequence}`);
// 	levelUp();
// 	checkAnswer(currentLevel);
// 	return gameSequence;
// };

// //wait for user's input and cross-check if the input matches the game's input

// //if matches, proceed to next level

// //else, game over, and game resets

// //inform user if game is over
// function checkAnswer(currentLevel) {
// 	console.log(currentLevel);
// 	if (userMoves === gameSequence) {
// 		console.log('success');
// 	} else {
// 		console.log('wrong');
// 	}
// }
