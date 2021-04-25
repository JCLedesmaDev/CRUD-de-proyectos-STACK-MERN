import React, { useReducer } from 'react'
import TareaContext from "./tareaContext";
import TareaReducer from './tareaReducer'
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "./Types/index";
import clienteAxios from "../../Config/axios";

const TareaState = props => {

  const initialState = {
    tareasProyectoActual: [],
    errorTarea: false,
    tareaSeleccionada: null
  }

  //Crear Dispatch y State
  const [state, dispatch] = useReducer(TareaReducer, initialState);


  /*   Serie de funciones respectivas de las Tareas   */

  //obtener tareas de un proyecto en especifico
  const obtenerTareas = async (proyecto) => {

    try {
      const resultado = await clienteAxios.get(
        '/api/tareas', { params: { proyecto } }
      )
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      })
    } catch (error) {
      console.log(error)
    }
  }

  //agregar una tarea al proyecto seleccionado
  const agregarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.post('/api/tareas', tarea);
      console.log(resultado);

      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      })
    } catch (error) {
      console.log(error)
    }
  }

  //Eliminar tarea
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(
        `/api/tareas/${id}`, { params: { proyecto } }
      );
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      });
    } catch (error) {
      console.log(error)
    }
  }

  //validar formulario de las tareas
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    })
  }


  //Edita o modifica una tarea
  const actualizarTareaSeleccionada = async (tarea) => {

    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`, tarea
      );
      console.log(resultado)
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tareaExiste
      })
    } catch (error) {
      console.log(error)
    }
  }


  //Extrae una tarea para edicion
  const tareaActualSeleccionada = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }


  //Limpiar form con la tarea seleccionada 
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    })
  }

  return (
    <TareaContext.Provider
      value={{
        tareasProyectoActual: state.tareasProyectoActual,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        tareaActualSeleccionada,
        actualizarTareaSeleccionada,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  )
}

export default TareaState;


