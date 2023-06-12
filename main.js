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

/*----- cached elements  -----*/
const messageElement = document.querySelector('h1');



/*----- event listeners -----*/



/*----- functions -----*/
initialize();

	// Initialize all state, then call render()
function initialize() {
	// To visualize the board mapping to the DOM,
	// rotate the board array 90 degrees counter-clockwise
	board = [
		[0, 0, 0], // column 0
		[0, 0, 0], // column 1
		[0, 0, 0],  // column 2
	];
	turn = 1;
	winner = null;
	render();
}

function render() {
	renderBoard();
	renderMessage();
	renderControls(); // Hide/show UI elements (reset game button)
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
		messageElement.innerText = "It's A Tie!"
	} else if (winner) {
		messageElement.innerHTML = `<span style="color: ${COLORS[winner]}">${PLAYERS[winner]} Wins!`;
	} else {
		messageElement.innerHTML = `<span style="color: ${COLORS[turn]}">${PLAYERS[turn]}</span>'s Turn'`;
	}
};

function renderControls() {

}


