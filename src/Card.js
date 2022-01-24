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

  get getRarityColor() {
    switch (this.rarity) {
      case "common":
        return "gray";
      case "uncommon":
        return "#40677a";
      case "rare":
        return "gold";
      default:
        console.log(`RARITY ISSUE, NOT MATCHING ANY RARITY`);
    }
  }

  get getIsWeak() {
    return this.stats.hp <= 20;
  }

  get getRandomWeakText() {
    switch (this.assignRandomStatValue(5)) {
      case 1:
        return "OOF";
      case 2:
        return "WHACK";
      case 3:
        return "SHIT!";
      case 4:
        return "CRAP";
      case 5:
        return "WEAK!";
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
