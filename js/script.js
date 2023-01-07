const gameboardDiv = document.querySelector('.gameboard');

// Gameboard Module initial setup
const gameboard = (() => {
	const gameArray = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];
	const display = () => {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				const cellDiv = document.createElement('div');
				cellDiv.classList.add('cell');
				cellDiv.setAttribute('data-row', `${row}`);
				cellDiv.setAttribute('data-col', `${col}`);
				cellDiv.textContent = gameArray[row][col];
				cellDiv.addEventListener('click', (e) => {
					console.log(`Row ${row} Col ${col}`)
				});
				gameboardDiv.appendChild(cellDiv);
			}
		}
	};
	return { gameArray, display };
})();

// Player Factory Function
const playerFactory = (name, mark) => {
	const getName = () => name;
	const setActivePlayer = () => {
			this.classList.toggle('inactive');
	}
	return { name, mark, getName, setActivePlayer };
};

// Play Game Module
// const playGame = (() => {
	
// 	console.log(``)
// 	})
// 	return {}
// })();

const player1 = playerFactory('player1', 'X');
const player2 = playerFactory('player2', 'O');

gameboard.display();
gameboard.gameArray;
console.log();