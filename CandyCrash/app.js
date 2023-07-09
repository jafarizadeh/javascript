var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function () {
  startGame();
};

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // <img id='0-0'> ...
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "./images/" + randomCandy() + ".png";

      // DRAG FUNCTIONALITY
      tile.addEventListener("dragstart", dragStart); // click on a candy, initialize drag process
      tile.addEventListener("dragover", dragOver); // clicking on candy, moving mouse to drag the candy
      tile.addEventListener("dragenter", dragEnter); // dragging candy onto another candy
      tile.addEventListener("dragleave", dragLeave); // leave candy over another candy
      tile.addEventListener("drop", dragDrop); // dropping a candy over another candy
      tile.addEventListener("dragend", dragEnd); // after drag process completed, we swap candies

      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
}

function dragStart() {
  // this refers to tile that was clicked on for dragging
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  // this refers to the  target tile that was dropped on
  otherTile = this;
}

function dragEnd() {
  let currCoords = currTile.id.split("-"); // id = "0-0" -> ["0", "0"]
  let r = Number(currCoords[0]);
  let c = Number(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = Number(otherCoords[0]);
  let c2 = Number(otherCoords[1]);

  let moveLeft = c2 == c - 1 && r2 == r;
  let moveRight = c2 == c + 1 && r2 == r;

  let moveUp = r2 == r - 1 && c2 == c;
  let moveDown = r2 == r + 1 && c2 == c;

  let isValidPosition = moveLeft || moveRight || moveUp || moveDown;

  if (isValidPosition) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
  }
}
