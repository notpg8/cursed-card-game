import { clearInterface } from './index'

export const toggleDuelScreen = () => {
	if (!document.querySelector('.duel-page')) {
		const parsedDuelPageChildren = parseToHTML(duelUnparsedHtml)
		document.querySelector('.board').appendChild(parsedDuelPageChildren)
	}
	const duelDiv = document.querySelector('.duel-page')

	if (duelDiv.style.visibility === 'visible') {
		duelDiv.remove()
	} else {
		duelDiv.style.visibility = 'visible'
		clearInterface()
	}
	clearInterface()
}

const parseToHTML = (unparsedHTML) => {
	const tempWrapper = document.createElement('DIV')
	tempWrapper.innerHTML = unparsedHTML
	const parsedDiv = tempWrapper.querySelector('.duel-page')
	return parsedDiv
}

const duelUnparsedHtml = `<div class="duel-page"><div class="duel-cards"><div class="opponent-card-duel"><h1 class="atk-hp-opponent">⚔ 999 | ♥ 999</h1></div><div class="own-card-duel"><h1 class="atk-hp-self">⚔ 999 | ♥ 999</h1></div></div><div class="duel-page-backgrounds"><div class="opponent-duel-page skewed"></div><div class="own-duel-page skewed"></div></div></div>`
