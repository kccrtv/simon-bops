const simon = document.querySelector('.simon');
// const purple = document.getElementById('purple');
// const green = document.getElementById('green');
// const yellow = document.getElementById('yellow');
// const blue = document.getElementById('blue');
// const red = document.getElementById('red');


simon.addEventListener('click', (event) => {
	event.preventDefault();
	let colorId = document.getElementById(event.target.id).getAttribute('id');
	if (event.target.className !== 'holder') {
		document.getElementById(`${colorId}`).classList.add('highlight');
		setTimeout(function () {
			document.getElementById(`${colorId}`).classList.remove('highlight');
		}, 1000);
	}
});

const levelUp (()=> {
    const level = document.querySelector('.header');
    let currentLevel = 0;
    level.textContent = `Level ${currentLevel}`;
})
