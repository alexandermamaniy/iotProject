const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema


let homeSchema = new Schema({
  
})

// metodo que se ejecuta cada vez que madamos a imprimir el json del Model User


userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})
module.exports = mongoose.model('Home', homeSchema)
