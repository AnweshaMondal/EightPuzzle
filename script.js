const gridElement = document.getElementById("grid");
const goalGridElement = document.getElementById("goal-grid");
const shuffleButton = document.getElementById("shuffle");
const winMessageElement = document.getElementById("win-message");

let board = generateRandomBoard();
const goalState = generateGoalState();

function generateGoalState() {
    return [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ];
}

function generateRandomBoard() {
    const numbers = Array.from({ length: 9 }, (_, i) => i);
    numbers.sort(() => Math.random() - 0.5);
    return Array.from({ length: 3 }, (_, i) => numbers.slice(i * 3, i * 3 + 3));
}

function renderBoard(board, container) {
    container.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const tile = document.createElement("div");
            tile.className = "tile";
            if (value === 0) {
                tile.classList.add("blank");
            } else {
                tile.textContent = value;
                if (container === gridElement) {
                    tile.onclick = () => moveTile(rowIndex, colIndex);
                }
            }
            container.appendChild(tile);
        });
    });
}

function moveTile(row, col) {
    const [blankRow, blankCol] = findBlankTile(board);
    if (Math.abs(blankRow - row) + Math.abs(blankCol - col) === 1) {
        [board[row][col], board[blankRow][blankCol]] = [board[blankRow][blankCol], board[row][col]];
        renderBoard(board, gridElement);
        checkWin();
    }
}

function findBlankTile(state) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] === 0) return [i, j];
        }
    }
}

function checkWin() {
    if (JSON.stringify(board) === JSON.stringify(goalState)) {
        winMessageElement.textContent = "Congratulations! You solved the puzzle!";
        gridElement.querySelectorAll(".tile").forEach(tile => {
            tile.onclick = null; // Disable further moves
        });
    }
}

shuffleButton.onclick = () => {
    board = generateRandomBoard();
    renderBoard(board, gridElement);
    winMessageElement.textContent = ""; // Clear win message
};

// Render initial states
renderBoard(board, gridElement);
renderBoard(goalState, goalGridElement);

