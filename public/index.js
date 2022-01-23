const dealRandomCards = () => {
  renderCards(startingCardsObject);
  rotateCards();
};
const startingCardsObject = {
  common: 4,
  rare: 1,
  back: 1,
};

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
  //   e.target.style.zIndex = 100;
  e.target.firstChild.style.visibility = "visible";
  console.log(e);
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
  const commonCards = cards.common;
  const rareCards = cards.rare;
  const backCards = cards.back;

  const playArea = document.querySelector(".play-area");

  if (cards.common && commonCards > 0) {
    for (i = commonCards; i > 0; i--) {
      const card = document.createElement("DIV");
      card.classList.add("card", "common");
      card.setAttribute("draggable", "true");
      playArea.appendChild(card);
      createInfo(card);
    }
    randomCommonCards();
  }

  if (cards.rare && rareCards > 0) {
    for (i = rareCards; i > 0; i--) {
      const card = document.createElement("DIV");
      card.classList.add("card", "rare");
      playArea.appendChild(card);
      createInfo(card);
    }
    randomRareCards();
  }

  if (cards.back && backCards > 0) {
    for (i = backCards; i > 0; i--) {
      const card = document.createElement("DIV");
      card.classList.add("card", "back");
      playArea.appendChild(card);
      createInfo(card);
    }
    randomBackCards();
  }
  disableDealButton();
  enableDeleteButton();
  document
    .querySelectorAll(".card")
    .forEach((c) => c.addEventListener("click", zoomOnCard));
};

const disableDealButton = () => {
  document.querySelector(".populate-cards").setAttribute("disabled", "true");
};

const enableDeleteButton = () => {
  document.querySelector(".delete-cards").removeAttribute("disabled");
};

const rotateCards = () => {
  console.log("calling rotate");
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

dealRandomCards();
