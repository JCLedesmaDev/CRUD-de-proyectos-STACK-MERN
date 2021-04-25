import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../Config/axios';
import tokenAuth from '../../Config/tokenAuth';
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from "./Types";

const AuthState = (props) => {

  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null, // Indicara si esta autenticado o n o
    usuario: null, //Se utilizara para almacenar los datos del usuario
    mensaje: null, //Se utilizara para enviar mensajes de error al alertContext a la hora de registrarse 
    cargando: true
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  //Funciones
  const registrarUsuario = async (datos) => {
    try {

      const respuesta = await clienteAxios.post('/api/users', datos);
      console.log(respuesta);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      })

      //Una vez registrado, vamos a obtener los datos del usuario
      usuarioAutenticado();

    } catch (error) {

      //Mostramos el mensaje de error obtenido desde la API

      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      });
    }
  }

  //Obtener que usuario esta autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      //Funcion para enviar el token por headers
      tokenAuth(token)
    }

    try {

      const respuesta = await clienteAxios.get('/api/auth');
      console.log(respuesta)
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario

      })

    } catch (error) {

      console.log(error.response)
      dispatch({
        type: LOGIN_ERROR
      });

    }
  }

  //Cuando el usuario inicie sesion
  const iniciarSesion = async (datos) => {
    try {

      const respuesta = await clienteAxios.post('/api/auth', datos);
      console.log(respuesta.data);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      })

      //Despues de iniciar sesion, traemos los datos de ese usuario en especifico
      usuarioAutenticado();

    } catch (error) {
      console.log(error.response.data.msg)
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }

      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      });
    }
  }

  //Cierra la sesion del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;