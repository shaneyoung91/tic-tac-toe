/*----- constants -----*/
const COLORS = {
	'0': 'white',   // Empty Square or null
	'1': 'tomato', // Player X
	'-1': 'green'  // Player O
};

const PLAYERS = {
	'1': 'Player X',
	'-1': 'Player O'
};

// winning combinations (8 possible)
//  - checkHorizontal (x3)
//  - checkVertical (x3)
//  - checkDiagonalNESW (x1)
//  - checkDiagonalNWSE (x1)



/*----- state (global/globally available) variables -----*/
let board; // 2D array, 3x3 grid
let turn; // represented by 1 or -1
let winner; // null = no winner; 1 or -1 = winner; "T" = tie game;

/*----- cached (save/remember) elements  -----*/
const messageElement = document.querySelector('h1');
const resetGameBtn = document.querySelector('button');
const squareEls = [...document.querySelectorAll('#board > div')];

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick);


/*----- functions -----*/
initialize();

function initialize() {
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
		winner = getWinner(colIdx, rowIdx)
		render();
	}
};


function render() {
	renderBoard();
	renderMessage();
	renderControls();
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
	} else if (winner) {
		messageElement.innerHTML = `<span style="color: ${COLORS[winner]}">${PLAYERS[winner].toUpperCase()}</span> Wins!`;
	} else {
		messageElement.innerHTML = `<span style="color: ${COLORS[turn]}">${PLAYERS[turn].toUpperCase()}</span>'s Turn`;
	}
};

function renderControls() {
	// use ternary (conditional) expression when you want 1 of 2 values returned (truthy and falsy)
	// <cond expression> ? <truthy exp> : <falsy exp>
	resetGameBtn.style.visibility = winner ? 'visible' : 'hidden';
};

