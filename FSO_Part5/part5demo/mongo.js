const mongoose = require('mongoose')
require('dotenv').config()

/**
 * establishes a connection to the databases, tacking the passward as a command line argument
 * if the database named in the connection doesnt yet exist, Mongo creates it
 */

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

/**
 * Schema is defined to tell Mongoose how the notes objects will be stored in the database
 * We can define validation rules for each feild within the schema
 */
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

/**
 * In the note model definition, the first "Note" parameter is the singular name of the model
 * the name of the collection will be the lowercase plural notes
 * Mongoose convention is to automatically name collections as plural of what the schema refers to be as
 * Mongo itself is schemaless and relies on the data stored in the databse being given a schema at the
 * application level, to define the shape of documents stored in any location.
 */
const Note = mongoose.model('Note', noteSchema)

/**
 * application creates a new note obect, through Note model defined above
 * Mongoose.model() is a constructor function that creats a JS object based on parameters
 */
const note = new Note({
  content: 'this is a second note',
  // content: 'Saving code correclty is less intuitivive than it should be',
  important: true,
})

console.log(note)

/**
 * object is saved with .save() method
 * cnnectiron is closed, if connection is not closed, program will never finish its execution
 */

note.save()
  .then(() => {
    console.log('Note saved')
    return mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error savinge note:', error)
    mongoose.connection.close()
  })

/**
 * Objects are retrieved from the database with the find method of the note model
 * since the provided search parameter is empty {} we get all notes stored in the colleciton
 *
 * we can provide search conditions like to restrict the list of returned objects like
 * .find({ important: true })
 */
