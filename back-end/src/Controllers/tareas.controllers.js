const proyectosSchema = require('../Models/Proyecto.models')
const TareasSchema = require('../Models/Tarea.models');
const { validationResult } = require('express-validator');
const tareasCtrl = {}


tareasCtrl.createTasks = async (req, res) => {
    //Revisar si existen errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) { //-> Si no esta vacio, es xq tiene un error
    return res.status(400).json({errors: errors.array()})
  }

  try {
    
    //Extraer y comprobar si existe el proyecto de dicha tarea
    const { proyecto } = req.body;
    const proyectoTarea = await proyectosSchema.findById(proyecto)
    if (!proyectoTarea) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    //Revisar si el proyecto actual, pertenece al usuario autenticado
    if (proyectoTarea.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'})
    }

    //Creamos la tarea
    const tarea = new TareasSchema(req.body)
    await tarea.save()
    res.json({tarea});

 
  } catch (error) {
    console.log(error)
    res.status(500).send("Hubo un error")
  }
}

tareasCtrl.getTasks = async (req,res) => {
  try {
    
    //Extraer y comprobar si existe el proyecto de dicha tarea
    const { proyecto } = req.query; 
    //Req.query, cuando mandamos un dato por medio de los "params" junto a la peticion 'get, delete'


    const proyectoTarea = await proyectosSchema.findById(proyecto)
    if (!proyectoTarea) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    //Revisar si el proyecto actual, pertenece al usuario autenticado
    if (proyectoTarea.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'});
    }

    //Obtener las tareas del proyecto
    const tareas = await TareasSchema.find({
      proyecto: proyecto
    });
    res.json({tareas});

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }

}

tareasCtrl.updateTasks = async (req,res) => {
  try {
    const { proyecto, nombreTarea, estado } = req.body;

    //Extraer y comprobar si existe el proyecto
    const proyectoTarea = await proyectosSchema.findById(proyecto)

    //Revisar si el proyecto actual, pertenece al usuario autenticado
    if (proyectoTarea.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'});
    }

    //Si la tarea existe o no
    let tareaExiste = await TareasSchema.findById(req.params.id)
    if (!tareaExiste) {
      return res.status(404).json({msg: 'No existe esa tarea'});
    }

    //Crear objeto con la nueva informacion
    const nuevaTarea = {};
    nuevaTarea.nombreTarea = nombreTarea; 
    nuevaTarea.estado = estado; 
    

    //Guardar la tarea
    tareaExiste = await TareasSchema.findOneAndUpdate(
      {_id: req.params.id },
      nuevaTarea,
      {new: true}
    )

    res.json({ tareaExiste })

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
}

tareasCtrl.deleteTasks = async (req,res) => {
  try {
    const { proyecto } = req.query;

    //Extraer y comprobar si existe el proyecto
    const proyectoTarea = await proyectosSchema.findById(proyecto)

    //Revisar si el proyecto actual, pertenece al usuario autenticado
    if (proyectoTarea.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'});
    }

    //Si la tarea existe o no 
    let tareaExiste = await TareasSchema.findById(req.params.id)
    if (!tareaExiste) {
      return res.status(404).json({msg: 'No existe esa tarea'});
    }

    //Eliminar tarea
    await TareasSchema.findOneAndRemove({_id: req.params.id})
    res.json({msg: "Tarea eliminada"})
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
}

module.exports = tareasCtrl;
