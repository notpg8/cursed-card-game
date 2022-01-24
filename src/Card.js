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
  get getCardStats() {
    return `HP : ${this.stats.hp} | ATK: ${this.stats.attack} | DEF: ${this.stats.defense}
    `;
  }

  get getRarityIcon() {
    switch (this.rarity) {
      case "common":
        return "●";
      case "uncommon":
        return "◆";
      case "rare":
        return "★";
      default:
        console.log(`RARITY ISSUE, NOT MATCHING ANY RARITY`);
    }
  }

  get getCardDescription() {
    return this.description;
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
