document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-game');
    const endButton = document.getElementById('end-game');
    const gameBoard = document.getElementById('game-board');
    const message = document.getElementById('message');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = false;

    const initializeBoard = () => {
        gameBoard.innerHTML = '';
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        message.textContent = '';
        gameActive = true;

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () => handleCellClick(i));
            gameBoard.appendChild(cell);
        }
    };

    const handleCellClick = (index) => {
        if (!gameActive || board[index]) return;

        board[index] = currentPlayer;
        const cells = document.querySelectorAll('.cell');
        cells[index].textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell)) {
            message.textContent = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    };

    startButton.addEventListener('click', initializeBoard);
    endButton.addEventListener('click', () => {
        gameActive = false;
        message.textContent = 'Game has been ended.';
    });
});
