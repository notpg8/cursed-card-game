import { revealDuelCards } from './index'
export const toggleDuelScreen = () => {
	const duelDiv = document.querySelector('.duel-page')
	if (duelDiv.style.visibility === 'visible') {
		duelDiv.style.visibility = 'hidden'
		revealDuelCards()
	} else {
		duelDiv.style.visibility = 'visible'
	}
}
