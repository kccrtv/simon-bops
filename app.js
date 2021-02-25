let gameSequence = [];
let userSequence = [];
let game = false;
let userTurn = false;
let currentLevel = 0;
let points = 0;
const main = document.querySelector('main');
const level = document.querySelector('.header');
const score = document.querySelector('.score');
const restart = document.querySelector('.restart');
const wrapper = document.querySelector('.wrapper');
const pieceList = document.querySelectorAll('img');
const pieceColors = ['green', 'yellow', 'red', 'blue', 'purple'];
const numberOfPieces = document.querySelectorAll(`.piece`).length;
const pieceColor = document.querySelectorAll('.piece');

window.document.addEventListener('keypress', () => {
	if (!game) {
		simonMoves();
		level.textContent = `Level ${currentLevel}`;
		restart.style.display = 'none';
		game = true;
		userTurn = false;
	}
});

for (let i = 0; i < numberOfPieces; i++) {
	pieceColor[i].addEventListener('click', (event) => {
		event.preventDefault();
		userTurn = true;
		let pieceColorId = pieceColor[i].dataset.id;
		animation(parseInt(pieceColorId));
		userSequence.push(pieceColor[i].id);
		validate(userSequence.length - 1);
		playSound(pieceColor[i].id);
		score.style.display = 'inline';
	});

	function validate(currentLevel) {
		if (gameSequence[currentLevel] === userSequence[currentLevel]) {
			if (userSequence.length === gameSequence.length) {
				points += 10;
				if (points < 100) {
					score.innerText = `00${points}`;
				} else if (points >= 100) {
					score.innerText = `0${points}`;
				}
				setTimeout(() => {
					userTurn = false;
					simonMoves();
				}, 900);
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
		let interval = 700;
		let promise = Promise.resolve();
		array.forEach((array) => {
			promise = promise.then(() => {
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
		userSequence = [];
		currentLevel++;
		level.textContent = `Level ${currentLevel}`;
		let currentRandomNumber = Math.floor(Math.random() * 5);
		let piece = gameSequence[0];
		let simon = pieceColors[currentRandomNumber];
		piece = gameSequence[gameSequence.length - 1];
		gameSequence.push(simon);
		if (userTurn !== true) {
			showPattern(gameSequence);
		}
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
		userSequence = [];
		game = false;
		userTurn = false;
		currentLevel = 0;
		points = 0;
		score.style.display = 'none';
	}

	function animation(key) {
		switch (key) {
			case 0:
				pieceColor[0].classList.add('animate__animated', 'animate__shakeY');
				setTimeout(() => {
					pieceColor[0].classList.remove(
						'animate__animated',
						'animate__shakeY'
					);
				}, 100);
				break;

			case 1:
				pieceColor[1].classList.add('animate__animated', 'animate__tada');
				setTimeout(() => {
					pieceColor[1].classList.remove('animate__animated', 'animate__tada');
				}, 100);
				break;

			case 2:
				pieceColor[2].classList.add('animate__animated', 'animate__swing');
				setTimeout(() => {
					pieceColor[2].classList.remove('animate__animated', 'animate__swing');
				}, 100);
				break;

			case 3:
				pieceColor[3].classList.add('animate__animated', 'animate__bounceIn');
				setTimeout(() => {
					pieceColor[3].classList.remove(
						'animate__animated',
						'animate__bounceIn'
					);
				}, 100);
				break;

			case 4:
				pieceColor[4].classList.add('animate__animated', 'animate__shakeY');
				setTimeout(() => {
					pieceColor[4].classList.remove(
						'animate__animated',
						'animate__shakeY'
					);
				}, 100);
				break;

			default:
				return `Switch Case: ${key}`;
		}
	}
}
