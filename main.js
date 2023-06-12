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
squareEls = [...document.querySelectorAll('#board > div')];


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
	for (let combo of winningCombos) {
		const turnPositions = combo.map(function(position) {
			const rowIdx = position[0];
			const colIdx = position[1];
			return board[rowIdx][colIdx];
		});
		if (turnPositions[0] !== COLORS[0] && turnPositions.every(function(turnPosition) {
		  return turnPosition === turnPositions[0];
		})) {
		return turnPositions[0];
		}
	}
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

