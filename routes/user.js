const validate = require('../middleware/validate')
const express = require('express')
const User = require('../models/user')

const router = express.Router()
router.get('/home', (req, res) => {
  
  res.send(`Hello, shiv! Welcome to the home page.`);
});
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    next(err)
  }
})
router.post('/users',validate , async (req, res,next) => {
  try{
  const user = new User(req.body)
  await user.save()
  res.send(user)}catch(err){
    next(err)
  }
});
router.put('/users/:id', async (req, res,next) => {
  try{
  const user = await User.findByIdAndUpdate(req.params.id, req.body , { new: true })
  res.send(user)}catch (err){
    next(err)
  }
});
router.delete('/users/:id', async (req, res,next) => {
  try{
  const user = await User.findByIdAndDelete(req.params.id)
  res.send(user)}catch(err){
    next(err)
  }
});

module.exports = router