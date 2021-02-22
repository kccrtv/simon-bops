const wrapper = document.querySelector('.wrapper');
// const purple = document.getElementById('purple');
// const green = document.getElementById('green');
// const yellow = document.getElementById('yellow');
// const blue = document.getElementById('blue');
// const red = document.getElementById('red');

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

// if (event.target.className !== 'holder') {
// 	let colorId = document.getElementById(event.target.id).getAttribute('id');
// 	document.getElementById(`${colorId}`).classList.add('highlight');
// }
// });

// const levelUp (()=> {
//     const level = document.querySelector('.header');
//     let currentLevel = 0;
//     level.textContent = `Level ${currentLevel}`;
// })
