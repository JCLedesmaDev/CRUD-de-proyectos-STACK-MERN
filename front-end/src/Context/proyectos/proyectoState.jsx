// Aqui vamos a definir los States que tendra los proyectos, junto con sus diferentes funciones hacia los "types"
import React, { useReducer } from 'react'
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from './Types';
import clienteAxios from '../../Config/axios';




// Este sera el State inicial de todo lo que seria la administracion del proyecto
const ProyectoState = (props) => {

  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
    idProyectoActual: null,
    mensaje: null
  }


  //Dispatch para ejecutar las acciones 
  const [state, dispatch] = useReducer(proyectoReducer, initialState)
  //Cuando utilicemos el "useReducer" sera igual que utilizar el "useState" ya que por medio de la destructuracion, nos va a retornar un "state incial" y un "dispatch" que nos permite realizar un cambio (ya sea por una funcion/accion o funcion/accion asincrona) al "state inicial"


  /*    Serie de funciones para el CRUD     */

  //Mostrar formulario
  const mostrarFormulario = () => {
    //Cuando se mande a llamar esta funcion, se va a ejecutar automaticamente, lo que poseemos en el archivo "proyectoReducer.jsx"

    dispatch({
      type: FORMULARIO_PROYECTO
    })
  }

  //Obtener los proyectos
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/proyectos')

      dispatch({
        type: OBTENER_PROYECTOS,
        //El payload, sera siempre lo que nuestra funcion tome como parametro la cual luego sera asignada al state.
        payload: resultado.data
      })
    } catch (error) {

      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  //Agregar nuevo proyecto
  const agregarNuevoProyecto = async (proyecto) => {

    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto)

      //Insertar el proyecto en el state con un dispath
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data
      })

      console.log(resultado)
    } catch (error) {

      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  //Validar formulario
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    })
  }

  //Selecciona el proyecto que el usuario dio click
  const proyectoActual = (idProyectoActual) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: idProyectoActual
    })
  }

  //Elimina un proyecto
  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      })
    } catch (error) {

      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario,
        idProyectoActual: state.idProyectoActual,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarNuevoProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  )
}

export default ProyectoState;













