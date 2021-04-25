import React, { Fragment, useContext } from 'react';
import AuthContext from '../../../Context/autenticacion/authContext';

const BarraUsuario = () => {

  //Extraer la informacion de autenticacion al estar en la pagina principal 
  const authContext = useContext(AuthContext);
  const { usuario, cerrarSesion } = authContext;


  return (

    <header className="app-header">
      {
        (usuario)
          ? (
            <Fragment>
              <p className="nombre-usuario">
                Buenos días <span>{usuario.nombre}</span>
              </p>

              <nav className="nav-principal">
                <button
                  className="btn btn-blank cerrar-sesion"
                  onClick={() => cerrarSesion()}
                >
                  Cerrar Sesión
                </button>
              </nav>
            </Fragment>
          ) : null
      }
    </header>
  );
}

export default BarraUsuario;