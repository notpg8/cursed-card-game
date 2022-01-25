import { Card } from './Card'
var socket = io()

let cardsFromServerCopy = []

const dealCards = () => {
	renderCards(cardsFromServerCopy)
	rotateCards()
}

const requestNewCards = () => {
	socket.emit('request-new-cards', (response) => {
		cardsFromServerCopy = []
		cardsFromServerCopy.push(...response)
		dealCards()
	})
}

// EXAMPLE OF SOCKET EMIT EVENT
const emitFuckYouToServer = () => {
	const messageValue = 'fuck you'
	return socket.emit('chat', messageValue)
}

socket.on('deal-cards', (cardsFromServer) => {
	cardsFromServerCopy.push(...cardsFromServer)
	dealCards()
})

const returnRandomNumber = () => {
	return Math.floor(Math.random() * Math.floor(5)) + 1
}

const randomColor = () => {
	const red = Math.floor(Math.random() * Math.floor(257))
	const green = Math.floor(Math.random() * Math.floor(257))
	const blue = Math.floor(Math.random() * Math.floor(257))
	const alpha = 1
	return `${red}, ${green}, ${blue}, ${alpha}`
}

const zoomOnCard = (e) => {
	const cardStyle = e.target.style
	const allCards = document.querySelectorAll('.card')
	allCards.forEach((card) => {
		card.style.scale = 1
		card.style.zIndex = 0
		card.style.position = 'relative'
	})
	rotateCards()

	cardStyle.transform = 'scale(1.9)'
	cardStyle.zIndex = 10
	e.target.firstChild.style.visibility = 'visible'

	e.target.querySelector('.notification-area') && statNotify(e)
	flipCard(cardStyle)

	emitFuckYouToServer()
}

const createRarity = (currentCard, cardDiv) => {
	const cardRarity = document.createElement('P')
	cardRarity.classList.add('card-rarity')
	cardRarity.appendChild(document.createTextNode(currentCard.getRarityIcon))
	cardDiv.appendChild(cardRarity)
}

const createStats = (currentCard, cardDiv) => {
	const cardStats = document.createElement('P')
	cardStats.classList.add('card-stats')
	cardStats.appendChild(document.createTextNode(currentCard.getCardStats))
	cardDiv.appendChild(cardStats)
	cardStats.setAttribute(
		'style',
		`${currentCard.rarity !== 'rare' && 'background-color: gold;'}`
	)
	if (currentCard.rarity === 'rare') {
		cardStats.setAttribute('style', 'color: gold; text-shadow: 0 0 2px black')
	}
}

const createNotificationArea = (currentCard, cardDiv) => {
	const cardNotificationArea = document.createElement('span')
	cardNotificationArea.innerHTML = currentCard.getRandomWeakText
	cardNotificationArea.setAttribute('style', `opacity: 0;`)
	cardNotificationArea.classList.add('notification-area')
	cardDiv.appendChild(cardNotificationArea)
}

const renderCards = (cards) => {
	const playArea = document.querySelector('.play-area')

	cards.map((card) => {
		const initiatedCard = new Card(card)
		const cardDiv = document.createElement('DIV')

		// classes and styles set up inside Card class
		cardDiv.classList.add(...initiatedCard.getCardDiv.classes)
		cardDiv.setAttribute('style', initiatedCard.getCardDiv.styles)

		// add card to the play area in the dom
		playArea.appendChild(cardDiv)

		// Create additional element of card in dom
		createRarity(initiatedCard, cardDiv)
		if (initiatedCard.getIsWeak) {
			createNotificationArea(initiatedCard, cardDiv)
		}
		createStats(initiatedCard, cardDiv)

		cardDiv.addEventListener('click', function () {
			revealCardDescription(initiatedCard)
		})
	})

	disableDealButton()
	enableDeleteButton()

	document.querySelectorAll('.card').forEach((card) => {
		card.addEventListener('click', zoomOnCard)
	})
}

const disableDealButton = () => {
	document.querySelector('.populate-cards').setAttribute('disabled', 'true')
}

const enableDeleteButton = () => {
	document.querySelector('.delete-cards').removeAttribute('disabled')
}

const rotateCards = () => {
	const cardsCommon = document.querySelectorAll('.common')
	const cardsUncommon = document.querySelectorAll('.uncommon')
	const cardsRare = document.querySelectorAll('.rare')
	const cardsBack = document.querySelectorAll('.back')

	const applyRotationStyle = (cardsToRotate) => {
		cardsToRotate.forEach((card) => {
			const plusOrMinus = Math.random() < 0.5 ? -1 : 1
			const degrees =
				(Math.floor(Math.random() * Math.floor(2.5)) + 1) * plusOrMinus
			card.style.transform = `rotate(${degrees}deg)`
		})
	}
	applyRotationStyle(cardsCommon)
	applyRotationStyle(cardsUncommon)
	applyRotationStyle(cardsRare)
	applyRotationStyle(cardsBack)
}

const deleteCards = () => {
	const allCardsParent = document.querySelector('.play-area')
	while (allCardsParent.firstChild) {
		allCardsParent.removeChild(allCardsParent.firstChild)
	}
	document.querySelector('.populate-cards').removeAttribute('disabled')
	document.querySelector('.delete-cards').setAttribute('disabled', 'true')
	clearInterface()
}

document
	.querySelector('.populate-cards')
	.addEventListener('click', requestNewCards)
document.querySelector('.delete-cards').addEventListener('click', deleteCards)

const revealCardDescription = (currentCard) => {
	const existingDescription = document.querySelectorAll('.card-description')
	existingDescription && existingDescription.forEach((e) => e.remove())
	const cardDetailsArea = document.querySelector('.card-details-area')
	const cardDescription = document.createElement('P')
	const cardStats = document.createElement('P')
	cardDescription.classList.add('card-description')
	cardStats.classList.add('card-description')

	cardDescription.appendChild(document.createTextNode(currentCard.description))
	cardStats.appendChild(
		document.createTextNode(
			`${currentCard.getRarityIcon} ${currentCard.rarity.toUpperCase()} | HP: ${
				currentCard.stats.hp
			} | ATTACK: ${currentCard.stats.attack} | DEFENSE: ${
				currentCard.stats.defense
			}`
		)
	)

	cardDetailsArea.appendChild(cardDescription)
	cardDetailsArea.appendChild(cardStats)
}

const clearInterface = () => {
	const existingDescription = document.querySelectorAll('.card-description')
	existingDescription && existingDescription.forEach((e) => e.remove())
}

const statNotify = (e) => {
	e.target
		.querySelector('.notification-area')
		.setAttribute('style', `opacity: 1;`)

	setTimeout(() => {
		e.target
			.querySelector('.notification-area')
			.setAttribute('style', `opacity: 0;`)
	}, 700)
}

const checkServerStatus = () => {
	// this doesn't do anything for now
	const serverStatusSpan = document.querySelector('.server-status')

	serverStatusSpan.innerHTML = '🟢 &nbsp;'

	serverStatusSpan.setAttribute(
		'style',
		'vertical-align: top; font-size: 0.4rem'
	)
}

checkServerStatus()

const flipCard = (cardStyle) => {
	console.log(cardStyle)
	cardStyle.backgroundImage = `url(./media/cards-pngs-optimized/medium/originalback.png)`
}
