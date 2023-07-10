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
  dinoImg.onload = function(){
  	context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  }
};
