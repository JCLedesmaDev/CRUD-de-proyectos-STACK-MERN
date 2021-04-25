const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  nombre: {
    type: String, //-> Tipo de dato
    require: true, //-> Requerido
    trim: true //-> Elimina los espacios antes de ingresar a la BD
  },
  email: {
    type: String, 
    require: true, 
    trim: true,
    unique: true //-> Dato unico
  },
  password: {
    type: String, 
    require: true, 
    trim: true
  },
  registro: {
    type: Date,
    default: Date.now() //-> Se genera una fecha al momento de registrarse
  }
})



module.exports = mongoose.model('User', UserSchema)