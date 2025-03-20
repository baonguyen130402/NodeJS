const { when } = require("joi")
const Deck = require("../../models/Deck")
const User = require("../../models/User")
const { newUserValidation, updateUserValidation, userIdValidation, newUserDeckValidation } = require("./ValidationRoutes")

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
    const body = await userIdValidation.validateAsync(req.body)

    const { userId } = body
    const user = await User.findById(userId)

    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
}

const updateUserById = async (req, res, next) => {
  try {
    const body = await updateUserValidation.validateAsync(req.body)

    const { userId, userData } = body
    await User.findByIdAndUpdate(userId, userData)

    return res.status(200).json({ statusCode: 200 })
  } catch (err) {
    next(err)
  }
}

const createNewUser = async (req, res, next) => {
  try {
    const body = await newUserValidation.validateAsync(req.body)

    const newUser = new User(body)
    await newUser.save()

    return res.status(201).json({ user: newUser })
  } catch (err) {
    next(err)
  }
}

const deleteUserById = async (req, res, next) => {
  try {
    const body = await userIdValidation.validateAsync(req.body)

    const { userId } = body
    await User.findByIdAndDelete(userId)

    return res.status(200).json({ statusCode: 200 })
  } catch (err) {
    next(err)
  }
}

const createNewDeck = async (req, res, next) => {
  try {
    const body = await newUserDeckValidation.validateAsync(req.body)

    const { userId } = body

    const newDeck = new Deck(body)
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
  try {
    const body = await userIdValidation.validateAsync(req.body)
    const { userId } = body

    const user = await User.findById(userId).populate('decks')

    return res.status(200).json({ decks: user.decks })
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
