const Deck = require('../models/Deck')
const User = require('../models/User')

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})

    return res.status(200).json({ users })
  } catch (err) {
    next(err)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.body
    const user = await User.findById(userId)

    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
}

const updateUserById = async (req, res, next) => {
  try {
    const { userId, userData } = req.body
    await User.findByIdAndUpdate(userId, userData)

    return res.status(200).json({ statusCode: 200 })
  } catch (err) {
    next(err)
  }
}

const createNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()

    return res.status(201).json({ user: newUser })
  } catch (err) {
    next(err)
  }
}

const deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.body
    await User.findByIdAndDelete(userId)

    return res.status(200).json({ statusCode: 200 })
  } catch (err) {
    next(err)
  }
}

const createNewDeck = async (req, res, next) => {
  try {
    const { userId } = req.body

    const newDeck = new Deck(req.body)
    const user = await User.findById(userId)

    newDeck.owner = user // Assign user as deck's owner
    await newDeck.save()

    user.decks.push(newDeck._id) // Add deck to user's decks
    await user.save()

    return res.status(201).json({ deck: user })
  } catch (err) {
    next(err)
  }
}

const getUserDecksById = async (req, res, next) => {
  const { userId } = req.body

  try {
    const user = await User.findById(userId).populate('decks')

    return res.status(200).json({decks: user.decks})
  } catch (err) {
    next(err)
  }

}

module.exports = {
  getAllUsers,
  getUserDecksById,
  getUserById,
  createNewUser,
  createNewDeck,
  updateUserById,
  deleteUserById
}
