const grid = document.querySelector(".grid");

// draw my block
function addBlock() {
  const block = document.createElement("div");
  block.classList.add("block");
  grid.appendChild(block);
  block.style.left = "100px";
  block.style.bottom = "50px";
}

addBlock();
