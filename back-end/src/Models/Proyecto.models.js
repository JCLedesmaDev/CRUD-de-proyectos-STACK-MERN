const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
  nombreProyecto: {
    type: String, 
    required: true, 
    trim: true
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId, //Cada usuario tiene su propio Id, por lo que guardaremos esa referencia en cada proyecto para saber a que usuario le pertenece ese proyecto creado.
    ref: "User" //Le darems como referencia, el nombre del modelo de datos de User, para que de ahi obtenga dicho Id
  },
  create_at: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('Proyecto', ProyectoSchema);