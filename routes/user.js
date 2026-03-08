const express = require('express')
const User = require('../models/user')

const router = express.Router()
router.get('/home', (req, res) => {
  
  res.send(`Hello, shiv! Welcome to the home page.`);
});
router.get('/users', async (req, res) => {
  const users = await User.find()
  res.send(users)
})
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  await user.save()
  res.send(user)
});
router.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body , { new: true })
  res.send(user)
});
router.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  res.send(user)
});

module.exports = router