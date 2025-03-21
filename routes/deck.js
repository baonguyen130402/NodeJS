const express = require('express')
const router = express.Router()

const DeckController = require('../controllers/Deck')

router.route('/getAllDecks').get(DeckController.getAllDecks)
router.route('/createNewDeck').post(DeckController.createNewDeck)

module.exports = router
