const proyectosSchema = require('../Models/Proyecto.models')
const { validationResult } = require('express-validator');
const proyectosCtrl = {}


proyectosCtrl.createProject = async(req, res) =>{
  
  //Revisar si existen errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) { //-> Si no esta vacio, es xq tiene un error
    return res.status(400).json({errors: errors.array()})
  }

  try {
    
    //Crear un nuevo proyecto
    const proyecto = new proyectosSchema(req.body);
    
    //Guardar el "creador" via JWT => Utilizamos el id que nos brindo el cifrado del "Auth.middle" para indicar el creador de este proyecto
    proyecto.creador = req.usuario.id
    
    //Guardar proyecto
    proyecto.save();
    res.json(proyecto);

  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

//Obtener todos los proyectos del usuario actual
proyectosCtrl.getProject = async (req,res) =>{
  try {
    
    const proyectos = await proyectosSchema.find({
      creador: req.usuario.id
    }).sort({creador: -1}); //Para que nos de los proyectos en el orden adecuado de su creacion

    res.json(proyectos)

  } catch (error) {
    console.log(error)
    res.status(500).send("Hubo un error")
  }
}

//Actualizar un proyecto
proyectosCtrl.updateProject = async (req,res) =>{

  //Revisar si existen errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) { //-> Si no esta vacio, es xq tiene un error
    return res.status(400).json({errors: errors.array()})
  }

  //Extraer la informacion del proyecto
  const { nombre } = req.body;
  const newProject = {};

  //Validamos que nos pase un nuevo valor para actualizar
  if (nombre) {
    newProject.nombre = nombre;
  }

  try {

    //Revisar el ID de un proyecto
    let proyecto = await proyectosSchema.findById(req.params.id)
    console.log(proyecto)

    //Verificar que el proyecto revisado exista
    if (!proyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    //Verificar el Id del creador del proyecto con el que esta logueado
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'})
    }

    //Actualizar proyecto
    proyecto = await proyectosSchema.findByIdAndUpdate(
      { _id: req.params.id }, //Especificamos el id del proyecto a actualizar
      { $set: newProject }, //Especificamos los nuevos datos
      { new: true} //Especificamos que genere un nuevo dato a base del anterior.
    );
    
    res.json({proyecto});

  } catch (error) {
    console.log(error)
    res.status(500).send("Error en el servidor")
  }

}

//Eliminar proyecto
proyectosCtrl.deleteProject = async (req,res) =>{

  try {
    //Revisar el ID de un proyecto
    let proyecto = await proyectosSchema.findById(req.params.id)
    console.log(proyecto)

    //Verificar que el proyecto revisado exista
    if (!proyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    //Verificar el Id del creador del proyecto con el que esta logueado
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'})
    }

    //Eliminar proyecto
    await proyectosSchema.findOneAndRemove(
      { _id: req.params.id }
    );
    res.json({msg: 'Proyecto eliminado'});

  } catch (error) {
    console.log(error)
    res.status(500).send("Error en el servidor")
  }
}


module.exports = proyectosCtrl;