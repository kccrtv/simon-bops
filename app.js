const simon = document.querySelector('.simon');
const purple = document.getElementById('purple');
const green = document.getElementById('green');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const red = document.getElementById('red');

simon.addEventListener('click', (event) => {
	event.preventDefault();
	let colorId = document.getElementById(event.target.id).getAttribute('id');
	// console.log(colorId);
	if (event.target.className !== 'holder piece') {
		// console.log(document.getElementById(`${colorId}`));
		document.getElementById(`${colorId}`).classList.add('highlight');
	}
});

function highlight(color) {
	color.classList.add('highlight');
}
