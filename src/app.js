import { Card } from "./Card";
import { toggleDuelScreen, createDuelPage } from "./DuelPageSetup";
export var socket = io();

let cardsFromServerCopy = [];

const dealCards = () => {
  renderCards(cardsFromServerCopy);
  rotateCards();
};

const requestNewCards = () => {
  socket.emit("request-new-cards", (response) => {
    cardsFromServerCopy = [];
    cardsFromServerCopy.push(...response);
    dealCards();
  });
};

// EXAMPLE OF SOCKET EMIT EVENT
const emitFuckYouToServer = () => {
  const messageValue = "fuck you";
  return socket.emit("chat", messageValue);
};

socket.on("deal-cards", (cardsFromServer) => {
  cardsFromServerCopy.push(...cardsFromServer);
  dealCards();
});

socket.on("fight-result", (result) => {
  announceResult(result);
});

socket.on("score", ({ own, opponent }) => {
  document.querySelector(".score").innerHTML = `${own} - ${opponent}`;
  clearInterface();
});

socket.on("game-over", (response) => {
  setTimeout(() => {
    document.querySelector(".game-over-wrapper").style.opacity = 1;
    document.querySelector(".game-over-wrapper").style.pointerEvents = "all";
    document.querySelector(".game-over").innerHTML = `Winner: ${response}`;
  }, 3000);
});

socket.on("start-new-game", () => {
  document.querySelector(".game-over-wrapper").style.pointerEvents = "none";
});

const resetCardZoom = () => {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.style.transform = "scale(1)";
    card.style.zIndex = 0;
    card.style.position = "relative";
  });
};

const zoomOnCard = (e) => {
  if (e.target.classList.contains("card")) {
    const cardStyle = e.target.style;
    resetCardZoom();
    rotateCards();
    cardStyle.transform = "scale(1.6)";
    cardStyle.zIndex = 2;
    e.target.firstChild.style.visibility = "visible";
    e.target.querySelector(".notification-area") && statNotify(e);
    flipCard(e);
  }

  emitFuckYouToServer();
};

export const parseCardToHTML = (unparsedCard) => {
  const tempWrapper = document.createElement("DIV");
  tempWrapper.innerHTML = unparsedCard;
  const cardParsedDiv = tempWrapper.firstChild;
  return cardParsedDiv;
};

const renderCards = (cardsFromServer) => {
  const playArea = document.querySelector(".play-area");

  cardsFromServer.map((card) => {
    const initiatedCard = new Card(card);

    const cardParsedDiv = parseCardToHTML(initiatedCard.getUnparsedCard);

    playArea.appendChild(cardParsedDiv);

    cardParsedDiv.addEventListener("click", function () {
      revealCardDescription(initiatedCard);
    });

    cardParsedDiv
      .querySelector(".fight-button")
      .addEventListener("click", sendCardToDuelPage);
  });

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", zoomOnCard);
  });
};

// const disableDealButton = () => {
// 	document.querySelector('.populate-cards').setAttribute('disabled', 'true')
// }

// const enableDeleteButton = () => {
// 	document.querySelector('.delete-cards').removeAttribute('disabled')
// }

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
  clearInterface();
};

const revealCards = () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("face-down");
    card.classList.add("face-up");
    card.querySelector(".card-rarity").style.visibility = "visible";
    card.querySelector(".card-stats").style.visibility = "visible";
    card.querySelector(".card-image").style.visibility = "visible";
    card.querySelector(".fight-button").style.visibility = "visible";
    if (card.querySelector(".notification-area")) {
      card.querySelector(".notification-area").style.visibility = "visible";
    }
  });
};

export const revealDuelCards = () => {
  const duelCards = document.querySelector(".duel-cards");

  duelCards.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("face-down");
    card.classList.add("face-up");
    card.querySelector(".card-rarity").style.visibility = "visible";
    card.querySelector(".card-stats").style.visibility = "visible";
    card.querySelector(".card-image").style.visibility = "visible";
  });
};

const revealCardDescription = (currentCard) => {
  const existingDescription = document.querySelectorAll(".card-description");
  existingDescription && existingDescription.forEach((e) => e.remove());
  const cardDetailsArea = document.querySelector(".card-info-tooltip");

  const cardName = document.createElement("H2");
  const cardDescription = document.createElement("P");
  const cardStats = document.createElement("P");

  cardName.classList.add("card-name", "card-description");
  cardDescription.classList.add("card-description");
  cardStats.classList.add("card-description");

  cardName.appendChild(
    document.createTextNode(
      currentCard.name.substring(0, currentCard.name.indexOf(".")).toUpperCase()
    )
  );
  cardDescription.appendChild(document.createTextNode(currentCard.description));
  cardStats.appendChild(
    document.createTextNode(
      `${
        currentCard.getRarityIcon
      } ${currentCard.rarity.toUpperCase()} | ATTACK: ${
        currentCard.stats.attack
      } | HP: ${currentCard.stats.hp}`
    )
  );

  cardDetailsArea.appendChild(cardName);
  cardDetailsArea.appendChild(cardDescription);
  cardDetailsArea.appendChild(cardStats);
};

