/*----- constants -----*/
const COLORS = {
	'0': 'white',   // Empty Square or null
	'1': 'tomato', // Player X
	'-1': 'green'  // Player O
};

// added variable players to represent string of Player X and O

const PLAYERS = {
	'1': 'Player X',
	'-1': 'Player O'
};

// winning combinations (8) should be presented for 2D array

const winningCombos = [
	[[0, 0], [0, 1], [0, 2]], // Row 1
    [[1, 0], [1, 1], [1, 2]], // Row 2
    [[2, 0], [2, 1], [2, 2]], // Row 3
    [[0, 0], [1, 0], [2, 0]], // Col 1
    [[0, 1], [1, 1], [2, 1]], // Col 2
    [[0, 2], [1, 2], [2, 2]], // Col 3
    [[0, 0], [1, 1], [2, 2]], // Diagonal from top-left
    [[0, 2], [1, 1], [2, 0]]  // Diagonal from top-right
];


/*----- state (global/globally available) variables -----*/
let board; // 2D array, 3x3 grid
let turn; // represented by 1 or -1
let winner; // null = no winner; 1 or -1 = winner; "T" = tie game;


/*----- cached (save/remember) elements  -----*/
const messageElement = document.querySelector('h1');
const resetGameBtn = document.querySelector('button');


/*----- event listeners -----*/
const square = document.getElementById('board')
square.addEventListener('click', handleClick);
resetGameBtn.addEventListener('click', init);


/*----- functions -----*/
init();

function init() {
	board = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]
	turn = 1;
	winner = null;
	render();
}

function handleClick(evt) {
	const squareId = evt.target.id
	const colIdx = parseInt(squareId.charAt(1));
	const rowIdx = parseInt(squareId.charAt(3));
	if (board[colIdx][rowIdx] === 0 && !winner) {
		board[colIdx][rowIdx] = turn;
		turn *= -1;
		winner = getWinner()
		render();
	}
};

function getWinner() {
	// For of loop iterates through combos & creates a new array with map().
	// The combos are assigned a "position" based on location on the game board(rowIdx, colIdx).
	// UPDATED variable name to something more understandable....
	// "playerPositions" represents player 1/-1 and 0 for empty square on the board for each combo.
	for (let combo of winningCombos) {
		const playerPositions = combo.map(function(position) {
			const rowIdx = position[0];
			const colIdx = position[1];
			return board[rowIdx][colIdx];
		});
		// Checks if player 1/-1 positions on the board are the same AND not empty.
		// Also checks the direction (row, column, diagonal). If both conditions are true, then player 1/-1 has won,
		// and returns winner
		if (playerPositions[0] !== 0 && playerPositions.every(function(playerPosition) {
		  return playerPosition === playerPositions[0];
		})) {
		return playerPositions[0];
		}
	}


	// We can add Tie variable. If the board is full, return tie
	// if (){
	// 	return 'T';
	// // };
	// return 0;
}


function render() {
	renderBoard();
	renderMessage();
	resetGameBtn.disabled = !winner;
}

function renderBoard() {
	board.forEach(function(colArr, colIdx) {
		colArr.forEach(function(cellVal, rowIdx) {
			const cellId = `c${colIdx}r${rowIdx}`;
			const cellEl = document.getElementById(cellId)
			cellEl.style.backgroundColor = COLORS[cellVal];

			// Turn square colors intos symbols - X or O
			// Need to refine in CSS before implementing
			// const boardSymbol = board[colIdx][rowIdx];
			// if (boardSymbol === 1)
			// 	cellEl.innerText = "X";
			// else if (boardSymbol === -1)
			// 	cellEl.innerText = "O";
			// else
			// 	cellEl.innerText = "";
		});
	});
};

function renderMessage(){
	if (winner === 'T') {
		messageElement.innertext = "It's A Tie!";
	} else if (winner === 1) {
		messageElement.innerHTML = `<span style="color: ${COLORS[1]}">${PLAYERS[1].toUpperCase()}</span> Wins!`;
	} else if (winner === -1) {
		messageElement.innerHTML = `<span style="color: ${COLORS[-1]}">${PLAYERS[-1].toUpperCase()}</span> Wins!`;
	} else {
		messageElement.innerHTML = `<span style="color: ${COLORS[turn]}">${PLAYERS[turn].toUpperCase()}</span>'s Turn`;
	}
};