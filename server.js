const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const fs = require('fs')

// middleware serves static content from media for all requests sent to media endpoint
app.use('/media', express.static(__dirname + '/src/media'))
app.use('/', express.static(__dirname + '/dist'))

// UTILS
const dealtCards = {
  own: [],
  opponent: [],
}
let numberOfAvailableImages = 0
let imageNamesMap = []

fs.readdir('./src/media/cards-pngs-optimized/medium/', (err, files) => {
  numberOfAvailableImages = files.filter(
    (file) =>
      file.includes('.png') ||
      file.includes('.jpg') ||
      file.includes('.jpeg') ||
      file.includes('.gif')
  ).length
})

fs.readdir('./src/media/cards-pngs-optimized/medium/', (err, files) => {
  imageNamesMap = files.filter(
    (file) =>
      file.includes('.png') ||
      file.includes('.jpg') ||
      file.includes('.jpeg') ||
      file.includes('.gif')
  )
})

const SCORE = {
  own: 0,
  opponent: 0,
}

const returnRandomNumber = (N) => {
  return (
    Math.floor(Math.random() * Math.floor(N || numberOfAvailableImages)) + 1
  )
}

const returnRandomImageName = () => {
  return imageNamesMap[returnRandomNumber() - 1]
}

const returnRandomRarity = () => {
  // do this part
  const rarity = Math.floor(Math.random() * Math.floor(3)) + 1
  const rarity2 = Math.floor(Math.random() * Math.floor(3))
  const rarity3 = Math.floor(Math.random() * Math.floor(3))

  const rarityCombined = rarity + rarity2 + rarity3

  if (rarityCombined === 1) return 'rare'
  if (rarityCombined > 1 && rarityCombined <= 3) return 'uncommon'
  if (rarityCombined > 3) return 'common'
  else {
    throw new Error('some shit with the cards rarity')
  }
}

const assignRandomStatValue = (rarity) => {
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

const dealCards = (N = 5, isServer = false) => {
  const cards = Array.from(Array(N)).map(() => {
    const cardId = returnRandomImageName()
    const rarity = returnRandomRarity()

    const c = {
      id: `${returnRandomNumber(9999)}-${returnRandomNumber(
        9999
      )}-${returnRandomNumber(9999)}-${returnRandomNumber(9999)}`,
      rarity: rarity,
      name: cardId,
      description: ``,
      stats: {
        attack: assignRandomStatValue(rarity),
        defense: assignRandomStatValue(rarity),
        hp: assignRandomStatValue(rarity),
      },
    }

    isServer ? dealtCards.opponent.push(c) : dealtCards.own.push(c)
    return c
  })

  return cards
}

const getCardNames = ({ ownId, opponentId }, socket) => {
  let result = {
    nameOfCards: { own: '', opponent: '' },
  }

  dealtCards.own.filter((card) => {
    if (card.id === ownId) {
      // console.log(card)
      // return card
      result.nameOfCards.own = card.name.substring(0, card.name.indexOf('.'))
    }
  })

  dealtCards.opponent.filter((card) => {
    if (card.id === opponentId) {
      // console.log(card)
      // return card
      result.nameOfCards.opponent = card.name.substring(
        0,
        card.name.indexOf('.')
      )
    }
  })

  socket.emit('names-result', result)
}

const calculateFightResult = ({ ownId, opponentId }, socket) => {
  const ownCard = dealtCards.own.filter((card) => {
    if (card.id === ownId) {
      return card
    }
  })

  const opponentCard = dealtCards.opponent.filter((card) => {
    if (card.id === opponentId) {
      return card
    }
  })

  let result = {
    msg: '',
  }

  if (ownCard[0].stats.attack === opponentCard[0].stats.attack) {
    result.msg = 'attack tie'
    SCORE.own++
    SCORE.opponent++
  } else if (
    ownCard[0].stats.attack >= opponentCard[0].stats.hp &&
    ownCard[0].stats.hp > opponentCard[0].stats.attack
  ) {
    result.msg = 'you win'
    SCORE.own++
  } else if (
    opponentCard[0].stats.attack >= ownCard[0].stats.hp &&
    opponentCard[0].stats.hp > ownCard[0].stats.attack
  ) {
    result.msg = 'you lose'
    SCORE.opponent++
  } else {
    result.msg = 'stalemate'
    SCORE.own++
    SCORE.opponent++
  }

  socket.emit('fight-result', result)
  socket.emit('score', SCORE)
  const scoreGoal = 2
  if (SCORE.own >= scoreGoal || SCORE.opponent >= scoreGoal) {
    let winner = ''
    if (SCORE.own === SCORE.opponent) {
      winner = 'TIE'
    } else if (SCORE.own > SCORE.opponent) {
      winner = 'YOU'
    } else {
      winner = 'OPPONENT'
    }
    socket.emit('game-over', winner)
  }
}

// SOCKET

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat', (msg) => {
    console.log(msg)
  })

  socket.on('request-new-cards', (cb) => {
    if (SCORE.own <= 0) {
      return
    }
    SCORE.own--
    socket.emit('score', SCORE)
    cb(dealCards(1))
  })

  socket.on('request-duel', (cb) => {
    const isServer = true
    cb(dealCards(1, isServer))
  })

  socket.on('fight', ({ ownId, opponentId }) => {
    calculateFightResult({ ownId, opponentId }, socket)
  })

  socket.on('get-card-names', ({ ownId, opponentId }) => {
    getCardNames({ ownId, opponentId }, socket)
  })

  socket.on('play-again', () => {
    SCORE.own = 0
    SCORE.opponent = 0
    dealtCards.own = []
    dealtCards.opponent = []
    socket.emit('start-new-game')
    socket.emit('score', SCORE)
    socket.emit('deal-cards', dealCards())
  })

  socket.emit('score', SCORE)
  socket.emit('deal-cards', dealCards())
})

// SERVER NOTIFICATION

server.listen(3000, () => {
  console.log('listening on *:3000')
})
