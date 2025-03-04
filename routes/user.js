const express = require('express')
const router  = express.Router()

router.route('/')
  .get((_, res) => {
    return res.status(200).json({
      message: 'You request to user handle'
    })
  })
  .post()
  .patch()
  .put()
  .delete()

module.exports = router
