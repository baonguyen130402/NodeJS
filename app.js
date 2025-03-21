const express = require('express')

const logger = require('morgan')
const mongoClient = require('mongoose')
const bodyParser = require('body-parser')

const userRoute = require('./routes/user')
const deckRoute = require('./routes/deck')

// Setup connect mongodb by mongoose
mongoClient.connect('mongodb://localhost:27017/nodejs')
  .then(() => console.log('Connect to Database successfully'))
  .catch((error) => console.error(`Cannot connect to Database, error is ${error}`))

const app = express()

// Middlewares
app.use(logger('dev'))
app.use(bodyParser.json())

// Routes
app.use('/users', userRoute)
app.use('/decks', deckRoute)

// Routes
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Server is OK!'
  })
})

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.isJoi ? 422 : err.status || 500

  return res.status(status).json({
    error: {
      message: error.message
    }
  })
})

// Start the server
const port = app.get('port') || 3000
app.listen(port, () => console.log(`App is listening on ${port}`))
