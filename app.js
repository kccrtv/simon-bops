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

window.document.addEventListener('keypress', () => {
	if (!game) {
		simonMoves();
		level.textContent = `Level ${currentLevel}`;
		restart.style.display = 'none';
		game = true;
	}
});

const numberOfPieces = document.querySelectorAll(`.piece`).length;
const pieceColor = document.querySelectorAll('.piece');

for (let i = 0; i < numberOfPieces; i++) {
	pieceColor[i].addEventListener('click', (event) => {
		event.preventDefault();
		let pieceColorId = pieceColor[i].dataset.id;
		userTurn = true;
		console.log(pieceColorId);
		animation(parseInt(pieceColorId));
		// animateCSS(pieceColor[pieceColorId]);
		userSequence.push(pieceColor[i].id);
		validate(userSequence - 1);
		playSound(pieceColor[i].id);
		score.style.display = 'inline';
	});

	// 	function animateCSS(element, animation, prefix = 'animate__') {
	// 		let animationStyle = '';

	// 		new Promise((resolve, reject) => {
	// 			if (element === pieceColor[0]) {
	// 				animationStyle = 'shakeY';
	// 				pieceColor[0].classList.add(
	// 					`${prefix}animated`,
	// 					`${prefix}${animation}`
	// 				);
	// 				setTimeout(() => {
	// 					pieceColor[0].classList.remove(
	// 						`${prefix}animated`,
	// 						`${prefix}${animation}`
	// 					);
	// 				}, 100);
	// 			}

	// 			// switch (element[key]) {
	// 			// 	case 0:
	// 			// 		pieceColor[0].add('animate__animated', 'animate__shakeY');

	// 			// 		// animateCSS(green, 'shakeY');
	// 			// 		// green.addEventListener('animationend', () => {
	// 			// 		// 	green.classList.remove('animate__animated', 'animate__shakeY');
	// 			// 		// });
	// 			// 		break;
	// 			// 	case 1:
	// 			// 		// const yellow = document.querySelector('#yellow');
	// 			// 		yellow.classList.add('animate__animated', 'animate__bounce');
	// 			// 		yellow.addEventListener('animationend', () => {
	// 			// 			yellow.classList.remove('animate__animated', 'animate__bounce');
	// 			// 		});
	// 			// 		break;
	// 			// 	case 3:
	// 			// 		// const red = document.querySelector('#red');
	// 			// 		red.classList.add('animate__animated', 'animate__swing');
	// 			// 		red.addEventListener('animationend', () => {
	// 			// 			red.classList.remove('animate__animated', 'animate__swing');
	// 			// 		});
	// 			// 		break;
	// 			// 	case 4:
	// 			// 		// const purple = document.querySelector('#purple');
	// 			// 		purple.classList.add('animate__animated', 'animate__bounceIn');
	// 			// 		purple.addEventListener('animationend', () => {
	// 			// 			purple.classList.remove('animate__animated', 'animate__bounceIn');
	// 			// 		});
	// 			// 		break;
	// 			// 	case 5:
	// 			// 		// const blue = document.querySelector('#blue');
	// 			// 		blue.classList.add('animate__animated', 'animate__shakeY');
	// 			// 		blue.addEventListener('animationend', () => {
	// 			// 			blue.classList.remove('animate__animated', 'animate__shakeY');
	// 			// 		});
	// 			// 		break;
	// 			// 	default:
	// 			// 		console.log(`Switch Case: ${key}`);
	// 			// 		break;
	// 			// }
	// 		});
	// 	}
	// }

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
		let interval = 1500;
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
		// console.log(`Simon Piece: ${simonPiece}`);
		// console.log(simonPiece);
		// animation(simonPiece);
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

	/**
	 * green - animate__shakeY
	 * yellow - bounce
	 * red - swing
	 * purple - bounceIn
	 * blue - animate__shakeY
	 */

	// const animateCSS = (element, animation, prefix = 'animate__') =>
	// 	// We create a Promise and return it
	// 	new Promise((resolve, reject) => {
	// 		const animationName = `${prefix}${animation}`;
	// 		// const green = document.querySelector('#green');
	// 		// const yellow = document.querySelector('#yellow');
	// 		// const red = document.querySelector('#red');
	// 		// const purple = document.querySelector('#purple');
	// 		// const blue = document.querySelector('#blue');

	// 		node.classList.add(`${prefix}animated`, animationName);

	// 		// When the animation ends, we clean the classes and resolve the Promise
	// 		function handleAnimationEnd(event) {
	// 			event.stopPropagation();
	// 			node.classList.remove(`${prefix}animated`, animationName);
	// 			resolve('Animation ended');
	// 		}

	// 		node.addEventListener('animationend', handleAnimationEnd, { once: true });
	// 	});

	function animation(key) {
		// let img = document.querySelectorAll('img')[key].dataset.id;
		switch (key) {
			case 0:
				const green = pieceColor[0];
				green.classList.add('animate__animated', 'animate__shakeY');
				green.addEventListener('animationend', () => {
					green.classList.remove('animate__animated', 'animate__shakeY');
				});
				break;
			case 1:
				const yellow = pieceColor[1];
				yellow.classList.add('animate__animated', 'animate__bounce');
				yellow.addEventListener('animationend', () => {
					yellow.classList.remove('animate__animated', 'animate__bounce');
				});
				break;
			case 3:
				const red = pieceColor[3];
				red.classList.add('animate__animated', 'animate__swing');
				red.addEventListener('animationend', () => {
					red.classList.remove('animate__animated', 'animate__swing');
				});
				break;
			case 4:
				const purple = pieceColor[4];
				purple.classList.add('animate__animated', 'animate__bounceIn');
				purple.addEventListener('animationend', () => {
					purple.classList.remove('animate__animated', 'animate__bounceIn');
				});
				break;
			case 5:
				const blue = pieceColor[5];
				blue.classList.add('animate__animated', 'animate__shakeY');
				blue.addEventListener('animationend', () => {
					blue.classList.remove('animate__animated', 'animate__shakeY');
				});
				break;
			default:
				return `Switch Case: ${key}`;
				break;
		}
	}

	// animateCSS()
	/**
	 * nodelist:
	 * 0 green data-id 0
	 * 1 yellow data-id 1
	 * 2 holder data-id n/a
	 * 3 red data-id 3
	 * 4 purple data-id 4
	 * 5 blue data-id 5
	 */
}
