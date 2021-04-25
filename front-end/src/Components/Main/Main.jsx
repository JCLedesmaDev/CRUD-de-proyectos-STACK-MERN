import React, { useContext, useEffect } from 'react'
import BarraUsuario from './BarraUsuario/BarraUsuario';
import Sidebar from './Sidebar/Sidebar';
import FormTarea from './Tasks/FormTarea/FormTarea';
import ListadoTareas from './Tasks/ListadoTareas/ListadoTareas';

import AuthContext from '../../Context/autenticacion/authContext';

const Proyectos = () => {

  //Extraer la informacion de autenticacion al estar en la pagina principal 
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="contenedor-app">

      <Sidebar />

      <div className="seccion-principal">
        <BarraUsuario />

        <main>

          <FormTarea />

          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>

        </main>
      </div>
    </div>
  );
}

export default Proyectos;