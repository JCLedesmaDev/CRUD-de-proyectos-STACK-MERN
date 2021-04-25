import React, { useReducer } from "react";
import alertaContext from "./alertaContext";
import alertaReducer from "./alertaReducer";

import {
  MOSTRAR_ALERTA, OCULTAR_ALERTA
} from "./Types/index";

const AlertaState = props => {

  const initialState = {
    alerta: null
  }

  const [state, dispatch] = useReducer(alertaReducer, initialState);

  //Funciones 
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria
      }
    });

    //5 seg. Limpiar alerta
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 5000);
  }

  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta
      }}
    >
      {props.children}
    </alertaContext.Provider>
  )
}

export default AlertaState;