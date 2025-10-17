// INFO2180 - Tic-Tac-Toe


document.addEventListener('DOMContentLoaded', () => {
	const board = document.getElementById('board');
	const statusDiv = document.getElementById('status');
	const newGameBtn = document.querySelector('.btn');

	if (!board) return; // Safety guard

	// Exercise 1: Layout the board 
	const squares = Array.from(board.children);
	squares.forEach((sq) => sq.classList.add('square'));

	// Game state
	const initialStatusText = 'Move your mouse over a square and click to play an X or an O.';
	let currentPlayer = 'X';
	let state = Array(9).fill(null); // null | 'X' | 'O'
	let gameActive = true;

	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	function checkWinner(player) {
		return winningCombos.some((combo) => combo.every((idx) => state[idx] === player));
	}

	function handleSquareClick(e) {
		if (!gameActive) return;
		const square = e.currentTarget;
		const index = squares.indexOf(square);
		if (index === -1) return;

		// Exercise 6: Disallow changing an already-set square
		if (state[index]) return;

		// Exercise 2: Place X or O and style
		state[index] = currentPlayer;
		square.textContent = currentPlayer;
		square.classList.add(currentPlayer);

		// Exercise 4: Check for winner and update status
		if (checkWinner(currentPlayer)) {
			statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
			statusDiv.classList.add('you-won');
			gameActive = false;
			return;
		}

		// Check for draw
		if (state.every(Boolean)) {
			statusDiv.textContent = "It's a draw!";
			statusDiv.classList.remove('you-won');
			gameActive = false;
			return;
		}

		// Swap turns
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	}

	// Exercise 3: Hover styling on mouse enter/leave
	function handleMouseEnter(e) {
		const square = e.currentTarget;
		const index = squares.indexOf(square);
		if (!gameActive) return;
		if (index === -1) return;
		// Only show hover on empty squares for clearer UX
		if (!state[index]) square.classList.add('hover');
	}

	function handleMouseLeave(e) {
		e.currentTarget.classList.remove('hover');
	}

	// Wire events
	squares.forEach((square) => {
		square.addEventListener('click', handleSquareClick);
		square.addEventListener('mouseenter', handleMouseEnter);
		square.addEventListener('mouseleave', handleMouseLeave);
	});

	// Exercise 5: Restart the game
	newGameBtn?.addEventListener('click', () => {
		state = Array(9).fill(null);
		currentPlayer = 'X';
		gameActive = true; 
		statusDiv.textContent = initialStatusText;
		statusDiv.classList.remove('you-won');
		squares.forEach((sq) => {
			sq.textContent = '';
			sq.classList.remove('X', 'O', 'hover');
		});
	});
});