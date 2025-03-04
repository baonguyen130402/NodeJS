const User = require('../models/User')

const getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).json({users}))
    .catch(err => next(err))
}

const createNewUser = (req, res) => {
  const newUser = new User(req.body) 

  newUser.save()
    .then(user => res.status(201).json({user}))
    .catch(err => next(err))
}

module.exports = {
  getAllUsers,
  createNewUser
}
