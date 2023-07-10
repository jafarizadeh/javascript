//board
let board;
let boardWidth = 1125; //750
let boardHeight = 375; //250
let context;

//dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 75; //50
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
  x: dinoX,
  y: dinoY,
  width: dinoWidth,
  height: dinoHeight,
};

//cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 1100;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//physics
let velocityX = -8; //cactus moving left speed
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let gameOverImg;
let gameOverWidth = 386;
let gameOverHeight = 40;
let gameOverX = boardWidth / 2 - gameOverWidth / 2;
let gameOverY = boardHeight / 2 - gameOverHeight / 2;

let resetImg;
let resetImgWidth = 76;
let resetImgHeight = 68;
let resetImgX = boardWidth / 2 - resetImgWidth / 2;
let resetImgY = boardHeight / 2 + gameOverHeight;

let score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  context = board.getContext("2d"); //used for drawing on the board

  //draw initial dinosaur
  //   context.fillStyle = "green";
  //   context.fillRect(dino.x, dino.y, dino.width, dino.height);
  dinoImg = new Image();
  dinoImg.src = "./img/dino.png";
  dinoImg.onload = function () {
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  };

  cactus1Img = new Image();
  cactus1Img.src = "./img/cactus1.png";

  cactus2Img = new Image();
  cactus2Img.src = "./img/cactus2.png";

  cactus3Img = new Image();
  cactus3Img.src = "./img/cactus3.png";

  gameOverImg = new Image();
  gameOverImg.src = "./img/game-over.png";

  resetImg = new Image();
  resetImg.src = "./img/reset.png";

  requestAnimationFrame(update);
  setInterval(placeCactus, 1000);
  document.addEventListener("keydown", moveDino);

  board.addEventListener("click", function (e) {
    // Calculate the canvas-relative coordinates of the click
    let rect = board.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    let clickY = e.clientY - rect.top;

    // Check if the click was within the image's rectangle
    if (
      clickX >= resetImgX &&
      clickX <= resetImgX + resetImgWidth &&
      clickY >= resetImgY &&
      clickY <= resetImgY + resetImgHeight
    ) {
      reset();
    }
  });

  board.addEventListener("mousemove", function (e) {
    // Calculate the canvas-relative coordinates of the mouse
    let rect = board.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    // Check if the mouse is within the image's rectangle
    if (
      mouseX >= resetImgX &&
      mouseX <= resetImgX + resetImgWidth &&
      mouseY >= resetImgY &&
      mouseY <= resetImgY + resetImgHeight
    ) {
      board.style.cursor = "pointer"; // Change the cursor to a pointer
    } else {
      board.style.cursor = "default"; // Change the cursor back to the default
    }
  });
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        reset();
      }
    });
    return;
  }

  context.clearRect(0, 0, board.width, board.height);

  //dino
  velocityY += gravity;
  dino.y = Math.min(dino.y + velocityY, dinoY);
  context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

  //cactus
  for (let i = 0; i < cactusArray.length; i++) {
    let cactus = cactusArray[i];
    cactus.x += velocityX;
    context.drawImage(
      cactus.img,
      cactus.x,
      cactus.y,
      cactus.width,
      cactus.height
    );

    if (detectCollision(dino, cactus)) {
      gameOver = true;
      dinoImg.src = "./img/dino-dead.png";
      dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
      };
      gameOverImg.src = "./img/game-over.png";
      gameOverImg.onload = function () {
        context.drawImage(
          gameOverImg,
          gameOverX,
          gameOverY,
          gameOverWidth,
          gameOverHeight
        );
      };

      resetImg.src = "./img/reset.png";
      resetImg.onload = function () {
        context.drawImage(
          resetImg,
          resetImgX,
          resetImgY,
          resetImgWidth,
          resetImgHeight
        );
      };
    }
  }

  //score
  context.fillStyle = "black";
  context.font = "20px courier";
  score++;
  context.fillText(score, 5, 20);
}

function moveDino(e) {
  if (gameOver) {
    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        reset();
      }
    });
    return;
  }

  if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
    velocityY = -10;
  }
}

function placeCactus() {
  if (gameOver) {
    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        reset();
      }
    });
    return;
  }
  //place cactus
  let cactus = {
    img: null,
    x: cactusX,
    y: cactusY,
    width: null,
    height: cactusHeight,
  };

  let placeCactusChance = Math.random();

  if (placeCactusChance > 0.9) {
    //10% chance
    cactus.img = cactus3Img;
    cactus.width = cactus3Width;
    cactusArray.push(cactus);
  } else if (placeCactusChance > 0.7) {
    //30% chance
    cactus.img = cactus2Img;
    cactus.width = cactus2Width;
    cactusArray.push(cactus);
  } else if (placeCactusChance > 0.5) {
    //50% chance
    cactus.img = cactus1Img;
    cactus.width = cactus1Width;
    cactusArray.push(cactus);
  }

  if (cactusArray.length > 5) {
    cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width * 0.8 > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function reset() {
  location.reload();
}
