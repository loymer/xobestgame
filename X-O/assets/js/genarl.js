const gameBoard = document.getElementById('gameBoard');
        const winnerMessage = document.getElementById('winnerMessage');
        let currentPlayer = 'X';
        let gameState = ['', '', '', '', '', '', '', '', ''];

        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function createBoard() {
            gameBoard.innerHTML = '';
            gameState = ['', '', '', '', '', '', '', '', ''];
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i;
                cell.addEventListener('click', handleCellClick);
                gameBoard.appendChild(cell);
            }
            winnerMessage.textContent = '';
            currentPlayer = 'X';
        }

        function handleCellClick(e) {
            const cell = e.target;
            const index = cell.dataset.index;

            if (gameState[index] !== '' || winnerMessage.textContent !== '') {
                return;
            }

            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer === 'X' ? 'red' : 'black');

            if (checkWinner()) {
                winnerMessage.textContent = `${currentPlayer} Wins!`;
                return;
            }

            if (!gameState.includes('')) {
                winnerMessage.textContent = 'Draw!';
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }

        function checkWinner() {
            return winningCombinations.some(combination => {
                return combination.every(index => gameState[index] === currentPlayer);
            });
        }

        function restartGame() {
            createBoard();
        }

        createBoard();