const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // Size of each grid block
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }]; // Initial position of the snake
let direction = { x: 0, y: 0 }; // Snake direction
let food = randomFoodPosition();
let score = 0;

function gameLoop() {
  if (checkCollision()) {
    alert('Game Over! Your score: ' + score);
    resetGame();
    return;
  }

  setTimeout(() => {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    gameLoop();
  }, 100);
}

function clearCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFoodPosition();
  } else {
    snake.pop();
  }
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function randomFoodPosition() {
  const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  return { x, y };
}

function checkCollision() {
  const head = snake[0];

  // Check if the snake hits the walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }

  // Check if the snake hits itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  food = randomFoodPosition();
  score = 0;
}

window.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -gridSize };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: gridSize };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -gridSize, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: gridSize, y: 0 };
      break;
  }
});

gameLoop();
