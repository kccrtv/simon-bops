let gameSequence = [];
let userMoves = [];
let game = false;
let playerTurn = false;
let currentLevel = 0;
let points = 0;
const level = document.querySelector('.header');
const score = document.querySelector('.score');
const restart = document.querySelector('.restart');
const wrapper = document.querySelector('.wrapper');
const pieceColors = ['green', 'yellow', 'red', 'blue', 'purple'];

window.document.addEventListener('keypress', () => {
	if (!game) {
		simonMoves();
		level.textContent = `Level ${currentLevel}`;
		restart.style.display = 'none';
		game = true;
	}
});

wrapper.addEventListener('click', (event) => {
	event.preventDefault();
	playerTurn = true;
	let user = document.getElementById(event.target.id).getAttribute('id');
	userMoves.push(user);
	validate(userMoves.length - 1);
	playSound(user);
	highlight(user);
	score.style.display = 'inline';
});

function validate(currentLevel) {
	if (gameSequence[currentLevel] === userMoves[currentLevel]) {
		if (userMoves.length === gameSequence.length) {
			points += 10;
			score.innerText = `00${points}`;
			setTimeout(function () {
				simonMoves();
			}, 1000);
		}
	} else {
		level.textContent = `Game Over!`;
		score.style.display = 'none';
		restart.style.display = 'block';
		reset();
	}
}

let interval = 400;
let promise = Promise.resolve();
let array = ['random', 'test', 'array'];
array.forEach((array, index) => {
	promise = promise.then(() => {
		console.log(array);
		return new Promise((resolve) => {
			setTimeout(resolve, interval);
		});
	});
});
promise.then(() => {
	console.log('Loop done.');
});
// return;
// function showPattern(array, index) {

// }

function simonMoves() {
	playerTurn = false;
	userMoves = [];
	currentLevel++;
	level.textContent = `Level ${currentLevel}`;
	let currentRandomNumber = Math.floor(Math.random() * 5);
	let piece = gameSequence[0];
	let simon = pieceColors[currentRandomNumber];
	let simonPiece = document.querySelector(`#${simon}`);
	piece = gameSequence[gameSequence.length - 1];
	gameSequence.push(simon);

	gameSequence.forEach(showPattern);
	// playSound(simon);
	document.querySelector('.wrapper').filter = 'brightness(2)';
	simonPiece.classList.add('highlight');
	setTimeout(() => {
		simonPiece.classList.remove('highlight');
	}, 300);

	//fade in/out/in animation + play sound
}

function highlight(currentPiece) {
	document.getElementById(`${currentPiece}`).classList.add('highlight');
	setTimeout(() => {
		document.getElementById(`${currentPiece}`).classList.remove('highlight');
	}, 100);
}

function playSound(name) {
	let audio = new Audio(`sound/${name}.wav`);
	audio.volume = 0.1;
	audio.play();
}

function reset() {
	gameSequence = [];
	userMoves = [];
	game = false;
	currentLevel = 0;
	points = 0;
	score.style.display = 'none';
}
