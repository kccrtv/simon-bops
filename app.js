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
		let pieceColorId = pieceColor[i].dataset.id;
		userTurn = true;
		// console.log(pieceColorId);
		animation(parseInt(pieceColorId));
		userSequence.push(pieceColor[i].id);
		validate(userSequence - 1);
		playSound(pieceColor[i].id);
		score.style.display = 'inline';
	});

	// function userMoves() {
	// 	wrapper.addEventListener('click', (event) => {
	// 		userTurn = true;
	// 		animation(pieceColor);
	// 		userSequence.push(pieceColor);
	// 		validate(userSequence - 1);
	// 		playSound(pieceColor);
	// 		score.style.display = 'inline';
	// 	});
	// }

	// wrapper.addEventListener('click', (event) => {
	// 	event.preventDefault();
	// 	// playerTurn = true;
	// 	let userMove = document.getElementById(event.target.id).getAttribute('id');
	// 	let userId = document.getElementById(event.target.id).dataset.id;
	// 	let userMoveId = pieceList[userId].dataset.id;
	// 	animation(`${userMoveId}`);
	// 	userSequence.push(userMove);
	// 	validate(userSequence.length - 1);
	// 	playSound(userMove);
	// 	// animation(userId);
	// 	// highlight(userId);
	// 	score.style.display = 'inline';
	// });

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
		let interval = 900;
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
		userTurn = false;
		userMoves = [];
		currentLevel++;
		level.textContent = `Level ${currentLevel}`;
		let currentRandomNumber = Math.floor(Math.random() * 5);
		let piece = gameSequence[0];
		let simon = pieceColors[currentRandomNumber];
		// let simonPiece = document.querySelector(`#${simon}`).dataset.id;
		// animation(parseInt(simonPiece));
		piece = gameSequence[gameSequence.length - 1];
		gameSequence.push(simon);
		showPattern(gameSequence);
	}

	function highlight(currentPiece) {
		console.log(`current piece: ${currentPiece}`);
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
		userTurn = false;
		currentLevel = 0;
		points = 0;
		score.style.display = 'none';
	}

	function animation(key) {
		switch (key) {
			case 0:
				console.log(pieceColor[0]);
				pieceColor[0].classList.add('animate__animated', 'animate__shakeY');
				setTimeout(() => {
					pieceColor[0].classList.remove(
						'animate__animated',
						'animate__shakeY'
					);
				}, 100);
				break;

			case 1:
				console.log(pieceColor[1]);
				pieceColor[1].classList.add('animate__animated', 'animate__bounce');
				setTimeout(() => {
					pieceColor[1].classList.remove(
						'animate__animated',
						'animate__bounce'
					);
				}, 100);
				break;

			case 2:
				console.log(pieceColor[2]);
				pieceColor[2].classList.add('animate__animated', 'animate__swing');
				setTimeout(() => {
					pieceColor[2].classList.remove('animate__animated', 'animate__swing');
				}, 100);
				break;

			case 3:
				console.log(pieceColor[3]);
				pieceColor[3].classList.add('animate__animated', 'animate__bounceIn');
				setTimeout(() => {
					pieceColor[3].classList.remove(
						'animate__animated',
						'animate__bounceIn'
					);
				}, 100);
				break;

			case 4:
				console.log(pieceColor[4]);
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

/**
 * nodelist:
 * 0 green data-id 0
 * 1 yellow data-id 1
 * 2 holder data-id n/a
 * 3 red data-id 3
 * 4 purple data-id 4
 * 5 blue data-id 5
 */
