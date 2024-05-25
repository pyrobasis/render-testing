const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url).then(( ) => {
  console.log('connected to MongoDB')
}).catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

const noteSchema = new mongoose.Schema({
  content : {
    type : String,
    minLength : 3,
    required : true
  },
  importance: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// const note = new Note({
//   content: process.argv[3],
//   importance: process.argv[4]
// })

// note.save().then(result => {
//     console.log('note saved!')
//     // mongoose.connection.close()
//   })

// Note.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person)
//     })
//     mongoose.connection.close()
// })

module.exports = mongoose.model('Note', noteSchema)