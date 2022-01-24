export class Card {
  constructor(cardDetails) {
    this.id = cardDetails.id;
    this.rarity = cardDetails.rarity;
    this.description = cardDetails.description;
    this.stats = {
      attack: this.assignRandomStatValue(20),
      defense: this.assignRandomStatValue(30),
      hp: this.assignRandomStatValue(100),
    };
  }

  // create card
  get getCardDetails() {
    return {
      id: this.id,
      rarity: this.rarity,
      description: this.description,
      stats: this.stats,
    };
  }

  assignRandomStatValue = (maxValue) => {
    return Math.floor(Math.random() * Math.floor(maxValue)) + 1;
  };
}

// EXAMPLE OF SHAPE CARD DETAILS
// const cardDetails = {
//   id: 1,
//   rarity: 3,
//   description: "Some description about the card",
//   stats: {
//     attack: 20,
//     defense: 30,
//     hp: 10,
//   },
// };
