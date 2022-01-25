import { Card } from './Card'
import { toggleDuelScreen } from './Duel'
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

const resetCardZoom = () => {
	const allCards = document.querySelectorAll('.card')
	allCards.forEach((card) => {
		card.style.transform = 'scale(1)'
		card.style.zIndex = 0
		card.style.position = 'relative'
	})
}

const zoomOnCard = (e) => {
	const cardStyle = e.target.style
	resetCardZoom()
	rotateCards()

	cardStyle.transform = 'scale(1.6)'
	cardStyle.zIndex = 2
	e.target.firstChild.style.visibility = 'visible'

	e.target.querySelector('.notification-area') && statNotify(e)
	flipCard(e)

	emitFuckYouToServer()
}

const createRarity = (currentCard, cardDiv) => {
	const cardRarity = document.createElement('P')
	cardRarity.classList.add('card-rarity')

	cardRarity.classList.add(`${currentCard.rarity}-card-rarity`)
	cardRarity.appendChild(document.createTextNode(currentCard.getRarityIcon))
	cardDiv.appendChild(cardRarity)
}

const createStats = (currentCard, cardDiv) => {
	const cardStats = document.createElement('P')
	cardStats.classList.add('card-stats')
	cardStats.classList.add(`${currentCard.rarity}-card-stats`)
	cardStats.appendChild(document.createTextNode(currentCard.getCardStats))
	cardDiv.appendChild(cardStats)
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
		const cardImageDiv = document.createElement('DIV')

		// classes and styles set up inside Card class
		cardDiv.classList.add(...initiatedCard.getCardDiv.classes)
		cardDiv.setAttribute(
			'style',
			initiatedCard.getCardDiv.styles.faceDownStyles
		)

		cardImageDiv.classList.add('card-image')
		cardImageDiv.classList.add(`${initiatedCard.rarity}-image-filter`)
		cardImageDiv.setAttribute(
			'style',
			initiatedCard.getCardDiv.styles.faceUpStyles
		)

		// add card to the play area in the dom
		playArea.appendChild(cardDiv)
		cardDiv.appendChild(cardImageDiv)

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

	// disableDealButton()
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

const revealCards = () => {
	document.querySelectorAll('.card').forEach((card) => {
		card.classList.remove('face-down')
		card.classList.add('face-up')
		card.querySelector('.card-rarity').style.visibility = 'visible'
		card.querySelector('.card-stats').style.visibility = 'visible'
		card.querySelector('.card-image').style.visibility = 'visible'
		if (card.querySelector('.notification-area')) {
			card.querySelector('.notification-area').style.visibility = 'visible'
		}
	})
}

// buttons nav event listeners
document
	.querySelector('.populate-cards')
	.addEventListener('click', requestNewCards)
document.querySelector('.delete-cards').addEventListener('click', deleteCards)
document
	.querySelector('.reveal-all-cards')
	.addEventListener('click', revealCards)
document.querySelector('.duel-page-button').addEventListener('click', toggleDuelScreen)

const revealCardDescription = (currentCard) => {
	const existingDescription = document.querySelectorAll('.card-description')
	existingDescription && existingDescription.forEach((e) => e.remove())
	const cardDetailsArea = document.querySelector('.card-details-area')

	const cardName = document.createElement('H2')
	const cardDescription = document.createElement('P')
	const cardStats = document.createElement('P')

	cardName.classList.add('card-name', 'card-description')
	cardDescription.classList.add('card-description')
	cardStats.classList.add('card-description')

	cardName.appendChild(
		document.createTextNode(
			currentCard.name.substring(0, currentCard.name.indexOf('.')).toUpperCase()
		)
	)
	cardDescription.appendChild(document.createTextNode(currentCard.description))
	cardStats.appendChild(
		document.createTextNode(
			`${
				currentCard.getRarityIcon
			} ${currentCard.rarity.toUpperCase()} | ATTACK: ${
				currentCard.stats.attack
			} | HP: ${currentCard.stats.hp}`
		)
	)

	cardDetailsArea.appendChild(cardName)
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

const flipCard = (e) => {
	const cardSelected = e.target

	if (cardSelected.classList.value.includes('face-down')) {
		e.target.classList.remove('face-down')
		e.target.classList.add('face-up')
		e.target.querySelector('.card-rarity').style.visibility = 'visible'
		e.target.querySelector('.card-stats').style.visibility = 'visible'
		e.target.querySelector('.notification-area').style.visibility = 'visible'
		e.target.querySelector('.card-image').style.visibility = 'visible'

		return
	}
	return null
}

document.addEventListener('click', (e)=> { 
	if(e.target.className === 'board' || e.target.className === 'play-area'){
		resetCardZoom()
	}
})
