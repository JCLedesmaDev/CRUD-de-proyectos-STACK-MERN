import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "./Types/index";

export default (state, action) => {
  switch (action.type) {

    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyectoActual: action.payload
      }

    case AGREGAR_TAREA:
      return {
        ...state,
        // Se agrega la tarea al inicio de la lista. Para que se agregue al reves deberia ser "[...state.tareas, action.payload]"
        tareasProyectoActual: [action.payload, ...state.tareasProyectoActual],
        errorTarea: false
      }

    case VALIDAR_TAREA:
      return {
        ...state,
        errorTarea: true,
      }

    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasProyectoActual: state.tareasProyectoActual.filter(tarea => tarea._id !== action.payload)
      }

    // En caso de que sea "actualizar o estado", ejecutara el mismo codigo
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasProyectoActual: state.tareasProyectoActual.map(
          tarea => tarea._id === action.payload._id
            ? action.payload //Guardamos la tarea con el estado cambiado
            : tarea //mantenemos la tarea con su estado inicial
        ),
        // tareaSeleccionada: null
      }

    case TAREA_ACTUAL:
      return {
        ...state,
        tareaSeleccionada: action.payload
      }

    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaSeleccionada: null
      }

    default:
      return state;
  }
}