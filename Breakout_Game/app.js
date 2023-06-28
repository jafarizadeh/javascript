const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;

// create Block
class Block {
  constructor(xAxis, yAxis) {
    this.topLeft = [xAxis, yAxis];
    this.topRight = [xAxis + blockWidth, yAxis];
    this.bottomLeft = [xAxis, yAxis + blockHeight];
    this.bottomRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}
// draw my block
function addBlock() {
  const block = document.createElement("div");
  block.classList.add("block");
  grid.appendChild(block);
  block.style.left = "100px";
  block.style.bottom = "50px";
}

addBlock();
