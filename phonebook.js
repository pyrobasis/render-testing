const express = require('express')
const pbRoutes = express.Router()
const Person = require('./models/person.js')

pbRoutes.get('/persons', (req, res, next) => {
  Person.find({}).then(people => {
    res.json(people)
  })
    .catch(e => {
      next(e)
    })
})

pbRoutes.get('/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
    .catch(e => {
      next(e)
    })
})

pbRoutes.delete('/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(e => {
      next(e)
    })
})
pbRoutes.post('/persons', (req, res, next) => {
  const body = req.body

  if(!body.name) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(p => {
    res.json(p)
  })
    .catch(e => {
      next(e)
    })
})

pbRoutes.put('/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name : body.name,
    number : body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new : true, runValidators: true })
    .then(updatedPerson => { res.json(updatedPerson)})
    .catch(e => {
      next(e)
    })

})

module.exports = exports = pbRoutes