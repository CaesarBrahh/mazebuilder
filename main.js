let isRunning = true;

// board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

// food
let foodX;
let foodY;

// blocks
let blocks = []

window.onload = function() {
    board = document.getElementById("board")
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1500/10);
}

function update() {
    if (!isRunning) return;

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "lime";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        addBlock();
        placeFood(); 
        document.getElementById("score").innerHTML = "Score: " + blocks.length;
    }

    context.fillStyle = "#22d3ee";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle = "#e11d48";
    for (let i = 0; i < blocks.length; i++) {
        context.fillRect(blocks[i][0], blocks[i][1], blockSize, blockSize);

        if (snakeX == blocks[i][0] && snakeY == blocks[i][1]) {
            gameOver();
        }
    }

    // death
    if (snakeX > board.width || snakeX < 0 || snakeY > board.height || snakeY < 0) {
        gameOver();
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    } else if (e.code == "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

    if (blocks.length > 1) {
        for (let i = 0; i < blocks.length; i++) {
            if (foodX == blocks[i][0] && foodY == blocks[i][1]) {
                i = 0;
                foodX = Math.floor(Math.random() * cols) * blockSize;
                foodY = Math.floor(Math.random() * rows) * blockSize;
                continue;
            }
        }
    }
}

function addBlock() {
    let blockX = foodX;
    let blockY = foodY;

    blocks.push([blockX, blockY]);
}

function gameOver() {
    isRunning = false;
    document.getElementById('final-score').innerText = "Final Score: " + blocks.length;
    document.getElementById('game-over-modal').style.display = 'flex';
}

function restartGame() {
    document.getElementById('game-over-modal').style.display = 'none';
    document.getElementById('score').innerText = "Score: 0";
    blocks = [];
    snakeX = blockSize * 5
    snakeY = blockSize * 5
    velocityX = 0;
    velocityY = 0;
    placeFood();
    isRunning = true;
}