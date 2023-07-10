var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
var score3 = false;
var point3 = false;
var score4 = false;
var point4 = false;
var score5 = false;
var point5 = false;
let turns = 20;

var currTile;
var otherTile;

window.onload = function () {
  startGame();

  window.setInterval(function () {
    crushCandy();
    slideCandy();
    generateCandy();
  }, 100);
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
  if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

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
    let validMove = checkValid();

    if (!validMove) {
      console.log(`validMove is : ${validMove}`);

      let currImg = currTile.src;
      let otherImg = otherTile.src;
      currTile.src = otherImg;
      otherTile.src = currImg;
      validMove = true;
    } else {
      if (point3) {
        score += 30;
        point3 = false;
      } else if (point4) {
        score += 40;
        point4 = false;
      } else if (point5) {
        score += 50;
        point5 = false;
      }
    }
  }
}

function crushCandy() {
  crushFive();
  //   crushFour();
  //   crushThree();

  document.getElementById("scoreSpan").innerText = score;
  document.getElementById("turnsSpan").innerText = turns;
  checkGameOver();
}

function crushFive() {
  score5 = true;
  //check rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 4; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];
      let candy5 = board[r][c + 4];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        candy4.src == candy5.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";
        candy5.src = "./images/blank.png";
      }
    }
  }
  //check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 4; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];
      let candy5 = board[r + 4][c];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        candy4.src == candy5.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";
        candy5.src = "./images/blank.png";
      }
    }
  }
  console.log(`fin candy5 score 5 is : ${score5}`);
  crushFour();
}

function crushFour() {
  score4 = true;
  //check rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";
      }
    }
  }
  //check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";
      }
    }
  }
  console.log(`fin candy4 score 4 is : ${score4}`);
  crushThree();
}

function crushThree() {
  score3 = true;
  //check rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
      }
    }
  }
  //check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
      }
    }
  }
  //   console.log(`fin crush 3. score 3 is ${score3}`);
}

function checkValid() {
  if (score5) {
    console.log(`SCORE 5 in debut valid is ${score5}`);
    //check rows
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns - 4; c++) {
        let candy1 = board[r][c];
        let candy2 = board[r][c + 1];
        let candy3 = board[r][c + 2];
        let candy4 = board[r][c + 3];
        let candy5 = board[r][c + 4];
        if (
          candy1.src == candy2.src &&
          candy2.src == candy3.src &&
          candy3.src == candy4.src &&
          candy4.src == candy5.src &&
          !candy1.src.includes("blank")
        ) {
          turns--;
          point5 = true;
          console.log(`point 5 in valid is ${point5}`);
          return true;
        }
      }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows - 4; r++) {
        let candy1 = board[r][c];
        let candy2 = board[r + 1][c];
        let candy3 = board[r + 2][c];
        let candy4 = board[r + 3][c];
        let candy5 = board[r + 4][c];
        if (
          candy1.src == candy2.src &&
          candy2.src == candy3.src &&
          candy3.src == candy4.src &&
          candy4.src == candy5.src &&
          !candy1.src.includes("blank")
        ) {
          turns--;
          point5 = true;
          console.log(`point 5 in valid is ${point5}`);
          return true;
        }
      }
    }
    score5 = false;
    console.log(`SCORE 5 in fin valid is ${score5} and SCORE 3 is ${score4}`);
  }
  if (score4) {
    console.log(`SCORE 4 in debut valid is ${score4}`);
    //check rows
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns - 3; c++) {
        let candy1 = board[r][c];
        let candy2 = board[r][c + 1];
        let candy3 = board[r][c + 2];
        let candy4 = board[r][c + 3];
        if (
          candy1.src == candy2.src &&
          candy2.src == candy3.src &&
          candy3.src == candy4.src &&
          !candy1.src.includes("blank")
        ) {
          turns--;
          point4 = true;
          console.log(`point 4 in valid is ${point4}`);
          return true;
        }
      }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows - 3; r++) {
        let candy1 = board[r][c];
        let candy2 = board[r + 1][c];
        let candy3 = board[r + 2][c];
        let candy4 = board[r + 3][c];
        if (
          candy1.src == candy2.src &&
          candy2.src == candy3.src &&
          candy3.src == candy4.src &&
          !candy1.src.includes("blank")
        ) {
          turns--;
          point4 = true;
          console.log(`point 4 in valid is ${point4}`);
          return true;
        }
      }
    }
    score4 = false;
    console.log(`SCORE 4 in fin valid is ${score4} and SCORE 3 is ${score3}`);
  }
  if (score3) {
    console.log(`SCORE 3 in debut valid is ${score3}`);

    //check rows
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns - 2; c++) {
        let candy1 = board[r][c];
        let candy2 = board[r][c + 1];
        let candy3 = board[r][c + 2];
        if (
          candy1.src == candy2.src &&
          candy2.src == candy3.src &&
          !candy1.src.includes("blank")
        ) {
          turns--;
          point3 = true;
          console.log(`point 3 in valid is ${point3}`);
          return true;
        }
      }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows - 2; r++) {
        let candy1 = board[r][c];
        let candy2 = board[r + 1][c];
        let candy3 = board[r + 2][c];
        if (
          candy1.src == candy2.src &&
          candy2.src == candy3.src &&
          !candy1.src.includes("blank")
        ) {
          turns--;
          point3 = true;
          console.log(`point 3 in valid is ${point3}`);
          return true;
        }
      }
    }
    score3 = false;
    console.log(`SCORE 3 in fin valid is ${score3}`);
  }
  console.log("return false in check valid");
  return false;
}

function slideCandy() {
  for (let c = 0; c < columns; c++) {
    let ind = rows - 1;
    for (let r = columns - 1; r >= 0; r--) {
      if (!board[r][c].src.includes("blank")) {
        board[ind][c].src = board[r][c].src;
        ind -= 1;
      }
    }
    for (let r = ind; r >= 0; r--) {
      board[r][c].src = "./images/blank.png";
    }
  }
}

function generateCandy() {
  for (let c = 0; c < columns; c++) {
    if (board[0][c].src.includes("blank")) {
      board[0][c].src = "./images/" + randomCandy() + ".png";
    }
  }
}

function checkGameOver() {
  if (turns === 0) {
    document.getElementById("gameOverWindow").classList.remove("hidden");
    document.getElementById("finalScoreSpan").innerText = score;
    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        resetGame();
      }
    });
  }
}

function resetGame() {
  document.getElementById("gameOverWindow").classList.add("hidden");
  location.reload();
}
