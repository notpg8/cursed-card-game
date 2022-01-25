const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const fs = require('fs')

// middleware serves static content from media for all requests sent to media endpoint
app.use('/media', express.static(__dirname + '/src/media'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/dist/index.html')
})

app.get('/main.js', (req, res) => {
	res.sendFile(__dirname + '/dist/main.js')
})

app.get('/style.css', (req, res) => {
	res.sendFile(__dirname + '/src/style.css')
})

// UTILS

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

const returnRandomNumber = () => {
	return Math.floor(Math.random() * Math.floor(numberOfAvailableImages)) + 1
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

const dealCards = () => {
	// creates a 5 lenght array with 1-5 random values

	// assemble object with rarity and number of card, return that instead of rarity and number separately

	return Array.from(Array(5)).map((card, i) => {
		return {
			// id: returnRandomNumber(),
			id: returnRandomImageName(),
			rarity: returnRandomRarity(),
			description: `This is where the description/quote of the card goes`,
			stats: {
				attack: 0,
				defense: 0,
				hp: 0,
			},
		}
	})
}

// SOCKET

io.on('connection', (socket) => {
	console.log('a user connected')

	socket.on('chat', (msg) => {
		console.log(msg)
	})

	socket.on('request-new-cards', (cb) => {
		cb(dealCards())
	})

	socket.emit('deal-cards', dealCards())
})

// SERVER NOTIFICATION

server.listen(3000, () => {
	console.log('listening on *:3000')
})
