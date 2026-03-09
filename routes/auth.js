
const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/register', async (req, res, next) => {
  const hashedPassword = await bcryptjs.hash(req.body.password, 10)
const user = new User({
  name: req.body.name,
  age: req.body.age,
  gender: req.body.gender,
  password: hashedPassword
})
await user.save()
res.status(201).json({ message: 'User registered!' })
})

router.post('/login', async (req, res, next) => {
 console.log('req.body:', req.body)
    const user = await User.findOne({ name: req.body.name })
    console.log('user found:', user)
if (!user) {
  return res.status(404).json({ message: 'User not found!' })
}
const isMatch = await bcryptjs.compare(req.body.password, user.password)
if (!isMatch) {
  return res.status(400).json({ message: 'Invalid password!' })
}
const token = jwt.sign({ id: user._id }, 'secretkey')
res.json({ token })

console.log('user:', user)
console.log('password:', user.password)
})


module.exports = router