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

	get getUnparsedCard() {
		const card = this.buildCard()
		return card
	}

	get getUnparsedCardForDuel() {
		const cardForDuel = this.buildCardForDuel()
		return cardForDuel
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

	buildCss = () => {
		const goldGradientCSS =
			', linear-gradient(to right, #BF953F, #FCF6BA, #FBF5B7, #AA771C);'

		const classes = `card ${
			this.rarity === 'rare' ? this.rarity + ' animate-glow' : this.rarity
		} face-down`

		const faceUpStyles = `background-image: url('${
			this.getCardImagesUrls.back
		}'); background-image: url('${this.getCardImagesUrls.front}')${
			this.rarity === 'rare' ? goldGradientCSS : ''
		}; background-color: ${
			this.getRarityColor
		}; background-size: cover; width: 100%; height:100%; pointer-events: none; visibility: hidden; position: absolute; z-index: -1;`

		const faceDownStyles = `background-image: url('${this.getCardImagesUrls.back}'); background-color: rgb(83, 118, 131); background-size: cover;`

		const duelFaceUpStyles = `background-image: url('${
			this.getCardImagesUrls.front
		}')${this.rarity === 'rare' ? goldGradientCSS : ''}; background-color: ${
			this.getRarityColor
		}; background-size: cover; width: 100%; height:100%; pointer-events: none; position: absolute; z-index: -1;`

		const duelFaceDownStyles = ''

		return {
			cardClasses: classes,
			cardStyles: { faceUpStyles, faceDownStyles },
			duelCardStyles: { duelFaceUpStyles, duelFaceDownStyles },
		}
	}

	buildCardRarityP = () => {
		const classes = `card-rarity ${this.rarity}-card-rarity`

		return {
			rarityClasses: classes,
		}
	}

	buildCardNotificationSpan = () => {
		// if (this.getIsWeak) {
		const classes = `notification-area`
		const styles = `opacity: 0;`
		return {
			notificationClasses: classes,
			notificationStyles: styles,
		}
		// }
	}

	buildCardStatsP = () => {
		const classes = `card-stats ${this.rarity}-card-stats`
		return {
			statsClasses: classes,
		}
	}

	buildCardFightButton = () => {
		const classes = `fight-button`
		return {
			fightButtonClasses: classes,
		}
	}

	buildCard = () => {
		const { cardClasses, cardStyles } = this.buildCss()
		const { rarityClasses } = this.buildCardRarityP()
		const { notificationClasses, notificationStyles } =
			this.buildCardNotificationSpan()
		const { statsClasses } = this.buildCardStatsP()
		const { fightButtonClasses } = this.buildCardFightButton()

		// DON'T TOUCH THE INDENTATION OF THIS SHIT
		const cardUnparsedDiv = `<div class="${cardClasses}" style="${
			cardStyles.faceDownStyles
		}"><div class="card-image ${this.rarity}-image-filter" style="${
			cardStyles.faceUpStyles
		}"></div>
		<p class="${rarityClasses}">${this.getRarityIcon}	</p>
		<span class="${notificationClasses}" style="${notificationStyles}">${
			this.getIsWeak ? this.getRandomWeakText : ''
		}</span>
		<p class="${statsClasses}">${this.getCardStats}</p>
		<button class="${fightButtonClasses}" title="Fight!">🥊</button>
		</div>`

		return cardUnparsedDiv
	}

	buildCardForDuel = () => {
		const { cardClasses, cardStyles, duelCardStyles } = this.buildCss()
		const { rarityClasses } = this.buildCardRarityP()
		const { notificationClasses, notificationStyles } =
			this.buildCardNotificationSpan()
		const { statsClasses } = this.buildCardStatsP()
		const { fightButtonClasses } = this.buildCardFightButton()

		// DON'T TOUCH THE INDENTATION OF THIS SHIT
		const cardUnparsedDiv = `<div class="${cardClasses}" style="${
			duelCardStyles.duelFaceUpStyles
		}"><div class="card-image ${this.rarity}-image-filter" style="${
			duelCardStyles.duelFaceUpStyles
		}"></div>
		<p class="${rarityClasses}">${this.getRarityIcon}</p>
		<span class="${notificationClasses}" style="${notificationStyles}">${
			this.getIsWeak ? this.getRandomWeakText : ''
		}</span>
		<p class="${statsClasses}">${this.getCardStats}</p>
		<button class="${fightButtonClasses}" title="Fight!">🥊</button>
		</div>`

		return cardUnparsedDiv
	}

	buildCardInfoTooltip = () => {}
}
