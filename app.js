let gameSequence = [];
let userMoves = [];
let game = false;
let currentLevel = 0;
const level = document.querySelector('.header');
const wrapper = document.querySelector('.wrapper');
const pieceColors = ['green', 'yellow', 'red', 'blue', 'purple'];

window.document.addEventListener('keypress', () => {
	if (!game) {
		simonMoves();
		level.textContent = `Level ${currentLevel}`;
		document.querySelector('.restart').style.display = 'none';
		game = true;
	}
});

wrapper.addEventListener('click', (event) => {
	event.preventDefault();
	let user = document.getElementById(event.target.id).getAttribute('id');
	userMoves.push(user);
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
		document.querySelector('.restart').style.display = 'inline-block';
		reset();
	}
}

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

function reset() {
	currentLevel = 0;
	gameSequence = [];
	game = false;
}
