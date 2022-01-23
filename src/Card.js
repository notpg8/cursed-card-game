export class Card {
  constructor(image, rarity) {
    this.image = image;
    this.rarity = rarity;
  }
  // create card
  get cardDetails() {
    return { id: this.image, rarity: this.rarity };
  }
}

export const cardDetails = () => {
  return { id: imageId, rarity: rarity };
};
