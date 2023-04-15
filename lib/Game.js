export default class MyGame {
    constructor(cells, winner, restartButton, turnInfo) {
        this.cells = cells
        this.winner = winner
        this.restartButton = restartButton
        this.turnInfo = turnInfo
        this.players = {
            x: "x",
            y: "o",
        }
        this.currentPlayer = this.players.x
        this.isGameRunning = false;
        this.boardState = Array(9).fill("");
        this.winLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8],
        ];
    }

    clickCell(indexCell) {
        let cell = this.cells[indexCell]
        if (!this.isGameRunning) {
            return;
        }
        if (cell.textContent) {
            return;
        }
        cell.textContent = this.currentPlayer
        this.boardState[indexCell] = this.currentPlayer;
        if(this.checkGameOver()) {
            return this.finishGame();
        }
        this.swapPlayer()
        this.turnInfo.textContent = `Ходят ${this.currentPlayer}` ;
    }
    swapPlayer() {
        if (this.currentPlayer == this.players.x) {
            this.currentPlayer = this.players.y
        } else {
            this.currentPlayer = this.players.x
        }
        this.turnInfo.textContent = `Ходят ${this.currentPlayer} `;
    }
    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener("click", (e) => {
                let indexCell = e.srcElement.dataset.cellIndex;
                this.clickCell(indexCell);
            });
        });
        this.restartButton.addEventListener("click", () => this.restartGame());
    }
    startGame() {
        this.isGameRunning = true;
        this.boardState = Array(9).fill("");
        this.cells.forEach(cell => cell.textContent = "");
        this.winner.textContent = "";
        this.currentPlayer = this.players.x;
        this.turnInfo.textContent = `Ходят ${this.currentPlayer} `;
    }
    restartGame() {
        this.startGame();
    }
    finishGame() {
        this.isGameRunning = false;
        this.turnInfo.textContent = "";
    }
    
    checkGameOver() {
        for(const line of this.winLines) {
            if(this.checkLine(line)) {
                this.winner.textContent = `${this.currentPlayer}  победили!`;
                return true;
            }
        }
        if(!this.boardState.includes("")) {
            this.winner.textContent = "Ничья!";
            return true;
        }
    }

    checkLine(line) {
        const [a, b, c] = line;
    
        const cellA = this.boardState[a];
        const cellB = this.boardState[b];
        const cellC = this.boardState[c];
    
        if([cellA, cellB, cellC].includes("")) {
            return false;
        }
        return cellA === cellB && cellB === cellC;
    }

    run() {
        this.initializeGame()
        this.startGame();
    }

}
