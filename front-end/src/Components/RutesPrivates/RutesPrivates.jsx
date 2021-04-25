import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../Context/autenticacion/authContext';

//Proteger las rutas de quienes no esten autenticados
const RoutePrivate = ({ component: Component, ...props }) => {

  const authContext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, [])

  return (
    <Route
      //Si el usuario No esta autenticado, lo re dirige a la pagina principal pa loguear. Caso contrario lo dirige a su respectivo componente
      {...props} render={props => !autenticado && !cargando
        ? (
          <Redirect to="/" />
        )
        : (
          <Component {...props} />
        )
      }
    />
  );
}

export default RoutePrivate;