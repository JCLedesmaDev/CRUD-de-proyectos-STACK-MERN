import React, { useContext, useEffect } from 'react'
import Proyecto from "./Proyecto";
import proyectoContext from '../../../../Context/proyectos/proyectoContext';
import AlertaContext from '../../../../Context/alertas/alertaContext'

const ListadoProyectos = () => {

  //Extraer proyectos del "state inicial"
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, mensaje, obtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Obtener proyectos cuando carga el componente
  useEffect(() => {

    if (mensaje) {
      //Si existe un error
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }

    obtenerProyectos()

    //eslint-disable-next-line
  }, [mensaje])

  //En caso de que no tengamos contenido en la BD, pues no imprimira nada
  if (proyectos.length === 0) {
    return <p>No hay proyectos, comienza creando uno</p>;
  }


  return (


    < ul className="listado-proyectos" >
      {
        (alerta)
          ? (
            <div className={`alerta ${alerta.categoria}`}>
              {alerta.msg}
            </div>
          )
          : (null)
      }

      {
        proyectos.map(proyecto => (
          <Proyecto
            key={proyecto._id}
            proyecto={proyecto}
          />
        ))
      }
    </ul >
  );
}

export default ListadoProyectos;