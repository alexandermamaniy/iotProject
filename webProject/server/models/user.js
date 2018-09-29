const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

// definimos ciertos valores permitidos para el atributo rol
let rolesSuccess = {
  values: ['USER_ROLE', 'ADMIN_ROLE'],
  message: '{VALUE} no esta permitido'
}

let userSchema = new Schema({
  home: {
    type: Schema.Types.ObjectId,
    ref: 'Home'
  },
  information: {
    firstName: String,
    lastName: String,
    address: String,
    cellphone: String
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es necesario']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesSuccess
  },
  state: {
    type: Boolean,
    default: true
  }
})

// metodo que se ejecuta cada vez que madamos a imprimir el json del Model User
userSchema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()
  delete userObject.password
  // retornamos el objeto pero son la contraseña por motivos de seguridad
  return userObject
}

userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})
module.exports = mongoose.model('User', userSchema)
