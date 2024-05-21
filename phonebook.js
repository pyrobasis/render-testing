const express = require('express')
const pbRoutes = express.Router()

let persons = [
    {
        name: "Arto Hellas",
        number : "040-123456",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-53",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "3332-123",
        id: 3
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-64231",
        id: 4
      },
      {
        id: 5,
        name: "John Cena",
        number: "20432-1112"
      }
]

pbRoutes.get('/persons', (req, res) => {
    res.json(persons)
})
pbRoutes.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(n => n.id === id)

    if (person) {
        res.json(person)
        console.log(person)
      } else {
        res.status(404).end()
      }
})

pbRoutes.delete('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(n => n.id !== id)

    res.status(204).end()
})
const generateId = (notes) => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0

    return maxId + 1
}

pbRoutes.post('/persons', (req, res) => {
    const body = req.body

    if(!body.content) {
        return res.status(400).json({
            error: "content missing"
        })
    }

    const person = {
        name: body.name,
        id: body.id,
        number: body.number
    }

    persons = persons.concat(person)
    console.log(person)
    res.json(person)
  })

module.exports = exports = pbRoutes