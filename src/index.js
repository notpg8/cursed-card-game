// import Card from "./Card.js";
import { Card, cardDetails } from "./Card.js";
// check how to import socketio here and use it to trigger server responses

var socket = io();

// [{imageId: 2, rarity: 'common'},{imageId: 1, rarity: 'rare'},{imageId: 2, rarity: 'common'},{imageId: 2, rarity: 'uncommon'},{imageId: 5, rarity: 'rare'}]

const dealRandomCards = (cardsFromServer) => {
  renderCards(cardsFromServer);
  rotateCards();
};
// const startingCardsObject = {
//   common: 3,
//   rare: 1,
//   back: 1,
// };

// EXAMPLE OF SOCKET EMIT EVENT
const emitFuckYouToServer = () => {
  const messageValue = "fuck you";
  return socket.emit("chat", messageValue);
};

socket.on("deal-cards", (cardsFromServer) => {
  console.log("cardsFromServer ", cardsFromServer);
  dealRandomCards(cardsFromServer);
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

const randomCommonCards = () => {
  const cards = document.querySelectorAll(".common");
  cards.forEach((c) => {
    c.setAttribute(
      "style",
      `background-size: 100%; background-image: url("./media/cards-pngs-optimized/medium/${returnRandomNumber().toString()}.png"); background-color: rgb(${randomColor()})`
    );
  });
};

const randomRareCards = (numberOfCards) => {
  const cards = document.querySelectorAll(".rare");
  const goldGradientCSS =
    "linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C)";
  cards.forEach((c) => {
    c.setAttribute(
      "style",
      `background-size: 100%; background-image: url("./media/cards-pngs-optimized/medium/${returnRandomNumber().toString()}.png"), ${goldGradientCSS};`
    );
  });
};

const randomBackCards = () => {
  const cards = document.querySelectorAll(".back");
  cards.forEach((c) => {
    c.setAttribute(
      "style",
      `background-size: 100%; background-image: url("./media/cards-pngs-optimized/medium/back-of-card.png"); background-color: rgb(${randomColor()})`
    );
  });
};

const zoomOnCard = (e) => {
  const cardStyle = e.target.style;
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.style.scale = 1;
    card.style.zIndex = 0;
    if (card.classList[1] !== "back") {
      card.firstChild.style.visibility = "hidden";
    }
  });
  rotateCards();

  cardStyle.transform = "scale(1.5)";
  e.target.firstChild.style.visibility = "visible";

  emitFuckYouToServer();
};

const createInfo = (currentCard) => {
  const cardInfo = document.createElement("P");
  cardInfo.classList.add("card-info-text");
  cardInfo.style.visibility = "hidden";
  if (currentCard.classList[1] === "back") {
    cardInfo.appendChild(document.createTextNode("Smarpft™"));
    currentCard.appendChild(cardInfo);
    cardInfo.style.visibility = "visible";
  }
  if (currentCard.classList[1] === "common") {
    cardInfo.appendChild(document.createTextNode("★★☆☆☆"));
    currentCard.appendChild(cardInfo);
  } else if (currentCard.classList[1] === "rare") {
    cardInfo.appendChild(document.createTextNode("★★★★★"));
    currentCard.appendChild(cardInfo);
  }
};

const renderCards = (cards) => {
  // [{imageId: 2, rarity: 'common'},{imageId: 1, rarity: 'rare'},{imageId: 2, rarity: 'common'},{imageId: 2, rarity: 'uncommon'},{imageId: 5, rarity: 'rare'}]

  cards.map((card) => {
    const goldGradientCSS =
      "linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C)";
    const cardDiv = document.createElement("DIV");
    cardDiv.classList.add("card", card.rarity);
    cardDiv.setAttribute("draggable", "true");
    setAttribute(
      "style",
      `background-size: 100%; background-image: url("./media/cards-pngs-optimized/medium/${returnRandomNumber().toString()}.png"), ${goldGradientCSS}; draggable: true;`
    );
    playArea.appendChild(cardDiv);
    createInfo(cardDiv);
  });

  // const commonCards = cards.common;
  // const rareCards = cards.rare;
  // const backCards = cards.back;

  // const playArea = document.querySelector(".play-area");

  // if (cards.common && commonCards > 0) {
  //   for (i = commonCards; i > 0; i--) {
  //     const card = document.createElement("DIV");
  //     card.classList.add("card", card.rarity);
  //     card.setAttribute("draggable", "true");
  //     playArea.appendChild(card);
  //     createInfo(card);
  //   }
  //   randomCommonCards();
  // }

  // if (cards.rare && rareCards > 0) {
  //   for (i = rareCards; i > 0; i--) {
  //     const card = document.createElement("DIV");
  //     card.classList.add("card", "rare");
  //     playArea.appendChild(card);
  //     createInfo(card);
  //   }
  //   randomRareCards();
  // }

  // if (cards.back && backCards > 0) {
  //   for (i = backCards; i > 0; i--) {
  //     const card = document.createElement("DIV");
  //     card.classList.add("card", "back");
  //     playArea.appendChild(card);
  //     createInfo(card);
  //   }
  //   randomBackCards();
  // }
  // disableDealButton();
  // enableDeleteButton();
  // document
  //   .querySelectorAll(".card")
  //   .forEach((c) => c.addEventListener("click", zoomOnCard));
};

const disableDealButton = () => {
  document.querySelector(".populate-cards").setAttribute("disabled", "true");
};

const enableDeleteButton = () => {
  document.querySelector(".delete-cards").removeAttribute("disabled");
};

const rotateCards = () => {
  const cardsCommon = document.querySelectorAll(".common");
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
};
