const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const fs = require('fs')
const { SocketAddress } = require('net')

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
	opponent: 0 
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
	if (rarityCombined === 2) return 'uncommon'
	if (rarityCombined >= 3) return 'common'
	else {
		throw new Error('some shit with the cards rarity')
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

const dealCards = (N = 5, isServer = false) => {
	// creates an N lenght array with 1-5 random values
	// assemble object with rarity and number of card, return that instead of rarity and number separately
	const cards = Array.from(Array(N)).map((card, i) => {
		const cardId = returnRandomImageName()
		const rarity = returnRandomRarity()

		const c = {
			id: `${returnRandomNumber(9999)}-${returnRandomNumber(
				9999
			)}-${returnRandomNumber(9999)}-${returnRandomNumber(9999)}`,
			rarity: rarity,
			name: cardId,
			description: `This is where the description/quote of the card goes`,
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

const calculateFightResult = ({ ownId, opponentId }, socket) => {
	let result = ''
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

	if (ownCard[0].stats.attack === opponentCard[0].stats.attack) {
		result = 'attack tie'
		SCORE.own ++
		SCORE.opponent ++
	} else if (
		ownCard[0].stats.attack >= opponentCard[0].stats.hp &&
		ownCard[0].stats.hp > opponentCard[0].stats.attack
	) {
		result = 'you win'
		SCORE.own ++
	} else if (
		opponentCard[0].stats.attack >= ownCard[0].stats.hp &&
		opponentCard[0].stats.hp > ownCard[0].stats.attack
	) {
		result = 'you lose'
		SCORE.opponent ++
	} else {
		result = 'stalemate'
		SCORE.own ++
		SCORE.opponent ++
	}

	socket.emit('fight-result', result)
	socket.emit('score', SCORE)

}

// SOCKET

io.on('connection', (socket) => {
	console.log('a user connected')

	socket.on('chat', (msg) => {
		console.log(msg)
	})

	socket.on('request-new-cards', (cb) => {
		if(SCORE.own <= 0){
			return
		}
		SCORE.own --
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

	socket.on('update-score', (cb) => {
		isDuelPageOpen = !isDuelPageOpen
		cb(isDuelPageOpen)
	})

	socket.emit('score', SCORE)
	socket.emit('deal-cards', dealCards())
})

// SERVER NOTIFICATION

server.listen(3000, () => {
	console.log('listening on *:3000')
})
