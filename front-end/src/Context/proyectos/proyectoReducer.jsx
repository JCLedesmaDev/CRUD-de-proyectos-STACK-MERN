// Este hook de "useReducer" reemplaza lo que seria el Reducer que posee Redux

//En este archivo, lo que haremos sera cambiar el valor del "state inicial"

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "./Types/index";

export default (state, action) => {
  switch (action.type) {

    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true
      }

    case OBTENER_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload
      }

    case AGREGAR_PROYECTO:
      return {
        ...state,
        // HAcemos una copia de los proyectos y le agregamos un proyecto mas
        proyectos: [action.payload, ...state.proyectos],
        formulario: false,
        errorFormulario: false
      }

    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorFormulario: true
      }

    case PROYECTO_ACTUAL:
      return {
        ...state,
        idProyectoActual: state.proyectos.filter(proyecto => proyecto._id === action.payload)
      }

    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
        idProyectoActual: null
      }

    case PROYECTO_ERROR:
      return {
        ...state,
        mensaje: action.payload
      }

    default:
      return state;
  }
}