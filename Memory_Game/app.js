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
const resultDisplay = document.querySelector('#result')
let cardChosen = [];
let cardChosenIds = [];
const cardsWon = [];
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

function checkMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardChosenIds[0];
  const optionTwoId = cardChosenIds[1];

  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "img/bg.png");
    cards[optionOneId].setAttribute("src", "img/bg.png");
    alert("You have click the same image!");
  }

  if (cardChosen[0] == cardChosen[1]) {
    alert("You found a match!");
    cards[optionOneId].setAttribute("src", "img/white.png");
    cards[optionTwoId].setAttribute("src", "img/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardChosen);
  } else {
    cards[optionOneId].setAttribute("src", "img/bg.png");
    cards[optionTwoId].setAttribute("src", "img/bg.png");
    alert("Sorry try again!");
  }
  resultDisplay.textContent = cardsWon.length;
  cardChosen = [];
  cardChosenIds = [];

  if (cardsWon.length == cardArray.length/2)
  {
    resultDisplay.textContent = 'Congratulations you found them all!';
  }
}

function flipCard() {
  const cardId = this.getAttribute("data_id");
  cardChosen.push(cardArray[cardId].name);
  cardChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);

  if (cardChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}
