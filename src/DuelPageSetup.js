import { Card } from './Card'
import { socket, parseCardToHTML } from './app'
import { startTransition } from './TransitionPage'

export const toggleDuelScreen = () => {
  startTransition()

  setTimeout(() => {
    document.querySelector('.duel-page').style.opacity = 1
    document.querySelector('.board').style.pointerEvents = 'none'
    document.querySelector('nav').style.pointerEvents = 'none'

    socket.emit('request-duel', (response) => {
      const duelCardFromServer = response[0]

      const initiatedCard = new Card(duelCardFromServer)

      const parsedDuelCardFromServer = parseCardToHTML(
        initiatedCard.getUnparsedCardForDuel
      )

      const opponentCardDuel = document.querySelector('.opponent-card-duel')

      opponentCardDuel.appendChild(parsedDuelCardFromServer)

      opponentCardDuel.querySelector('.card-rarity').style.visibility =
        'visible'
      opponentCardDuel.querySelector('.card-rarity').style.fontSize = '1rem'
      const cardStatsAtkHp =
        opponentCardDuel.querySelector('.card-stats').innerHTML

      opponentCardDuel.querySelector('.atk-hp-opponent').innerHTML =
        cardStatsAtkHp
    })
  }, 300)
}

export const createDuelPage = () => {
  const parsedDuelPageChildren = parseDuelPageToHTML(duelUnparsedHtml)
  document.querySelector('.board').appendChild(parsedDuelPageChildren)
}

const parseDuelPageToHTML = (unparsedHTML) => {
  const tempWrapper = document.createElement('DIV')
  tempWrapper.innerHTML = unparsedHTML
  const parsedDiv = tempWrapper.querySelector('.duel-page')
  return parsedDiv
}

const duelUnparsedHtml = `<div class="duel-page"><div class="duel-cards"><div class="own-card-duel"><h1 class="atk-hp-self">⚔ 999 | ♥ 999</h1></div><div class="opponent-card-duel"><h1 class="atk-hp-opponent">⚔ 999 | ♥ 999</h1></div></div><div class="duel-page-backgrounds"><div class="own-duel-page skewed"></div><div class="opponent-duel-page skewed"></div></div></div>`
