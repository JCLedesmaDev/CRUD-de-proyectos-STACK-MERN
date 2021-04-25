import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from "./Types";

export default (state, action) => {
  switch (action.type) {

    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      //Almacenamos en el localStorage, el token que obtenemos de la API
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false
      }

    case CERRAR_SESION:
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: false,
        cargando: false,
        mensaje: action.payload //Le pasamos el msg a "mensaje" para darselo posteriormente a "alertContext"
      };

    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        cargando: false,
        usuario: action.payload
      }

    default:
      return state;
  }
}