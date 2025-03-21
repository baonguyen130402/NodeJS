const Deck = require("../../models/Deck")
const User = require("../../models/User")
const { newDeckValidation } = require("./ValidationRoutes")

const getAllDecks = async (req, res, next) => {
  try {
    const decks = await Deck.find({})

    return res.status(200).json({ decks })
  } catch (err) {
    next(err)
  }
}

const createNewDeck = async (req, res, next) => {
  try {
    const body = await newDeckValidation.validateAsync(req.body)

    const { owner: userId } = body

    const newDeck = new Deck(body)
    const user = await User.findById(userId)
;
    user.decks.push(newDeck._id)
    await user.save()

    return res.status(201).json({deck: newDeck})
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllDecks,
  createNewDeck
}
