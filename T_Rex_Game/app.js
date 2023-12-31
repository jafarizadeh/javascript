//board
let board;
let boardWidth = 1125; //750
let boardHeight = 375; //250
let context;

//track
let trackImg;
let trackWidth = 1125;
let trackHeight = 13;
let trackX = 0;
// let trackY = boardHeight - trackHeight;
let trackY = 200;

//dino
let dinoImages = [];
let currentDinoImageIndex = 0;

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

let dinoDuck1Width = 116;
let dinoDuck2Width = 118;
let dinoDuckHeight = 60;
let dinoDuckX = 75;
let dinoDuckY = boardHeight - dinoDuckHeight;
let dinoDuck1Img;
let dinoDuck2Img;

let dinoDuck = {
  x: dinoDuckX,
  y: dinoDuckY,
  width1: dinoDuck1Width,
  width2: dinoDuck2Width,
  height: dinoDuckHeight,
};

//bird
let birdArray = [];

let bird1Width = 97;
let bird2Width = 93;

let bird1Height = 68;
let bird2Height = 62;

let birdX = 1100;
let birdY1 = 80;
let birdY2 = 180;
let birdY3 = 230;

let bird1Img;
let bird2Img;

let birdFrame = 0;

//cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;
let cactusBigWidth = 103;

let cactusHeight = 70;
let bigCactusHeight = 100;

let cactusX = 1100;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;
let cactusBigImg;

//cloud
let cloudArray = [];
let cloudWidth = 84;
let cloudHeight = 101;
let cloudX = 1100;
let cloudY1 = 8;
let cloudY2 = 12;
let cloudY3 = 20;
let cloudImg;

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

