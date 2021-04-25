import React, { useContext } from 'react'
import proyectoContext from '../../../../Context/proyectos/proyectoContext';
import TareaContext from '../../../../Context/tasks/tareaContext';


const Tarea = ({ tarea }) => {

  // const { nombreTarea, estado, idTarea } = tarea;

  //obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext)
  const { idProyectoActual } = proyectosContext


  //Obtener la funcion del Context de Tarea
  const tareasContext = useContext(TareaContext)
  const {
    eliminarTarea,
    obtenerTareas,
    tareaActualSeleccionada,
    actualizarTareaSeleccionada
  } = tareasContext;

  const [proyectoActual] = idProyectoActual;
  //Funcion para que se ejecute cuando el usuario presione el btn de eliminar tarea
  const eliminarTareaProyecto = (idTarea) => {
    eliminarTarea(idTarea, proyectoActual._id);
    obtenerTareas(proyectoActual._id)
  }

  //Funcion que modifica el estado de las tareas
  const modificarEstadoTarea = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTareaSeleccionada(tarea)
  }

  //Funcion que modifica la tarea actual cuando el usuario desee editarla
  const seleccionarTareaActual = (tarea) => {
    tareaActualSeleccionada(tarea)
  }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombreTarea}</p>

      <div className="estado">
        {
          tarea.estado
            ? (
              <button
                type="button"
                className="completo"
                onClick={() => modificarEstadoTarea(tarea)}
              >Completo</button>
            )
            : (
              <button
                type="button"
                className="incompleto"
                onClick={() => modificarEstadoTarea(tarea)}
              >Incompleto</button>
            )
        }
      </div>

      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTareaActual(tarea)}
        >Editar</button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => eliminarTareaProyecto(tarea._id)}
        >Eliminar</button>
      </div>
    </li>
  );
}

export default Tarea;