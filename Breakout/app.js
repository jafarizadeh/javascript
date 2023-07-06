// board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// player;
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 15;

let player = {
  x: boardWidth / 2 - playerWidth / 2,
  y: boardHeight - playerHeight - 5,
  width: playerWidth,
  height: playerHeight,
  velocityX: playerVelocityX,
};

// ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: ballVelocityX,
  velocityY: ballVelocityY,
};

// blocks
let blockArray = [];
let blockWith = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3;
let blockMaxRows = 10;
let blockCount = 0;

//starting block corner top left
let blockX = 15;
let blockY = 45;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); // used for drawing on the board

  //draw initial player
  context.fillStyle = "lightgreen";
  context.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(update);
  document.addEventListener("keydown", movePlayer);

  //create blocks
  createBlocks();
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  //player
  context.fillStyle = "lightgreen";
  context.fillRect(player.x, player.y, player.width, player.height);

  //ball
  context.fillStyle = "white";
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // bounce ball off walls
  if (ball.y <= 0) {
    // if ball touches top of canvas
    ball.velocityY *= -1;
  } else if (ball.x <= 0 || ball.x + ball.width >= boardWidth) {
    // if ball touches left or right of canvas
    ball.velocityX *= -1;
  } else if (ball.y + ball.height >= boardHeight) {
    // if ball touches bottom of canvas
    // game over
  }

  //blocks
  context.fillStyle = "skyblue";
  for (let i = 0; i < blockArray.length; i++) {
    let block = blockArray[i];
    if (!block.break) {
      context.fillRect(block.x, block.y, block.width, block.height);
    }
  }
}

function outPlayer(xPosition) {
  return xPosition < 0 || xPosition + playerWidth > boardWidth;
}

function movePlayer(e) {
  if (e.code == "ArrowLeft") {
    // player.x -= player.velocityX;
    let nextPlayerX = player.x - player.velocityX;
    if (!outPlayer(nextPlayerX)) {
      player.x = nextPlayerX;
    }
  } else if (e.code == "ArrowRight") {
    // player.x += player.velocityX;
    let nextPlayerX = player.x + player.velocityX;
    if (!outPlayer(nextPlayerX)) {
      player.x = nextPlayerX;
    }
  }
  // bounce the ball off player paddle
  if (topCollision(ball, player)) {
    console.log("xxx");
    ball.velocityY *= -1;
  } else if (leftCollision(ball, player) || rightCollision(ball, player)) {
    ball.velocityX *= -1;
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width && // a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && // a's top right corner passes b's top left corner
    a.y < b.y + b.height && // a's top left corner doesn't reach b's bottom right corner
    a.y + a.height > b.y // a's bottom left corner passes b's top left corner
  );
}

function topCollision(ball, block) {
  // a is above b (ball is above block)
  return detectCollision(ball, block) && ball.y + ball.height >= block.y;
}

function bottomCollision(ball, block) {
  return detectCollision(ball, block) && block.y + block.height >= ball.y;
}

function leftCollision(ball, block) {
  return detectCollision(ball, block) && ball.x + ball.width >= block.x;
}

function rightCollision(ball, block) {
  return detectCollision(ball, block) && block.x + block.width >= ball.x;
}

function createBlocks() {
  blockArray = []; // clear blockArray
  for (let c = 0; c < blockColumns; c++) {
    for (let r = 0; r < blockRows; r++) {
      let block = {
        x: blockX + c * blockWith + c * 10,
        y: blockY + r * blockHeight + r * 10,
        width: blockWith,
        height: blockHeight,
        break: false,
      };
      blockArray.push(block);
    }
  }
  blockCount = blockArray.length;
}