const clearInterface = () => {
  const existingDescription = document.querySelectorAll(".card-description");
  existingDescription && existingDescription.forEach((e) => e.remove());
};

const statNotify = (e) => {
  e.target
    .querySelector(".notification-area")
    .setAttribute("style", `opacity: 1;`);

  setTimeout(() => {
    e.target
      .querySelector(".notification-area")
      .setAttribute("style", `opacity: 0;`);
  }, 700);
};

const checkServerStatus = () => {
  // this doesn't do anything for now
  const serverStatusSpan = document.querySelector(".server-status");

  serverStatusSpan.innerHTML = "🟢 &nbsp;";

  serverStatusSpan.setAttribute(
    "style",
    "vertical-align: top; font-size: 0.4rem"
  );
};

const flipCard = (e) => {
  const cardSelected = e.target;

  if (cardSelected.classList.value.includes("face-down")) {
    e.target.classList.remove("face-down");
    e.target.classList.add("face-up");
    e.target.querySelector(".card-rarity").style.visibility = "visible";
    e.target.querySelector(".card-stats").style.visibility = "visible";
    e.target.querySelector(".notification-area").style.visibility = "visible";
    e.target.querySelector(".card-image").style.visibility = "visible";
    e.target.querySelector(".fight-button").style.visibility = "visible";

    return;
  }
  return null;
};

export const sendCardToDuelPage = (e) => {
  const selectedCard = e.target.parentElement;
  const cardStatsAtkHp = selectedCard.querySelector(".card-stats").innerHTML;

  selectedCard.style.transform = "scale(1.3)";
  selectedCard.querySelector("button").remove();
  selectedCard.querySelector(".card-rarity").style.fontSize = "1rem";

  toggleDuelScreen(socket);

  const ownCardDuel = document.querySelector(".own-card-duel");
  const opponentCardDuel = document.querySelector(".opponent-card-duel");

  ownCardDuel.appendChild(selectedCard);
  selectedCard.querySelector(".card-stats").remove();

  document.querySelector(".atk-hp-self").innerHTML = cardStatsAtkHp;

  setTimeout(() => {
    const ownId = ownCardDuel.querySelector(".card").getAttribute("id");
    const opponentId = opponentCardDuel
      .querySelector(".card")
      .getAttribute("id");

    socket.emit("fight", { ownId, opponentId });
  }, 400);
};

const announceResult = (result) => {
  document.querySelector(".fight-result").style.opacity = 1;
  document.querySelector(".fight-result").innerHTML = result.toUpperCase();
  document
    .querySelector(".fight-result")
    .classList.add("animate-scale-up-down");

  socket.on("score", ({ own, opponent }) => {
    document.querySelector(".score").innerHTML = `${own} - ${opponent}`;
  });

  setTimeout(() => {
    document.querySelector(".duel-page").style.opacity = 0;
    document.querySelector(".board").style.pointerEvents = "all";
    document.querySelector("nav").style.pointerEvents = "all";

    document
      .querySelectorAll(".own-card-duel > div")
      .forEach((c) => c.remove());
    document
      .querySelectorAll(".opponent-card-duel > div")
      .forEach((c) => c.remove());
    document
      .querySelector(".fight-result")
      .classList.remove("animate-scale-up-down");
  }, 3200);

  setTimeout(() => {
    document.querySelector(".fight-result").style.opacity = 0;
  }, 800);
};

const playAgain = () => {
  socket.emit("play-again");
  document.querySelector(".game-over-wrapper").style.opacity = 0;
  document.querySelector(".game-over").innerHTML = "";
  cardsFromServerCopy = [];
  deleteCards();
};

// append duel page to dom
createDuelPage();

// initiate check server status to be replaced by socket events

checkServerStatus();

// --- EVENT LISTENERS ---

document
  .querySelector(".populate-cards")
  .addEventListener("click", requestNewCards);

document.querySelector(".delete-cards").addEventListener("click", deleteCards);

document
  .querySelector(".reveal-all-cards")
  .addEventListener("click", revealCards);

document.querySelector(".play-again").addEventListener("click", playAgain);