let gameSpeed = 0.5; // you can modify this value to control the game speed
let shiftPressed = false;
let duck = false;
let dinoImageUpdateTime = Date.now();

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  requestAnimationFrame(update);
  setInterval(function () {
    birdFrame++;
  }, 100);

  context = board.getContext("2d"); //used for drawing on the board

  //draw initial dinosaur
  //   context.fillStyle = "green";
  //   context.fillRect(dino.x, dino.y, dino.width, dino.height);

  trackImg = new Image();
  trackImg.src = "./img/track.png";

  dinoImg = new Image();
  dinoImg.src = "./img/dino.png";

  dinoImg.onload = function () {
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  };

  dinoImages[0] = new Image();
  dinoImages[0].src = "./img/dino-duck1.png";

  dinoImages[1] = new Image();
  dinoImages[1].src = "./img/dino-duck2.png";

  cactus1Img = new Image();
  cactus1Img.src = "./img/cactus1.png";

  cactus2Img = new Image();
  cactus2Img.src = "./img/cactus2.png";

  cactus3Img = new Image();
  cactus3Img.src = "./img/cactus3.png";

  cactusBigImg = new Image();
  cactusBigImg.src = "./img/big-cactus2.png";

  bird1Img = new Image();
  bird1Img.src = "./img/bird1.png";

  bird2Img = new Image();
  bird2Img.src = "./img/bird2.png";

  cloudImg = new Image();
  cloudImg.src = "./img/cloud.png";

  gameOverImg = new Image();
  gameOverImg.src = "./img/game-over.png";

  resetImg = new Image();
  resetImg.src = "./img/reset.png";

  requestAnimationFrame(update);
  setInterval(placeCactus, 1000);
  setInterval(placeCloud, 1000);
  setInterval(placeBird, 1000);

  // Listen for keydown events
  document.addEventListener("keydown", moveDino);

  // Listen for keyup events
  document.addEventListener("keyup", moveDino);

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

  // Draw the dino
  if (shiftPressed) {
    // You'll need to implement tracking of Shift key state
    context.drawImage(
      dinoImages[currentDinoImageIndex],
      dinoDuck.x,
      dinoDuck.y,
      dinoDuck.width1,
      dinoDuck.height
    );

    // If it's time to update the image
    if (Date.now() >= dinoImageUpdateTime) {
      // Update the image
      currentDinoImageIndex = (currentDinoImageIndex + 1) % dinoImages.length;

      // Set the next update time to be 100 milliseconds in the future
      dinoImageUpdateTime = Date.now() + 100;
    }
  } else {
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  }

  //cactus
  for (let i = 0; i < cactusArray.length; i++) {
    let cactus = cactusArray[i];
    cactus.x += velocityX * gameSpeed;
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

  // bird;
  for (let i = 0; i < birdArray.length; i++) {
    let bird = birdArray[i];
    bird.x += velocityX * gameSpeed;
    context.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);

    if (detectCollision(dino, bird)) {
      if (!duck) {
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
  }

  for (let i = 0; i < birdArray.length; i++) {
    let bird = birdArray[i];
    bird.x += velocityX * gameSpeed;
    bird.img = birdFrame % 2 === 0 ? bird1Img : bird2Img;
    context.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);
  }

  //cloud
  for (let i = 0; i < cloudArray.length; i++) {
    let clouds = cloudArray[i];
    clouds.x += velocityX * gameSpeed;
    context.drawImage(
      clouds.img,
      clouds.x,
      clouds.y,
      clouds.width,
      clouds.height
    );
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

  // Track the state of the Shift key
  if (e.code == "KeyZ") {
    shiftPressed = e.type == "keydown";
    duck = e.type == "keydown";
  }

  if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
    // If Shift is also pressed, make the dino jump higher
    if (e.shiftKey) {
      velocityY = -14;
    } else {
      velocityY = -10;
    }
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
    height: null,
  };
  if (score > 700) {
    let placeCactusChance = Math.random();
    if (placeCactusChance > 0.95) {
      cactus.img = cactusBigImg;
      cactus.width = cactusBigWidth;
      cactus.height = bigCactusHeight;
      cactusArray.push(cactus);
    } else if (placeCactusChance > 0.85) {
      //15% chance
      cactus.img = cactus3Img;
      cactus.width = cactus3Width;
      cactus.height = cactusHeight;
      cactusArray.push(cactus);
    } else if (placeCactusChance > 0.7) {
      //30% chance
      cactus.img = cactus2Img;
      cactus.width = cactus2Width;
      cactus.height = cactusHeight;
      cactusArray.push(cactus);
    } else if (placeCactusChance > 0.5) {
      //50% chance
      cactus.img = cactus1Img;
      cactus.width = cactus1Width;
      cactus.height = cactusHeight;
      cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
      cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
  }
}

function placeBird() {
  //place bird
  let bird = {
    img: bird1Img,
    x: birdX,
    y: null,
    width: bird1Width,
    height: bird1Height,
  };
  if (score > 2500) {
    let placeBirdChance = Math.random();
    if (placeBirdChance > 0.95) {
      bird.y = birdY3;
      birdArray.push(bird);
    } else if (placeBirdChance > 0.9) {
      bird.y = birdY2;
      birdArray.push(bird);
    } else if (placeBirdChance > 0.7) {
      bird.y = birdY1;
      birdArray.push(bird);
    }

    if (birdArray.length > 5) {
      birdArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
  }
}

function placeCloud() {
  if (gameOver) {
    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        reset();
      }
    });
    return;
  }
  //place cloud
  let cloud = {
    img: cloudImg,
    x: cloudX,
    y: null,
    width: cloudWidth,
    height: cloudHeight,
  };

  let placeCloudChance = Math.random();
  if (placeCloudChance > 0.75) {
    if (placeCloudChance > 0.95) {
      cloud.y = cloudY1;
      cloudArray.push(cloud);
    } else if (placeCloudChance > 0.85) {
      cloud.y = cloudY2;
      cloudArray.push(cloud);
    } else {
      cloud.y = cloudY3;
      cloudArray.push(cloud);
    }
  }

  if (cloudArray.length > 5) {
    cloudArray.shift();
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
