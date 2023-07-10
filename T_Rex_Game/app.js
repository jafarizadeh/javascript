//board
let board;
let boardWidth = 1125;  //750
let boardHeight = 375; //250
let context;

//dino
let dinoWidth = 132; //88
let dinoHeight = 141; //94
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
};
