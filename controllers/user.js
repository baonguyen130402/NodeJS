const getAllUsers = (req, res) => {
  return res.status(200).json({
    message: 'You requested to user handler'
  })
}

module.exports = {
  getAllUsers
}
