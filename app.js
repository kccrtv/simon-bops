let gameSequence = [];
let userMoves = [];
let game = false;
let playerTurn = false;
let currentLevel = 0;
let points = 0;
const main = document.querySelector('main');
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
			if (points < 100) {
				score.innerText = `00${points}`;
			} else if (points >= 100) {
				score.innerText = `0${points}`;
			}
			setTimeout(function () {
				simonMoves();
			}, 1000);
		}
	} else {
		level.textContent = `Game Over!`;
		restart.style.display = 'block';
		main.removeChild(score);
		playSound(`wrong`);
		reset();
	}
}

function showPattern(array) {
	let interval = 600;
	let promise = Promise.resolve();
	array.forEach((array) => {
		promise = promise.then(() => {
			console.log(array);
			highlight(array);
			playSound(array);
			return new Promise((resolve) => {
				setTimeout(resolve, interval);
			});
		});
	});
	promise.then(() => {
		return `Loop done.`;
	});
}

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
	showPattern(gameSequence);
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
	playerTurn = false;
	currentLevel = 0;
	points = 0;
	score.style.display = 'none';
}
