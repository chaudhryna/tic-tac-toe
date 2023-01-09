const gameboardDiv = document.querySelector('.gameboard');
const player1Name = document.querySelector('.player1');
const player2Name = document.querySelector('.player2');
const result = document.querySelector('#result');

// Gameboard Module initial array and board setup
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
	};

	function checkForWin() {
		gameboard.gameArray.forEach(function (row) {
			let winner = row.every((cell) => cell === activePlayer.mark);
			if (winner) {
				result.textContent = `${activePlayer.name} won!`;
				} 
			});
			if ((
				gameboard.gameArray[0][0] === activePlayer.mark &&
				gameboard.gameArray[1][0] === activePlayer.mark &&
				gameboard.gameArray[2][0] === activePlayer.mark) 
				|| 
				(gameboard.gameArray[0][1] === activePlayer.mark &&
				gameboard.gameArray[1][1] === activePlayer.mark &&
				gameboard.gameArray[2][1] === activePlayer.mark) 
				|| 
				(gameboard.gameArray[0][2] === activePlayer.mark &&
				gameboard.gameArray[1][2] === activePlayer.mark &&
				gameboard.gameArray[2][2] === activePlayer.mark) 
				||
				(gameboard.gameArray[0][0] === activePlayer.mark &&
				gameboard.gameArray[1][1] === activePlayer.mark &&
				gameboard.gameArray[2][2] === activePlayer.mark) 
				||
				(gameboard.gameArray[0][2] === activePlayer.mark &&
				gameboard.gameArray[1][1] === activePlayer.mark &&
				gameboard.gameArray[2][0] === activePlayer.mark) 
				) {
				winner = activePlayer.name;
				result.textContent = `${activePlayer.name} won!`;
				} else if ((!gameboard.gameArray[0].includes("")) && 
					(!gameboard.gameArray[1].includes("")) &&
					(!gameboard.gameArray[2].includes("")))
						{
						result.textContent = `It's a draw.`;
						};
	};


	function selectCell(e) {
		// if cell is empty allow select, insert mark and add to array
		if (e.target.textContent === '') {
			e.target.textContent = activePlayer.mark;
			const row = e.target.dataset.row;
			const col = e.target.dataset.col;
			gameboard.gameArray[row][col] = activePlayer.mark;
			checkForWin();
			switchPlayer();
		} else {
			// if the cell is taken don't allow selection
			e.target.style.cursor = 'none';
		}
	};
	return { selectCell }
})();

const player1 = playerFactory('Player 1', 'X');
const player2 = playerFactory('Player 2', 'O');
let activePlayer = player1;
gameboard.display();

