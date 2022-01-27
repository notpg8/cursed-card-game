import { Card } from './Card'
import { toggleDuelScreen } from './Duel'
export var socket = io()

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
	console.log('inside zoom on card')
	if (e.target.classList.contains('card')) {
		const cardStyle = e.target.style
		resetCardZoom()
		rotateCards()
		cardStyle.transform = 'scale(1.6)'
		cardStyle.zIndex = 2
		e.target.firstChild.style.visibility = 'visible'
		e.target.querySelector('.notification-area') && statNotify(e)
		flipCard(e)
	}

	emitFuckYouToServer()
}

export const parseCardToHTML = (unparsedCard) => {
	const tempWrapper = document.createElement('DIV')
	tempWrapper.innerHTML = unparsedCard
	const cardParsedDiv = tempWrapper.firstChild
	return cardParsedDiv
}

const renderCards = (cardsFromServer) => {
	const playArea = document.querySelector('.play-area')

	cardsFromServer.map((card, i) => {
		const initiatedCard = new Card(card)

		const cardParsedDiv = parseCardToHTML(initiatedCard.getUnparsedCard)

		playArea.appendChild(cardParsedDiv)

		cardParsedDiv.addEventListener('click', function () {
			revealCardDescription(initiatedCard)
		})

		cardParsedDiv
			.querySelector('.fight-button')
			.addEventListener('click', sendCardToDuelPage)
	})

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
	clearInterface()
}

const revealCards = () => {
	document.querySelectorAll('.card').forEach((card) => {
		card.classList.remove('face-down')
		card.classList.add('face-up')
		card.querySelector('.card-rarity').style.visibility = 'visible'
		card.querySelector('.card-stats').style.visibility = 'visible'
		card.querySelector('.card-image').style.visibility = 'visible'
		card.querySelector('.fight-button').style.visibility = 'visible'
		if (card.querySelector('.notification-area')) {
			card.querySelector('.notification-area').style.visibility = 'visible'
		}
	})
}

export const revealDuelCards = () => {
	const duelCards = document.querySelector('.duel-cards')

	duelCards.querySelectorAll('.card').forEach((card) => {
		card.classList.remove('face-down')
		card.classList.add('face-up')
		card.querySelector('.card-rarity').style.visibility = 'visible'
		card.querySelector('.card-stats').style.visibility = 'visible'
		card.querySelector('.card-image').style.visibility = 'visible'
		// if (card.querySelector('.notification-area')) {
		// 	card.querySelector('.notification-area').style.visibility = 'visible'
		// }
	})
}

const revealCardDescription = (currentCard) => {
	const existingDescription = document.querySelectorAll('.card-description')
	existingDescription && existingDescription.forEach((e) => e.remove())
	const cardDetailsArea = document.querySelector('.card-info-tooltip')

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

export const clearInterface = () => {
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

const flipCard = (e) => {
	const cardSelected = e.target
	console.log('inside flip card')

	if (cardSelected.classList.value.includes('face-down')) {
		e.target.classList.remove('face-down')
		e.target.classList.add('face-up')
		e.target.querySelector('.card-rarity').style.visibility = 'visible'
		e.target.querySelector('.card-stats').style.visibility = 'visible'
		e.target.querySelector('.notification-area').style.visibility = 'visible'
		e.target.querySelector('.card-image').style.visibility = 'visible'
		e.target.querySelector('.fight-button').style.visibility = 'visible'

		return
	}
	return null
}

export const sendCardToDuelPage = (e) => {
	const selectedCard = e.target.parentElement

	selectedCard.style.transform = 'scale(1.3)'

	selectedCard.querySelector('button').remove()
	selectedCard.querySelector('.card-stats').remove()
	selectedCard.querySelector('.card-rarity').style.fontSize = '1rem'
	toggleDuelScreen(socket)

	document.querySelector('.own-card-duel').appendChild(selectedCard)
}

// initiate check server status to be replaced by socket events

checkServerStatus()

// --- EVENT LISTENERS ---

document
	.querySelector('.populate-cards')
	.addEventListener('click', requestNewCards)

document.querySelector('.delete-cards').addEventListener('click', deleteCards)

document
	.querySelector('.reveal-all-cards')
	.addEventListener('click', revealCards)

document
	.querySelector('.duel-page-button')
	.addEventListener('click', toggleDuelScreen)

document.addEventListener('click', (e) => {
	if (e.target.className === 'board' || e.target.className === 'play-area') {
		resetCardZoom()
	}
})
