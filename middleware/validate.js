const Joi = require('joi')

const userSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.string().required()
})

const validate = (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

module.exports = validate