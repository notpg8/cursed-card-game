export class Card {
	constructor(cardDetails) {
		this.id = cardDetails.id
		this.rarity = cardDetails.rarity
		this.description = cardDetails.description
		this.stats = {
			attack: this.assignRandomStatValue(this.rarity),
			defense: this.assignRandomStatValue(this.rarity),
			hp: this.assignRandomStatValue(this.rarity),
		}
	}

	// create card
	get getCardStats() {
		return `♥ ${this.stats.hp} | ⚔ ${this.stats.attack} | ❂ ${this.stats.defense}
    `
	}

	get getRarityIcon() {
		switch (this.rarity) {
			case 'common':
				return '●'
			case 'uncommon':
				return '◆'
			case 'rare':
				return '★'
			default:
				console.log(`RARITY ISSUE, NOT MATCHING ANY RARITY`)
		}
	}

	get getRarityColor() {
		switch (this.rarity) {
			case 'common':
				return 'gray'
			case 'uncommon':
				return '#40677a'
			case 'rare':
				return 'gold'
			default:
				console.log(`RARITY ISSUE, NOT MATCHING ANY RARITY`)
		}
	}

	get getIsWeak() {
		return this.stats.hp <= 20
	}

	get getRandomWeakText() {
		switch (this.randomNumber(5)) {
			case 1:
				return 'OOF'
			case 2:
				return 'WHACK'
			case 3:
				return 'SHIT!'
			case 4:
				return 'CRAP'
			case 5:
				return 'WEAK!'
		}
	}

	get getCardDescription() {
		return this.description
	}

	get getCardImagesUrls() {
		return {
			front: `./media/cards-pngs-optimized/medium/${this.id.toString()}.png`,
			back: `./media/cards-pngs-optimized/medium/originalback.png`,
		}
	}

	get getCardDiv() {
		const goldGradientCSS =
			', linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C)'

		const classes = `card ${
			this.rarity === 'rare' ? this.rarity + ' animate-glow' : this.rarity
		}`

		const styles = `background-size: 100%; background-image: url('./media/cards-pngs-optimized/medium/${this.id.toString()}.png'); background-image: url('./media/cards-pngs-optimized/medium/${this.id.toString()}.png')${
			this.rarity === 'rare' ? goldGradientCSS : null
		}; background-color: ${this.getRarityColor}; background-size: cover;`

		return { classes: classes.split(' '), styles: styles }
	}

	assignRandomStatValue = (rarity) => {
		if (rarity) {
			if (rarity === 'rare') {
				return Math.floor(Math.random() * Math.floor(666)) + 1
			}
			if (rarity === 'uncommon') {
				return Math.floor(Math.random() * Math.floor(120)) + 1
			}
			if (rarity === 'common') {
				return Math.floor(Math.random() * Math.floor(60)) + 1
			}
		}
	}

	randomNumber = (maxValue) => {
		return Math.floor(Math.random() * Math.floor(maxValue)) + 1
	}
}
