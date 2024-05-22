require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note.js')
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use('/api', require('./phonebook.js'))

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => res.json(notes))
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => res.json(note))
})
app.delete('/api/notes/:id', (req, res) => {
    Note.delete
    const id = Number(req.params.id)
    
    
    notes = notes.filter(n => n.id !== id)

    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const body = req.body

    if(!body.content) {
        return res.status(400).json({
            error: "content missing"
        })
    }

    const note = new Note({
        content: body.content,
        importance: Boolean(body.importance) || false
    })

    console.log(note)
    note.save().then(savedNote => {
        res.json(savedNote)
    })
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})