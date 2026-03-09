const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ message: 'No token!' })
  }
  const decoded = jwt.verify(token, 'secretkey')
  req.user = decoded
  next()
}

module.exports = authMiddleware