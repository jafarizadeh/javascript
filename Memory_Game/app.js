const cardArray = [
  {
    name: "fries",
    img: "img/fries.jpg",
  },
  {
    name: "burger",
    img: "img/burger.png",
  },
  {
    name: "hotdog",
    img: "img/hotdog.png",
  },
  {
    name: "ice_cream",
    img: "img/ice_cream.png",
  },
  {
    name: "milkshake",
    img: "img/milkshake.png",
  },
  {
    name: "pizza",
    img: "img/pizza.png",
  },
  {
    name: "fries",
    img: "img/fries.jpg",
  },
  {
    name: "burger",
    img: "img/burger.png",
  },
  {
    name: "hotdog",
    img: "img/hotdog.png",
  },
  {
    name: "ice_cream",
    img: "img/ice_cream.png",
  },
  {
    name: "milkshake",
    img: "img/milkshake.png",
  },
  {
    name: "pizza",
    img: "img/pizza.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");

createBorder();

function createBorder() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "img/bg.png");
    card.setAttribute("data_id", i);
    card.classList.add("card");
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}

function flipCard() {
  const cardId = this.getAttribute("data_id");
  console.log("102", cardId);
}
