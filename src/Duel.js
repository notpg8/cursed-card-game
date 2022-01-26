import { Card } from './Card'
import { clearInterface, socket, parseCardToHTML } from './index'

export const toggleDuelScreen = () => {
	if (!document.querySelector('.duel-page')) {
		const parsedDuelPageChildren = parseDuelPageToHTML(duelUnparsedHtml)
		document.querySelector('.board').appendChild(parsedDuelPageChildren)
	}

	socket.emit('request-duel', (response) => {
		const duelCardFromServer = response[0]

		const initiatedCard = new Card(duelCardFromServer)

		const parsedDuelCardFromServer = parseCardToHTML(
			initiatedCard.getUnparsedCardForDuel
		)

		const opponentCardDuel = document.querySelector('.opponent-card-duel')
		document
			.querySelector('.opponent-card-duel')
			.appendChild(parsedDuelCardFromServer)

		console.log(opponentCardDuel)
		opponentCardDuel.querySelector('.card-rarity').style.visibility = 'visible'
		opponentCardDuel.querySelector('.card-rarity').style.fontSize = '1rem'
	})

	const duelDiv = document.querySelector('.duel-page')

	if (duelDiv.style.visibility === 'visible') {
		duelDiv.remove()
	} else {
		duelDiv.style.visibility = 'visible'
	}
	clearInterface()
}

const parseDuelPageToHTML = (unparsedHTML) => {
	const tempWrapper = document.createElement('DIV')
	tempWrapper.innerHTML = unparsedHTML
	const parsedDiv = tempWrapper.querySelector('.duel-page')
	return parsedDiv
}

const duelUnparsedHtml = `<div class="duel-page"><div class="duel-cards"><div class="own-card-duel"><h1 class="atk-hp-self">⚔ 999 | ♥ 999</h1></div><div class="opponent-card-duel"><h1 class="atk-hp-opponent">⚔ 999 | ♥ 999</h1></div></div><div class="duel-page-backgrounds"><div class="own-duel-page skewed"></div><div class="opponent-duel-page skewed"></div></div></div>`
