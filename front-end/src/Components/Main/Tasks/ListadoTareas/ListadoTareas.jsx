import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../../../Context/proyectos/proyectoContext';
import TareaContext from '../../../../Context/tasks/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {

  //Si un proyecto esta activo, pues que aparezca su nombre de titulo
  const proyectosContext = useContext(proyectoContext)
  const { idProyectoActual, eliminarProyecto } = proyectosContext;

  //Obtener las tareas del proyecto activo
  const tareasContext = useContext(TareaContext);
  const { tareasProyectoActual } = tareasContext;


  if (idProyectoActual === null) {
    return <h2>Selecciona un proyecto</h2>;
  }

  //Desestructuramos el Array para extraer el proyecto actual
  const [proyectoActual] = idProyectoActual;



  //Eliminar un proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id)
  }

  return (

    <Fragment>
      <h2>Proyecto: {proyectoActual.nombreProyecto}</h2>

      <ul className="listado-tareas">
        {
          (tareasProyectoActual.length === 0)
            ? (
              <li className="tarea">
                <p>No hay tareas</p>
              </li>
            )
            : (
              tareasProyectoActual.map(tarea => (
                <Tarea
                  key={Math.random()}
                  tarea={tarea}
                />
              ))
            )
        }
      </ul>

      <button
        type="button"
        className="btn btn-primario"
        onClick={onClickEliminar}
      >Eliminar proyecto 🗑
      </button>


    </Fragment>
  );
}

export default ListadoTareas;