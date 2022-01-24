import { Card } from "./Card";
var socket = io();

let cardsFromServerCopy = [];

const dealCards = () => {
  renderCards(cardsFromServerCopy);
  rotateCards();
};

// EXAMPLE OF SOCKET EMIT EVENT
const emitFuckYouToServer = () => {
  const messageValue = "fuck you";
  return socket.emit("chat", messageValue);
};

socket.on("deal-cards", (cardsFromServer) => {
  cardsFromServerCopy.push(...cardsFromServer);
  dealCards(cardsFromServer);
});

const returnRandomNumber = () => {
  return Math.floor(Math.random() * Math.floor(5)) + 1;
};

const randomColor = () => {
  const red = Math.floor(Math.random() * Math.floor(257));
  const green = Math.floor(Math.random() * Math.floor(257));
  const blue = Math.floor(Math.random() * Math.floor(257));
  const alpha = 1;
  return `${red}, ${green}, ${blue}, ${alpha}`;
};

const zoomOnCard = (e) => {
  const cardStyle = e.target.style;
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.style.scale = 1;
    card.style.zIndex = 0;
    card.style.position = "relative";
  });
  rotateCards();

  cardStyle.transform = "scale(1.9)";
  cardStyle.zIndex = 10;
  e.target.firstChild.style.visibility = "visible";

  emitFuckYouToServer();
};

const createRarity = (currentCard, cardDiv) => {
  const cardRarity = document.createElement("P");
  cardRarity.classList.add("card-rarity");
  cardRarity.appendChild(document.createTextNode(currentCard.getRarityIcon));
  cardDiv.appendChild(cardRarity);
};

const createStats = (currentCard, cardDiv) => {
  const cardStats = document.createElement("P");
  cardStats.classList.add("card-stats");
  cardStats.appendChild(document.createTextNode(currentCard.getCardStats));
  cardDiv.appendChild(cardStats);
};

const renderCards = (cards) => {
  const playArea = document.querySelector(".play-area");

  cards.map((card) => {
    const initiatedCard = new Card(card);
    const goldGradientCSS =
      "linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C)";
    const cardDiv = document.createElement("DIV");
    cardDiv.classList.add("card", initiatedCard.rarity);
    cardDiv.setAttribute(
      "style",
      `background-size: 100%; background-image: url("./media/cards-pngs-optimized/medium/${initiatedCard.id.toString()}.png"), ${goldGradientCSS};`
    );
    playArea.appendChild(cardDiv);
    createRarity(initiatedCard, cardDiv);
    createStats(initiatedCard, cardDiv);

    cardDiv.addEventListener("click", function () {
      revealCardDescription(initiatedCard);
    });
  });

  disableDealButton();
  enableDeleteButton();
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", zoomOnCard);
  });
};

const disableDealButton = () => {
  document.querySelector(".populate-cards").setAttribute("disabled", "true");
};

const enableDeleteButton = () => {
  document.querySelector(".delete-cards").removeAttribute("disabled");
};

const rotateCards = () => {
  const cardsCommon = document.querySelectorAll(".common");
  const cardsUncommon = document.querySelectorAll(".uncommon");
  const cardsRare = document.querySelectorAll(".rare");
  const cardsBack = document.querySelectorAll(".back");

  const applyRotationStyle = (cardsToRotate) => {
    cardsToRotate.forEach((card) => {
      const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      const degrees =
        (Math.floor(Math.random() * Math.floor(2.5)) + 1) * plusOrMinus;
      card.style.transform = `rotate(${degrees}deg)`;
    });
  };
  applyRotationStyle(cardsCommon);
  applyRotationStyle(cardsUncommon);
  applyRotationStyle(cardsRare);
  applyRotationStyle(cardsBack);
};

const deleteCards = () => {
  const allCardsParent = document.querySelector(".play-area");
  while (allCardsParent.firstChild) {
    allCardsParent.removeChild(allCardsParent.firstChild);
  }
  document.querySelector(".populate-cards").removeAttribute("disabled");
  document.querySelector(".delete-cards").setAttribute("disabled", "true");
  clearInterface();
};

document.querySelector(".populate-cards").addEventListener("click", dealCards);
document.querySelector(".delete-cards").addEventListener("click", deleteCards);

const revealCardDescription = (currentCard) => {
  const existingDescription = document.querySelectorAll(".card-description");
  existingDescription && existingDescription.forEach((e) => e.remove());
  const cardDetailsArea = document.querySelector(".card-details-area");
  const cardDescription = document.createElement("P");
  const cardStats = document.createElement("P");
  cardDescription.classList.add("card-description");
  cardStats.classList.add("card-description");

  cardDescription.appendChild(document.createTextNode(currentCard.description));
  cardStats.appendChild(
    document.createTextNode(
      `${currentCard.getRarityIcon} ${currentCard.rarity.toUpperCase()} | HP: ${
        currentCard.stats.hp
      } | ATTACK: ${currentCard.stats.attack} | DEFENSE: ${
        currentCard.stats.defense
      }`
    )
  );

  cardDetailsArea.appendChild(cardDescription);
  cardDetailsArea.appendChild(cardStats);
};

const clearInterface = () => {
  const existingDescription = document.querySelectorAll(".card-description");
  existingDescription && existingDescription.forEach((e) => e.remove());
};
