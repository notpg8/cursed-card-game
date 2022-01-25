export class Card {
	constructor(cardDetails) {
		this.id = cardDetails.id
		this.rarity = cardDetails.rarity
		this.name = cardDetails.name

		this.description = cardDetails.description
		this.stats = {
			attack: this.assignRandomStatValue(this.rarity),
			defense: this.assignRandomStatValue(this.rarity),
			hp: this.assignRandomStatValue(this.rarity),
		}
	}

	// create card
	get getCardStats() {
		return `⚔ ${this.stats.attack} | ♥ ${this.stats.hp} `
		//	return `♥ ${this.stats.hp} | ⚔ ${this.stats.attack} | ❂ ${this.stats.defense}`
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
				return 'rgb(97 131 118)'
			case 'rare':
				return 'gold'
			default:
				console.log(`RARITY ISSUE, NOT MATCHING ANY RARITY`)
		}
	}

	get getIsWeak() {
		return this.stats.attack <= 20 || this.stats.hp <= 20
	}

	get getRandomWeakText() {
		switch (this.randomNumber(5)) {
			case 1:
				return 'OOF'
			case 2:
				return 'WHACK'
			case 3:
				return 'SO BAD'
			case 4:
				return 'OH NO'
			case 5:
				return 'WEAK!'
		}
	}

	get getCardDescription() {
		return this.description
	}

	get getCardImagesUrls() {
		return {
			front: `./media/cards-pngs-optimized/medium/${this.id}`,
			back: `./media/cards-pngs-optimized/medium/back/originalback.png`,
		}
	}

	get getCardDiv() {
		const goldGradientCSS =
			', linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C);'

		const classes = `card ${
			this.rarity === 'rare' ? this.rarity + ' animate-glow' : this.rarity
		} face-down`

		// const classes = `card ${
		// 	this.rarity === 'rare' ? ' animate-glow' : null
		// } face-down`

		const faceUpStyles = `background-image: url('./media/cards-pngs-optimized/medium/${this.id.toString()}.png'); background-image: url('./media/cards-pngs-optimized/medium/${
			this.id
		}')${this.rarity === 'rare' ? goldGradientCSS : ''}; background-color: ${
			this.getRarityColor
		}; background-size: cover; width: 100%; height:100%; pointer-events: none; visibility: hidden; position: absolute; z-index: -1;`

		// ORIGINAL SETTING
		// const faceDownStyles = `background-image: url('./media/cards-pngs-optimized/medium/back/originalback.png')${
		// 	this.rarity === 'rare' ? goldGradientCSS : ';'
		// } background-color: ${this.getRarityColor}; background-size: cover;`

		const faceDownStyles = `background-image: url('./media/cards-pngs-optimized/medium/back/originalback.png'); background-color: rgb(83, 118, 131); background-size: cover;`

		return {
			classes: classes.split(' '),
			styles: { faceUpStyles, faceDownStyles },
		}
	}

	assignRandomStatValue = (rarity) => {
		if (rarity) {
			if (rarity === 'rare') {
				return Math.floor(Math.random() * Math.floor(100)) + 50
			}
			if (rarity === 'uncommon') {
				return Math.floor(Math.random() * Math.floor(60)) + 30
			}
			if (rarity === 'common') {
				return Math.floor(Math.random() * Math.floor(30)) + 1
			}
		}
	}

	randomNumber = (maxValue) => {
		return Math.floor(Math.random() * Math.floor(maxValue)) + 1
	}
}
