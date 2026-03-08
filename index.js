require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const userRoutes = require('./routes/user')
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const app = express()

connectDB()

app.use(express.json())
app.use(logger)
app.use(userRoutes)
app.use(errorHandler)
app.listen(3000, () => {
  console.log('Server running on port 3000')
})