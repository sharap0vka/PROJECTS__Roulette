window.onload = function () {
	const app = document.querySelector('#app');
	const labelCounter = document.querySelector('h2 span');
	const restart = document.querySelector('.restart');
	const tips = document.querySelector('h3');

	let randomNumbers, gameOver, counter;

	function getRandom(max) {
		return Math.trunc(Math.random() * max) + 1;
	}

	function getTips(num) {
		const result = [];
		for (let i = 2; i < 10; i++) {
			if (num % i == 0) {
				result.push(i);
			}
		}
		return result;
	}

	function getRandomNumbers(count, maxValue) {
		let number;
		for (let i = 0; randomNumbers.length < count; i++) {
			number = getRandom(maxValue);
			if (!randomNumbers.includes(number)) randomNumbers.push(number);
		}
	}

	function createTable(count) {
		let html = '<table>';
		for (let i = 0; i < count; i++) {
			html += `<tr>`;
			for (let j = 1; j <= count; j++) {
				html += `<td class="cell ${i * 10 + j}">${i * 10 + j}</td>`;
			}
			html += `</tr>`;
		}
		html += `</table>`;
		return html;
	}

	function setState(element, color) {
		element.style.backgroundColor = color;
		element.classList.add('checked');
		if (color == 'green') {
			gameOver = 1;
		}
	}

	function onAddEventListeners() {
		const tds = app.querySelectorAll('td');
		tds.forEach((el) => {
			el.addEventListener('click', (e) => {
				if (!e.target.classList.contains('checked') && !gameOver && counter > 0) {
					counter--;
					labelCounter.textContent = counter;
					if (randomNumbers.includes(+e.target.textContent)) {
						setState(e.target, 'green');
					} else {
						setState(e.target, 'red');
						if (counter == 0) {
							gameOver = 1;
							tds[randomNumbers[0] - 1].style.backgroundColor = 'yellow';
						}
					}
				}
			});
		});
	}

	function init() {
		randomNumbers = [];
		counter = 10;
		labelCounter.textContent = counter;
		gameOver = 0;
		app.innerHTML = createTable(10);
		getRandomNumbers(1, 100);
		onAddEventListeners();
		tips.textContent = getTips(randomNumbers);
		console.log(randomNumbers);
	}

	init();

	restart.addEventListener('click', () => {
		gameOver = 1;
		init();
	});
};
