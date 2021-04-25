import React, { useContext } from 'react';
import proyectoContext from '../../../../Context/proyectos/proyectoContext';
import TareaContext from '../../../../Context/tasks/tareaContext';

const Proyecto = ({ proyecto }) => {

  //obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext)
  const { proyectoActual } = proyectosContext;

  //Obtener la funcion del context de tarea
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas } = tareasContext

  //Funcion para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id) //Fijar un proyecto actual
    obtenerTareas(id) //Filtrar las tareas del proyecto actual
  }


  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombreProyecto}
      </button>
    </li>
  );
}

export default Proyecto;