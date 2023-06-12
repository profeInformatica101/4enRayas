let board = [];
let rows = 6;
let cols = 7;
let cellSize = 80;
let currentPlayer = 1;

function setup() {
    let canvas = createCanvas(cols*cellSize, rows*cellSize);
    canvas.parent('canvas-container');
    for(let j = 0; j < rows; j++) {
        board[j] = [];
        for(let i = 0; i < cols; i++) {
            board[j][i] = 0;
        }
    }
}
function checkWin(player) {
    // Comprueba filas
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols - 3; i++) {
            if (board[j][i] === player && board[j][i+1] === player && board[j][i+2] === player && board[j][i+3] === player) {
                return true;
            }
        }
    }
    // Comprueba columnas
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows - 3; j++) {
            if (board[j][i] === player && board[j+1][i] === player && board[j+2][i] === player && board[j+3][i] === player) {
                return true;
            }
        }
    }
    // Comprueba diagonales ascendentes
    for (let j = 3; j < rows; j++) {
        for (let i = 0; i < cols - 3; i++) {
            if (board[j][i] === player && board[j-1][i+1] === player && board[j-2][i+2] === player && board[j-3][i+3] === player) {
                return true;
            }
        }
    }
    // Comprueba diagonales descendentes
    for (let j = 3; j < rows; j++) {
        for (let i = 3; i < cols; i++) {
            if (board[j][i] === player && board[j-1][i-1] === player && board[j-2][i-2] === player && board[j-3][i-3] === player) {
                return true;
            }
        }
    }
    return false;
}
function draw() {
    background(255);
    for(let j = 0; j < rows; j++) {
        for(let i = 0; i < cols; i++) {
            let x = i*cellSize;
            let y = j*cellSize;
            let cell = board[j][i];
            if(cell == 0) fill(255);
            else if(cell == 1) fill(255, 0, 0); // color rojo para el jugador 1
            else if(cell == 2) fill(0, 0, 255); // color azul para el jugador 2
            ellipse(x + cellSize/2, y + cellSize/2, cellSize*0.8, cellSize*0.8);
        }
    }
}

function mousePressed() {
    let col = floor(mouseX / cellSize);
    for(let j = rows - 1; j >= 0; j--) {
        if (board[j][col] === 0) {
            board[j][col] = currentPlayer;
            if (checkWin(currentPlayer)) {
                console.log(`¡El jugador ${currentPlayer} ha ganado!`);
            }
            currentPlayer = (currentPlayer % 2) + 1;
            break;
        }
    }
}   
