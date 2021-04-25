import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../../../Context/proyectos/proyectoContext';
import TareaContext from '../../../../Context/tasks/tareaContext';


const FormTarea = () => {

  //Si un proyecto esta activo, pues que aparezca la opcion de agregar tareas
  const proyectosContext = useContext(proyectoContext)
  const { idProyectoActual } = proyectosContext

  //Obtener la funcion del context de tarea
  const tareasContext = useContext(TareaContext);
  const {
    tareaSeleccionada,
    errorTarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTareaSeleccionada,
    limpiarTarea
  } = tareasContext


  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaSeleccionada !== null) {
      guardarTarea(tareaSeleccionada)
    } else {
      guardarTarea({
        nombreTarea: ""
      })
    }
  }, [tareaSeleccionada])



  //State del formulario
  const [tarea, guardarTarea] = useState({
    nombreTarea: "",
  })
  const { nombreTarea } = tarea;

  //Si no hay proyecto seleccionado
  if (idProyectoActual === null) {
    return null;
  }

  //Desestructuramos el Array para extraer el proyecto actual
  const [proyectoActual] = idProyectoActual;


  //Leer los valores del formulario
  const handleChange = e => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    })
  }



  const onSubmitForm = (e) => {
    e.preventDefault();

    //validar
    if (nombreTarea.trim() === "") {
      validarTarea(); //Al ejcutarlo pasa a True y salta el error
      return;
    }


    //Si es edicion o es nueva tarea
    if (tareaSeleccionada === null) {

      //tarea nueva //agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);

    } else {

      //ACtualizar tarea existente
      actualizarTareaSeleccionada(tarea);
      //Eliminar tareaSeleccionada del state
      limpiarTarea()

    }

    //Reiniciar el formulario
    guardarTarea({
      nombreTarea: ""
    })

    //Volvemos a obtener nuevamente todas las tareas del proyecto actual 
    obtenerTareas(proyectoActual.id)

  }

  return (
    <div className="formulario">
      <form
        onSubmit={onSubmitForm}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea"
            name="nombreTarea"
            onChange={handleChange}
            value={nombreTarea}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={
              tareaSeleccionada ? "Editar tarea" : "Agregar tarea"
            }
          />
        </div>
      </form>

      {
        errorTarea
          ? <p className="mensaje error"> El nombre de la tarea es obligatorio</p>
          : null
      }
    </div>
  );
}

export default FormTarea;