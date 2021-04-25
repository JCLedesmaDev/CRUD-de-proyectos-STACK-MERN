import React from 'react'
import ListadoProyectos from './ListadoProyectos/ListadoProyectos';
import NuevoProyecto from './NuevoProyecto/NuevoProyecto';


const Sidebar = () => {
  return (
    <aside>
      <h1>
        M.E.R.N <span>Proyectos</span>
      </h1>

      <NuevoProyecto />

      <div className="proyectos">
        <h2>Tus proyectos</h2>
        <ListadoProyectos />
      </div>
    </aside>
  );
}

export default Sidebar;