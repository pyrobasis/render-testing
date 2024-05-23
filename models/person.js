const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  name : {
    type : String,
    minLength: 3,
    required: true
},
  number : {
    type: String,
    validate : {
        validator : (v) => /^\d{2,3}\-{1}\d{1,}$/.test(v),
        message: m => `${m.value} is not a valid phone number`
    },
    required: true
    }
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Note.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person)
//     })
//     mongoose.connection.close()
// })

module.exports = mongoose.model('Person', personSchema)