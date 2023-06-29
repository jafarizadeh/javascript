const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let timerId;
const userStart = [230, 10];
let currentPosition = userStart;
const ballStart = [270, 30];
let ballCurrentPosition = ballStart;
let xDirection = -8;
let yDirection = 4;
let score = 0;

// create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// all my block
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// draw all my block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    grid.appendChild(block);
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
  }
}

addBlocks();

// add user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

// draw the user
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

// move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 10) {
        currentPosition[0] -= 30;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < 440) {
        currentPosition[0] += 30;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);
// draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

// add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

//move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

// check for collisions
function checkForCollisions() {
  // check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] - ballDiameter &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection("y");
      score++;
      scoreDisplay.innerHTML = score;

      // check for win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "YOU WIN";
        clearInterval(timerId);
      }
    }
  }

  // check for wall collisions
  if (
    ballCurrentPosition[0] > boardWidth - ballDiameter ||
    ballCurrentPosition[0] < 0
  ) {
    changeDirection("x");
  }
  if (ballCurrentPosition[1] > boardHeight - ballDiameter) {
    changeDirection("y");
  }
  if (ballCurrentPosition[1] === currentPosition[1] + ballDiameter) {
    if (
      ballCurrentPosition[0] > currentPosition[0] - ballDiameter &&
      ballCurrentPosition[0] < currentPosition[0] + 100
    ) {
      changeDirection("y");
    } else {
      gameOver();
    }
  }
  if (ballCurrentPosition[1] <= 0) {
    gameOver();
  }
}

function changeDirection(d) {
  switch (d) {
    case "x":
      xDirection *= -1;
      break;
    case "y":
      yDirection *= -1;
      break;
  }
}

function gameOver() {
  clearInterval(timerId);
  scoreDisplay.innerHTML = "GAME OVER";
}
