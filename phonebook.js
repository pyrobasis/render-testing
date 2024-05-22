const express = require('express')
const pbRoutes = express.Router()
const Person = require('./models/person.js')

pbRoutes.get('/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

pbRoutes.get('/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

pbRoutes.delete('/persons/:id', (req, res) => {
    Person.findOneAndDelete({
        _id : req.params.id
    }).then(p => {
        res.status(204).end()
    })
})
pbRoutes.post('/persons', (req, res) => {
    const body = req.body

    if(!body.name) {
        return res.status(400).json({
            error: "content missing"
        })
    }

    const person = new Person({
            name: body.name,
            number: body.number
    })

    person.save().then(p => {
        res.json(p)
    })
  })

module.exports = exports = pbRoutes