const boxes = document.querySelectorAll(".box");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const toggleBtn = document.getElementById("toggleMode");

let currentPlayer = "X";
let gameActive = true;
let aiMode = false;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

toggleBtn.addEventListener("click", () => {
    aiMode = !aiMode;
    toggleBtn.textContent = aiMode ? "Switch to 2 Player Mode" : "Switch to AI Mode";
    resetGame();
});

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!gameActive || box.textContent) return;
        box.textContent = currentPlayer;
        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        } else if (isDraw()) {
            statusText.textContent = `It's a draw!`;
            gameActive = false;
            return;
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        if (aiMode && currentPlayer === "O") {
            setTimeout(makeAIMove, 500);
        }
    });
});

function makeAIMove() {
    let emptyIndexes = [];
    boxes.forEach((box, i) => {
        if (!box.textContent) emptyIndexes.push(i);
    });
    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    boxes[randomIndex].click();
}

function checkWin() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent;
    });
}

function isDraw() {
    return [...boxes].every(box => box.textContent);
}

function resetGame() {
    boxes.forEach(box => box.textContent = "");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = `Player X's turn`;
}

resetBtn.addEventListener("click", resetGame);

