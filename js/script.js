const gameboardDiv = document.querySelector('.gameboard');
const player1Name = document.querySelector('.player1');
const player2Name = document.querySelector('.player2');

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
				cellDiv.addEventListener('click', playGame.selectCell);

				gameboardDiv.appendChild(cellDiv);
			}
		}
		}
	return { gameArray, display };
})();

// Player Factory Function
const playerFactory = (name, mark) => {
	const getName = () => name;
	
	return { name, mark, getName };
};

// Play Game Module
const playGame = (function () {
	
	function switchPlayer() {
		if (activePlayer === player1) {
			player1Name.classList.toggle('inactive');
			player2Name.classList.toggle('inactive');
			activePlayer = player2;
		} else {
			player1Name.classList.toggle('inactive');
			player2Name.classList.toggle('inactive');
			activePlayer = player1;
		}
	}
	function selectCell(e) {
		e.target.textContent = activePlayer.mark;
		const row = e.target.dataset.row;
		const col = e.target.dataset.col;
		gameboard.gameArray[row][col] = activePlayer.mark;
		switchPlayer(activePlayer);
	}
	return { selectCell }
})();

const player1 = playerFactory('player1', 'X');
const player2 = playerFactory('player2', 'O');
let activePlayer = player1;
gameboard.display();

