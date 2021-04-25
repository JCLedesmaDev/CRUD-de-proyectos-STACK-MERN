import React, { useState, Fragment, useContext } from 'react'

// El primer paso para utilizar "useReducer" ( que contiene todos nuestros "states" y los podemos implementar en cada componente gracias a "useContext")
import proyectoContext from '../../../../Context/proyectos/proyectoContext';


const NuevoProyecto = () => {

  //Obtener el state del formulario y todas las funciones y "states" que posea nuestro archivo "proyectoState" por medio del "useContext"
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarNuevoProyecto,
    mostrarError
  } = proyectosContext;


  //State para proyecto
  const [proyecto, guardarProyecto] = useState({
    nombreProyecto: ''
  })
  const { nombreProyecto } = proyecto;


  //Leer el contenido del input
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    })
  }

  //Cuado el usuario desea agregar un proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //Validar proyecto
    if (nombreProyecto === "") {
      mostrarError(true)
      return;
    }

    //Agregar al State
    agregarNuevoProyecto(proyecto)

    //Reiniciar el form
    guardarProyecto({
      nombreProyecto: ''
    })
  }

  return (
    <Fragment>

      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>

      {
        (formulario)
          ? (
            <form
              className="formulario-nuevo-proyecto"
              onSubmit={onSubmitProyecto}
            >
              <input
                type="text"
                className="input-text"
                placeholder="Nombre del proyecto"
                name="nombreProyecto"
                onChange={onChangeProyecto}
                value={nombreProyecto}

              />

              <input
                type="submit"
                className="btn btn-block btn-primario"
                value="Agregar proyecto"
              />

            </form>
          )
          : null
      }
      {
        (errorFormulario)
          ? <p className="mensaje error"> El nombre del Proyecto es obligatorio</p>
          : null
      }


    </Fragment>
  );
}

export default NuevoProyecto;